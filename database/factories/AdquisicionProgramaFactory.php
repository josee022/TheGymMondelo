<?php

namespace Database\Factories;

use App\Models\AdquisicionPrograma;
use App\Models\Programa;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AdquisicionPrograma>
 */
class AdquisicionProgramaFactory extends Factory
{
    protected $model = AdquisicionPrograma::class;

    public function definition(): array
    {
        return [
            'usuario_id' => User::factory(),
            'programa_id' => Programa::factory(),
            'fecha_adquisicion' => now(),
        ];
    }
}
