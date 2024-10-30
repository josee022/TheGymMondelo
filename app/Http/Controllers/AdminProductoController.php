<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductoRequest;
use App\Http\Requests\UpdateProductoRequest;
use App\Models\Producto;
use Inertia\Inertia;

class AdminProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Admin/Productos', [
            'productos' => $productos
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
