<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdquisicionProgramaRequest;
use App\Http\Requests\UpdateAdquisicionProgramaRequest;
use Illuminate\Http\Request;
use App\Models\AdquisicionPrograma;
use Illuminate\Support\Facades\Auth;

class AdquisicionProgramaController extends Controller
{

    public function inscribir(Request $request)
    {
        $usuario_id = Auth::id(); // Obtener el usuario logueado
        $programa_id = $request->input('programa_id'); // Obtener el ID del programa seleccionado

        // Verificar si el usuario ya está inscrito en un programa
        $inscripcionExistente = AdquisicionPrograma::where('usuario_id', $usuario_id)->first();

        if ($inscripcionExistente) {
            // Si el usuario ya está inscrito, retornar error
            return response()->json(['message' => 'Ya tienes una inscripción en uno de nuestros programas'], 400);
        }

        // Crear una nueva inscripción
        AdquisicionPrograma::create([
            'usuario_id' => $usuario_id,
            'programa_id' => $programa_id,
            'fecha_adquisicion' => now(),
        ]);

        return response()->json(['message' => 'Inscrito con éxito'], 200);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreAdquisicionProgramaRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(AdquisicionPrograma $adquisicionPrograma)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AdquisicionPrograma $adquisicionPrograma)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdquisicionProgramaRequest $request, AdquisicionPrograma $adquisicionPrograma)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AdquisicionPrograma $adquisicionPrograma)
    {
        //
    }
}
