<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RespuestaContacto extends Model
{
    use HasFactory;

    protected $table = 'respuestas_contacto';

    protected $fillable = ['contacto_id', 'respuesta'];

    public function contacto()
    {
        return $this->belongsTo(Contacto::class);
    }
}
