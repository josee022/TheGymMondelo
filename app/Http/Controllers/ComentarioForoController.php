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
        // Valida los datos del formulario
        $request->validate([
            'contenido' => 'required|string|max:1000', // El campo 'contenido' es obligatorio, debe ser una cadena de texto y no puede exceder los 1000 caracteres
            'comentario_id' => 'nullable|exists:comentarios_foros,id', // Validar que el comentario_id exista si se envía
        ]);

        // Crea una nueva instancia del modelo ComentarioForo
        $comentario = new ComentarioForo();
        $comentario->foro_id = $foro->id; // Asigna el ID del foro al que pertenece el comentario
        $comentario->usuario_id = Auth::id(); // Asigna el ID del usuario autenticado
        $comentario->contenido = $request->input('contenido'); // Asigna el contenido del comentario
        $comentario->fecha_comentario = now(); // Asigna la fecha actual

        // Si el request tiene un comentario_id, este comentario es una respuesta
        if ($request->filled('comentario_id')) {
            $comentario->comentario_id = $request->input('comentario_id');
        }
        $comentario->save(); // Guarda el comentario en la base de datos

        // Redirige de vuelta a la página anterior con un mensaje de éxito
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
        // Autoriza la acción de actualización para el comentario
        $this->authorize('update', $comentarioForo);

        // Valida los datos del formulario
        $request->validate([
            'contenido' => 'required|string|max:1000', // El campo 'contenido' es obligatorio, debe ser una cadena de texto y no puede exceder los 1000 caracteres
        ]);

        // Actualiza el comentario con los datos proporcionados
        $comentarioForo->update($request->only('contenido'));

        // Redirige de vuelta a la página anterior con un mensaje de éxito
        return Redirect::back()->with('success', 'Comentario actualizado con éxito.');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ComentarioForo $comentarioForo)
    {
        // Autoriza la acción de eliminación para el comentario
        $this->authorize('delete', $comentarioForo);

        // Elimina el comentario de la base de datos
        $comentarioForo->delete();

        // Redirige de vuelta a la página anterior con un mensaje de éxito
        return Redirect::back()->with('success', 'Comentario eliminado con éxito.');
    }
}
