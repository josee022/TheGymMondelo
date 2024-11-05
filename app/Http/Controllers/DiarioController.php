<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Diario;
use Barryvdh\DomPDF\PDF;
use Illuminate\Support\Facades\Response;
use League\Csv\Writer;
use SplTempFileObject;

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

    public function exportarPDF(Request $request, PDF $pdf)
    {
        // Obtén el valor de la fecha desde el parámetro de consulta
        $fechaFiltro = $request->query('fecha');

        // Si hay un filtro de fecha, aplica la condición de fecha
        $ejercicios = Diario::where('usuario_id', auth()->id())
            ->when($fechaFiltro, function ($query, $fechaFiltro) {
                $query->where('fecha', $fechaFiltro);
            })
            ->get();

        // Pasa $fechaFiltro a la vista
        $pdf = $pdf->loadView('exports.diario', compact('ejercicios', 'fechaFiltro'));
        return $pdf->download('Diario_Ejercicio.pdf');
    }


    public function exportarCSV(Request $request)
    {
        $fechaFiltro = $request->query('fecha');

        $ejercicios = Diario::where('usuario_id', auth()->id())
            ->when($fechaFiltro, function ($query, $fechaFiltro) {
                return $query->where('fecha', $fechaFiltro);
            })
            ->get();

        $csv = Writer::createFromFileObject(new SplTempFileObject());
        $csv->insertOne(['Fecha', 'Ejercicio', 'Series', 'Repeticiones', 'Peso', 'Notas']);

        foreach ($ejercicios as $ejercicio) {
            $csv->insertOne([
                $ejercicio->fecha,
                $ejercicio->ejercicio,
                $ejercicio->series,
                $ejercicio->repeticiones,
                $ejercicio->peso ?? '-',
                $ejercicio->notas ?? '-',
            ]);
        }

        return Response::make($csv->toString(), 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="Diario_Ejercicio.csv"',
        ]);
    }
}
