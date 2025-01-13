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
        // Usuario autenticado
        $user = Auth::user();
        // Obtiene todas las recompensas de la base de datos
        $recompensas = Recompensa::all()->map(function ($recompensa) use ($user) {
            $recompensa->adquirida = $user->recompensas()->where('recompensa_id', $recompensa->id)->exists();
            return $recompensa;
        });

        // Retorna la vista Inertia 'Recompensas/Index' con las recompensas
        return inertia('Recompensas/Index', ['recompensas' => $recompensas]);
    }

    // Método para adquirir una recompensa
    public function adquirir(Request $request, $id)
    {
        $user = Auth::user();
        $recompensa = Recompensa::findOrFail($id);

        // Verificar si el usuario ya tiene esta recompensa
        if ($user->recompensas()->where('recompensa_id', $id)->exists()) {
            return redirect()->back()->with('error', 'Ya has adquirido esta recompensa.');
        }

        // Verificar si el usuario tiene suficientes puntos
        if ($user->puntos < $recompensa->puntos) {
            return redirect()->back()->with('error', 'No tienes suficientes puntos.');
        }

        // Restar los puntos al usuario
        $user->puntos -= $recompensa->puntos;
        $user->save();

        // Asociar la recompensa con el usuario
        $user->recompensas()->attach($recompensa, ['adquirido_en' => now()]);

        return redirect()->route('recompensas.index')->with('success', '¡Has adquirido la recompensa correctamente y se te han restado los puntos!');
    }

    // Método para descargar el archivo PDF de una recompensa adquirida
    public function descargarPdf($id)
    {
        $user = Auth::user();
        $recompensa = Recompensa::findOrFail($id);

        // Verificar si el usuario ha adquirido la recompensa
        if (!$user->recompensas()->where('recompensa_id', $id)->exists()) {
            return back()->with('error', 'No tienes acceso a esta descarga.');
        }

        // Obtener la ruta del PDF
        $pdfPath = public_path($recompensa->ruta_pdf);

        // Verificar si el archivo PDF existe
        if (!file_exists($pdfPath)) {
            return back()->with('error', 'El archivo PDF no está disponible.');
        }

        return response()->download($pdfPath);
    }
}
