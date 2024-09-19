<?php

namespace Database\Seeders;

use App\Models\Producto;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productos = [
            ['nombre' => 'Mancuernas 5kg', 'descripcion' => 'Par de mancuernas de 5kg', 'precio' => 25.00, 'stock' => 100],
            ['nombre' => 'Colchoneta Yoga', 'descripcion' => 'Colchoneta antideslizante', 'precio' => 20.00, 'stock' => 50],
            ['nombre' => 'Pesas Rusas 10kg', 'descripcion' => 'Pesa rusa de 10kg', 'precio' => 30.00, 'stock' => 75],
            ['nombre' => 'Bandas de Resistencia', 'descripcion' => 'Set de 3 bandas elásticas', 'precio' => 15.00, 'stock' => 120],
            ['nombre' => 'Rueda Abdominal', 'descripcion' => 'Rueda para ejercicios abdominales', 'precio' => 18.00, 'stock' => 90],
            ['nombre' => 'Botella de Agua 1L', 'descripcion' => 'Botella de agua reutilizable de 1L', 'precio' => 12.00, 'stock' => 150],
            ['nombre' => 'Guantes de Entrenamiento', 'descripcion' => 'Guantes para levantamiento de pesas', 'precio' => 22.00, 'stock' => 80],
            ['nombre' => 'Cuerda para Saltar', 'descripcion' => 'Cuerda ajustable para saltos', 'precio' => 10.00, 'stock' => 130],
            ['nombre' => 'Disco Olímpico 10kg', 'descripcion' => 'Disco olímpico de 10kg', 'precio' => 40.00, 'stock' => 60],
            ['nombre' => 'Cinturón de Peso', 'descripcion' => 'Cinturón para levantamiento de peso', 'precio' => 35.00, 'stock' => 40],
            ['nombre' => 'Pelota de Pilates', 'descripcion' => 'Pelota de ejercicio de 65cm', 'precio' => 25.00, 'stock' => 70],
            ['nombre' => 'Rodillera Deportiva', 'descripcion' => 'Rodillera elástica de soporte', 'precio' => 15.00, 'stock' => 100],
            ['nombre' => 'Rollo de Espuma', 'descripcion' => 'Rollo de espuma para masaje muscular', 'precio' => 28.00, 'stock' => 50],
            ['nombre' => 'Tobilleras con Peso', 'descripcion' => 'Tobilleras ajustables de 2kg cada una', 'precio' => 18.00, 'stock' => 85],
            ['nombre' => 'Barra de Dominadas', 'descripcion' => 'Barra ajustable para dominadas', 'precio' => 45.00, 'stock' => 35]
        ];

        foreach ($productos as $producto) {
            Producto::create($producto);
        }
    }
}
