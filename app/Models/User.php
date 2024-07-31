<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', 'email', 'password', 'fecha_nacimiento', 'sexo', 'altura', 'peso', 'nivel_actividad', 'puntos','biografia',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    protected $table = 'users';

    public function reservas()
    {
        return $this->hasMany(Reserva::class, 'usuario_id');
    }

    public function suscripciones()
    {
        return $this->hasMany(Suscripcion::class, 'usuario_id');
    }

    public function entrenador()
    {
        return $this->hasOne(Entrenador::class, 'usuario_id');
    }

    public function programasAdquiridos()
    {
        return $this->hasMany(AdquisicionPrograma::class, 'usuario_id');
    }

    public function blogs()
    {
        return $this->hasMany(Blog::class, 'autor_id');
    }

    public function foros()
    {
        return $this->hasMany(Foro::class, 'usuario_id');
    }

    public function comentariosForo()
    {
        return $this->hasMany(ComentarioForo::class, 'usuario_id');
    }

    public function pedidos()
    {
        return $this->hasMany(Pedido::class, 'usuario_id');
    }

    public function dietas()
    {
        return $this->hasMany(Dieta::class, 'usuario_id');
    }

    public function diariosEntrenamiento()
    {
        return $this->hasMany(Diario::class, 'usuario_id');
    }
}
