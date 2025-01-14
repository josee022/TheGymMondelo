<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Recompensa;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class RecompensaControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function puede_ver_la_lista_de_recompensas()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        Recompensa::factory()->create(['nombre' => 'Recompensa VIP']);

        $response = $this->get(route('recompensas.index'));

        $response->assertStatus(200);
        $response->assertSee('Recompensa VIP');
    }

    /** @test */
    public function usuario_puede_adquirir_una_recompensa_si_tiene_suficientes_puntos()
    {
        $user = User::factory()->create(['puntos' => 500]);
        $this->actingAs($user);

        $recompensa = Recompensa::factory()->create(['puntos' => 100]);

        $response = $this->post(route('recompensas.adquirir', $recompensa->id));

        $response->assertRedirect(route('recompensas.index'));
        $this->assertDatabaseHas('recompensas_usuarios', [
            'user_id' => $user->id,
            'recompensa_id' => $recompensa->id,
        ]);
    }

    /** @test */
    public function usuario_no_puede_adquirir_una_recompensa_si_no_tiene_puntos_suficientes()
    {
        $user = User::factory()->create(['puntos' => 50]);
        $this->actingAs($user);

        $recompensa = Recompensa::factory()->create(['puntos' => 100]);

        $response = $this->post(route('recompensas.adquirir', $recompensa->id));

        $response->assertRedirect();
        $response->assertSessionHas('error', 'No tienes suficientes puntos.');
    }

    /** @test */
    public function usuario_no_puede_adquirir_la_misma_recompensa_dos_veces()
    {
        $user = User::factory()->create(['puntos' => 500]);
        $this->actingAs($user);

        $recompensa = Recompensa::factory()->create(['puntos' => 100]);

        DB::table('recompensas_usuarios')->insert([
            'user_id' => $user->id,
            'recompensa_id' => $recompensa->id,
            'adquirido_en' => now(),
        ]);

        $response = $this->post(route('recompensas.adquirir', $recompensa->id));

        $response->assertRedirect();
        $response->assertSessionHas('error', 'Ya has adquirido esta recompensa.');
    }

    /** @test */
    public function usuario_no_puede_descargar_pdf_de_una_recompensa_no_adquirida()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $recompensa = Recompensa::factory()->create();

        $response = $this->get(route('recompensas.descargarPdf', $recompensa->id));

        $response->assertRedirect();
        $response->assertSessionHas('error', 'No tienes acceso a esta descarga.');
    }
}
