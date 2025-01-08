<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Reserva;
use App\Models\Suscripcion;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Muestra la información del perfil del usuario.
     *
     * @return \Inertia\Response
     */
    public function show(Request $request)
    {
        try {
            // Obtener el usuario autenticado
            $user = Auth::user();

            // Obtener las fechas de filtro para reservas y facturas desde la solicitud
            $fechaReservas = $request->input('fecha_reservas');
            $fechaFacturas = $request->input('fecha_facturas');

            // Obtener las suscripciones activas del usuario
            $suscripciones = $user->suscripciones()
                ->where('estado', 'Activa') // Filtrar por suscripciones activas
                ->orderBy('fecha_inicio', 'desc') // Ordenar por fecha de inicio
                ->get();

            // Obtener las reservas del usuario, aplicando el filtro de fecha si existe
            $reservas = $user->reservas()
                ->with('clase') // Obtener la clase asociada a cada reserva
                ->when($fechaReservas, function ($query, $fechaReservas) {
                    // Filtrar por la fecha de reserva si se ha proporcionado
                    return $query->whereDate('fecha_reserva', $fechaReservas);
                })
                ->orderBy('fecha_reserva', 'desc') // Ordenar por fecha de reserva
                ->paginate(2, ['*'], 'reservasPage'); // Paginación de las reservas

            // Obtener la dieta del usuario
            $dieta = $user->dietas()->first();

            // Obtener las adquisiciones de programas (programas adquiridos por el usuario)
            $adquisiciones = $user->programasAdquiridos()->with('programa')->get();

            // Obtener los pedidos (facturas) del usuario, aplicando el filtro de fecha si existe
            $pedidos = $user->pedidos()
                ->with('detalles.producto') // Obtener los detalles de cada pedido con los productos
                ->when($fechaFacturas, function ($query, $fechaFacturas) {
                    // Filtrar por la fecha del pedido si se ha proporcionado
                    return $query->whereDate('fecha_pedido', $fechaFacturas);
                })
                ->orderBy('fecha_pedido', 'desc') // Ordenar por fecha de pedido
                ->paginate(4, ['*'], 'pedidosPage'); // Paginación de los pedidos

            // Retornar la vista con los datos recopilados
            return Inertia::render('Dashboard', [
                'auth' => [
                    'user' => $user, // Pasar los datos del usuario autenticado a la vista
                ],
                'isEntrenador' => $user->isEntrenador(), // Determinar si el usuario es un entrenador
                'reservas' => $reservas->toArray(), // Convertir las reservas a un array
                'suscripciones' => $suscripciones ? $suscripciones->toArray() : ['data' => []], // Convertir las suscripciones a un array
                'dieta' => $dieta ? $dieta->toArray() : null, // Convertir la dieta a un array, si existe
                'adquisiciones' => $adquisiciones->toArray(), // Convertir las adquisiciones a un array
                'pedidos' => $pedidos->toArray(), // Convertir los pedidos a un array
                'searchDateReservas' => $fechaReservas, // Pasar la fecha de búsqueda de reservas
                'searchDateFacturas' => $fechaFacturas, // Pasar la fecha de búsqueda de facturas
            ]);
        } catch (\Exception $e) {
            // Capturar cualquier error y mostrar el mensaje (esto puede ser útil para depuración)
            dd($e->getMessage());
        }
    }

    public function showSuspended()
    {
        // Renderizar vista de usuario suspendido
        return Inertia::render('UsuarioSuspendido');
    }


    /**
     * Muestra el formulario para editar la información del perfil del usuario.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function edit(Request $request): Response
    {
        // Renderizar la vista 'Profile/Edit' utilizando Inertia, pasando el usuario,
        // si el email del usuario debe ser verificado, y el estado de la sesión
        return Inertia::render('Profile/Edit', [
            'user' => $request->user(),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail, // Verifica si el usuario debe verificar su email
            'status' => session('status'), // Obtiene el estado de la sesión (ej. mensajes flash)
        ]);
    }

    /**
     * Actualiza la información del perfil del usuario.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */

    public function update(Request $request): RedirectResponse
    {
        // Valida los datos del formulario
        $request->validate([
            'name' => 'nullable|string|max:255', // El nombre es opcional, debe ser una cadena con un máximo de 255 caracteres
            'email' => 'nullable|string|email|max:255|unique:users,email,' . $request->user()->id, // El email es opcional, debe ser un email válido y único para el usuario actual
            'fecha_nacimiento' => 'nullable|date', // La fecha de nacimiento es opcional, debe ser una fecha válida
            'sexo' => 'nullable|string|in:Masculino,Femenino,Otro', // El sexo es opcional, debe ser uno de los valores definidos
            'altura' => 'nullable|numeric', // La altura es opcional, debe ser un número
            'peso' => 'nullable|numeric', // El peso es opcional, debe ser un número
            'nivel_actividad' => 'nullable|string|in:Sedentario,Ligero,Moderado,Activo,Muy Activo', // El nivel de actividad es opcional, debe ser uno de los valores definidos
            'biografia' => 'nullable|string|max:255', // La biografía es opcional, debe ser una cadena con un máximo de 255 caracteres
            'foto_perfil' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // La foto de perfil es opcional, debe ser una imagen con los tipos permitidos y un tamaño máximo de 2MB
        ]);

        // Obtiene el usuario autenticado
        $user = $request->user();

        // Manejar la foto de perfil
        if ($request->hasFile('foto_perfil')) {
            // Si hay una nueva foto de perfil, la procesa
            $fotoPerfil = $request->file('foto_perfil');
            $filename = time() . '_' . $fotoPerfil->getClientOriginalName(); // Genera un nombre único para la foto
            $fotoPerfil->move(public_path('fotos_perfil'), $filename); // Mueve la foto al directorio de fotos_perfil

            // Elimina la foto anterior si existe
            if ($user->foto_perfil && file_exists(public_path('fotos_perfil/' . $user->foto_perfil))) {
                unlink(public_path('fotos_perfil/' . $user->foto_perfil)); // Borra la foto anterior
            }

            // Asigna el nuevo nombre de archivo de la foto de perfil al usuario
            $user->foto_perfil = $filename;
        }

        // Actualiza los demás campos del usuario con los datos proporcionados
        $user->fill($request->only([
            'name',
            'email',
            'fecha_nacimiento',
            'sexo',
            'altura',
            'peso',
            'nivel_actividad',
            'biografia',
        ]));

        // Si el email ha cambiado, se establece el campo de verificación de email a null
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        // Guarda los cambios en el usuario
        $user->save();

        // Redirige al usuario al dashboard con un mensaje de éxito
        return Redirect::route('dashboard')->with('success', 'Perfil actualizado correctamente.');
    }


    /**
     * Elimina la cuenta del usuario.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request): RedirectResponse
    {
        // Validar que la contraseña actual sea proporcionada y correcta
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        // Obtener el usuario autenticado
        $user = $request->user();

        // Cerrar la sesión del usuario
        Auth::logout();

        // Eliminar el usuario de la base de datos
        $user->delete();

        // Invalidar la sesión actual y regenerar el token CSRF
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redireccionar al usuario a la página principal después de eliminar la cuenta
        return Redirect::to('/');
    }
}
