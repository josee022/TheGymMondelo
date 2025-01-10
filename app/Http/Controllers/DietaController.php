<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDietaRequest;
use App\Http\Requests\UpdateDietaRequest;
use App\Models\Dieta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DietaController extends Controller
{
    public function index()
    {
        // Verificar si el usuario tiene una dieta activa
        $usuarioTieneDieta = Dieta::where('usuario_id', Auth::id())->exists();

        // Pasamos la variable a la vista para mostrar si el usuario ya tiene una dieta activa
        return inertia('Dietas/Index', [
            'usuarioTieneDieta' => $usuarioTieneDieta, // Indicamos si el usuario tiene una dieta activa
        ]);
    }

    public function store(Request $request)
    {
        // Validamos los datos recibidos del formulario
        $request->validate([
            'objetivo' => 'required|in:Pérdida de peso,Ganancia muscular,Mantenimiento', // Objetivo de la dieta
            'descripcion' => 'required|string', // Descripción de la dieta
        ]);

        // Verificar si el usuario ya tiene una dieta activa
        $dietaExistente = Dieta::where('usuario_id', Auth::id())->first();

        // Si ya tiene una dieta activa, redirigir con un mensaje de error
        if ($dietaExistente) {
            return redirect()->back()->with('error', 'Ya tienes una dieta activa. No puedes adquirir otra.');
        }

        // Si no tiene una dieta activa, crear una nueva dieta
        $dieta = new Dieta();
        $dieta->usuario_id = Auth::id(); // El usuario que está logueado
        $dieta->objetivo = $request->objetivo; // El objetivo de la dieta
        $dieta->descripcion = $request->descripcion; // Descripción de la dieta
        $dieta->save(); // Guardar la dieta en la base de datos

        // Redirigir con un mensaje de éxito
        return redirect()->back()->with('success', '¡Dieta seleccionada con éxito!');
    }

    public function delete($id)
    {
        // Obtener la dieta por su ID
        $dieta = Dieta::findOrFail($id);

        // Verificar que la dieta pertenece al usuario autenticado
        if ($dieta->usuario_id !== Auth::id()) {
            // Si no pertenece al usuario, redirigir con error
            return redirect()->back()->withErrors(['No tienes permiso para eliminar esta dieta.']);
        }

        // Eliminar la dieta
        $dieta->delete();

        // Redirigir con mensaje de éxito
        return redirect()->back()->with('success', 'Dieta eliminada exitosamente.');
    }
}
