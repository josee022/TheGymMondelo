<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $table = 'blogs';

    protected $fillable = [
        'titulo', 'contenido', 'autor_id', 'fecha_publicacion'
    ];

    public function autor()
    {
        return $this->belongsTo(User::class, 'autor_id');
    }
}
