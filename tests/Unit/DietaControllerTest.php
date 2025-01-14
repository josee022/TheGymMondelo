<?php

namespace Tests\Feature;

use App\Models\Dieta;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DietaControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function un_usuario_autenticado_puede_ver_sus_dietas()
    {
        $user = User::factory()->create();
        Dieta::factory()->create(['usuario_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->get(route('dietas.index'));

        $response->assertStatus(200);
        $response->assertSee('usuarioTieneDieta');
    }

    /** @test */
    public function un_usuario_autenticado_puede_crear_una_dieta()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $datos = [
            'objetivo' => 'Pérdida de peso',
            'descripcion' => 'Dieta baja en carbohidratos y alta en proteínas.',
        ];

        $response = $this->post(route('dietas.store'), $datos);

        $response->assertRedirect();
        $this->assertDatabaseHas('dietas', [
            'usuario_id' => $user->id,
            'objetivo' => 'Pérdida de peso',
            'descripcion' => 'Dieta baja en carbohidratos y alta en proteínas.',
        ]);
    }

    /** @test */
    public function un_usuario_no_puede_tener_dos_dietas_activas()
    {
        $user = User::factory()->create();
        Dieta::factory()->create(['usuario_id' => $user->id]);

        $this->actingAs($user);

        $datos = [
            'objetivo' => 'Ganancia muscular',
            'descripcion' => 'Dieta rica en calorías y proteínas.',
        ];

        $response = $this->post(route('dietas.store'), $datos);

        $response->assertRedirect();
        $response->assertSessionHas('error', 'Ya tienes una dieta activa. No puedes adquirir otra.');
    }

    /** @test */
    public function un_usuario_puede_eliminar_su_dieta()
    {
        $user = User::factory()->create();
        $dieta = Dieta::factory()->create(['usuario_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->post(route('dietas.delete', $dieta->id));

        $response->assertRedirect();
        $this->assertDatabaseMissing('dietas', ['id' => $dieta->id]);
    }
}
