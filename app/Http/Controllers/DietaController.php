<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDietaRequest;
use App\Http\Requests\UpdateDietaRequest;
use App\Models\Dieta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DietaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Dietas/Index');
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
        $request->validate([
            'objetivo' => 'required|in:Pérdida de peso,Ganancia muscular,Mantenimiento', // Incluimos 'Mejor rendimiento'
            'descripcion' => 'required|string',
        ]);

        // Crear una nueva instancia de Dieta
        $dieta = new Dieta();
        $dieta->usuario_id = Auth::id(); // El usuario que está logueado
        $dieta->objetivo = $request->objetivo; // El objetivo seleccionado
        $dieta->descripcion = $request->descripcion; // La descripción
        $dieta->save(); // Guardar en la base de datos

        // Redirigir con un mensaje de éxito
        return redirect()->back()->with('success', '¡Dieta seleccionada con éxito!');
    }


    /**
     * Display the specified resource.
     */
    public function show(Dieta $dieta)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dieta $dieta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDietaRequest $request, Dieta $dieta)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dieta $dieta)
    {
        //
    }
}
