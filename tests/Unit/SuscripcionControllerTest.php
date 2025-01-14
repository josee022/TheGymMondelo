<?php

namespace Tests\Feature;

use App\Models\Suscripcion;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SuscripcionControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function un_usuario_autenticado_puede_ver_sus_suscripciones()
    {
        $user = User::factory()->create();
        Suscripcion::factory()->create(['usuario_id' => $user->id, 'estado' => 'Activa']);

        $this->actingAs($user);

        $response = $this->get(route('suscripciones.index'));

        $response->assertStatus(200);
        $response->assertSee('usuarioTieneSuscripcion');
    }

    /** @test */
    public function un_usuario_autenticado_puede_suscribirse()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $datos = [
            'tipo' => 'Mensual',
        ];

        $response = $this->post(route('suscripciones.store'), $datos);

        $response->assertRedirect(route('suscripciones.index'));
        $this->assertDatabaseHas('suscripciones', [
            'usuario_id' => $user->id,
            'tipo' => 'Mensual',
            'estado' => 'Activa',
        ]);
    }

    /** @test */
    public function un_usuario_no_puede_tener_dos_suscripciones_activas()
    {
        $user = User::factory()->create();
        Suscripcion::factory()->create(['usuario_id' => $user->id, 'estado' => 'Activa']);

        $this->actingAs($user);

        $datos = [
            'tipo' => 'Anual',
        ];

        $response = $this->post(route('suscripciones.store'), $datos);

        $response->assertRedirect();
        $response->assertSessionHas('error', 'Ya tienes una suscripción activa.');
    }

    /** @test */
    public function un_usuario_puede_deshabilitar_su_suscripcion()
    {
        $user = User::factory()->create();
        $suscripcion = Suscripcion::factory()->create(['usuario_id' => $user->id, 'estado' => 'Activa']);

        $this->actingAs($user);

        $response = $this->post(route('suscripciones.disable', $suscripcion->id));

        $response->assertRedirect();
        $this->assertDatabaseHas('suscripciones', [
            'id' => $suscripcion->id,
            'estado' => 'Inactiva',
        ]);
    }
}
