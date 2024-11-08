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

    public function store(Request $request, $id)
    {
        $request->validate([
            'respuesta' => 'required|string|max:1000',
        ]);

        // Crear respuesta
        RespuestaContacto::create([
            'contacto_id' => $id,
            'respuesta' => $request->input('respuesta'),
        ]);

        // Cambiar estado del mensaje a "Contestado"
        $contacto = Contacto::find($id);
        $contacto->estado = 'Contestado';
        $contacto->save();

        return redirect()->route('admin.contactos.index')->with('success', 'Respuesta enviada correctamente.');
    }
}
