<?php

namespace Database\Factories;

use App\Models\Foro;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Foro>
 */
class ForoFactory extends Factory
{
    protected $model = Foro::class;

    public function definition(): array
    {
        return [
            'titulo' => $this->faker->sentence,
            'contenido' => $this->faker->paragraphs(3, true),
            'usuario_id' => User::factory(),
            'fecha_publicacion' => now(),
        ];
    }
}
