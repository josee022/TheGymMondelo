<?php

namespace App\Http\Controllers;

use App\Models\Recompensa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecompensaController extends Controller
{
    // Método para mostrar todas las recompensas disponibles
    public function index()
    {
        // Obtiene todas las recompensas de la base de datos
        $recompensas = Recompensa::all();

        // Retorna la vista Inertia 'Recompensas/Index' con las recompensas
        return inertia('Recompensas/Index', ['recompensas' => $recompensas]);
    }

    // Método para adquirir una recompensa
    public function adquirir(Request $request, $id)
    {
        // Obtiene el usuario autenticado
        $user = Auth::user();

        // Busca la recompensa por su ID o lanza un error si no se encuentra
        $recompensa = Recompensa::findOrFail($id);

        // Verifica si el usuario tiene puntos suficientes para adquirir la recompensa
        if ($user->puntos < $recompensa->puntos) {
            // Si no tiene puntos suficientes, redirige con un mensaje de error
            return redirect()->back()->with('error', 'No tienes puntos suficientes para esta recompensa.');
        }

        // Resta los puntos de la recompensa del usuario
        $user->puntos -= $recompensa->puntos;
        $user->save();

        // Cambia el estado de la recompensa a "adquirido"
        $recompensa->estado = 'adquirido';
        $recompensa->save();

        // Redirige a la lista de recompensas con un mensaje de éxito
        return redirect()->route('recompensas.index')->with('success', '¡Has adquirido la recompensa correctamente y se te han restado los puntos!');
    }

    // Método para descargar el archivo PDF de una recompensa adquirida
    public function descargarPdf($id)
    {
        // Busca la recompensa por su ID o lanza un error si no se encuentra
        $recompensa = Recompensa::findOrFail($id);

        // Verifica si la recompensa ha sido adquirida
        if ($recompensa->estado !== 'adquirido') {
            // Si la recompensa no ha sido adquirida, redirige con un mensaje de error
            return back()->with('error', 'La recompensa aún no ha sido adquirida.');
        }

        // Obtiene la ruta del archivo PDF de la recompensa
        $pdfPath = public_path($recompensa->ruta_pdf);

        // Verifica si el archivo PDF existe
        if (!file_exists($pdfPath)) {
            // Si el archivo no existe, redirige con un mensaje de error
            return back()->with('error', 'El archivo PDF no está disponible.');
        }

        // Si el archivo existe, devuelve el archivo PDF para ser descargado
        return response()->download($pdfPath);
    }
}
