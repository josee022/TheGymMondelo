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
                'fecha' => '2024-10-01',
                'hora_inicio' => '08:00:00',
                'hora_fin' => '09:00:00',
                'entrenador_id' => 1,
                'capacidad' => 20,
            ],
            [
                'nombre' => 'Entrenamiento Funcional',
                'descripcion' => 'Clase intensa de entrenamiento funcional para mejorar la fuerza y la resistencia.',
                'fecha' => '2024-10-02',
                'hora_inicio' => '18:00:00',
                'hora_fin' => '19:30:00',
                'entrenador_id' => 1,
                'capacidad' => 15,
            ],
            [
                'nombre' => 'Spinning',
                'descripcion' => 'Clase cardiovascular de alto impacto, ideal para quemar calorías y mejorar la resistencia.',
                'fecha' => '2024-10-03',
                'hora_inicio' => '07:00:00',
                'hora_fin' => '08:00:00',
                'entrenador_id' => 2,
                'capacidad' => 25,
            ],
            [
                'nombre' => 'Pilates Avanzado',
                'descripcion' => 'Clase avanzada de pilates enfocada en el fortalecimiento del core y la tonificación muscular.',
                'fecha' => '2024-10-04',
                'hora_inicio' => '09:30:00',
                'hora_fin' => '10:30:00',
                'entrenador_id' => 3,
                'capacidad' => 10,
            ],
            [
                'nombre' => 'Zumba',
                'descripcion' => 'Clase divertida de baile con ejercicios aeróbicos, perfecta para mejorar la condición física.',
                'fecha' => '2024-10-05',
                'hora_inicio' => '17:00:00',
                'hora_fin' => '18:00:00',
                'entrenador_id' => 4,
                'capacidad' => 30,
            ],
            [
                'nombre' => 'CrossFit',
                'descripcion' => 'Clase de alta intensidad con ejercicios funcionales para mejorar fuerza y resistencia general.',
                'fecha' => '2024-10-06',
                'hora_inicio' => '19:00:00',
                'hora_fin' => '20:30:00',
                'entrenador_id' => 5,
                'capacidad' => 20,
            ],
        ]);
    }
}
