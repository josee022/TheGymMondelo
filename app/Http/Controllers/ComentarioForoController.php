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
    // Método para almacenar un nuevo comentario
    public function store(Request $request, Foro $foro)
    {
        // Valida los datos del formulario
        $request->validate([
            'contenido' => 'required|string|max:1000', // El contenido es obligatorio, debe ser una cadena de texto y no debe exceder 1000 caracteres
            'comentario_id' => 'nullable|exists:comentarios_foros,id', // Si se pasa un comentario_id, debe ser un ID válido en la tabla 'comentarios_foros'
        ]);

        // Crea una nueva instancia del modelo ComentarioForo
        $comentario = new ComentarioForo();
        $comentario->foro_id = $foro->id; // Asigna el ID del foro al que pertenece el comentario
        $comentario->usuario_id = Auth::id(); // Asigna el ID del usuario autenticado al comentario
        $comentario->contenido = $request->input('contenido'); // Asigna el contenido del comentario
        $comentario->fecha_comentario = now(); // Asigna la fecha actual del comentario

        // Si el request tiene un comentario_id, este comentario será una respuesta a otro comentario
        if ($request->filled('comentario_id')) {
            $comentario->comentario_id = $request->input('comentario_id');
        }

        // Guarda el comentario en la base de datos
        $comentario->save();

        // Redirige de vuelta a la página anterior con un mensaje de éxito
        return Redirect::back()->with('success', 'Comentario añadido con éxito.');
    }

    // Método para actualizar un comentario existente
    public function update(Request $request, ComentarioForo $comentarioForo)
    {
        // Autoriza la acción de actualización para el comentario
        $this->authorize('update', $comentarioForo);

        // Valida los datos del formulario
        $request->validate([
            'contenido' => 'required|string|max:1000', // El contenido es obligatorio, debe ser una cadena de texto y no debe exceder 1000 caracteres
        ]);

        // Actualiza el comentario con los nuevos datos
        $comentarioForo->update($request->only('contenido'));

        // Redirige de vuelta a la página anterior con un mensaje de éxito
        return Redirect::back()->with('success', 'Comentario actualizado con éxito.');
    }

    // Método para eliminar un comentario
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
