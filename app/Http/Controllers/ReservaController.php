<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservaRequest;
use App\Http\Requests\UpdateReservaRequest;
use App\Models\Reserva;

class ReservaController extends Controller
{

    public function confirm(Reserva $reserva)
    {
        $this->authorize('update', $reserva);

        $reserva->update(['estado' => 'Confirmada']);

        return redirect()->route('profile')->with('success', 'Reserva confirmada.');
    }

    public function cancel(Reserva $reserva)
    {
        $this->authorize('update', $reserva);

        $reserva->update(['estado' => 'Cancelada']);

        return redirect()->route('profile')->with('success', 'Reserva cancelada.');
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
    public function store(StoreReservaRequest $request)
    {
        //
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
    public function update(UpdateReservaRequest $request, Reserva $reserva)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reserva $reserva)
    {
        //
    }
}
