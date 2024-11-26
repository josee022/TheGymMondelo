<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CalculadoraController extends Controller
{
    public function index()
    {
        return inertia('Calculadoras/Index');
    }
}
