<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use Inertia\Inertia;

class AdminProductoController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $productos = Producto::select('id', 'nombre', 'descripcion', 'precio', 'stock', 'imagen', 'created_at')
            ->when($search, function ($query, $search) {
                $query->whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($search) . '%']);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(9);

        return Inertia::render('Admin/Productos', [
            'productos' => $productos,
            'search' => $search,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ProductoCrear');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0|max:999999.99',
            'stock' => 'required|integer|min:0',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagenPath = null;

        if ($request->hasFile('imagen')) {
            $imagen = $request->file('imagen');
            $imagenPath = time() . '_' . $imagen->getClientOriginalName();
            $imagen->move(public_path('images'), $imagenPath);
        }

        Producto::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
            'stock' => $request->stock,
            'imagen' => $imagenPath,
        ]);

        return redirect()->route('admin.productos')->with('success', 'Producto creado con éxito.');
    }


    public function edit(Producto $producto)
    {
        return Inertia::render('Admin/ProductoEditar', ['producto' => $producto]);
    }

    public function update(Request $request, Producto $producto)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0|max:999999.99',
            'stock' => 'required|integer|min:0',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            if ($producto->imagen && file_exists(public_path('images/' . $producto->imagen))) {
                unlink(public_path('images/' . $producto->imagen));
            }

            $imagen = $request->file('imagen');
            $imagenPath = time() . '_' . $imagen->getClientOriginalName();
            $imagen->move(public_path('images'), $imagenPath);

            $producto->imagen = $imagenPath;
        }

        $producto->update($request->only(['nombre', 'descripcion', 'precio', 'stock']));

        return redirect()->route('admin.productos')->with('success', 'Producto actualizado con éxito.');
    }



    public function destroy(Producto $producto)
    {
        // Eliminar la imagen asociada si existe
        if ($producto->imagen && file_exists(public_path('images/' . $producto->imagen))) {
            unlink(public_path('images/' . $producto->imagen));
        }

        $producto->delete();

        return redirect()->route('admin.productos')->with('success', 'Producto eliminado con éxito.');
    }

    public function updatePhoto(Request $request, $id)
    {
        $request->validate([
            'imagen' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $producto = Producto::findOrFail($id);

        if ($request->hasFile('imagen')) {
            // Eliminar la imagen anterior si existe
            if ($producto->imagen && file_exists(public_path('images/' . $producto->imagen))) {
                unlink(public_path('images/' . $producto->imagen));
            }

            // Guardar la nueva imagen
            $imagen = $request->file('imagen');
            $imagenPath = time() . '_' . $imagen->getClientOriginalName();
            $imagen->move(public_path('images'), $imagenPath);

            $producto->imagen = $imagenPath;
        }

        $producto->save();

        return redirect()->back()->with('success', 'Foto actualizada con éxito.');
    }
}
