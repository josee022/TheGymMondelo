<?php

namespace Database\Factories;

use App\Models\Recompensa;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecompensaFactory extends Factory
{
    protected $model = Recompensa::class;

    public function definition(): array
    {
        return [
            'nombre' => $this->faker->word(),
            'descripcion' => $this->faker->sentence(),
            'puntos' => $this->faker->numberBetween(10, 500),
            'ruta_pdf' => 'recompensas/example.pdf',
            'estado' => 'disponible',
        ];
    }
}
