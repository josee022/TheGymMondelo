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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Verificar si el usuario tiene una suscripción activa
        $usuarioTieneSuscripcion = Suscripcion::where('usuario_id', Auth::id())
            ->where('estado', 'Activa')
            ->exists();

        return inertia('Suscripciones/Index', [
            'usuarioTieneSuscripcion' => $usuarioTieneSuscripcion,
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tipo' => 'required|string|in:Mensual,Semestral,Anual',
        ]);

        $user = Auth::user();

        // Verificar si el usuario ya tiene una suscripción activa
        $suscripcionActiva = Suscripcion::where('usuario_id', $user->id)
            ->where('estado', 'Activa')
            ->first();

        if ($suscripcionActiva) {
            return redirect()->back()->with('error', 'Ya tienes una suscripción activa.');
        }

        // Calcular fechas
        $fechaInicio = now();
        $fechaFin = match ($request->tipo) {
            'Mensual' => $fechaInicio->copy()->addMonth(),
            'Semestral' => $fechaInicio->copy()->addMonths(6),
            'Anual' => $fechaInicio->copy()->addYear(),
        };

        // Crear la suscripción en la base de datos
        Suscripcion::create([
            'usuario_id' => $user->id,
            'tipo' => $request->tipo,
            'fecha_inicio' => $fechaInicio,
            'fecha_fin' => $fechaFin,
            'estado' => 'Activa',
        ]);

        return redirect()->route('suscripciones.index')->with('success', '¡Suscripción creada con éxito!');
    }


    public function disable($id)
    {
        // Obtener la suscripción por ID
        $suscripcion = Suscripcion::findOrFail($id);

        // Verificar que la suscripción pertenece al usuario autenticado
        if ($suscripcion->usuario_id !== Auth::id()) {
            return redirect()->back()->withErrors(['No tienes permiso para deshabilitar esta suscripción.']);
        }

        // Cambiar el estado a 'Inactiva'
        $suscripcion->estado = 'Inactiva';
        $suscripcion->save();

        // Redirigir con mensaje de éxito
        return redirect()->back()->with('success', 'Suscripción deshabilitada exitosamente.');
    }



    /**
     * Display the specified resource.
     */
    public function show(Suscripcion $suscripcion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Suscripcion $suscripcion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSuscripcionRequest $request, Suscripcion $suscripcion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Suscripcion $suscripcion)
    {
        //
    }
}
