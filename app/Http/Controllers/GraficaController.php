<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class GraficaController extends Controller
{
    public function index()
    {
        return inertia('Admin/Graficas', [
            'titulo' => 'Gráficas Informativas y Seguimiento'
        ]);
    }

    public function clasesMasAdquiridas()
    {
        $clases = DB::table('clases')
            ->join('reservas', 'clases.id', '=', 'reservas.clase_id')
            ->select('clases.nombre', DB::raw('count(reservas.id) as total'))
            ->where('reservas.estado', 'Confirmada')
            ->groupBy('clases.nombre')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        return response()->json($clases);
    }

    public function productosMasAdquiridos()
    {
        $productos = DB::table('productos')
            ->join('detalles_pedidos', 'productos.id', '=', 'detalles_pedidos.producto_id')
            ->join('pedidos', 'detalles_pedidos.pedido_id', '=', 'pedidos.id')
            ->select('productos.nombre', DB::raw('SUM(detalles_pedidos.cantidad) as total'))
            ->groupBy('productos.nombre')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        return response()->json($productos);
    }

    public function programasMasAdquiridos()
    {
        $programas = DB::table('programas')
            ->join('adquisiciones_programas', 'programas.id', '=', 'adquisiciones_programas.programa_id')
            ->select('programas.nombre', DB::raw('count(adquisiciones_programas.id) as total'))
            ->groupBy('programas.nombre')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        return response()->json($programas);
    }

    public function suscripcionesMasAdquiridas()
    {
        $suscripciones = DB::table('suscripciones')
            ->select('tipo', DB::raw('count(id) as total'))
            ->groupBy('tipo')
            ->get();

        return response()->json($suscripciones);
    }
}
