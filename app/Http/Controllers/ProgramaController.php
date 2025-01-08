<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProgramaRequest;
use App\Http\Requests\UpdateProgramaRequest;
use App\Models\Programa;
use Inertia\Inertia;
use App\Models\AdquisicionPrograma;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProgramaController extends Controller
{
    public function index(Request $request)
    {
        // Captura el término de búsqueda desde la solicitud
        $search = $request->input('search');

        // Se obtiene la lista de programas, aplicando el filtro de búsqueda si se proporciona
        $programas = Programa::when($search, function ($query, $search) {
            // Filtro por nombre, sin importar si está en mayúsculas o minúsculas
            $query->whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($search) . '%']);
        })
            // Ordenar los resultados por nombre de manera ascendente
            ->orderBy('nombre', 'asc')
            // Paginación de los resultados, mostrando 9 programas por página
            ->paginate(9)
            // Mantener el término de búsqueda en la paginación
            ->appends(['search' => $search]);

        // Verificar si el usuario ya tiene un programa adquirido
        $usuarioTienePrograma = AdquisicionPrograma::where('usuario_id', Auth::id())->exists();

        // Retorna la vista con los datos obtenidos y pasa el resultado de la verificación
        return Inertia::render('Programas/Index', [
            'programas' => $programas,  // Pasa la lista de programas a la vista
            'search' => $search,        // Pasa el término de búsqueda a la vista
            'usuarioTienePrograma' => $usuarioTienePrograma, // Pasa el estado de si el usuario tiene un programa adquirido
        ]);
    }
}
