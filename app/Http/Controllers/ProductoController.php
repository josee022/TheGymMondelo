<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductoController extends Controller
{
    public function index(Request $request)
    {
        // Captura el término de búsqueda de la solicitud
        $search = $request->input('search');

        // Se consulta la tabla 'productos' y se aplica el filtro de búsqueda si se proporciona un término
        $productos = Producto::when($search, function ($query, $search) {
            // Si hay un término de búsqueda, se filtra por nombre utilizando LIKE
            $query->whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower($search) . '%']);
        })
            // Ordena los productos por nombre en orden ascendente
            ->orderBy('nombre', 'asc')
            // Pagina los resultados mostrando 9 productos por página
            ->paginate(9)
            // Mantiene el término de búsqueda en la URL para la paginación
            ->appends(['search' => $search]);

        // Renderiza la vista 'Tienda/Index' utilizando Inertia, pasando los productos y el término de búsqueda a la vista
        return Inertia::render('Tienda/Index', [
            'productos' => $productos, // Los productos que cumplen con el filtro de búsqueda
            'search' => $search, // El término de búsqueda que se usó
        ]);
    }
}
