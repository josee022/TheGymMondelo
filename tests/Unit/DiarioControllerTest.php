<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Diario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DiarioControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function puede_ver_la_pagina_del_diario()
    {
        $this->actingAs(User::factory()->create());

        $response = $this->get(route('diario.index'));

        $response->assertStatus(200);
    }

    /** @test */
    public function puede_guardar_un_nuevo_ejercicio()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $datos = Diario::factory()->make()->toArray(); 

        $response = $this->post(route('diario.store'), $datos);

        $response->assertRedirect(route('diario.index'));
        $this->assertDatabaseHas('diarios', [
            'usuario_id' => $user->id,
            'ejercicio' => $datos['ejercicio'],
        ]);
    }

    /** @test */
    public function muestra_el_historial_de_ejercicios()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        Diario::factory()->create(['usuario_id' => $user->id, 'ejercicio' => 'Press de banca']);

        $response = $this->get(route('diario.historial'));

        $response->assertStatus(200);
        $response->assertSee('Press de banca');
    }

    /** @test */
    public function permite_actualizar_un_ejercicio()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $diario = Diario::factory()->create(['usuario_id' => $user->id]);

        $nuevosDatos = [
            'fecha' => now()->format('Y-m-d'),
            'ejercicio' => 'Sentadillas',
            'series' => 4,
            'repeticiones' => 12,
            'peso' => 80.5,
            'notas' => 'Mejorar técnica',
        ];

        $response = $this->put(route('diario.update', $diario->id), $nuevosDatos);

        $response->assertRedirect(route('diario.historial'));
        $this->assertDatabaseHas('diarios', ['id' => $diario->id, 'ejercicio' => 'Sentadillas']);
    }

    /** @test */
    public function permite_eliminar_un_ejercicio()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $diario = Diario::factory()->create(['usuario_id' => $user->id]);

        $response = $this->delete(route('diario.destroy', $diario->id));

        $response->assertRedirect(route('diario.historial'));
        $this->assertDatabaseMissing('diarios', ['id' => $diario->id]);
    }

    /** @test */
    public function puede_obtener_mensaje_motivacional()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        Diario::factory()->create(['usuario_id' => $user->id]);

        $response = $this->get(route('diario.mensaje.motivacional'));

        $response->assertStatus(200);
        $response->assertJsonStructure(['mensaje']);
    }
}
