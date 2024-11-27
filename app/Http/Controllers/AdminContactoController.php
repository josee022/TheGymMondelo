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
        // Obtenemos los términos de búsqueda
        $searchAsunto = $request->input('search_asunto');
        $searchEmail = $request->input('search_email');

        // Consulta para los mensajes no contestados con filtros de búsqueda
        $contactosNoContestados = Contacto::where('estado', 'NoContestado')
            ->when($searchAsunto, function ($query, $searchAsunto) {
                $query->whereRaw('LOWER(asunto) LIKE ?', ['%' . strtolower($searchAsunto) . '%']);
            })
            ->when($searchEmail, function ($query, $searchEmail) {
                $query->whereRaw('LOWER(email) LIKE ?', ['%' . strtolower($searchEmail) . '%']);
            })
            ->paginate(3, ['*'], 'noContestadosPage');

        // Consulta para los mensajes contestados con filtros de búsqueda
        $contactosContestados = Contacto::where('estado', 'Contestado')
            ->when($searchAsunto, function ($query, $searchAsunto) {
                $query->whereRaw('LOWER(asunto) LIKE ?', ['%' . strtolower($searchAsunto) . '%']);
            })
            ->when($searchEmail, function ($query, $searchEmail) {
                $query->whereRaw('LOWER(email) LIKE ?', ['%' . strtolower($searchEmail) . '%']);
            })
            ->paginate(3, ['*'], 'contestadosPage');

        // Lista de correos distintos registrados en la base de datos
        $emailsDistintos = Contacto::select('email')->distinct()->get();

        return Inertia::render('Admin/ContactosIndex', [
            'contactosNoContestados' => $contactosNoContestados,
            'contactosContestados' => $contactosContestados,
            'emailsDistintos' => $emailsDistintos,
            'searchAsunto' => $searchAsunto,
            'searchEmail' => $searchEmail,
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
