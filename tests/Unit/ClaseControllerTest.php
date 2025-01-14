<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Clase;
use App\Models\Reserva;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClaseControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function puede_obtener_la_lista_de_clases_futuras()
    {
        $this->actingAs(User::factory()->create());

        Clase::factory()->create(['fecha' => now()->addDay()]);

        $response = $this->get(route('clases.index'));

        $response->assertStatus(200);
    }

    /** @test */
    public function puede_buscar_clases_por_nombre()
    {
        $this->actingAs(User::factory()->create());

        Clase::factory()->create(['nombre' => 'Yoga Avanzado', 'fecha' => now()->addDay()]);

        $response = $this->get(route('clases.index', ['search' => 'Yoga']));

        $response->assertStatus(200);
        $response->assertSee('Yoga Avanzado');
    }

    /** @test */
    public function puede_ver_los_detalles_de_una_clase()
    {
        $this->actingAs(User::factory()->create());

        $clase = Clase::factory()->create();

        $response = $this->get(route('clases.show', $clase->id));

        $response->assertStatus(200);
        $response->assertSee($clase->nombre);
    }
}
