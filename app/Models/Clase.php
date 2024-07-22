<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clase extends Model
{
    use HasFactory;

    protected $table = 'clases';

    protected $fillable = [
        'nombre', 'descripcion', 'fecha', 'hora_inicio', 'hora_fin', 'entrenador_id', 'capacidad'
    ];

    public function reservas()
    {
        return $this->hasMany(Reserva::class, 'clase_id');
    }

    public function entrenador()
    {
        return $this->belongsTo(Entrenador::class, 'entrenador_id');
    }
}
