<?php

namespace Tests\Feature;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BlogControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function un_usuario_autenticado_puede_crear_un_blog()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $datos = [
            'titulo' => 'Mi primer blog',
            'contenido' => 'Este es el contenido de prueba.',
        ];

        $response = $this->post(route('blogs.store'), $datos);

        $response->assertRedirect(route('blogs.create'));
        $this->assertDatabaseHas('blogs', array_merge($datos, ['autor_id' => $user->id]));
    }

    /** @test */
    public function un_usuario_autenticado_puede_actualizar_su_blog()
    {
        $user = User::factory()->create();
        $blog = Blog::factory()->create(['autor_id' => $user->id]);

        $this->actingAs($user);

        $nuevosDatos = [
            'titulo' => 'Título actualizado',
            'contenido' => 'Nuevo contenido actualizado',
        ];

        $response = $this->put(route('blogs.update', $blog->id), $nuevosDatos);

        $response->assertRedirect();
        $this->assertDatabaseHas('blogs', array_merge($nuevosDatos, ['id' => $blog->id]));
    }

    /** @test */
    public function un_usuario_autenticado_puede_eliminar_su_blog()
    {
        $user = User::factory()->create();
        $blog = Blog::factory()->create(['autor_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->delete(route('blogs.destroy', $blog->id));

        $response->assertRedirect();
        $this->assertDatabaseMissing('blogs', ['id' => $blog->id]);
    }

    /** @test */
    public function un_usuario_no_puede_eliminar_un_blog_de_otro_usuario()
    {
        $user = User::factory()->create();
        $otroUsuario = User::factory()->create();
        $blog = Blog::factory()->create(['autor_id' => $otroUsuario->id]);

        $this->actingAs($user);

        $response = $this->delete(route('blogs.destroy', $blog->id));

        $response->assertForbidden();
        $this->assertDatabaseHas('blogs', ['id' => $blog->id]);
    }
}
