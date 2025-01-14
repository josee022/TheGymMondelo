<?php

namespace Tests\Feature;

use App\Models\AdquisicionPrograma;
use App\Models\Programa;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdquisicionProgramaControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function un_usuario_puede_inscribirse_en_un_programa()
    {
        $user = User::factory()->create();
        $programa = Programa::factory()->create();

        $this->actingAs($user);

        $response = $this->post(route('inscribir.programa'), ['programa_id' => $programa->id]);

        $response->assertRedirect();
        $this->assertDatabaseHas('adquisiciones_programas', [
            'usuario_id' => $user->id,
            'programa_id' => $programa->id,
        ]);
    }

    /** @test */
    public function un_usuario_no_puede_inscribirse_en_dos_programas()
    {
        $user = User::factory()->create();
        $programa1 = Programa::factory()->create();
        $programa2 = Programa::factory()->create();

        AdquisicionPrograma::factory()->create([
            'usuario_id' => $user->id,
            'programa_id' => $programa1->id,
        ]);

        $this->actingAs($user);

        $response = $this->post(route('inscribir.programa'), ['programa_id' => $programa2->id]);

        $response->assertRedirect();
        $response->assertSessionHas('error', 'Ya tienes una inscripción en uno de nuestros programas');
    }

    /** @test */
    public function un_usuario_puede_eliminar_su_inscripcion()
    {
        $user = User::factory()->create();
        $programa = Programa::factory()->create();
        $adquisicion = AdquisicionPrograma::factory()->create([
            'usuario_id' => $user->id,
            'programa_id' => $programa->id,
        ]);

        $this->actingAs($user);

        $response = $this->post(route('programas.delete', $programa->id));

        $response->assertRedirect();
        $this->assertDatabaseMissing('adquisiciones_programas', ['id' => $adquisicion->id]);
    }
}
