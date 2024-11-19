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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $request->user()->id,
            'fecha_nacimiento' => 'nullable|date',
            'sexo' => 'nullable|string|in:Masculino,Femenino,Otro',
            'altura' => 'nullable|numeric',
            'peso' => 'nullable|numeric',
            'nivel_actividad' => 'nullable|string|in:Sedentario,Ligero,Moderado,Activo,Muy Activo',
            'biografia' => 'nullable|string|max:255',
            'foto_perfil' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $user = $request->user();

        if ($request->hasFile('foto_perfil')) {
            $path = $request->file('foto_perfil')->store('perfil', 'public');

            if ($user->foto_perfil) {
                Storage::disk('public')->delete($user->foto_perfil);
            }

            $user->foto_perfil = $path;
        }

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

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

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
