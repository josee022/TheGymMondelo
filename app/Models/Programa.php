<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programa extends Model
{
    use HasFactory;

    protected $table = 'programas';

    protected $fillable = [
        'nombre', 'descripcion', 'duracion', 'nivel', 'precio'
    ];

    public function adquisiciones()
    {
        return $this->hasMany(AdquisicionPrograma::class, 'programa_id');
    }
}
