<?php

namespace App\Http\Controllers;

use App\Models\Programa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramasAdminController extends Controller
{
    public function index()
    {
        $programas = Programa::all();

        return Inertia::render('Admin/ProgramasGestion', [
            'programas' => $programas,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'duracion' => 'required|integer|min:1',
            'nivel' => 'required|in:Principiante,Intermedio,Avanzado',
            'precio' => 'required|numeric|min:0',
        ]);

        $programa = Programa::create($request->all());

        // Aquí aseguramos que el nuevo programa sea parte de la respuesta para Inertia
        return redirect()->back()->with([
            'success' => 'Programa creado exitosamente.',
            'newPrograma' => $programa,
        ]);
    }



    public function update(Request $request, $id)
    {
        $programa = Programa::findOrFail($id);

        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'duracion' => 'required|integer|min:1',
            'nivel' => 'required|in:Principiante,Intermedio,Avanzado',
            'precio' => 'required|numeric|min:0',
        ]);

        $programa->update($request->all());

        // Devolver el programa actualizado
        return redirect()->back()->with('updatedPrograma', $programa);
    }

    public function destroy($id)
    {
        $programa = Programa::findOrFail($id);
        $programa->delete();

        return redirect()->back()->with('deletedProgramaId', $id);
    }
}
