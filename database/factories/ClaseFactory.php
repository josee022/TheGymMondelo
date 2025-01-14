<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Clase>
 */
class ClaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => fake()->word(),
            'descripcion' => fake()->sentence(),
            'fecha' => now()->addDays(rand(1, 30)),
            'hora_inicio' => now()->format('H:i:s'),
            'hora_fin' => now()->addHour()->format('H:i:s'),
            'entrenador_id' => \App\Models\Entrenador::factory(),
            'capacidad' => fake()->numberBetween(5, 20),
        ];
    }
}
