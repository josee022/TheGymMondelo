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
            $user = Auth::user();

            // Fechas de filtro para reservas y facturas
            $fechaReservas = $request->input('fecha_reservas');
            $fechaFacturas = $request->input('fecha_facturas');

            // Obtener suscripciones activas
            $suscripciones = $user->suscripciones()
                ->where('estado', 'Activa')
                ->orderBy('fecha_inicio', 'desc')
                ->get();

            // Obtener reservas y aplicar filtro de fecha si existe
            $reservas = $user->reservas()
                ->with('clase')
                ->when($fechaReservas, function ($query, $fechaReservas) {
                    return $query->whereDate('fecha_reserva', $fechaReservas);
                })
                ->orderBy('fecha_reserva', 'desc')
                ->paginate(2, ['*'], 'reservasPage');

            // Obtener la dieta
            $dieta = $user->dietas()->first();

            // Obtener adquisiciones de programas
            $adquisiciones = $user->programasAdquiridos()->with('programa')->get();

            // Obtener pedidos (facturas) y aplicar filtro de fecha si existe
            $pedidos = $user->pedidos()
                ->with('detalles.producto')
                ->when($fechaFacturas, function ($query, $fechaFacturas) {
                    return $query->whereDate('fecha_pedido', $fechaFacturas);
                })
                ->orderBy('fecha_pedido', 'desc')
                ->paginate(4, ['*'], 'pedidosPage');

            return Inertia::render('Dashboard', [
                'auth' => [
                    'user' => $user,
                ],
                'isEntrenador' => $user->isEntrenador(),
                'reservas' => $reservas->toArray(),
                'suscripciones' => $suscripciones ? $suscripciones->toArray() : ['data' => []],
                'dieta' => $dieta ? $dieta->toArray() : null,
                'adquisiciones' => $adquisiciones->toArray(),
                'pedidos' => $pedidos->toArray(),
                'searchDateReservas' => $fechaReservas,
                'searchDateFacturas' => $fechaFacturas,
            ]);
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    public function showSuspended()
    {
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
        // Validar los datos del formulario
        $request->validate([
            'name' => 'required|string|max:255', // El nombre es obligatorio, debe ser una cadena de texto y no superar los 255 caracteres
            'email' => 'required|string|email|max:255|unique:users,email,' . $request->user()->id, // El email es obligatorio, debe ser único (excepto el actual del usuario)
            'fecha_nacimiento' => 'nullable|date', // La fecha de nacimiento es opcional, debe ser una fecha válida
            'sexo' => 'nullable|string|in:Masculino,Femenino,Otro', // El sexo es opcional, debe ser una de las opciones permitidas
            'altura' => 'nullable|numeric', // La altura es opcional, debe ser un valor numérico
            'peso' => 'nullable|numeric', // El peso es opcional, debe ser un valor numérico
            'nivel_actividad' => 'nullable|string|in:Sedentario,Ligero,Moderado,Activo,Muy Activo', // El nivel de actividad es opcional, debe ser una de las opciones permitidas
            'biografia' => 'nullable|string|max:255', // La biografía es opcional, debe ser una cadena de texto y no superar los 255 caracteres
        ]);

        // Obtener el usuario autenticado
        $user = $request->user();

        // Rellenar los datos del usuario con la información recibida del formulario
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

        // Si el email ha sido modificado, anula la verificación del email
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        // Guardar los cambios en la base de datos
        $user->save();

        // Redireccionar al usuario al dashboard después de actualizar el perfil
        return Redirect::route('dashboard');
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
