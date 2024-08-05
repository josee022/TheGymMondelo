<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEntrenadorRequest;
use App\Http\Requests\UpdateEntrenadorRequest;
use App\Models\Entrenador;
use Inertia\Inertia;


class EntrenadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $entrenadores = Entrenador::with('usuario')->get();
        return Inertia::render('Entrenadores/Index', [
            'entrenadores' => $entrenadores,
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
    public function store(StoreEntrenadorRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Entrenador $entrenador)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Entrenador $entrenador)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEntrenadorRequest $request, Entrenador $entrenador)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entrenador $entrenador)
    {
        //
    }
}
