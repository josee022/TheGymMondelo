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
        // Asegura que todas las rutas de este controlador requieran autenticación
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $user = auth()->user();

    $foros = Foro::with([
        'usuario', // Usuario que creó el foro
        'comentarios' => function ($query) {
            $query->whereNull('comentario_id') // Solo comentarios principales
                ->orderBy('fecha_comentario', 'desc')
                ->with([
                    'usuario',
                    'respuestas' => function ($query) {
                        $query->orderBy('fecha_comentario', 'asc')->with('usuario');
                    }
                ]);
        }
    ])
    ->orderBy('fecha_publicacion', 'desc')
    ->paginate(1);
    
    return Inertia::render('Foros/Index', [
        'auth' => ['user' => $user],
        'foros' => $foros,
    ]);
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
    public function store(Request $request)
    {
        // Valida los datos del formulario
        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
        ]);

        // Crea un nuevo foro con los datos proporcionados
        Foro::create([
            'titulo' => $request->titulo,
            'contenido' => $request->contenido,
            'usuario_id' => auth()->user()->id,
            'fecha_publicacion' => now(),
        ]);

        // Redirige al índice de foros con un mensaje de éxito
        return redirect()->route('foros.index')->with('success', 'Foro creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Foro $foro)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Foro $foro)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Foro $foro)
    {
        // Autoriza la acción de actualización del foro
        $this->authorize('update', $foro);

        // Valida los datos del formulario
        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
        ]);

        // Actualiza los datos del foro
        $foro->titulo = $request->titulo;
        $foro->contenido = $request->contenido;
        $foro->save();

        // Redirige hacia atrás con un mensaje de éxito
        return redirect()->back()->with('success', 'Foro actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Foro $foro)
    {
        // Autoriza la acción de eliminación del foro
        $this->authorize('delete', $foro);

        // Elimina el foro
        $foro->delete();

        // Redirige hacia atrás con un mensaje de éxito
        return redirect()->back()->with('success', 'Foro eliminado exitosamente.');
    }
}
