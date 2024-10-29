<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => static::$password ??= Hash::make('password'),
            'fecha_nacimiento' => $this->faker->date(),
            'sexo' => $this->faker->randomElement(['Masculino', 'Femenino', 'Otro']),
            'altura' => $this->faker->randomFloat(2, 150, 200),
            'peso' => $this->faker->randomFloat(2, 50, 100),
            'nivel_actividad' => $this->faker->randomElement(['Sedentario', 'Ligero', 'Moderado', 'Activo', 'Muy Activo']),
            'puntos' => $this->faker->numberBetween(0, 100),
            'biografia' => $this->faker->sentence(),
            'rol' => 'cliente',
            'remember_token' => Str::random(10),
        ];
    }


    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
