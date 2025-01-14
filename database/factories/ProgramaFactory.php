<?php

namespace Database\Factories;

use App\Models\Programa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Programa>
 */
class ProgramaFactory extends Factory
{
    protected $model = Programa::class;

    public function definition(): array
    {
        return [
            'nombre' => $this->faker->word(),
            'descripcion' => $this->faker->sentence(10),
            'duracion' => $this->faker->numberBetween(4, 12),
            'nivel' => $this->faker->randomElement(['Principiante', 'Intermedio', 'Avanzado']),
            'precio' => $this->faker->randomFloat(2, 10, 500),
        ];
    }
}
