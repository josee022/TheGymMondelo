<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEntrenadorRequest;
use App\Http\Requests\UpdateEntrenadorRequest;
use App\Models\Entrenador;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;



class EntrenadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtiene todos los entrenadores junto con la relación 'usuario'
        $entrenadores = Entrenador::with('usuario')->get();
        // Renderiza la vista 'Entrenadores/Index' y pasa los datos de los entrenadores
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

    }

    public function update(Request $request, Entrenador $entrenador)
    {

    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entrenador $entrenador)
    {
        //
    }
}
