<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreComentarioForoRequest;
use App\Http\Requests\UpdateComentarioForoRequest;
use App\Models\ComentarioForo;
use App\Models\Foro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class ComentarioForoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request, Foro $foro)
{
    $request->validate([
        'contenido' => 'required|string|max:1000',
    ]);

    $comentario = new ComentarioForo();
    $comentario->foro_id = $foro->id;
    $comentario->usuario_id = Auth::id();
    $comentario->contenido = $request->input('contenido');
    $comentario->fecha_comentario = now();
    $comentario->save();

    return Redirect::back()->with('success', 'Comentario añadido con éxito.');
}


    /**
     * Display the specified resource.
     */
    public function show(ComentarioForo $comentarioForo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ComentarioForo $comentarioForo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ComentarioForo $comentarioForo)
    {
        $this->authorize('update', $comentarioForo);

        $request->validate([
            'contenido' => 'required|string|max:1000',
        ]);

        $comentarioForo->update($request->only('contenido'));

        return Redirect::back()->with('success', 'Comentario actualizado con éxito.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ComentarioForo $comentarioForo)
    {
        $this->authorize('delete', $comentarioForo);

        $comentarioForo->delete();

        return Redirect::back()->with('success', 'Comentario eliminado con éxito.');
    }
}
