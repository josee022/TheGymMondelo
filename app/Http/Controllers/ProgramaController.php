<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProgramaRequest;
use App\Http\Requests\UpdateProgramaRequest;
use App\Models\Programa;
use Inertia\Inertia;
use App\Models\AdquisicionPrograma;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProgramaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $programas = Programa::when($search, function ($query, $search) {
            $query->whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($search) . '%']);
        })
            ->orderBy('nombre', 'asc')
            ->paginate(9)
            ->appends(['search' => $search]);

        // Verificar si el usuario tiene un programa adquirido
        $usuarioTienePrograma = AdquisicionPrograma::where('usuario_id', Auth::id())->exists();

        return Inertia::render('Programas/Index', [
            'programas' => $programas,
            'search' => $search,
            'usuarioTienePrograma' => $usuarioTienePrograma, // Pasamos la variable a la vista
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
    public function store(StoreProgramaRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Programa $programa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Programa $programa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProgramaRequest $request, Programa $programa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Programa $programa)
    {
        //
    }
}
