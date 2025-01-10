<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class GraficaController extends Controller
{
    public function index()
    {
        return inertia('Admin/Graficas', [
            'titulo' => 'Gráficas Informativas y Seguimiento' // Se pasa el título a la vista
        ]);
    }

    public function clasesMasAdquiridas()
    {
        $clases = DB::table('clases')
            ->join('reservas', 'clases.id', '=', 'reservas.clase_id') // Realiza un join con la tabla de reservas
            ->select('clases.nombre', DB::raw('count(reservas.id) as total')) // Selecciona el nombre de la clase y el conteo de reservas
            ->where('reservas.estado', 'Confirmada') // Filtra solo las reservas confirmadas
            ->groupBy('clases.nombre') // Agrupa por nombre de clase
            ->orderByDesc('total') // Ordena por la cantidad de reservas de manera descendente
            ->limit(5) // Limita el resultado a las 5 clases más adquiridas
            ->get();

        return response()->json($clases); // Devuelve el resultado como un JSON
    }

    public function productosMasAdquiridos()
    {
        $productos = DB::table('productos')
            ->join('detalles_pedidos', 'productos.id', '=', 'detalles_pedidos.producto_id') // Join con la tabla de detalles de pedidos
            ->join('pedidos', 'detalles_pedidos.pedido_id', '=', 'pedidos.id') // Join con la tabla de pedidos
            ->select('productos.nombre', DB::raw('SUM(detalles_pedidos.cantidad) as total')) // Suma la cantidad de cada producto
            ->groupBy('productos.nombre') // Agrupa por nombre de producto
            ->orderByDesc('total') // Ordena de mayor a menor la cantidad total
            ->limit(5) // Limita el resultado a los 5 productos más adquiridos
            ->get();

        return response()->json($productos); // Devuelve los productos más adquiridos como JSON
    }

    public function programasMasAdquiridos()
    {
        $programas = DB::table('programas')
            ->join('adquisiciones_programas', 'programas.id', '=', 'adquisiciones_programas.programa_id') // Join con la tabla de adquisiciones de programas
            ->select('programas.nombre', DB::raw('count(adquisiciones_programas.id) as total')) // Cuenta la cantidad de adquisiciones por programa
            ->groupBy('programas.nombre') // Agrupa por nombre de programa
            ->orderByDesc('total') // Ordena por cantidad de adquisiciones de forma descendente
            ->limit(5) // Limita a los 5 programas más adquiridos
            ->get();

        return response()->json($programas); // Devuelve los programas más adquiridos como JSON
    }

    public function suscripcionesMasAdquiridas()
    {
        $suscripciones = DB::table('suscripciones')
            ->select('tipo', DB::raw('count(id) as total')) // Selecciona el tipo de suscripción y el conteo
            ->groupBy('tipo') // Agrupa por tipo de suscripción
            ->get();

        return response()->json($suscripciones); // Devuelve los datos de las suscripciones más adquiridas como JSON
    }
}
