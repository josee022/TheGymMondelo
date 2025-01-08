<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Producto;
use App\Models\Pedido;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    // Método principal que se llama al acceder al dashboard del administrador
    public function index()
    {
        // Obtener el total de usuarios registrados en la base de datos
        $totalUsuarios = User::count();

        // Obtener el total de productos registrados en la base de datos
        $totalProductos = Producto::count();

        // Calcular los ingresos del mes actual (sin filtrar por estado)
        $ingresosMensuales = Pedido::whereMonth('fecha_pedido', '=', Carbon::now()->month) // Filtra por el mes actual
            ->whereYear('fecha_pedido', '=', Carbon::now()->year) // Filtra por el año actual
            ->sum('total'); // Suma el total de los pedidos del mes actual

        // Obtener los últimos 5 usuarios registrados, ordenados por la fecha de creación
        $ultimosUsuarios = User::orderBy('created_at', 'desc')->take(5)->get(['name', 'email', 'created_at']); // Solo seleccionamos nombre, email y la fecha de creación

        // Obtener los últimos 5 pedidos recientes, incluyendo el nombre del usuario
        $ultimosPedidos = Pedido::with('usuario:name,id') // Relacionamos el modelo Pedido con el modelo Usuario y seleccionamos solo el nombre y el id del usuario
            ->orderBy('fecha_pedido', 'desc') // Ordenamos por la fecha de pedido de forma descendente
            ->take(5) // Solo tomamos los últimos 5 pedidos
            ->get(['id', 'usuario_id', 'fecha_pedido', 'total', 'estado']); // Seleccionamos el id, usuario_id, fecha_pedido, total y estado

        // Obtener el número de usuarios registrados por mes durante los últimos 6 meses
        $usuariosPorMes = User::selectRaw("COUNT(*) as total, DATE_PART('year', created_at) as year, DATE_PART('month', created_at) as month") // Contamos el total de usuarios por año y mes
            ->where('created_at', '>=', Carbon::now()->subMonths(6)) // Solo consideramos los últimos 6 meses
            ->groupBy('year', 'month') // Agrupamos por año y mes
            ->orderBy('year') // Ordenamos por año
            ->orderBy('month') // Ordenamos por mes
            ->get()
            ->map(function ($item) { // Transformamos los resultados para un formato más amigable
                return [
                    'mes' => $item->year . '-' . str_pad($item->month, 2, '0', STR_PAD_LEFT), // Formato 'YYYY-MM'
                    'total' => $item->total, // Total de usuarios por mes
                ];
            });

        // Renderizamos la vista 'Admin/Dashboard' pasando los datos obtenidos como parámetros
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
