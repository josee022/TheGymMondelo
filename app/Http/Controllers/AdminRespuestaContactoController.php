<?php

namespace App\Http\Controllers;

use App\Mail\RespuestaContactoMailable;
use App\Models\Contacto;
use App\Models\RespuestaContacto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AdminRespuestaContactoController extends Controller
{
    // Muestra el formulario para responder a un contacto específico
    public function create($contactoId)
    {
        // Busca el contacto por su ID
        $contacto = Contacto::findOrFail($contactoId);

        // Renderiza la vista para responder al contacto, pasando el contacto como dato
        return inertia('Admin/ResponderContacto', ['contacto' => $contacto]);
    }

    // Almacena la respuesta al contacto y envía un correo al usuario
    public function store(Request $request, $id)
    {
        // Valida que la respuesta sea obligatoria y tenga un máximo de 1000 caracteres
        $request->validate([
            'respuesta' => 'required|string|max:1000',
        ]);

        // Crea la respuesta en la base de datos
        $respuesta = RespuestaContacto::create([
            'contacto_id' => $id, // Relaciona la respuesta con el contacto
            'respuesta' => $request->input('respuesta'),
        ]);

        // Cambia el estado del contacto a "Contestado"
        $contacto = Contacto::find($id);
        $contacto->estado = 'Contestado';
        $contacto->save(); // Guarda el cambio de estado

        // Envia un correo al usuario con la respuesta utilizando el Mailable
        Mail::to($contacto->email)->send(new RespuestaContactoMailable($contacto, $respuesta));

        // Redirige al listado de contactos con un mensaje de éxito
        return redirect()->route('admin.contactos.index')->with('success', 'Respuesta enviada correctamente y correo enviado al usuario.');
    }
}
