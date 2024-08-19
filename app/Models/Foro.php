<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Foro extends Model
{
    use HasFactory;

    protected $table = 'foros';

    protected $fillable = [
        'titulo', 'contenido', 'usuario_id', 'fecha_publicacion'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function comentarios()
    {
        return $this->hasMany(ComentarioForo::class, 'foro_id')->with('usuario', 'respuestas');
    }
}
