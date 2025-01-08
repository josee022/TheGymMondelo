<?php

namespace App\Http\Controllers;

use App\Models\Programa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramasAdminController extends Controller
{
    public function index()
    {
        // Obtiene todos los programas de la base de datos
        $programas = Programa::all();

        // Retorna la vista Inertia 'Admin/ProgramasGestion' con los programas
        return Inertia::render('Admin/ProgramasGestion', [
            'programas' => $programas,
        ]);
    }

    public function store(Request $request)
    {
        // Valida los datos recibidos en la solicitud
        $request->validate([
            'nombre' => 'required|string|max:255',   // El nombre es obligatorio y no puede exceder 255 caracteres
            'descripcion' => 'nullable|string',      // La descripción es opcional
            'duracion' => 'required|integer|min:1',  // La duración es obligatoria y debe ser mayor o igual a 1
            'nivel' => 'required|in:Principiante,Intermedio,Avanzado', // El nivel debe ser uno de los tres valores posibles
            'precio' => 'required|numeric|min:0',    // El precio es obligatorio y debe ser un número mayor o igual a 0
        ]);

        // Crea un nuevo programa con los datos validados
        $programa = Programa::create($request->all());

        // Redirige de vuelta con un mensaje de éxito y el nuevo programa
        return redirect()->back()->with([
            'success' => 'Programa creado exitosamente.',  // Mensaje de éxito
            'newPrograma' => $programa,  // Pasa el nuevo programa creado
        ]);
    }

    public function update(Request $request, $id)
    {
        // Encuentra el programa por ID o lanza una excepción si no lo encuentra
        $programa = Programa::findOrFail($id);

        // Valida los datos recibidos en la solicitud
        $request->validate([
            'nombre' => 'required|string|max:255',  // El nombre es obligatorio y no puede exceder 255 caracteres
            'descripcion' => 'nullable|string',     // La descripción es opcional
            'duracion' => 'required|integer|min:1', // La duración es obligatoria y debe ser mayor o igual a 1
            'nivel' => 'required|in:Principiante,Intermedio,Avanzado',  // El nivel debe ser uno de los tres valores posibles
            'precio' => 'required|numeric|min:0',   // El precio es obligatorio y debe ser un número mayor o igual a 0
        ]);

        // Actualiza el programa con los datos recibidos
        $programa->update($request->all());

        // Redirige de vuelta con un mensaje de éxito y el programa actualizado
        return redirect()->back()->with('updatedPrograma', $programa);  // Devuelve el programa actualizado
    }

    public function destroy($id)
    {
        // Encuentra el programa por ID o lanza una excepción si no lo encuentra
        $programa = Programa::findOrFail($id);

        // Elimina el programa de la base de datos
        $programa->delete();

        // Redirige de vuelta con el ID del programa eliminado
        return redirect()->back()->with('deletedProgramaId', $id); // Pasa el ID del programa eliminado
    }
}
