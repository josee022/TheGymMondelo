<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdquisicionProgramaRequest;
use App\Http\Requests\UpdateAdquisicionProgramaRequest;
use Illuminate\Http\Request;
use App\Models\AdquisicionPrograma;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AdquisicionProgramaController extends Controller
{

    public function inscribir(Request $request)
    {
        $usuario_id = Auth::id(); // Obtener el usuario logueado
        $programa_id = $request->input('programa_id'); // Obtener el ID del programa seleccionado

        // Verificar si el usuario ya está inscrito en un programa
        $inscripcionExistente = AdquisicionPrograma::where('usuario_id', $usuario_id)->first();

        if ($inscripcionExistente) {
            // Si el usuario ya está inscrito, redireccionar con un mensaje de error flash
            return redirect()->back()->with('error', 'Ya tienes una inscripción en uno de nuestros programas');
        }

        // Crear una nueva inscripción
        AdquisicionPrograma::create([
            'usuario_id' => $usuario_id,
            'programa_id' => $programa_id,
            'fecha_adquisicion' => now(),
        ]);

        // Redireccionar con un mensaje de éxito flash
        return redirect()->back()->with('success', 'Inscrito con éxito en el programa');
    }


    public function delete($id)
    {
        // Buscar la adquisición de programa por usuario y programa ID
        $adquisicion = DB::table('adquisiciones_programas')
            ->where('usuario_id', Auth::id())
            ->where('programa_id', $id)
            ->first();

        if (!$adquisicion) {
            return redirect()->back()->withErrors(['No tienes permiso para eliminar esta adquisición de programa.']);
        }

        // Eliminar la adquisición de programa
        DB::table('adquisiciones_programas')
            ->where('id', $adquisicion->id)
            ->delete();

        // Redirigir con mensaje de éxito
        return redirect()->back()->with('success', 'Programa eliminado exitosamente.');
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
