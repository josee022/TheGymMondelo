<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recompensa extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'descripcion', 'puntos', 'ruta_pdf', 'estado'];

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'recompensas_usuarios')->withTimestamps();
    }
}
