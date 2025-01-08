<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use Barryvdh\DomPDF\PDF;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReporteController extends Controller
{
    // Método para listar pedidos con filtros de estado y usuario
    public function index(Request $request)
    {
        $estado = $request->query('estado'); // Obtiene el filtro de estado de la consulta
        $usuarioId = $request->query('usuario_id'); // Obtiene el filtro de usuario de la consulta

        // Inicializa la consulta de pedidos, incluyendo la relación con el usuario y ordenando por fecha de pedido
        $pedidosQuery = Pedido::with('usuario')
            ->orderBy('fecha_pedido', 'desc');

        // Si se pasa un estado, agrega el filtro correspondiente
        if ($estado) {
            $pedidosQuery->where('estado', $estado);
        }

        // Si se pasa un usuarioId, agrega el filtro correspondiente
        if ($usuarioId) {
            $pedidosQuery->where('usuario_id', $usuarioId);
        }

        // Ejecuta la consulta y obtiene los resultados con paginación, manteniendo los filtros en la URL
        $pedidos = $pedidosQuery->paginate(4)->appends(['estado' => $estado, 'usuario_id' => $usuarioId]);

        // Obtiene la lista de usuarios con sus id y nombre para usarlos en los filtros
        $usuarios = \App\Models\User::select('id', 'name')->get();

        // Retorna la vista de Inertia con los datos necesarios
        return Inertia::render('Admin/ReportesAnalisis', [
            'pedidos' => $pedidos,
            'estados' => ['Pendiente', 'Enviado', 'Entregado', 'Cancelado'], // Lista de estados posibles
            'filtroEstado' => $estado, // Estado del filtro actual
            'usuarios' => $usuarios, // Lista de usuarios para el filtro
            'filtroUsuario' => $usuarioId, // Usuario del filtro actual
        ]);
    }

    // Método para obtener los ingresos mensuales por pedidos
    public function ingresosMensuales()
    {
        // Obtiene los ingresos por mes agrupados por año y mes
        $ingresosPorMes = Pedido::selectRaw("DATE_PART('year', fecha_pedido) as year, DATE_PART('month', fecha_pedido) as month, SUM(total) as ingresos")
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        // Retorna los datos de los ingresos mensuales en formato JSON
        return response()->json($ingresosPorMes);
    }

    // Método para mostrar los detalles de un pedido
    public function showPedido($id)
    {
        // Busca el pedido por su ID, incluyendo los detalles y productos relacionados, así como el usuario
        $pedido = Pedido::with(['detalles.producto', 'usuario'])->findOrFail($id);

        // Retorna la vista para gestionar el pedido con los datos del pedido
        return Inertia::render('Admin/GestionarPedido', [
            'pedido' => $pedido,
            'estados' => ['Pendiente', 'Enviado', 'Entregado', 'Cancelado'], // Los estados posibles para el pedido
        ]);
    }

    // Método para actualizar el estado de un pedido
    public function actualizarEstadoPedido(Request $request, $id)
    {
        // Valida el estado recibido
        $validatedData = $request->validate([
            'estado' => 'required|string|in:Pendiente,Enviado,Entregado,Cancelado',
        ]);

        // Busca el pedido por su ID
        $pedido = Pedido::findOrFail($id);

        // Actualiza el estado del pedido con el valor validado
        $pedido->estado = $validatedData['estado'];
        $pedido->save(); // Guarda los cambios en el pedido

        // Redirige a la vista de detalles del pedido con un mensaje de éxito
        return redirect()->route('admin.pedidos.show', $id)->with('success', 'Estado actualizado con éxito.');
    }

    // Método para generar un PDF con el reporte de pedidos
    public function generarPdf(PDF $pdf)
    {
        // Obtiene todos los pedidos para el reporte
        $pedidos = Pedido::all();

        // Usa la instancia de PDF para cargar una vista con los datos de los pedidos
        $pdf = $pdf->loadView('reportes.pedidos_pdf', compact('pedidos'));

        // Devuelve el archivo PDF generado para ser descargado
        return $pdf->download('Reporte De Pedidos.pdf');
    }
}
