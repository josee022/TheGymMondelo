<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Entrenador;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrainerController extends Controller
{
    // Método para mostrar la vista de gestión de entrenadores
    public function index()
    {
        // Obtener todos los entrenadores y usuarios no entrenadores
        $entrenadores = Entrenador::with('usuario')->get();
        $usuarios = User::whereDoesntHave('entrenador')->get();

        return Inertia::render('Admin/MisterGestion', [
            'entrenadores' => $entrenadores,
            'usuarios' => $usuarios,
        ]);
    }

    public function convertirEnEntrenador(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if (!$user->entrenador) {
            Entrenador::create([
                'usuario_id' => $user->id,
                'especialidad' => $request->input('especialidad', 'General'),
                'tarifa' => $request->input('tarifa', 20.00),
            ]);
        }

        return redirect()->back()->with('success', 'Usuario convertido a entrenador exitosamente.');
    }

    public function deshabilitarEntrenador($id)
    {
        $entrenador = Entrenador::where('usuario_id', $id)->first();

        if ($entrenador) {
            $entrenador->delete();
        }

        return redirect()->back()->with('success', 'Entrenador deshabilitado exitosamente.');
    }

    public function editarEntrenador(Request $request, $id)
    {
        $entrenador = Entrenador::findOrFail($id);

        $entrenador->update([
            'especialidad' => $request->input('especialidad'),
            'tarifa' => $request->input('tarifa'),
        ]);

        return redirect()->back()->with('success', 'Entrenador actualizado exitosamente.');
    }
}
