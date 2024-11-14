<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductoRequest;
use App\Http\Requests\UpdateProductoRequest;
use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProductoController extends Controller
{
    public function index(Request $request)
    {
        // Capturar el término de búsqueda si está presente en la solicitud
        $search = $request->input('search');

        // Obtener los productos, aplicando el filtro de búsqueda y luego paginando
        $productos = Producto::select('id', 'nombre', 'descripcion', 'precio', 'stock', 'created_at')
            ->when($search, function ($query, $search) {
                // Convertimos a minúsculas para una búsqueda insensible a mayúsculas
                $query->whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($search) . '%']);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Devolver los productos filtrados y el término de búsqueda a la vista
        return Inertia::render('Admin/Productos', [
            'productos' => $productos,
            'search' => $search
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ProductoCrear');
    }

    public function store(StoreProductoRequest $request)
    {
        if (auth()->user()->rol !== 'admin') {
            abort(403, 'No tienes autorización para realizar esta acción.');
        }

        Producto::create($request->validated());
        return redirect()->route('admin.productos')->with('success', 'Producto creado correctamente.');
    }


    public function edit(Producto $producto)
    {
        return Inertia::render('Admin/ProductoEditar', ['producto' => $producto]);
    }

    public function update(UpdateProductoRequest $request, Producto $producto)
    {
        $producto->update($request->validated());
        return redirect()->route('admin.productos')->with('success', 'Producto actualizado correctamente.');
    }

    public function destroy(Producto $producto)
    {
        $producto->delete();
        return redirect()->route('admin.productos')->with('success', 'Producto eliminado correctamente.');
    }
}
