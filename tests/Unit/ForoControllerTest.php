<?php

namespace Tests\Feature;

use App\Models\Foro;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ForoControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function un_usuario_autenticado_puede_crear_un_foro()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $datos = [
            'titulo' => 'Mi primer foro',
            'contenido' => 'Este es el contenido de prueba.',
        ];

        $response = $this->post(route('foros.store'), $datos);

        $response->assertRedirect(route('foros.index'));
        $this->assertDatabaseHas('foros', array_merge($datos, ['usuario_id' => $user->id]));
    }

    /** @test */
    public function un_usuario_autenticado_puede_actualizar_su_foro()
    {
        $user = User::factory()->create();
        $foro = Foro::factory()->create(['usuario_id' => $user->id]);

        $this->actingAs($user);

        $nuevosDatos = [
            'titulo' => 'Título actualizado',
            'contenido' => 'Nuevo contenido actualizado',
        ];

        $response = $this->put(route('foros.update', $foro->id), $nuevosDatos);

        $response->assertRedirect();
        $this->assertDatabaseHas('foros', array_merge($nuevosDatos, ['id' => $foro->id]));
    }

    /** @test */
    public function un_usuario_autenticado_puede_eliminar_su_foro()
    {
        $user = User::factory()->create();
        $foro = Foro::factory()->create(['usuario_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->delete(route('foros.destroy', $foro->id));

        $response->assertRedirect();
        $this->assertDatabaseMissing('foros', ['id' => $foro->id]);
    }

    /** @test */
    public function un_usuario_no_puede_eliminar_un_foro_de_otro_usuario()
    {
        $user = User::factory()->create();
        $otroUsuario = User::factory()->create();
        $foro = Foro::factory()->create(['usuario_id' => $otroUsuario->id]);

        $this->actingAs($user);

        $response = $this->delete(route('foros.destroy', $foro->id));

        $response->assertForbidden();
        $this->assertDatabaseHas('foros', ['id' => $foro->id]);
    }
}
