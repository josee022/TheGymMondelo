<?php

namespace Database\Factories;

use App\Models\Suscripcion;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Suscripcion>
 */
class SuscripcionFactory extends Factory
{
    protected $model = Suscripcion::class;

    public function definition(): array
    {
        $fechaInicio = now();
        $tipo = $this->faker->randomElement(['Mensual', 'Semestral', 'Anual']);
        $fechaFin = match ($tipo) {
            'Mensual' => $fechaInicio->copy()->addMonth(),
            'Semestral' => $fechaInicio->copy()->addMonths(6),
            'Anual' => $fechaInicio->copy()->addYear(),
        };

        return [
            'usuario_id' => User::factory(), 
            'tipo' => $tipo,
            'fecha_inicio' => $fechaInicio,
            'fecha_fin' => $fechaFin,
            'estado' => 'Activa',
        ];
    }
}
