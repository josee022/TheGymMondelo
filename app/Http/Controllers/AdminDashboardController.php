<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Producto;
use App\Models\Pedido;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // Métricas clave
        $totalUsuarios = User::count();
        $totalProductos = Producto::count();

        // Calcular ingresos mensuales sin filtrar por estado
        $ingresosMensuales = Pedido::whereMonth('fecha_pedido', '=', Carbon::now()->month)
            ->whereYear('fecha_pedido', '=', Carbon::now()->year)
            ->sum('total');

        // Últimos usuarios registrados
        $ultimosUsuarios = User::orderBy('created_at', 'desc')->take(5)->get(['name', 'email', 'created_at']);

        // Últimos pedidos recientes (sin filtrar por estado)
        $ultimosPedidos = Pedido::with('usuario:name,id') // Incluye el nombre del usuario
            ->orderBy('fecha_pedido', 'desc')
            ->take(5)
            ->get(['id', 'usuario_id', 'fecha_pedido', 'total', 'estado']); // Incluye el estado

        // Usuarios registrados por mes
        $usuariosPorMes = User::selectRaw("COUNT(*) as total, DATE_PART('year', created_at) as year, DATE_PART('month', created_at) as month")
            ->where('created_at', '>=', Carbon::now()->subMonths(6))
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'mes' => $item->year . '-' . str_pad($item->month, 2, '0', STR_PAD_LEFT),
                    'total' => $item->total,
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'totalUsuarios' => $totalUsuarios,
            'totalProductos' => $totalProductos,
            'ingresosMensuales' => $ingresosMensuales,
            'ultimosUsuarios' => $ultimosUsuarios,
            'ultimosPedidos' => $ultimosPedidos,
            'usuariosPorMes' => $usuariosPorMes,
        ]);
    }
}
