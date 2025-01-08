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
    // Este método muestra todas las clases futuras, con opción de búsqueda
    public function index(Request $request)
    {
        // Capturamos el término de búsqueda proporcionado por el usuario
        $search = $request->input('search');

        // Consultamos las clases futuras, permitiendo filtrar por el término de búsqueda
        $clases = Clase::query()
            ->where('fecha', '>', now()->toDateString()) // Solo clases con fecha futura
            ->when($search, function ($query, $search) {
                // Si hay un término de búsqueda, filtramos las clases por su nombre
                $query->whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($search) . '%']);
            })
            ->orderBy('fecha') // Ordenamos las clases por fecha
            ->paginate(6) // Mostramos 6 clases por página
            ->appends(['search' => $search]); // Mantenemos el término de búsqueda al paginar

        // Retornamos la vista Inertia con los datos necesarios
        return Inertia::render('Clases/Index', [
            'clases' => $clases, // Pasamos las clases al frontend
            'search' => $search, // Pasamos el término de búsqueda
            'user' => auth()->user(), // Pasamos la información del usuario autenticado
        ]);
    }

    // Este método muestra los detalles de una clase específica
    public function show($id)
    {
        // Obtenemos la clase con su entrenador y las reservas confirmadas
        $clase = Clase::with(['entrenador.usuario', 'reservas' => function ($query) {
            // Solo mostramos las reservas confirmadas
            $query->where('estado', 'Confirmada');
        }])->findOrFail($id);

        // Calculamos las plazas disponibles restando las reservas confirmadas de la capacidad total
        $plazasDisponibles = $clase->capacidad - $clase->reservas->count();

        // Retornamos la vista Inertia con los detalles de la clase
        return Inertia::render('Clases/Show', [
            'clase' => $clase, // Pasamos los detalles de la clase
            'entrenador' => $clase->entrenador, // Pasamos el entrenador de la clase
            'plazasDisponibles' => $plazasDisponibles, // Pasamos las plazas disponibles
        ]);
    }

    // Este método permite a un usuario reservar una clase
    public function reserve(Request $request, Clase $clase)
    {
        // Obtenemos el usuario autenticado
        $user = Auth::user();

        // Verificamos si ya existe una reserva para esta clase por parte del usuario
        if (Reserva::where('usuario_id', $user->id)
            ->where('clase_id', $clase->id)
            ->exists()
        ) {
            // Si el usuario ya tiene una reserva, redirigimos con un mensaje de error
            return redirect()->back()->with('error', 'Ya has reservado esta clase.');
        }

        // Si no hay reserva, creamos una nueva para el usuario y la clase
        Reserva::create([
            'usuario_id' => $user->id, // ID del usuario que realiza la reserva
            'clase_id' => $clase->id, // ID de la clase que se reserva
        ]);

        // Redirigimos al perfil del usuario con un mensaje de éxito
        return redirect()->route('profile')->with('success', 'Clase reservada con éxito.');
    }
}
