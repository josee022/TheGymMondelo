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
                'nombre' => $producto->nombre,
                'precio' => $producto->precio,
                'cantidad' => 1
            ];
        }

        session()->put('carrito', $carrito);

        return back()->with('success', 'Producto añadido al carrito');
    }

    // Método para actualizar la cantidad en el carrito
    public function actualizarCarrito(Request $request)
    {
        $carrito = session()->get('carrito');
        $carrito[$request->producto_id]['cantidad'] = $request->cantidad;
        session()->put('carrito', $carrito);

        return back()->with('success', 'Cantidad actualizada');
    }

    // Método para eliminar un producto del carrito
    public function eliminarDelCarrito(Request $request)
    {
        $carrito = session()->get('carrito');
        unset($carrito[$request->producto_id]);
        session()->put('carrito', $carrito);

        return back()->with('success', 'Producto eliminado del carrito');
    }

    // Método para procesar el pedido
    public function realizarPedido(Request $request)
    {
        // Capturar el carrito enviado desde el frontend
        $carrito = $request->input('carrito');

        if (!$carrito || count($carrito) === 0) {
            return redirect()->back()->with('error', 'No hay productos en el carrito');
        }

        // Calcular el total del pedido
        $total = array_sum(array_map(function ($item) {
            return $item['precio'] * $item['cantidad'];
        }, $carrito));

        // Crear el pedido en la base de datos
        $pedido = Pedido::create([
            'usuario_id' => auth()->user()->id,
            'total' => $total,
            'estado' => 'Pendiente', // Asegúrate de que siempre haya un valor en 'estado'
        ]);

        // Crear los detalles del pedido
        foreach ($carrito as $detalles) {
            $producto_id = $detalles['id']; // Obtén el id del producto correctamente

            // Verificar que el producto exista en la base de datos
            $producto = Producto::find($producto_id);
            if (!$producto) {
                return redirect()->back()->with('error', "El producto con ID {$producto_id} no existe.");
            }

            // Insertar el detalle del pedido
            DetallePedido::create([
                'pedido_id' => $pedido->id,
                'producto_id' => $producto_id,
                'cantidad' => $detalles['cantidad'],
                'precio_unitario' => $detalles['precio'],
            ]);
        }

        // Limpiar el carrito del frontend
        session()->forget('carrito');

        // Redirigir a la página de confirmación usando Inertia
        return Inertia::location('/tienda');
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
    public function show(Pedido $pedido)
    {
        //
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
