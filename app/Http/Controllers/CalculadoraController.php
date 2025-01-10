<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CalculadoraController extends Controller
{
    public function index(Request $request)
    {
        // Este método renderiza la vista 'Calculadoras/Index' y pasa los datos del usuario autenticado.
        return Inertia::render('Calculadoras/Index', [
            'user' => $request->user(),  // Pasa el usuario actualmente autenticado a la vista.
        ]);
    }
}
