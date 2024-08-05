<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClaseRequest;
use App\Http\Requests\UpdateClaseRequest;
use App\Models\Clase;
use App\Models\Entrenador;
use App\Models\Reserva;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ClaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtener las clases futuras
        $clases = Clase::where('fecha', '>', now()->toDateString())
            ->orderBy('fecha')
            ->get();

        return Inertia::render('Clases/Index', [
            'clases' => $clases,
            'user' => auth()->user(),
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
    public function store(StoreClaseRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $clase = Clase::with('entrenador.usuario')->findOrFail($id);
        return Inertia::render('Clases/Show', [
            'clase' => $clase,
            'entrenador' => $clase->entrenador,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Clase $clase)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClaseRequest $request, Clase $clase)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Clase $clase)
    {
        //
    }

    public function reserve(Request $request, Clase $clase)
    {
        $user = Auth::user();

        if (Reserva::where('usuario_id', $user->id)
            ->where('clase_id', $clase->id)
            ->exists()) {
            return redirect()->back()->with('error', 'Ya has reservado esta clase.');
        }

        // Crear la reserva
        Reserva::create([
            'usuario_id' => $user->id,
            'clase_id' => $clase->id,
        ]);

        return redirect()->route('profile')->with('success', 'Clase reservada con éxito.');
    }
}
