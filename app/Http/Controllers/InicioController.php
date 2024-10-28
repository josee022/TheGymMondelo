<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InicioController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Redirige al panel de administración si el usuario tiene rol 'admin'
        if ($user && $user->rol === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        // Obtiene todos los blogs junto con sus autores para los clientes
        $blogs = Blog::with('autor')->get();

        // Renderiza la vista de inicio para clientes
        return Inertia::render('Inicio/Inicio', [
            'auth' => $user,
            'blogs' => $blogs,
        ]);
    }
}
