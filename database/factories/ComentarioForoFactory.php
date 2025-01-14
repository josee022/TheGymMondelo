<?php

namespace Database\Factories;

use App\Models\ComentarioForo;
use App\Models\Foro;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ComentarioForo>
 */
class ComentarioForoFactory extends Factory
{
    protected $model = ComentarioForo::class;

    public function definition(): array
    {
        return [
            'foro_id' => Foro::factory(),
            'usuario_id' => User::factory(),
            'comentario_id' => null,
            'contenido' => $this->faker->paragraph,
            'fecha_comentario' => now(),
        ];
    }
}
