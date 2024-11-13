<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use App\Models\RespuestaContacto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminContactoController extends Controller
{
    public function index(Request $request)
    {
        // Obtenemos el término de búsqueda si está presente en la solicitud
        $search = $request->input('search');

        // Consulta para los mensajes no contestados con filtro de búsqueda
        $contactosNoContestados = Contacto::where('estado', 'NoContestado')
            ->when($search, function ($query, $search) {
                $query->whereRaw('LOWER(asunto) LIKE ?', ['%' . strtolower($search) . '%']);
            })
            ->paginate(3, ['*'], 'noContestadosPage');

        // Consulta para los mensajes contestados con filtro de búsqueda
        $contactosContestados = Contacto::where('estado', 'Contestado')
            ->when($search, function ($query, $search) {
                $query->whereRaw('LOWER(asunto) LIKE ?', ['%' . strtolower($search) . '%']);
            })
            ->paginate(3, ['*'], 'contestadosPage');

        return Inertia::render('Admin/ContactosIndex', [
            'contactosNoContestados' => $contactosNoContestados,
            'contactosContestados' => $contactosContestados,
            'search' => $search
        ]);
    }

    public function verRespuesta($id)
    {
        $contacto = Contacto::findOrFail($id);
        $respuesta = RespuestaContacto::where('contacto_id', $id)->first();

        return Inertia::render('Admin/VerRespuesta', [
            'contacto' => $contacto,
            'respuesta' => $respuesta,
        ]);
    }

    public function getNoContestados(Request $request)
    {
        $contactosNoContestados = Contacto::where('estado', 'NoContestado')->paginate(3, ['*'], 'noContestadosPage');
        return response()->json($contactosNoContestados);
    }

    public function getContestados(Request $request)
    {
        $contactosContestados = Contacto::where('estado', 'Contestado')->paginate(3, ['*'], 'contestadosPage');
        return response()->json($contactosContestados);
    }
}
