<?php

namespace Database\Seeders;

use App\Models\Recompensa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RecompensasSeeder extends Seeder
{
    public function run()
    {
        $recompensas = [
            [
                'nombre' => 'Plan de entrenamiento semanal de bombeo muscular',
                'descripcion' => 'Un plan de entrenamiento de bombeo para maximizar el desarrollo muscular. Enfocado en grandes volúmenes de repeticiones para activar todos los músculos.',
                'puntos' => 50,
                'ruta_pdf' => 'pdfs/PlanDeEntrenamientoSemanalBombeo.pdf',
                'estado' => 'disponible',
            ],
            [
                'nombre' => 'Plan de entrenamiento semanal de carga progresiva',
                'descripcion' => 'Un plan de entrenamiento de carga para aumentar tu masa muscular. Enfocado en la carga de peso en cada ejercicio a un menor número de repeticiones para romper fibras.',
                'puntos' => 50,
                'ruta_pdf' => 'pdfs/PlanDeEntrenamientoSemanalCarga.pdf',
                'estado' => 'disponible',
            ],
            [
                'nombre' => 'Plan de entrenamiento semanal de aumento muscular',
                'descripcion' => 'Programa completo de entrenamiento de musculatura centrado en fuerza e hipertrofia. Ideal para quienes buscan ganar masa muscular de manera eficiente.',
                'puntos' => 60,
                'ruta_pdf' => 'pdfs/PlanDeEntrenamientoSemanalMusculatura.pdf',
                'estado' => 'disponible',
            ],
            [
                'nombre' => 'Plan de entrenamiento semanal de triseries',
                'descripcion' => 'Entrenamiento avanzado de triseries para aumentar la intensidad y acelerar el progreso muscular. Consiste en tres ejercicios enlazados para mayor eficiencia.',
                'puntos' => 60,
                'ruta_pdf' => 'pdfs/PlanDeEntrenamientoSemanalTriseries.pdf',
                'estado' => 'disponible',
            ],
            [
                'nombre' => 'Plan de entrenameinto semanal de super series',
                'descripcion' => 'Programa de entrenamiento basado en superseries de dos ejercicios para mejorar la resistencia muscular y el crecimiento. Ideal para quienes buscan mayor intensidad.',
                'puntos' => 50,
                'ruta_pdf' => 'pdfs/PlanDeEntrenamientoSemanalSuperSeries.pdf',
                'estado' => 'disponible',
            ],
            [
                'nombre' => 'Plan de entrenamiento semanal de rest pause',
                'descripcion' => 'Entrenamiento con la técnica de rest-pause para aumentar la fuerza y la masa muscular. Basado en series al fallo con descansos mínimos entre ellas.',
                'puntos' => 70,
                'ruta_pdf' => 'pdfs/PlanDeEntrenamientoSemanalRestPause.pdf',
                'estado' => 'disponible',
            ],
        ];

        foreach ($recompensas as $recompensa) {
            Recompensa::create($recompensa);
        }
    }
}
