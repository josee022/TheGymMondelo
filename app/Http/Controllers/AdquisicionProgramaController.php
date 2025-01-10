<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdquisicionProgramaRequest;
use App\Http\Requests\UpdateAdquisicionProgramaRequest;
use Illuminate\Http\Request;
use App\Models\AdquisicionPrograma;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AdquisicionProgramaController extends Controller
{
    public function inscribir(Request $request)
    {
        $usuario_id = Auth::id(); // Obtener el ID del usuario logueado
        $programa_id = $request->input('programa_id'); // Obtener el ID del programa seleccionado

        // Verificar si el usuario ya está inscrito en un programa
        $inscripcionExistente = AdquisicionPrograma::where('usuario_id', $usuario_id)->first();

        if ($inscripcionExistente) {
            // Si el usuario ya está inscrito, redireccionar con un mensaje de error
            return redirect()->back()->with('error', 'Ya tienes una inscripción en uno de nuestros programas');
        }

        // Crear una nueva inscripción en el programa
        AdquisicionPrograma::create([
            'usuario_id' => $usuario_id,
            'programa_id' => $programa_id,
            'fecha_adquisicion' => now(), // Fecha de inscripción actual
        ]);

        // Redireccionar con un mensaje de éxito
        return redirect()->back()->with('success', 'Inscrito con éxito en el programa');
    }

    public function delete($id)
    {
        // Buscar la adquisición de programa del usuario en base al ID del programa
        $adquisicion = DB::table('adquisiciones_programas')
            ->where('usuario_id', Auth::id()) // Filtrar por el usuario logueado
            ->where('programa_id', $id) // Filtrar por el programa
            ->first();

        if (!$adquisicion) {
            // Si el usuario no tiene esta adquisición, retornar con un error
            return redirect()->back()->withErrors(['No tienes permiso para eliminar esta adquisición de programa.']);
        }

        // Eliminar la adquisición de programa
        DB::table('adquisiciones_programas')
            ->where('id', $adquisicion->id) // Buscar por ID de la adquisición
            ->delete();

        // Redirigir con un mensaje de éxito
        return redirect()->back()->with('success', 'Programa eliminado exitosamente.');
    }
}
