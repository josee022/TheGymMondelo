<?php

namespace Database\Factories;

use App\Models\Dieta;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dieta>
 */
class DietaFactory extends Factory
{
    protected $model = Dieta::class;

    public function definition(): array
    {
        return [
            'usuario_id' => User::factory(),
            'objetivo' => $this->faker->randomElement(['Pérdida de peso', 'Ganancia muscular', 'Mantenimiento']),
            'descripcion' => $this->faker->sentence(10),
            'precio' => $this->faker->randomFloat(2, 5, 100), 
        ];
    }
}
