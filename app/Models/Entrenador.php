<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entrenador extends Model
{
    use HasFactory;

    protected $table = 'entrenadores';

    protected $fillable = [
        'usuario_id', 'especialidad', 'tarifa'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function clases()
    {
        return $this->hasMany(Clase::class, 'entrenador_id');
    }
}
