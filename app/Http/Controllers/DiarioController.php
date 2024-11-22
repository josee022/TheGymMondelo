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
        $ejerciciosPrevios = Diario::where('usuario_id', auth()->id())
            ->select('ejercicio')
            ->distinct()
            ->pluck('ejercicio'); // Obtiene una lista única de ejercicios

        return inertia('Diario/Index', [
            'ejerciciosPrevios' => $ejerciciosPrevios,
        ]);
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
        $fechaInicio = $request->query('fecha_inicio');
        $fechaFin = $request->query('fecha_fin');

        // Si no se selecciona un rango, usar la fecha actual
        if (!$fechaInicio && !$fechaFin) {
            $fechaInicio = $fechaFin = now()->format('Y-m-d');
        }

        // Si se selecciona "Exportar todo", ignorar las fechas
        if ($request->query('exportar_todo')) {
            $ejercicios = Diario::where('usuario_id', auth()->id())
                ->orderBy('fecha', 'asc')
                ->get()
                ->groupBy('fecha');
        } else {
            $ejercicios = Diario::where('usuario_id', auth()->id())
                ->whereBetween('fecha', [$fechaInicio, $fechaFin])
                ->orderBy('fecha', 'asc')
                ->get()
                ->groupBy('fecha'); // Agrupa los ejercicios por fecha
        }

        $pdf = $pdf->loadView('exports.diario', compact('ejercicios', 'fechaInicio', 'fechaFin'));
        return $pdf->download('Diario_Ejercicio.pdf');
    }

    public function exportarCSV(Request $request)
    {
        $fechaInicio = $request->query('fecha_inicio');
        $fechaFin = $request->query('fecha_fin');

        // Si no se selecciona un rango, usar la fecha actual
        if (!$fechaInicio && !$fechaFin) {
            $fechaInicio = $fechaFin = now()->format('Y-m-d');
        }

        // Si se selecciona "Exportar todo", ignorar las fechas
        if ($request->query('exportar_todo')) {
            $ejercicios = Diario::where('usuario_id', auth()->id())
                ->orderBy('fecha', 'asc')
                ->get()
                ->groupBy('fecha');
        } else {
            $ejercicios = Diario::where('usuario_id', auth()->id())
                ->whereBetween('fecha', [$fechaInicio, $fechaFin])
                ->orderBy('fecha', 'asc')
                ->get()
                ->groupBy('fecha'); // Agrupa los ejercicios por fecha
        }

        $csv = Writer::createFromFileObject(new SplTempFileObject());
        $csv->insertOne(['Fecha', 'Ejercicio', 'Series', 'Repeticiones', 'Peso', 'Notas']);

        foreach ($ejercicios as $fecha => $diaEjercicios) {
            // Agrega una fila para la fecha
            $csv->insertOne(["Fecha: $fecha", '', '', '', '', '']);
            foreach ($diaEjercicios as $ejercicio) {
                $csv->insertOne([
                    $ejercicio->fecha,
                    $ejercicio->ejercicio,
                    $ejercicio->series,
                    $ejercicio->repeticiones,
                    $ejercicio->peso ?? '-',
                    $ejercicio->notas ?? '-',
                ]);
            }
        }

        return Response::make($csv->toString(), 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="Diario_Ejercicio.csv"',
        ]);
    }



    public function obtenerMensajeMotivacional()
    {
        $usuarioId = auth()->id();
        $ejerciciosRecientes = Diario::where('usuario_id', $usuarioId)
            ->where('fecha', '>=', now()->subDays(7))
            ->get();

        $mensaje = null;
        $sesionesSemana = $ejerciciosRecientes->count();

        if ($sesionesSemana >= 4) {
            $mensajesAltaFrecuencia = [
                "¡Estás en racha! Sigue así 💪 Cada sesión te hace más fuerte.",
                "Constancia y dedicación 💯 ¡Increíble trabajo esta semana!",
                "¡Entrenador nivel PRO! 🏆 Has entrenado con disciplina y se nota. ¡Sigue empujando!"
            ];
            $mensaje = $mensajesAltaFrecuencia[array_rand($mensajesAltaFrecuencia)];
        } elseif ($sesionesSemana >= 2) {
            $mensajesFrecuenciaMedia = [
                "¡Buen ritmo! Solo un poco más y superarás tus propios límites 🚀.",
                "¡Qué constancia! Tus músculos lo agradecen 🔥.",
                "¡Gran semana! Cada repetición cuenta en el camino hacia tus metas."
            ];
            $mensaje = $mensajesFrecuenciaMedia[array_rand($mensajesFrecuenciaMedia)];
        } elseif ($sesionesSemana === 1) {
            $mensajesBajaFrecuencia = [
                "¡Un comienzo es mejor que nada! 🔥 Haz de hoy tu mejor día.",
                "Recuerda: Cada esfuerzo cuenta, cada paso cuenta 🚶‍♂️🏃‍♂️.",
                "A veces lo importante es empezar. ¡Vamos por una nueva sesión!"
            ];
            $mensaje = $mensajesBajaFrecuencia[array_rand($mensajesBajaFrecuencia)];
        } elseif ($ejerciciosRecientes->isEmpty()) {
            $mensajesSinEjercicio = [
                "Un descanso está bien, pero hoy es un buen día para volver 💥 ¡No te rindas!",
                "¡El cuerpo pide movimiento! 🏋️ Una sesión más y sentirás el cambio.",
                "Es hora de volver a la carga 🚀 ¡Un día a la vez para llegar lejos!"
            ];
            $mensaje = $mensajesSinEjercicio[array_rand($mensajesSinEjercicio)];
        } else {
            $ultimoEjercicio = Diario::where('usuario_id', $usuarioId)
                ->orderBy('fecha', 'desc')
                ->first();
            $mensajesUltimaSesion = [
                "¡Vaya última sesión! 🏋️ Hoy puedes mantener ese ritmo o superarlo.",
                "Ayer diste todo, hoy puedes dar un poco más. ¡Nada te detiene!",
                "Recuerda tu última sesión y piensa en cómo podrías mejorar. ¡A por ello!"
            ];
            $mensaje = $mensajesUltimaSesion[array_rand($mensajesUltimaSesion)];
        }

        return response()->json(['mensaje' => $mensaje]);
    }
}
