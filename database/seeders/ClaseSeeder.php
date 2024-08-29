<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('clases')->insert([
            [
                'nombre' => 'Yoga Matutino',
                'descripcion' => 'Clase de yoga para principiantes enfocada en la flexibilidad y la relajación.',
                'fecha' => '2024-09-01',
                'hora_inicio' => '08:00:00',
                'hora_fin' => '09:00:00',
                'entrenador_id' => 1,
                'capacidad' => 20,
            ],
            [
                'nombre' => 'Entrenamiento Funcional',
                'descripcion' => 'Clase intensa de entrenamiento funcional para mejorar la fuerza y la resistencia.',
                'fecha' => '2024-09-02',
                'hora_inicio' => '18:00:00',
                'hora_fin' => '19:30:00',
                'entrenador_id' => 1,
                'capacidad' => 15,
            ],
        ]);
    }
}
