<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservaRequest;
use App\Http\Requests\UpdateReservaRequest;
use App\Models\Reserva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class ReservaController extends Controller
{

    public function confirm(Reserva $reserva)
    {
        $this->authorize('update', $reserva);

        $reserva->update(['estado' => 'Confirmada']);

        return redirect()->route('dashboard')->with('success', 'Reserva confirmada.');
    }

    public function cancel(Reserva $reserva)
    {
        $this->authorize('update', $reserva);

        $reserva->update(['estado' => 'Cancelada']);

        return redirect()->route('dashboard')->with('success', 'Reserva cancelada.');
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
    public function store(Request $request)
    {
        $request->validate([
            'clase_id' => 'required|exists:clases,id',
        ]);

        Reserva::create([
            'usuario_id' => Auth::id(),
            'clase_id' => $request->input('clase_id'),
            'fecha_reserva' => now(),
            'estado' => 'Pendiente',
        ]);

        return Redirect::route('dashboard')->with('success', 'Reserva realizada con éxito.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Reserva $reserva)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reserva $reserva)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reserva $reserva)
    {
        $request->validate([
            'estado' => 'required|in:Confirmada,Cancelada',
        ]);

        $reserva->update([
            'estado' => $request->input('estado'),
        ]);

        return Redirect::route('dashboard')->with('success', 'Reserva actualizada con éxito.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reserva $reserva)
    {
        //
    }
}
