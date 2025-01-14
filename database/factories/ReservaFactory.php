<?php

namespace Database\Factories;

use App\Models\Reserva;
use App\Models\User;
use App\Models\Clase;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReservaFactory extends Factory
{
    protected $model = Reserva::class;

    public function definition(): array
    {
        return [
            'usuario_id' => User::factory(),
            'clase_id' => Clase::factory(),  
            'fecha_reserva' => now(),
            'estado' => $this->faker->randomElement(['Pendiente', 'Confirmada', 'Cancelada']),
        ];
    }
}
