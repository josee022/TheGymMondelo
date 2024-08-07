<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class InicioController extends Controller
{
    public function index()
    {
        return Inertia::render('Inicio', [
            'auth' => auth()->user(),
        ]);
    }
}
