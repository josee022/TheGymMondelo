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

        // Redirigir con un mensaje de éxito
        return redirect()->back()->with('success', '¡Suscripción creada con éxito!');
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
