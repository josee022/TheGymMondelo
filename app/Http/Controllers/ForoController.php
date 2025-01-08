<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreForoRequest;
use App\Http\Requests\UpdateForoRequest;
use App\Models\Foro;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ForoController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        // Obtiene el usuario autenticado
        $user = auth()->user();

        // Obtiene el término de búsqueda del formulario
        $search = $request->input('search');

        // Obtiene todos los foros con sus comentarios y respuestas, con filtros y paginación
        $foros = Foro::with([
            'usuario', // Relación con el usuario del foro
            'comentarios' => function ($query) {
                $query->whereNull('comentario_id') // Filtra solo los comentarios principales (no respuestas)
                    ->orderBy('fecha_comentario', 'desc') // Ordena los comentarios por fecha
                    ->with([
                        'usuario', // Relación con el usuario que hizo el comentario
                        'respuestas' => function ($query) {
                            $query->orderBy('fecha_comentario', 'desc') // Ordena las respuestas por fecha
                                ->with('usuario'); // Relación con el usuario que hizo la respuesta
                        }
                    ]);
            }
        ])
            // Aplica un filtro de búsqueda por título del foro
            ->when($search, function ($query, $search) {
                $query->where('titulo', 'like', '%' . $search . '%');
            })
            // Ordena los foros por fecha de publicación de manera descendente
            ->orderBy('fecha_publicacion', 'desc')
            // Aplica la paginación de los resultados (1 por página en este caso)
            ->paginate(1)
            // Mantiene el término de búsqueda en la URL al paginar
            ->appends(['search' => $search]);

        // Renderiza la vista 'Foros/Index' con los datos
        return Inertia::render('Foros/Index', [
            'auth' => ['user' => $user],
            'foros' => $foros, // Lista de foros con comentarios y respuestas
            'search' => $search, // Término de búsqueda
        ]);
    }

    public function store(Request $request)
    {
        // Valida los datos del formulario
        $request->validate([
            'titulo' => 'required|string|max:255', // Título obligatorio con una longitud máxima
            'contenido' => 'required|string', // Contenido obligatorio
        ]);

        // Crea un nuevo foro en la base de datos
        Foro::create([
            'titulo' => $request->titulo, // Título del foro
            'contenido' => $request->contenido, // Contenido del foro
            'usuario_id' => auth()->user()->id, // ID del usuario que está creando el foro
            'fecha_publicacion' => now(), // Fecha y hora actual
        ]);

        // Redirige al índice de foros con un mensaje de éxito
        return redirect()->route('foros.index')->with('success', 'Foro creado exitosamente.');
    }

    public function update(Request $request, Foro $foro)
    {
        // Autoriza que el usuario tenga permisos para actualizar el foro
        $this->authorize('update', $foro);

        // Valida los datos del formulario
        $request->validate([
            'titulo' => 'required|string|max:255', // Título obligatorio con una longitud máxima
            'contenido' => 'required|string', // Contenido obligatorio
        ]);

        // Actualiza el foro con los nuevos datos
        $foro->titulo = $request->titulo;
        $foro->contenido = $request->contenido;
        $foro->save(); // Guarda los cambios

        // Redirige hacia atrás con un mensaje de éxito
        return redirect()->back()->with('success', 'Foro actualizado exitosamente.');
    }

    public function destroy(Foro $foro)
    {
        // Autoriza que el usuario tenga permisos para eliminar el foro
        $this->authorize('delete', $foro);

        // Elimina el foro de la base de datos
        $foro->delete();

        // Redirige hacia atrás con un mensaje de éxito
        return redirect()->back()->with('success', 'Foro eliminado exitosamente.');
    }
}
