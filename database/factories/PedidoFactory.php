<?php

namespace Database\Factories;

use App\Models\Pedido;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PedidoFactory extends Factory
{
    protected $model = Pedido::class;

    public function definition(): array
    {
        return [
            'usuario_id' => User::factory(),
            'total' => $this->faker->randomFloat(2, 10, 500),
            'estado' => $this->faker->randomElement(['Pendiente', 'Enviado', 'Entregado', 'Cancelado']),
            'fecha_pedido' => now(),
        ];
    }
}
