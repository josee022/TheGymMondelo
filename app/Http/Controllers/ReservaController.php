<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservaRequest;
use App\Http\Requests\UpdateReservaRequest;
use App\Models\Clase;
use App\Models\Reserva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class ReservaController extends Controller
{
    // Método para confirmar una reserva
    public function confirm(Reserva $reserva)
    {
        // Autoriza la acción de confirmación (se requiere el permiso de "update" sobre la reserva)
        $this->authorize('update', $reserva);

        // Cambia el estado de la reserva a 'Confirmada'
        $reserva->update(['estado' => 'Confirmada']);

        // Redirige al dashboard con un mensaje de éxito
        return redirect()->route('dashboard')->with('success', 'Reserva confirmada.');
    }

    // Método para cancelar una reserva
    public function cancel(Reserva $reserva)
    {
        // Autoriza la acción de cancelación (se requiere el permiso de "update" sobre la reserva)
        $this->authorize('update', $reserva);

        // Cambia el estado de la reserva a 'Cancelada'
        $reserva->update(['estado' => 'Cancelada']);

        // Redirige al dashboard con un mensaje de éxito
        return redirect()->route('dashboard')->with('success', 'Reserva cancelada.');
    }

    // Método para crear una nueva reserva
    public function store(Request $request)
    {
        // Valida que el 'clase_id' sea obligatorio y exista en la tabla 'clases'
        $request->validate([
            'clase_id' => 'required|exists:clases,id',
        ]);

        // Obtiene la clase solicitada, incluyendo el conteo de reservas confirmadas
        $clase = Clase::withCount(['reservas' => function ($query) {
            $query->where('estado', 'Confirmada');
        }])->findOrFail($request->input('clase_id'));

        // Verifica si hay plazas disponibles (capacidad de la clase - reservas confirmadas)
        if ($clase->capacidad - $clase->reservas_count <= 0) {
            // Si no hay plazas disponibles, redirige con un mensaje de error
            return back()->with('error', 'No hay plazas disponibles para esta clase.');
        }

        // Crea la nueva reserva con el estado 'Pendiente' y el usuario autenticado
        Reserva::create([
            'usuario_id' => Auth::id(),
            'clase_id' => $request->input('clase_id'),
            'fecha_reserva' => now(),
            'estado' => 'Pendiente',
        ]);

        // Redirige al dashboard con un mensaje de éxito
        return Redirect::route('dashboard')->with('success', 'Reserva realizada con éxito.');
    }

    // Método para actualizar el estado de una reserva
    public function update(Request $request, Reserva $reserva)
    {
        // Valida que el estado sea uno de los valores permitidos: 'Confirmada' o 'Cancelada'
        $request->validate([
            'estado' => 'required|in:Confirmada,Cancelada',
        ]);

        // Actualiza el estado de la reserva con el valor proporcionado en la solicitud
        $reserva->update([
            'estado' => $request->input('estado'),
        ]);

        // Redirige al dashboard con un mensaje de éxito
        return Redirect::route('dashboard')->with('success', 'Reserva actualizada con éxito.');
    }
}
