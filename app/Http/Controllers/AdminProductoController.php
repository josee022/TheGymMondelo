<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use Inertia\Inertia;

class AdminProductoController extends Controller
{
    // Muestra la lista de productos con paginación y búsqueda por nombre
    public function index(Request $request)
    {
        $search = $request->input('search'); // Captura el término de búsqueda

        // Consulta para obtener los productos con filtro por nombre
        $productos = Producto::select('id', 'nombre', 'descripcion', 'precio', 'stock', 'imagen', 'created_at')
            ->when($search, function ($query, $search) {
                // Filtro si el usuario proporciona un término de búsqueda
                $query->whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($search) . '%']);
            })
            ->orderBy('created_at', 'desc') // Ordena por fecha de creación
            ->paginate(9); // Pagina los resultados

        // Renderiza la vista con los productos y el término de búsqueda
        return Inertia::render('Admin/Productos', [
            'productos' => $productos,
            'search' => $search, // Pasa el término de búsqueda a la vista
        ]);
    }

    // Muestra el formulario para crear un nuevo producto
    public function create()
    {
        return Inertia::render('Admin/ProductoCrear');
    }

    // Guarda un nuevo producto en la base de datos
    public function store(Request $request)
    {
        // Valida los datos recibidos
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0|max:999999.99',
            'stock' => 'required|integer|min:0',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Procesa la imagen si se sube una nueva
        $imagenPath = null;
        if ($request->hasFile('imagen')) {
            $imagen = $request->file('imagen');
            $imagenPath = time() . '_' . $imagen->getClientOriginalName(); // Asigna un nombre único a la imagen
            $imagen->move(public_path('images'), $imagenPath); // Mueve la imagen al directorio público
        }

        // Crea un nuevo producto con los datos proporcionados
        Producto::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
            'stock' => $request->stock,
            'imagen' => $imagenPath,
        ]);

        // Redirige al listado de productos con un mensaje de éxito
        return redirect()->route('admin.productos')->with('success', 'Producto creado con éxito.');
    }

    // Muestra el formulario de edición de un producto
    public function edit(Producto $producto)
    {
        return Inertia::render('Admin/ProductoEditar', ['producto' => $producto]);
    }

    // Actualiza los datos de un producto
    public function update(Request $request, Producto $producto)
    {
        // Valida los datos recibidos
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0|max:999999.99',
            'stock' => 'required|integer|min:0',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Si se sube una nueva imagen, procesarla y eliminar la anterior
        if ($request->hasFile('imagen')) {
            // Elimina la imagen anterior si existe
            if ($producto->imagen && file_exists(public_path('images/' . $producto->imagen))) {
                unlink(public_path('images/' . $producto->imagen));
            }

            // Guarda la nueva imagen
            $imagen = $request->file('imagen');
            $imagenPath = time() . '_' . $imagen->getClientOriginalName();
            $imagen->move(public_path('images'), $imagenPath); // Mueve la imagen a la carpeta 'images'

            $producto->imagen = $imagenPath; // Asigna el nuevo path a la imagen
        }

        // Actualiza los demás datos del producto
        $producto->update($request->only(['nombre', 'descripcion', 'precio', 'stock']));

        // Redirige con un mensaje de éxito
        return redirect()->route('admin.productos')->with('success', 'Producto actualizado con éxito.');
    }

    // Elimina un producto de la base de datos
    public function destroy(Producto $producto)
    {
        // Elimina la imagen asociada si existe
        if ($producto->imagen && file_exists(public_path('images/' . $producto->imagen))) {
            unlink(public_path('images/' . $producto->imagen)); // Elimina la imagen del directorio
        }

        // Elimina el producto de la base de datos
        $producto->delete();

        // Redirige al listado de productos con un mensaje de éxito
        return redirect()->route('admin.productos')->with('success', 'Producto eliminado con éxito.');
    }

    // Actualiza la foto de un producto
    public function updatePhoto(Request $request, $id)
    {
        // Valida la nueva imagen
        $request->validate([
            'imagen' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Encuentra el producto por su id
        $producto = Producto::findOrFail($id);

        // Si hay una nueva imagen, procesarla y eliminar la anterior
        if ($request->hasFile('imagen')) {
            // Elimina la imagen anterior si existe
            if ($producto->imagen && file_exists(public_path('images/' . $producto->imagen))) {
                unlink(public_path('images/' . $producto->imagen));
            }

            // Guarda la nueva imagen
            $imagen = $request->file('imagen');
            $imagenPath = time() . '_' . $imagen->getClientOriginalName();
            $imagen->move(public_path('images'), $imagenPath); // Mueve la imagen a la carpeta 'images'

            $producto->imagen = $imagenPath; // Asigna el nuevo path de la imagen
        }

        // Guarda el producto con la nueva imagen
        $producto->save();

        // Redirige con un mensaje de éxito
        return redirect()->back()->with('success', 'Foto actualizada con éxito.');
    }
}
