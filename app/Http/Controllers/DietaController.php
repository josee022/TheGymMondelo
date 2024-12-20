<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDietaRequest;
use App\Http\Requests\UpdateDietaRequest;
use App\Models\Dieta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DietaController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        // Verificar si el usuario tiene una dieta activa
        $usuarioTieneDieta = Dieta::where('usuario_id', Auth::id())->exists();

        return inertia('Dietas/Index', [
            'usuarioTieneDieta' => $usuarioTieneDieta, // Pasamos la variable a la vista
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
        // Validar los datos recibidos
        $request->validate([
            'objetivo' => 'required|in:Pérdida de peso,Ganancia muscular,Mantenimiento', // Incluimos 'Mejor rendimiento'
            'descripcion' => 'required|string',
        ]);

        // Verificar si el usuario ya tiene una dieta
        $dietaExistente = Dieta::where('usuario_id', Auth::id())->first();

        if ($dietaExistente) {
            // Si ya tiene una dieta, redirigir con un mensaje de error
            return redirect()->back()->with('error', 'Ya tienes una dieta activa. No puedes adquirir otra.');
        }

        // Si no tiene una dieta, proceder a crear una nueva
        $dieta = new Dieta();
        $dieta->usuario_id = Auth::id(); // El usuario que está logueado
        $dieta->objetivo = $request->objetivo; // El objetivo seleccionado
        $dieta->descripcion = $request->descripcion; // La descripción
        $dieta->save(); // Guardar en la base de datos

        // Redirigir con un mensaje de éxito
        return redirect()->back()->with('success', '¡Dieta seleccionada con éxito!');
    }

    public function delete($id)
    {
        // Obtener la dieta por ID
        $dieta = Dieta::findOrFail($id);

        // Verificar que la dieta pertenece al usuario autenticado
        if ($dieta->usuario_id !== Auth::id()) {
            return redirect()->back()->withErrors(['No tienes permiso para eliminar esta dieta.']);
        }

        // Eliminar la dieta
        $dieta->delete();

        // Redirigir con mensaje de éxito
        return redirect()->back()->with('success', 'Dieta eliminada exitosamente.');
    }




    /**
     * Display the specified resource.
     */
    public function show(Dieta $dieta)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dieta $dieta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDietaRequest $request, Dieta $dieta)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dieta $dieta)
    {
        //
    }
}
