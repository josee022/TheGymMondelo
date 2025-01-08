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
        // Obtener todas las clases junto con la información del entrenador
        $clases = Clase::with('entrenador.usuario')->get();

        // Obtener todos los entrenadores junto con su usuario
        $entrenadores = Entrenador::with('usuario')->get();

        // Renderizar la vista Inertia y pasarle los datos de las clases y entrenadores
        return Inertia::render('Admin/ClasesGestion', [
            'clases' => $clases,  // Pasamos las clases obtenidas
            'entrenadores' => $entrenadores,  // Pasamos los entrenadores obtenidos
        ]);
    }

    // Método para crear una nueva clase
    public function store(Request $request)
    {
        // Validación de los datos recibidos en la solicitud
        $request->validate([
            'nombre' => 'required|string|max:255',  // El nombre de la clase es obligatorio
            'descripcion' => 'nullable|string',  // La descripción es opcional
            'fecha' => 'required|date',  // La fecha debe ser una fecha válida
            'hora_inicio' => 'required|date_format:H:i',  // La hora de inicio debe tener el formato adecuado
            'hora_fin' => 'required|date_format:H:i|after:hora_inicio',  // La hora de fin debe ser después de la hora de inicio
            'entrenador_id' => 'required|exists:entrenadores,id',  // El entrenador debe existir en la base de datos
            'capacidad' => 'required|integer|min:1',  // La capacidad debe ser un número mayor a 0
        ]);

        // Verificar si ya existe una clase en el mismo rango de hora y para el mismo entrenador
        $existeClase = Clase::where('fecha', $request->fecha)
            ->where('entrenador_id', $request->entrenador_id)
            ->where(function ($query) use ($request) {
                // Verificamos si las horas de la nueva clase se superponen con alguna clase existente
                $query->whereBetween('hora_inicio', [$request->hora_inicio, $request->hora_fin])
                    ->orWhereBetween('hora_fin', [$request->hora_inicio, $request->hora_fin])
                    ->orWhere(function ($query) use ($request) {
                        $query->where('hora_inicio', '<=', $request->hora_inicio)
                            ->where('hora_fin', '>=', $request->hora_fin);
                    });
            })
            ->exists();

        // Si ya existe una clase en ese rango de hora, mostramos un mensaje de error
        if ($existeClase) {
            return redirect()->back()->with('error', 'Ya existe una clase en el mismo rango de hora para este entrenador.');
        }

        // Si la clase no existe, creamos una nueva clase en la base de datos
        $clase = Clase::create($request->all());

        // Redirigir al administrador con un mensaje de éxito
        return redirect()->route('admin.clases')->with([
            'success' => 'Clase creada exitosamente.',
            'newClase' => $clase,  // Pasamos la nueva clase creada
        ]);
    }

    // Método para actualizar una clase existente
    public function update(Request $request, $id)
    {
        // Buscamos la clase por su ID
        $clase = Clase::findOrFail($id);

        // Validación de los datos recibidos en la solicitud
        $request->validate([
            'nombre' => 'required|string|max:255',  // El nombre de la clase es obligatorio
            'descripcion' => 'nullable|string',  // La descripción es opcional
            'fecha' => 'required|date',  // La fecha debe ser válida
            'hora_inicio' => 'required|date_format:H:i',  // La hora de inicio debe tener el formato adecuado
            'hora_fin' => 'required|date_format:H:i|after:hora_inicio',  // La hora de fin debe ser después de la hora de inicio
            'entrenador_id' => 'required|exists:entrenadores,id',  // El entrenador debe existir en la base de datos
            'capacidad' => 'required|integer|min:1',  // La capacidad debe ser un número mayor a 0
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

        // Si ya existe una clase en ese rango de hora, mostramos un mensaje de error
        if ($existeClase) {
            return redirect()->back()->with('error', 'Ya existe una clase en el mismo rango de hora para este entrenador.');
        }

        // Si la clase no existe, actualizamos la clase con los nuevos datos
        $clase->update($request->all());

        // Redirigir al administrador con un mensaje de éxito
        return redirect()->route('admin.clases')->with('success', 'Clase actualizada exitosamente.');
    }

    // Método para eliminar una clase
    public function destroy($id)
    {
        // Buscamos la clase por su ID
        $clase = Clase::findOrFail($id);

        // Eliminamos la clase de la base de datos
        $clase->delete();

        // Redirigir al administrador con un mensaje de éxito
        return redirect()->route('admin.clases')->with('success', 'Clase eliminada correctamente.');
    }
}
