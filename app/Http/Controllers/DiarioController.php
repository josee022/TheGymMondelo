<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Diario;

class DiarioController extends Controller
{
    public function index()
    {
        return inertia('Diario/Index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'fecha' => 'required|date',
            'ejercicio' => 'required|string|max:255',
            'series' => 'required|integer|min:1',
            'repeticiones' => 'required|integer|min:1',
            'peso' => 'nullable|numeric',
            'notas' => 'nullable|string',
        ]);

        Diario::create([
            'usuario_id' => auth()->id(),
            'fecha' => $request->fecha,
            'ejercicio' => $request->ejercicio,
            'series' => $request->series,
            'repeticiones' => $request->repeticiones,
            'peso' => $request->peso,
            'notas' => $request->notas,
        ]);

        return redirect()->route('diario.index')->with('success', 'Ejercicio registrado exitosamente.');
    }

    public function historial()
    {
        $ejercicios = Diario::where('usuario_id', auth()->id())
            ->orderBy('fecha', 'desc')
            ->get();

        return inertia('Diario/Historial', [
            'ejercicios' => $ejercicios
        ]);
    }

    public function update(Request $request, Diario $diario)
    {
        $request->validate([
            'fecha' => 'required|date',
            'ejercicio' => 'required|string|max:255',
            'series' => 'required|integer|min:1',
            'repeticiones' => 'required|integer|min:1',
            'peso' => 'nullable|numeric',
            'notas' => 'nullable|string',
        ]);

        $diario->update($request->all());

        return redirect()->route('diario.historial')->with('success', 'Ejercicio actualizado exitosamente.');
    }

    public function destroy(Diario $diario)
    {
        $diario->delete();

        return redirect()->route('diario.historial')->with('success', 'Ejercicio eliminado exitosamente.');
    }
}
