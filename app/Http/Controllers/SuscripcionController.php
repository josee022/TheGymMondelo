<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSuscripcionRequest;
use App\Http\Requests\UpdateSuscripcionRequest;
use App\Models\Suscripcion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SuscripcionController extends Controller
{
    // Método para mostrar las suscripciones activas del usuario
    public function index()
    {
        // Verificar si el usuario tiene una suscripción activa
        $usuarioTieneSuscripcion = Suscripcion::where('usuario_id', Auth::id())
            ->where('estado', 'Activa') // Verifica si la suscripción está activa
            ->exists(); // Devuelve true si existe una suscripción activa

        // Renderiza la vista 'Suscripciones/Index' pasando si el usuario tiene una suscripción activa
        return inertia('Suscripciones/Index', [
            'usuarioTieneSuscripcion' => $usuarioTieneSuscripcion,
        ]);
    }

    // Método para crear una nueva suscripción
    public function store(Request $request)
    {
        // Validación de los datos recibidos, asegurando que 'tipo' sea uno de los valores permitidos
        $request->validate([
            'tipo' => 'required|string|in:Mensual,Semestral,Anual', // Se valida el tipo de suscripción
        ]);

        $user = Auth::user(); // Obtiene el usuario autenticado

        // Verificar si el usuario ya tiene una suscripción activa
        $suscripcionActiva = Suscripcion::where('usuario_id', $user->id)
            ->where('estado', 'Activa') // Verifica que la suscripción esté activa
            ->first(); // Obtiene la primera suscripción activa

        // Si ya tiene una suscripción activa, redirige con un mensaje de error
        if ($suscripcionActiva) {
            return redirect()->back()->with('error', 'Ya tienes una suscripción activa.');
        }

        // Calcular las fechas de inicio y fin de la suscripción, según el tipo
        $fechaInicio = now(); // Fecha de inicio es la fecha actual
        $fechaFin = match ($request->tipo) {
            'Mensual' => $fechaInicio->copy()->addMonth(), // Si es mensual, agrega un mes
            'Semestral' => $fechaInicio->copy()->addMonths(6), // Si es semestral, agrega 6 meses
            'Anual' => $fechaInicio->copy()->addYear(), // Si es anual, agrega un año
        };

        // Crear la suscripción en la base de datos
        Suscripcion::create([
            'usuario_id' => $user->id, // Relacionamos la suscripción con el usuario
            'tipo' => $request->tipo, // Asignamos el tipo de suscripción
            'fecha_inicio' => $fechaInicio, // Asignamos la fecha de inicio
            'fecha_fin' => $fechaFin, // Asignamos la fecha de fin
            'estado' => 'Activa', // Marcamos la suscripción como activa
        ]);

        // Redirige a la vista de suscripciones con un mensaje de éxito
        return redirect()->route('suscripciones.index')->with('success', '¡Suscripción creada con éxito!');
    }

    // Método para deshabilitar una suscripción
    public function disable($id)
    {
        // Obtener la suscripción por ID
        $suscripcion = Suscripcion::findOrFail($id); // Busca la suscripción en la base de datos

        // Verificar que la suscripción pertenece al usuario autenticado
        if ($suscripcion->usuario_id !== Auth::id()) { // Verifica que la suscripción pertenece al usuario actual
            return redirect()->back()->withErrors(['No tienes permiso para deshabilitar esta suscripción.']); // Si no es así, muestra un mensaje de error
        }

        // Cambiar el estado de la suscripción a 'Inactiva'
        $suscripcion->estado = 'Inactiva'; // Desactiva la suscripción
        $suscripcion->save(); // Guarda los cambios en la base de datos

        // Redirigir con mensaje de éxito
        return redirect()->back()->with('success', 'Suscripción deshabilitada exitosamente.');
    }
}
