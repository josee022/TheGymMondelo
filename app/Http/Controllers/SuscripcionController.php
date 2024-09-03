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
        return inertia('Suscripciones/Index');
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
        // Validar los datos recibidos
        $validatedData = $request->validate([
            'tipo' => 'required|string|in:Mensual,Semestral,Anual',
        ]);

        $user = auth()->user();

        // Verificar si el usuario ya tiene una suscripción activa
        $suscripcionActiva = Suscripcion::where('usuario_id', $user->id)
            ->where('estado', 'Activa')
            ->where('fecha_fin', '>=', Carbon::now())
            ->first();

        if ($suscripcionActiva) {
            // Redirigir con un mensaje flash de error
            return redirect()->back()->with('error', 'Ya tienes una suscripción activa.');
        }

        // Determinar las fechas de inicio y fin
        $fechaInicio = Carbon::now();
        $fechaFin = match ($request->tipo) {
            'Mensual' => $fechaInicio->copy()->addDays(30),
            'Semestral' => $fechaInicio->copy()->addDays(182),
            'Anual' => $fechaInicio->copy()->addDays(365),
        };

        // Crear la suscripción en la base de datos
        Suscripcion::create([
            'usuario_id' => $user->id,
            'tipo' => $request->tipo,
            'fecha_inicio' => $fechaInicio,
            'fecha_fin' => $fechaFin,
            'estado' => 'Activa',
        ]);

        // Redirigir con un mensaje flash de éxito
        return redirect()->back()->with('success', '¡Suscripción creada con éxito!');
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
