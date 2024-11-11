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

    public function __construct($contacto, $respuesta)
    {
        $this->contacto = $contacto;
        $this->respuesta = $respuesta;
    }

    public function build()
    {
        return $this->subject('Respuesta a tu mensaje en TheGymMondelo')
            ->view('emails.respuesta_contacto');
    }
}
