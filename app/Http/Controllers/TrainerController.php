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
        // Obtener todos los entrenadores junto con sus usuarios relacionados
        $entrenadores = Entrenador::with('usuario')->get();

        // Obtener todos los usuarios que no tienen asignado un entrenador
        $usuarios = User::whereDoesntHave('entrenador')->get();

        // Renderiza la vista 'Admin/MisterGestion', pasando los entrenadores y usuarios a la vista
        return Inertia::render('Admin/MisterGestion', [
            'entrenadores' => $entrenadores, // Pasamos los entrenadores a la vista
            'usuarios' => $usuarios, // Pasamos los usuarios no entrenadores a la vista
        ]);
    }

    // Método para convertir un usuario en entrenador
    public function convertirEnEntrenador(Request $request, $id)
    {
        // Buscar al usuario por su ID
        $user = User::findOrFail($id);

        // Si el usuario aún no es un entrenador, lo convertimos
        if (!$user->entrenador) {
            // Crear un nuevo registro de entrenador para este usuario
            Entrenador::create([
                'usuario_id' => $user->id, // Asociamos el entrenador con el usuario
                'especialidad' => $request->input('especialidad', 'General'), // Especialidad del entrenador, con valor predeterminado 'General'
                'tarifa' => $request->input('tarifa', 20.00), // Tarifa del entrenador, con valor predeterminado de 20.00
            ]);
        }

        // Redirige de vuelta con un mensaje de éxito
        return redirect()->back()->with('success', 'Usuario convertido a entrenador exitosamente.');
    }

    // Método para deshabilitar (eliminar) un entrenador
    public function deshabilitarEntrenador($id)
    {
        // Buscar al entrenador por el ID del usuario
        $entrenador = Entrenador::where('usuario_id', $id)->first();

        // Si el entrenador existe, lo eliminamos
        if ($entrenador) {
            $entrenador->delete();
        }

        // Redirige de vuelta con un mensaje de éxito
        return redirect()->back()->with('success', 'Entrenador deshabilitado exitosamente.');
    }

    // Método para editar los datos de un entrenador
    public function editarEntrenador(Request $request, $id)
    {
        // Buscar al entrenador por su ID
        $entrenador = Entrenador::findOrFail($id);

        // Actualizar los datos del entrenador con los valores del formulario
        $entrenador->update([
            'especialidad' => $request->input('especialidad'), // Actualiza la especialidad
            'tarifa' => $request->input('tarifa'), // Actualiza la tarifa
        ]);

        // Redirige de vuelta con un mensaje de éxito
        return redirect()->back()->with('success', 'Entrenador actualizado exitosamente.');
    }
}
