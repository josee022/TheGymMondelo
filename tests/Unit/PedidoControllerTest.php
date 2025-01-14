<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Pedido;
use App\Models\DetallePedido;
use App\Models\Producto;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PedidoControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function un_usuario_puede_realizar_un_pedido()
    {
        $user = User::factory()->create();
        $producto = Producto::factory()->create(['precio' => 50]);

        $this->actingAs($user);

        $carrito = [
            $producto->id => [
                'id' => $producto->id,
                'nombre' => $producto->nombre,
                'precio' => $producto->precio,
                'cantidad' => 2,
            ],
        ];

        session(['carrito' => $carrito]);

        $response = $this->post('/carrito/pedido');

        $response->assertJson([
            'message' => 'Pedido realizado con éxito',
            'carrito' => [],
        ]);

        $this->assertDatabaseHas('pedidos', [
            'usuario_id' => $user->id,
            'total' => 100,
            'estado' => 'Pendiente',
        ]);
    }

    /** @test */
    public function no_puede_realizar_pedido_si_el_carrito_esta_vacio()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        session(['carrito' => []]);

        $response = $this->post('/carrito/pedido');

        $response->assertJson(['error' => 'No hay productos en el carrito']);
    }

    /** @test */
    public function un_usuario_puede_ver_detalles_de_su_pedido()
    {
        $user = User::factory()->create();
        $pedido = Pedido::factory()->create(['usuario_id' => $user->id]);
        $detalle = DetallePedido::factory()->create(['pedido_id' => $pedido->id]);

        $this->actingAs($user);

        $response = $this->get(route('pedidos.show', $pedido->id));

        $response->assertStatus(200);
        $response->assertSee($pedido->total);
    }
}
