<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EntrenadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('entrenadores')->insert([
            'usuario_id' => 1,
            'especialidad' => 'Fitness',
            'tarifa' => 50.00,
        ]);
    }
}
