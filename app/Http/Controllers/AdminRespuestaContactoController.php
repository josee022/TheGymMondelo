<?php

namespace App\Http\Controllers;

use App\Mail\RespuestaContactoMailable;
use App\Models\Contacto;
use App\Models\RespuestaContacto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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

        // Crear respuesta en la base de datos
        $respuesta = RespuestaContacto::create([
            'contacto_id' => $id,
            'respuesta' => $request->input('respuesta'),
        ]);

        // Cambiar estado del mensaje a "Contestado"
        $contacto = Contacto::find($id);
        $contacto->estado = 'Contestado';
        $contacto->save();

        // Enviar el correo
        Mail::to($contacto->email)->send(new RespuestaContactoMailable($contacto, $respuesta));

        // Redirigir con mensaje de éxito
        return redirect()->route('admin.contactos.index')->with('success', 'Respuesta enviada correctamente y correo enviado al usuario.');
    }
}
