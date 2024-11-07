<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use App\Models\RespuestaContacto;
use Illuminate\Http\Request;

class AdminRespuestaContactoController extends Controller
{
    public function create($contactoId)
    {
        $contacto = Contacto::findOrFail($contactoId);
        return inertia('Admin/ResponderContacto', ['contacto' => $contacto]);
    }

    public function store(Request $request, $contactoId)
    {
        $request->validate([
            'respuesta' => 'required|max:1000',
        ]);

        RespuestaContacto::create([
            'contacto_id' => $contactoId,
            'respuesta' => $request->input('respuesta'),
        ]);

        return redirect()->route('admin.contactos.index')->with('success', 'Respuesta enviada con éxito.');
    }
}
