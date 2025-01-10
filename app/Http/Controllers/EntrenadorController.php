<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEntrenadorRequest;
use App\Http\Requests\UpdateEntrenadorRequest;
use App\Models\Entrenador;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;



class EntrenadorController extends Controller
{
    public function index(Request $request)
    {
        // Obtiene el término de búsqueda de la solicitud (si lo hay)
        $search = $request->input('search');

        // Realiza la consulta para obtener entrenadores con la relación de usuarios
        $entrenadores = Entrenador::with('usuario') // Carga la relación con el usuario asociado
            ->when($search, function ($query, $search) {
                // Si hay un término de búsqueda, filtra los entrenadores por el nombre del usuario
                $query->whereHas('usuario', function ($q) use ($search) {
                    // Realiza la búsqueda usando el nombre del usuario en minúsculas
                    $q->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($search) . '%']);
                });
            })
            ->orderBy('id', 'asc') // Ordena los entrenadores por ID de forma ascendente
            ->paginate(6) // Limita el número de resultados por página (6 en este caso)
            ->appends(['search' => $search]); // Mantiene el término de búsqueda al hacer la paginación

        // Devuelve la vista con los datos de los entrenadores y el término de búsqueda
        return Inertia::render('Entrenadores/Index', [
            'entrenadores' => $entrenadores, // Lista de entrenadores
            'search' => $search, // Término de búsqueda actual
        ]);
    }
}
