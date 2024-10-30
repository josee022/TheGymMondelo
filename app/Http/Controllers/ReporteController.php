<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReporteController extends Controller
{

    public function index()
    {
        $pedidos = Pedido::with('usuario')
            ->orderBy('fecha_pedido', 'desc')
            ->paginate(4, ['*'], 'pedidosPage');

        return Inertia::render('Admin/ReportesAnalisis', [
            'pedidos' => $pedidos,
        ]);
    }

    public function ingresosMensuales()
    {
        $ingresosPorMes = Pedido::selectRaw("DATE_PART('year', fecha_pedido) as year, DATE_PART('month', fecha_pedido) as month, SUM(total) as ingresos")
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        return response()->json($ingresosPorMes);
    }

    public function showPedido($id)
    {
        $pedido = Pedido::with(['detalles.producto', 'usuario'])->findOrFail($id);

        return Inertia::render('Admin/GestionarPedido', [
            'pedido' => $pedido,
            'estados' => ['Pendiente', 'Enviado', 'Entregado', 'Cancelado'],
        ]);
    }


    public function actualizarEstadoPedido(Request $request, $id)
    {
        $validatedData = $request->validate([
            'estado' => 'required|string|in:Pendiente,Enviado,Entregado,Cancelado',
        ]);

        $pedido = Pedido::findOrFail($id);
        $pedido->estado = $validatedData['estado'];
        $pedido->save();

        return redirect()->route('admin.pedidos.show', $id)->with('success', 'Estado actualizado con éxito.');
    }
}
