<?php

namespace Database\Factories;

use App\Models\DetallePedido;
use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Database\Eloquent\Factories\Factory;

class DetallePedidoFactory extends Factory
{
    protected $model = DetallePedido::class;

    public function definition(): array
    {
        return [
            'pedido_id' => Pedido::factory(),
            'producto_id' => Producto::factory(),
            'cantidad' => $this->faker->numberBetween(1, 5),
            'precio_unitario' => $this->faker->randomFloat(2, 5, 100), 
        ];
    }
}
