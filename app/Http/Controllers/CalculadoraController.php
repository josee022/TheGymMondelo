<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CalculadoraController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Calculadoras/Index', [
            'user' => $request->user(),
        ]);
    }
}
