<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Reserva;
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
     * Display the user's profile information.
     */
    public function show()
    {
        $user = Auth::user();
        $reservas = Reserva::where('usuario_id', $user->id)->with('clase')->get();

        return inertia('Dashboard', [
            'user' => $user,
            'reservas' => $reservas,
            'isEntrenador' => $user->isEntrenador()
        ]);
    }
    /**
     * Display the user's profile form for editing.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'user' => $request->user(),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
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
    ]);

    $user = $request->user();
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

    return Redirect::route('dashboard');
}


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
{
    $request->validate([
        'password' => ['required', 'current_password'],
    ]);

    $user = $request->user();

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return Redirect::to('/');
}
}
