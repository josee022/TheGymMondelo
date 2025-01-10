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
        // Encuentra el producto por su ID
        $producto = Producto::find($request->producto_id);

        // Recupera el carrito de la sesión, o inicia un carrito vacío si no existe
        $carrito = session()->get('carrito', []);

        // Verifica si el producto ya está en el carrito
        if (isset($carrito[$producto->id])) {
            // Si el producto ya está en el carrito, aumenta su cantidad en 1
            $carrito[$producto->id]['cantidad']++;
        } else {
            // Si el producto no está en el carrito, lo agrega con cantidad 1
            $carrito[$producto->id] = [
                'id' => $producto->id,
                'nombre' => $producto->nombre,
                'precio' => $producto->precio,
                'cantidad' => 1
            ];
        }

        // Guarda el carrito actualizado en la sesión
        session()->put('carrito', $carrito);

        // Retorna una respuesta JSON con el carrito actualizado y un mensaje de éxito
        return response()->json(['carrito' => array_values($carrito), 'message' => 'Producto añadido al carrito']);
    }

    // Método para actualizar la cantidad en el carrito
    public function actualizarCarrito(Request $request)
    {
        // Recupera el carrito de la sesión
        $carrito = session()->get('carrito', []);

        // Verifica si el producto existe en el carrito
        if (isset($carrito[$request->producto_id])) {
            // Actualiza la cantidad del producto en el carrito
            $carrito[$request->producto_id]['cantidad'] = $request->cantidad;
        }

        // Guarda el carrito actualizado en la sesión
        session()->put('carrito', $carrito);

        // Retorna una respuesta JSON con el carrito actualizado y un mensaje de éxito
        return response()->json(['carrito' => array_values($carrito), 'message' => 'Cantidad actualizada']);
    }

    // Método para eliminar un producto del carrito
    public function eliminarDelCarrito(Request $request)
    {
        // Recupera el carrito de la sesión
        $carrito = session()->get('carrito', []);

        // Elimina el producto del carrito usando su ID
        unset($carrito[$request->producto_id]);

        // Guarda el carrito actualizado en la sesión
        session()->put('carrito', $carrito);

        // Retorna una respuesta JSON con el carrito actualizado y un mensaje de éxito
        return response()->json(['carrito' => array_values($carrito), 'message' => 'Producto eliminado del carrito']);
    }

    // Método para procesar el pedido
    public function realizarPedido(Request $request)
    {
        // Obtiene el carrito de la sesión
        $carrito = session()->get('carrito', []);

        // Verifica si el carrito está vacío
        if (empty($carrito)) {
            // Si no hay productos en el carrito, se retorna un error
            return response()->json(['error' => 'No hay productos en el carrito']);
        }

        // Calcula el total del pedido sumando el precio de cada producto por su cantidad
        $total = array_sum(array_map(function ($item) {
            return $item['precio'] * $item['cantidad']; // Calcula el total por producto
        }, $carrito));

        // Crea el pedido en la base de datos
        $pedido = Pedido::create([
            'usuario_id' => auth()->user()->id, // El ID del usuario autenticado
            'total' => $total, // El total del pedido calculado
            'estado' => 'Pendiente', // El estado inicial del pedido
        ]);

        // Inserta los detalles del pedido en la base de datos
        foreach ($carrito as $detalles) {
            DetallePedido::create([
                'pedido_id' => $pedido->id, // El ID del pedido
                'producto_id' => $detalles['id'], // El ID del producto
                'cantidad' => $detalles['cantidad'], // La cantidad del producto
                'precio_unitario' => $detalles['precio'], // El precio unitario del producto
            ]);
        }

        // Calcula los puntos obtenidos (por cada 10 unidades de total, el usuario gana 1 punto)
        $puntosObtenidos = floor($total / 10);

        // Obtiene al usuario autenticado y le asigna los puntos obtenidos
        $usuario = auth()->user();
        $usuario->puntos += $puntosObtenidos;
        $usuario->save(); // Guarda los cambios en el usuario

        // Vacía el carrito de la sesión después de realizar el pedido
        session()->forget('carrito');

        // Retorna una respuesta JSON con el mensaje de éxito, el carrito vacío y los puntos obtenidos
        return response()->json([
            'message' => 'Pedido realizado con éxito', // Mensaje de éxito
            'carrito' => [], // El carrito está vacío ahora
            'puntos_obtenidos' => $puntosObtenidos, // Los puntos obtenidos por el usuario
        ]);
    }

    public function show($id)
    {
        // Obtiene el pedido por su ID, incluyendo la relación con el usuario y los detalles del pedido
        $pedido = Pedido::with(['usuario', 'detalles.producto'])->findOrFail($id);

        // Renderiza la vista con los detalles del pedido
        return Inertia::render('Pedidos/Show', [
            'pedido' => $pedido->toArray(), // Convierte el modelo a un array para Inertia
        ]);
    }
}
