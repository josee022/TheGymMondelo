<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdquisicionPrograma extends Model
{
    use HasFactory;

    protected $table = 'adquisiciones_programas';

    protected $fillable = [
        'usuario_id', 'programa_id', 'fecha_adquisicion'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function programa()
    {
        return $this->belongsTo(Programa::class, 'programa_id');
    }
}
