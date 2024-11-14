<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductoController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $productos = Producto::when($search, function ($query, $search) {
            $query->whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($search) . '%']);
        })
            ->orderBy('nombre', 'asc')
            ->paginate(9)
            ->appends(['search' => $search]);

        return Inertia::render('Tienda/Index', [
            'productos' => $productos,
            'search' => $search,
        ]);
    }
}
