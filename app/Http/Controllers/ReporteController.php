<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use Barryvdh\DomPDF\PDF;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReporteController extends Controller
{

    public function index(Request $request)
    {
        $estado = $request->query('estado');

        $pedidosQuery = Pedido::with('usuario')
            ->orderBy('fecha_pedido', 'desc');

        if ($estado) {
            $pedidosQuery->where('estado', $estado);
        }

        // Agregar el estado al paginador para que lo mantenga en cada enlace
        $pedidos = $pedidosQuery->paginate(4)->appends(['estado' => $estado]);

        return Inertia::render('Admin/ReportesAnalisis', [
            'pedidos' => $pedidos,
            'estados' => ['Pendiente', 'Enviado', 'Entregado', 'Cancelado'],
            'filtroEstado' => $estado,
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

    public function generarPdf(PDF $pdf)
    {
        $pedidos = Pedido::all();  // Obtén los datos necesarios para el PDF

        // Usa la instancia de $pdf para cargar la vista
        $pdf = $pdf->loadView('reportes.pedidos_pdf', compact('pedidos'));
        return $pdf->download('Reporte De Pedidos.pdf');  // Descarga directa del PDF
    }
}
