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
        // Obtiene las clases futuras, ordenadas por fecha
        $clases = Clase::where('fecha', '>', now()->toDateString())
            ->orderBy('fecha')
            ->get();

        // Renderiza la vista 'Clases/Index' con las clases futuras y el usuario autenticado
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
        // Obtiene la clase especificada por ID, incluyendo reservas confirmadas y la información del entrenador
        $clase = Clase::with(['entrenador.usuario', 'reservas' => function ($query) {
            $query->where('estado', 'Confirmada');
        }])->findOrFail($id);

        // Calcula las plazas disponibles restando las reservas confirmadas de la capacidad total
        $plazasDisponibles = $clase->capacidad - $clase->reservas->count();

        return Inertia::render('Clases/Show', [
            'clase' => $clase,
            'entrenador' => $clase->entrenador,
            'plazasDisponibles' => $plazasDisponibles,
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
        // Obtiene el usuario autenticado
        $user = Auth::user();

        // Verifica si ya existe una reserva para esta clase por parte del usuario
        if (Reserva::where('usuario_id', $user->id)
            ->where('clase_id', $clase->id)
            ->exists()
        ) {
            // Redirige de vuelta con un mensaje de error si ya se ha reservado la clase
            return redirect()->back()->with('error', 'Ya has reservado esta clase.');
        }

        // Crea una nueva reserva para el usuario y la clase especificada
        Reserva::create([
            'usuario_id' => $user->id,
            'clase_id' => $clase->id,
        ]);

        // Redirige al perfil del usuario con un mensaje de éxito
        return redirect()->route('profile')->with('success', 'Clase reservada con éxito.');
    }
}
