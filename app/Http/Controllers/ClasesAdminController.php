<?php

namespace App\Http\Controllers;

use App\Models\Clase;
use App\Models\Entrenador;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClasesAdminController extends Controller
{
    // Método para mostrar todas las clases en la vista
    public function index()
    {
        $clases = Clase::with('entrenador.usuario')->get();
        $entrenadores = Entrenador::with('usuario')->get();

        return Inertia::render('Admin/ClasesGestion', [
            'clases' => $clases,
            'entrenadores' => $entrenadores,
        ]);
    }

    // Método para crear una nueva clase
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'fecha' => 'required|date',
            'hora_inicio' => 'required|date_format:H:i',
            'hora_fin' => 'required|date_format:H:i|after:hora_inicio',
            'entrenador_id' => 'required|exists:entrenadores,id',
            'capacidad' => 'required|integer|min:1',
        ]);

        // Verificar si ya existe una clase en el mismo rango de hora y para el mismo entrenador
        $existeClase = Clase::where('fecha', $request->fecha)
            ->where('entrenador_id', $request->entrenador_id)
            ->where(function ($query) use ($request) {
                $query->whereBetween('hora_inicio', [$request->hora_inicio, $request->hora_fin])
                    ->orWhereBetween('hora_fin', [$request->hora_inicio, $request->hora_fin])
                    ->orWhere(function ($query) use ($request) {
                        $query->where('hora_inicio', '<=', $request->hora_inicio)
                            ->where('hora_fin', '>=', $request->hora_fin);
                    });
            })
            ->exists();

        if ($existeClase) {
            return redirect()->back()->with('error', 'Ya existe una clase en el mismo rango de hora para este entrenador.');
        }



        $clase = Clase::create($request->all());

        return redirect()->route('admin.clases')->with([
            'success' => 'Clase creada exitosamente.',
            'newClase' => $clase,
        ]);
    }

    public function update(Request $request, $id)
    {
        $clase = Clase::findOrFail($id);

        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'fecha' => 'required|date',
            'hora_inicio' => 'required|date_format:H:i',
            'hora_fin' => 'required|date_format:H:i|after:hora_inicio',
            'entrenador_id' => 'required|exists:entrenadores,id',
            'capacidad' => 'required|integer|min:1',
        ]);

        // Verificar si ya existe otra clase en el mismo rango de hora y para el mismo entrenador
        $existeClase = Clase::where('fecha', $request->fecha)
            ->where('entrenador_id', $request->entrenador_id)
            ->where('id', '!=', $id) // Excluye la clase actual
            ->where(function ($query) use ($request) {
                $query->whereBetween('hora_inicio', [$request->hora_inicio, $request->hora_fin])
                    ->orWhereBetween('hora_fin', [$request->hora_inicio, $request->hora_fin])
                    ->orWhere(function ($query) use ($request) {
                        $query->where('hora_inicio', '<=', $request->hora_inicio)
                            ->where('hora_fin', '>=', $request->hora_fin);
                    });
            })
            ->exists();

        if ($existeClase) {
            return redirect()->back()->with('error', 'Ya existe una clase en el mismo rango de hora para este entrenador.');
        }



        $clase->update($request->all());

        return redirect()->route('admin.clases')->with('success', 'Clase actualizada exitosamente.');
    }



    // Método para eliminar una clase
    public function destroy($id)
    {
        $clase = Clase::findOrFail($id);
        $clase->delete();

        return redirect()->route('admin.clases')->with('success', 'Clase eliminada correctamente.');
    }
}
