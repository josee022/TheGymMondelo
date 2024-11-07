<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    use HasFactory;

    protected $table = 'contacto';

    protected $fillable = [
        'usuario_id',
        'nombre',
        'email',
        'asunto',
        'telefono',
        'mensaje',
    ];

    // Relación con el modelo User
    public function usuario()
    {
        return $this->belongsTo(User::class);
    }
}
