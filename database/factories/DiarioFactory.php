<?php

namespace Database\Factories;

use App\Models\Diario;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DiarioFactory extends Factory
{
    protected $model = Diario::class;

    public function definition(): array
    {
        return [
            'usuario_id' => User::factory(),
            'fecha' => $this->faker->date(),
            'ejercicio' => $this->faker->sentence(2),
            'series' => $this->faker->numberBetween(1, 5),
            'repeticiones' => $this->faker->numberBetween(5, 20),
            'peso' => $this->faker->optional()->randomFloat(2, 10, 100),
            'notas' => $this->faker->optional()->sentence(), 
        ];
    }
}
