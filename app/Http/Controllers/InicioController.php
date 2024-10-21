<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InicioController extends Controller
{
    public function index()
    {
        // Obtiene todos los blogs junto con sus autores
        $blogs = Blog::with('autor')->get();

        // Renderiza la vista 'Inicio' usando InertiaJS y pasa los datos necesarios
        return Inertia::render('Inicio/Inicio', [
            'auth' => auth()->user(), // Pasa el usuario autenticado a la vista
            'blogs' => $blogs // Pasa la lista de blogs a la vista
        ]);
    }
}
