<?php

namespace App\Http\Controllers;

use App\Models\Recompensa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecompensaController extends Controller
{
    public function index()
    {
        $recompensas = Recompensa::all();
        return inertia('Recompensas/Index', ['recompensas' => $recompensas]);
    }

    public function adquirir(Request $request, $id)
    {
        $user = Auth::user();
        $recompensa = Recompensa::findOrFail($id);

        // Comprobar si el usuario tiene puntos suficientes
        if ($user->puntos < $recompensa->puntos) {
            return redirect()->back()->with('error', 'No tienes puntos suficientes para esta recompensa.');
        }

        // Restar los puntos al usuario
        $user->puntos -= $recompensa->puntos;
        $user->save();

        // Cambiar el estado de la recompensa a "adquirido"
        $recompensa->estado = 'adquirido';
        $recompensa->save();

        return redirect()->route('recompensas.index')->with('success', '¡Has adquirido la recompensa correctamente y se te han restado los puntos!');
    }


    public function descargarPdf($id)
    {
        $recompensa = Recompensa::findOrFail($id);

        if ($recompensa->estado !== 'adquirido') {
            return back()->with('error', 'La recompensa aún no ha sido adquirida.');
        }

        $pdfPath = public_path($recompensa->ruta_pdf);

        if (!file_exists($pdfPath)) {
            return back()->with('error', 'El archivo PDF no está disponible.');
        }

        return response()->download($pdfPath);
    }
}
