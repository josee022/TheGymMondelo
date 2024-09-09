<?php

namespace Database\Seeders;

use App\Models\Programa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProgramaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $programas = [
            [
                'nombre' => 'Fuerza Inicial',
                'descripcion' => 'Un programa diseñado para aquellos que quieren comenzar a desarrollar fuerza básica.',
                'duracion' => 8,
                'nivel' => 'Principiante',
                'precio' => 49.99,
            ],
            [
                'nombre' => 'Hipertrofia Avanzada',
                'descripcion' => 'Este programa está diseñado para quienes desean maximizar el crecimiento muscular.',
                'duracion' => 12,
                'nivel' => 'Avanzado',
                'precio' => 79.99,
            ],
            [
                'nombre' => 'Resistencia Total',
                'descripcion' => 'Mejora tu resistencia física y cardiovascular con este programa de 10 semanas.',
                'duracion' => 10,
                'nivel' => 'Intermedio',
                'precio' => 59.99,
            ],
            [
                'nombre' => 'CrossFit Intensivo',
                'descripcion' => 'Programa de CrossFit para quienes buscan un desafío de alta intensidad.',
                'duracion' => 6,
                'nivel' => 'Avanzado',
                'precio' => 89.99,
            ],
            [
                'nombre' => 'Entrenamiento Funcional',
                'descripcion' => 'Desarrolla fuerza y movilidad con ejercicios funcionales.',
                'duracion' => 8,
                'nivel' => 'Intermedio',
                'precio' => 54.99,
            ],
            [
                'nombre' => 'Pilates y Flexibilidad',
                'descripcion' => 'Programa enfocado en mejorar la flexibilidad y la fuerza del núcleo.',
                'duracion' => 6,
                'nivel' => 'Principiante',
                'precio' => 44.99,
            ],
            [
                'nombre' => 'Cardio Express',
                'descripcion' => 'Un programa rápido de cardio de 4 semanas para quemar grasa.',
                'duracion' => 4,
                'nivel' => 'Principiante',
                'precio' => 39.99,
            ],
            [
                'nombre' => 'Entrenamiento HIIT',
                'descripcion' => 'Alta intensidad en intervalos cortos para maximizar la quema de calorías.',
                'duracion' => 6,
                'nivel' => 'Intermedio',
                'precio' => 49.99,
            ],
            [
                'nombre' => 'Yoga Restaurativo',
                'descripcion' => 'Un programa relajante de 8 semanas para reducir el estrés y mejorar la flexibilidad.',
                'duracion' => 8,
                'nivel' => 'Principiante',
                'precio' => 34.99,
            ],

        ];

        foreach ($programas as $programa) {
            Programa::create($programa);
        }
    }
}
