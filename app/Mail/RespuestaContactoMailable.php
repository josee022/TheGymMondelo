<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RespuestaContactoMailable extends Mailable
{
    use Queueable, SerializesModels;

    public $contacto;
    public $respuesta;

    // Constructor que recibe el contacto y la respuesta
    public function __construct($contacto, $respuesta)
    {
        // Asigna los datos recibidos a las propiedades públicas de la clase
        $this->contacto = $contacto;
        $this->respuesta = $respuesta;
    }

    // Método para configurar el correo
    public function build()
    {
        return $this->subject('Respuesta a tu mensaje en TheGymMondelo') // Establece el asunto del correo
            ->view('emails.respuesta_contacto'); // Define la vista que se usará para mostrar el contenido del correo
    }
}
