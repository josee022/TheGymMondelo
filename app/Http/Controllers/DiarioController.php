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
        // Obtiene una lista única de ejercicios del usuario autenticado
        $ejerciciosPrevios = Diario::where('usuario_id', auth()->id())
            ->select('ejercicio') // Selecciona solo el campo 'ejercicio'
            ->distinct() // Asegura que los ejercicios sean únicos
            ->pluck('ejercicio'); // Obtiene los valores de los ejercicios

        // Retorna la vista con los ejercicios previos
        return inertia('Diario/Index', [
            'ejerciciosPrevios' => $ejerciciosPrevios, // Pasa los ejercicios únicos a la vista
        ]);
    }

    public function store(Request $request)
    {
        // Valida los datos del formulario de registro de ejercicio
        $request->validate([
            'fecha' => 'required|date', // La fecha es obligatoria y debe ser una fecha válida
            'ejercicio' => 'required|string|max:255', // El nombre del ejercicio es obligatorio y debe ser una cadena de texto
            'series' => 'required|integer|min:1', // Las series son obligatorias y deben ser un número entero mayor o igual a 1
            'repeticiones' => 'required|integer|min:1', // Las repeticiones son obligatorias y deben ser un número entero mayor o igual a 1
            'peso' => 'nullable|numeric', // El peso es opcional y debe ser un número
            'notas' => 'nullable|string', // Las notas son opcionales y deben ser una cadena de texto
        ]);

        // Crea un nuevo registro en la tabla 'diarios' con los datos validados
        Diario::create([
            'usuario_id' => auth()->id(), // Asigna el ID del usuario autenticado
            'fecha' => $request->fecha,
            'ejercicio' => $request->ejercicio,
            'series' => $request->series,
            'repeticiones' => $request->repeticiones,
            'peso' => $request->peso,
            'notas' => $request->notas,
        ]);

        // Redirige a la vista del diario con un mensaje de éxito
        return redirect()->route('diario.index')->with('success', 'Ejercicio registrado exitosamente.');
    }

    public function historial()
    {
        // Obtiene todos los ejercicios del usuario autenticado, ordenados por fecha (descendente)
        $ejercicios = Diario::where('usuario_id', auth()->id())
            ->orderBy('fecha', 'desc') // Ordena los ejercicios por la fecha en orden descendente
            ->get(); // Recupera todos los ejercicios

        // Retorna la vista del historial con los ejercicios obtenidos
        return inertia('Diario/Historial', [
            'ejercicios' => $ejercicios // Pasa los ejercicios a la vista
        ]);
    }

    public function update(Request $request, Diario $diario)
    {
        // Valida los datos del formulario de actualización
        $request->validate([
            'fecha' => 'required|date', // La fecha es obligatoria y debe ser una fecha válida
            'ejercicio' => 'required|string|max:255', // El nombre del ejercicio es obligatorio y debe ser una cadena de texto
            'series' => 'required|integer|min:1', // Las series son obligatorias y deben ser un número entero mayor o igual a 1
            'repeticiones' => 'required|integer|min:1', // Las repeticiones son obligatorias y deben ser un número entero mayor o igual a 1
            'peso' => 'nullable|numeric', // El peso es opcional y debe ser un número
            'notas' => 'nullable|string', // Las notas son opcionales y deben ser una cadena de texto
        ]);

        // Actualiza el ejercicio con los nuevos datos proporcionados
        $diario->update($request->all());

        // Redirige al historial de ejercicios con un mensaje de éxito
        return redirect()->route('diario.historial')->with('success', 'Ejercicio actualizado exitosamente.');
    }

    public function destroy(Diario $diario)
    {
        // Elimina el ejercicio de la base de datos
        $diario->delete();

        // Redirige al historial de ejercicios con un mensaje de éxito
        return redirect()->route('diario.historial')->with('success', 'Ejercicio eliminado exitosamente.');
    }

    public function exportarPDF(Request $request, PDF $pdf)
    {
        // Obtiene las fechas de inicio y fin desde los parámetros de la solicitud
        $fechaInicio = $request->query('fecha_inicio');
        $fechaFin = $request->query('fecha_fin');

        // Si no se selecciona un rango de fechas, se usa la fecha actual
        if (!$fechaInicio && !$fechaFin) {
            $fechaInicio = $fechaFin = now()->format('Y-m-d');
        }

        // Si se selecciona "Exportar todo", se ignoran las fechas
        if ($request->query('exportar_todo')) {
            // Obtiene todos los ejercicios sin importar la fecha y los agrupa por fecha
            $ejercicios = Diario::where('usuario_id', auth()->id())
                ->orderBy('fecha', 'asc')
                ->get()
                ->groupBy('fecha');
        } else {
            // Obtiene los ejercicios dentro del rango de fechas y los agrupa por fecha
            $ejercicios = Diario::where('usuario_id', auth()->id())
                ->whereBetween('fecha', [$fechaInicio, $fechaFin])
                ->orderBy('fecha', 'asc')
                ->get()
                ->groupBy('fecha');
        }

        // Carga la vista PDF y pasa los datos (ejercicios y fechas) para generar el documento
        $pdf = $pdf->loadView('exports.diario', compact('ejercicios', 'fechaInicio', 'fechaFin'));

        // Descarga el archivo PDF generado
        return $pdf->download('Diario_Ejercicio.pdf');
    }

    public function exportarCSV(Request $request)
    {
        // Obtiene las fechas de inicio y fin desde los parámetros de la solicitud
        $fechaInicio = $request->query('fecha_inicio');
        $fechaFin = $request->query('fecha_fin');

        // Si no se selecciona un rango de fechas, se usa la fecha actual
        if (!$fechaInicio && !$fechaFin) {
            $fechaInicio = $fechaFin = now()->format('Y-m-d');
        }

        // Si se selecciona "Exportar todo", se ignoran las fechas
        if ($request->query('exportar_todo')) {
            // Obtiene todos los ejercicios sin importar la fecha y los agrupa por fecha
            $ejercicios = Diario::where('usuario_id', auth()->id())
                ->orderBy('fecha', 'asc')
                ->get()
                ->groupBy('fecha');
        } else {
            // Obtiene los ejercicios dentro del rango de fechas y los agrupa por fecha
            $ejercicios = Diario::where('usuario_id', auth()->id())
                ->whereBetween('fecha', [$fechaInicio, $fechaFin])
                ->orderBy('fecha', 'asc')
                ->get()
                ->groupBy('fecha');
        }

        // Crea un archivo CSV temporal en memoria
        $csv = Writer::createFromFileObject(new SplTempFileObject());

        // Inserta el encabezado del CSV
        $csv->insertOne(['Fecha', 'Ejercicio', 'Series', 'Repeticiones', 'Peso', 'Notas']);

        // Itera sobre los ejercicios y los agrega al CSV
        foreach ($ejercicios as $fecha => $diaEjercicios) {
            // Agrega una fila con la fecha
            $csv->insertOne(["Fecha: $fecha", '', '', '', '', '']);
            foreach ($diaEjercicios as $ejercicio) {
                // Agrega los detalles del ejercicio para cada fecha
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

        // Prepara la respuesta para descargar el archivo CSV
        return Response::make($csv->toString(), 200, [
            'Content-Type' => 'text/csv', // Establece el tipo de contenido como CSV
            'Content-Disposition' => 'attachment; filename="Diario_Ejercicio.csv"', // Define el nombre del archivo para la descarga
        ]);
    }

    public function obtenerMensajeMotivacional()
    {
        // Obtiene el ID del usuario autenticado
        $usuarioId = auth()->id();

        // Obtiene los ejercicios recientes del usuario (últimos 7 días)
        $ejerciciosRecientes = Diario::where('usuario_id', $usuarioId)
            ->where('fecha', '>=', now()->subDays(7))  // Filtra ejercicios de los últimos 7 días
            ->get();

        // Inicializa la variable del mensaje
        $mensaje = null;

        // Cuenta cuántas sesiones ha realizado el usuario esta semana
        $sesionesSemana = $ejerciciosRecientes->count();

        // Lógica para determinar el mensaje motivacional basado en la cantidad de sesiones
        if ($sesionesSemana >= 4) {
            // Mensajes para usuarios con alta frecuencia de ejercicio (4 o más sesiones)
            $mensajesAltaFrecuencia = [
                "¡Estás en racha! Sigue así 💪 Cada sesión te hace más fuerte.",
                "Constancia y dedicación 💯 ¡Increíble trabajo esta semana!",
                "¡Entrenador nivel PRO! 🏆 Has entrenado con disciplina y se nota. ¡Sigue empujando!"
            ];
            $mensaje = $mensajesAltaFrecuencia[array_rand($mensajesAltaFrecuencia)];
        } elseif ($sesionesSemana >= 2) {
            // Mensajes para usuarios con frecuencia media de ejercicio (2 o 3 sesiones)
            $mensajesFrecuenciaMedia = [
                "¡Buen ritmo! Solo un poco más y superarás tus propios límites 🚀.",
                "¡Qué constancia! Tus músculos lo agradecen 🔥.",
                "¡Gran semana! Cada repetición cuenta en el camino hacia tus metas."
            ];
            $mensaje = $mensajesFrecuenciaMedia[array_rand($mensajesFrecuenciaMedia)];
        } elseif ($sesionesSemana === 1) {
            // Mensajes para usuarios con baja frecuencia de ejercicio (1 sesión)
            $mensajesBajaFrecuencia = [
                "¡Un comienzo es mejor que nada! 🔥 Haz de hoy tu mejor día.",
                "Recuerda: Cada esfuerzo cuenta, cada paso cuenta 🚶‍♂️🏃‍♂️.",
                "A veces lo importante es empezar. ¡Vamos por una nueva sesión!"
            ];
            $mensaje = $mensajesBajaFrecuencia[array_rand($mensajesBajaFrecuencia)];
        } elseif ($ejerciciosRecientes->isEmpty()) {
            // Mensajes para usuarios sin actividad reciente
            $mensajesSinEjercicio = [
                "Un descanso está bien, pero hoy es un buen día para volver 💥 ¡No te rindas!",
                "¡El cuerpo pide movimiento! 🏋️ Una sesión más y sentirás el cambio.",
                "Es hora de volver a la carga 🚀 ¡Un día a la vez para llegar lejos!"
            ];
            $mensaje = $mensajesSinEjercicio[array_rand($mensajesSinEjercicio)];
        } else {
            // Si el usuario tiene ejercicios recientes, pero menos de 1 sesión esta semana
            $ultimoEjercicio = Diario::where('usuario_id', $usuarioId)
                ->orderBy('fecha', 'desc')  // Obtiene el último ejercicio registrado
                ->first();

            // Mensajes motivacionales relacionados con la última sesión
            $mensajesUltimaSesion = [
                "¡Vaya última sesión! 🏋️ Hoy puedes mantener ese ritmo o superarlo.",
                "Ayer diste todo, hoy puedes dar un poco más. ¡Nada te detiene!",
                "Recuerda tu última sesión y piensa en cómo podrías mejorar. ¡A por ello!"
            ];
            $mensaje = $mensajesUltimaSesion[array_rand($mensajesUltimaSesion)];
        }

        // Devuelve el mensaje motivacional en formato JSON
        return response()->json(['mensaje' => $mensaje]);
    }
}
