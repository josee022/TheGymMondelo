<?php

namespace Database\Factories;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    protected $model = Blog::class;

    public function definition(): array
    {
        return [
            'titulo' => $this->faker->sentence,
            'contenido' => $this->faker->paragraphs(3, true),
            'autor_id' => User::factory(),
            'fecha_publicacion' => now(),
        ];
    }
}
