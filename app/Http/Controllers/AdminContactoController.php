<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use App\Models\RespuestaContacto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminContactoController extends Controller
{
    // Muestra la lista de contactos con sus filtros
    public function index(Request $request)
    {
        // Obtenemos los términos de búsqueda de los inputs 'search_asunto' y 'search_email' en la solicitud
        $searchAsunto = $request->input('search_asunto');
        $searchEmail = $request->input('search_email');

        // Consulta para obtener los contactos no contestados con filtros de búsqueda
        $contactosNoContestados = Contacto::where('estado', 'NoContestado')
            // Si existe el filtro 'searchAsunto', aplicamos un filtro en el asunto
            ->when($searchAsunto, function ($query, $searchAsunto) {
                $query->whereRaw('LOWER(asunto) LIKE ?', ['%' . strtolower($searchAsunto) . '%']);
            })
            // Si existe el filtro 'searchEmail', aplicamos un filtro en el correo
            ->when($searchEmail, function ($query, $searchEmail) {
                $query->whereRaw('LOWER(email) LIKE ?', ['%' . strtolower($searchEmail) . '%']);
            })
            // Paginamos los resultados, limitándolos a 3 por página
            ->paginate(3, ['*'], 'noContestadosPage');

        // Consulta para obtener los contactos contestados con filtros de búsqueda
        $contactosContestados = Contacto::where('estado', 'Contestado')
            // Filtro por asunto
            ->when($searchAsunto, function ($query, $searchAsunto) {
                $query->whereRaw('LOWER(asunto) LIKE ?', ['%' . strtolower($searchAsunto) . '%']);
            })
            // Filtro por email
            ->when($searchEmail, function ($query, $searchEmail) {
                $query->whereRaw('LOWER(email) LIKE ?', ['%' . strtolower($searchEmail) . '%']);
            })
            //Odenamos de más reciente a más antiguo porque ya están contestados, los no contestados al contrario para contestar antes a los que contactaron primero.
            ->orderBy('created_at', 'desc')
            // Paginamos los resultados, limitándolos a 3 por página
            ->paginate(3, ['*'], 'contestadosPage');

        // Obtenemos una lista de correos electrónicos distintos registrados
        $emailsDistintos = Contacto::select('email')->distinct()->get();

        // Retorna la vista 'Admin/ContactosIndex' con los datos necesarios
        return Inertia::render('Admin/ContactosIndex', [
            'contactosNoContestados' => $contactosNoContestados,
            'contactosContestados' => $contactosContestados,
            'emailsDistintos' => $emailsDistintos,
            'searchAsunto' => $searchAsunto,
            'searchEmail' => $searchEmail,
        ]);
    }

    // Muestra la respuesta a un contacto específico
    public function verRespuesta($id)
    {
        // Encuentra el contacto con el id proporcionado
        $contacto = Contacto::findOrFail($id);
        // Busca la respuesta correspondiente al contacto
        $respuesta = RespuestaContacto::where('contacto_id', $id)->first();

        // Retorna la vista 'Admin/VerRespuesta' con los datos del contacto y su respuesta
        return Inertia::render('Admin/VerRespuesta', [
            'contacto' => $contacto,
            'respuesta' => $respuesta,
        ]);
    }

    // Método para obtener los contactos no contestados en formato JSON (paginados)
    public function getNoContestados(Request $request)
    {
        // Consulta para obtener los contactos no contestados
        $contactosNoContestados = Contacto::where('estado', 'NoContestado')->paginate(3, ['*'], 'noContestadosPage');
        return response()->json($contactosNoContestados);
    }

    // Método para obtener los contactos contestados en formato JSON (paginados)
    public function getContestados(Request $request)
    {
        // Consulta para obtener los contactos contestados
        $contactosContestados = Contacto::where('estado', 'Contestado')->paginate(3, ['*'], 'contestadosPage');
        return response()->json($contactosContestados);
    }
}
