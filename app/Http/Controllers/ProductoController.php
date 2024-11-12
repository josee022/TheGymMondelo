<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Inertia\Inertia;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::paginate(9);
        return Inertia::render('Tienda/Index', [
            'productos' => $productos
        ]);
    }
}
