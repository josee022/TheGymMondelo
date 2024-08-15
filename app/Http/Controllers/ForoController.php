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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        // Recupera los foros con el usuario y los comentarios asociados
        $foros = Foro::with([
            'usuario', // Carga el autor del foro
            'comentarios' => function ($query) {
                $query->orderBy('fecha_comentario', 'desc') // Ordena los comentarios por fecha de manera descendente
                    ->with('usuario'); // Carga el autor del comentario
            }
        ])
            ->orderBy('fecha_publicacion', 'desc') // Ordena los foros por fecha de manera descendente
            ->paginate(2);

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
        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
        ]);

        Foro::create([
            'titulo' => $request->titulo,
            'contenido' => $request->contenido,
            'usuario_id' => auth()->user()->id,
            'fecha_publicacion' => now(),
        ]);

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
        $this->authorize('update', $foro);

        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
        ]);

        $foro->titulo = $request->titulo;
        $foro->contenido = $request->contenido;
        $foro->save();

        return redirect()->back()->with('success', 'Foro actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Foro $foro)
    {
        $this->authorize('delete', $foro);

        $foro->delete();

        return redirect()->back()->with('success', 'Foro eliminado exitosamente.');
    }
}
