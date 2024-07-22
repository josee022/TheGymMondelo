<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComentarioForo extends Model
{
    use HasFactory;

    protected $table = 'comentarios_foros';

    protected $fillable = [
        'foro_id', 'usuario_id', 'comentario_id', 'contenido', 'fecha_comentario'
    ];

    public function foro()
    {
        return $this->belongsTo(Foro::class, 'foro_id');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function comentarioPadre()
    {
        return $this->belongsTo(ComentarioForo::class, 'comentario_id');
    }

    public function comentariosHijos()
    {
        return $this->hasMany(ComentarioForo::class, 'comentario_id');
    }
}
