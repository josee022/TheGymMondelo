<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePedidoRequest;
use App\Http\Requests\UpdatePedidoRequest;
use App\Models\DetallePedido;
use App\Models\Pedido;
use App\Models\Producto;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    // Método para agregar al carrito (almacenado en sesión)
    public function agregarAlCarrito(Request $request)
    {
        $producto = Producto::find($request->producto_id);
        $carrito = session()->get('carrito', []);

        if (isset($carrito[$producto->id])) {
            $carrito[$producto->id]['cantidad']++;
        } else {
            $carrito[$producto->id] = [
                'id' => $producto->id,
                'nombre' => $producto->nombre,
                'precio' => $producto->precio,
                'cantidad' => 1
            ];
        }

        session()->put('carrito', $carrito);

        return response()->json(['carrito' => array_values($carrito), 'message' => 'Producto añadido al carrito']);
    }

    // Método para actualizar la cantidad en el carrito
    public function actualizarCarrito(Request $request)
    {
        $carrito = session()->get('carrito', []);
        if (isset($carrito[$request->producto_id])) {
            $carrito[$request->producto_id]['cantidad'] = $request->cantidad;
        }
        session()->put('carrito', $carrito);

        return response()->json(['carrito' => array_values($carrito), 'message' => 'Cantidad actualizada']);
    }

    // Método para eliminar un producto del carrito
    public function eliminarDelCarrito(Request $request)
    {
        $carrito = session()->get('carrito', []);
        unset($carrito[$request->producto_id]);
        session()->put('carrito', $carrito);

        return response()->json(['carrito' => array_values($carrito), 'message' => 'Producto eliminado del carrito']);
    }

    // Método para procesar el pedido
    public function realizarPedido(Request $request)
    {
        $carrito = session()->get('carrito', []);

        if (empty($carrito)) {
            return response()->json(['error' => 'No hay productos en el carrito']);
        }

        $total = array_sum(array_map(function ($item) {
            return $item['precio'] * $item['cantidad'];
        }, $carrito));

        $pedido = Pedido::create([
            'usuario_id' => auth()->user()->id,
            'total' => $total,
            'estado' => 'Pendiente',
        ]);

        foreach ($carrito as $detalles) {
            DetallePedido::create([
                'pedido_id' => $pedido->id,
                'producto_id' => $detalles['id'],
                'cantidad' => $detalles['cantidad'],
                'precio_unitario' => $detalles['precio'],
            ]);
        }

        $puntosObtenidos = floor($total / 10);

        $usuario = auth()->user();
        $usuario->puntos += $puntosObtenidos;
        $usuario->save();

        session()->forget('carrito');

        return response()->json([
            'message' => 'Pedido realizado con éxito',
            'carrito' => [],
            'puntos_obtenidos' => $puntosObtenidos,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePedidoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Obtener el pedido por ID, incluyendo la relación con el usuario
        $pedido = Pedido::with(['usuario', 'detalles.producto'])->findOrFail($id);

        return Inertia::render('Pedidos/Show', [
            'pedido' => $pedido->toArray(),
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pedido $pedido)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePedidoRequest $request, Pedido $pedido)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedido $pedido)
    {
        //
    }
}
