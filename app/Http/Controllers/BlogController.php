<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BlogController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth'); // Aplica el middleware de autenticación a todas las acciones del controlador.
    }

    public function create(Request $request)
    {
        // Obtener el usuario actualmente autenticado
        $user = auth()->user();
        // Verificar si el usuario es un "entrenador"
        $isEntrenador = $user->entrenador()->exists();

        // Obtener el término de búsqueda desde la solicitud
        $search = $request->input('search');

        // Obtener blogs con relación al autor y filtrados por el título si se proporciona un término de búsqueda
        $blogs = Blog::with('autor')
            ->when($search, function ($query, $search) {
                $query->where('titulo', 'like', '%' . $search . '%');
            })
            ->orderBy('fecha_publicacion', 'desc') // Ordenar los blogs por la fecha de publicación, de forma descendente
            ->paginate(2); // Paginación de los blogs

        // Retornar la vista con los datos necesarios
        return Inertia::render('Blogs/Create', [
            'auth' => ['user' => $user],
            'isEntrenador' => $isEntrenador,
            'blogs' => $blogs,
            'search' => $search, // Enviar el término de búsqueda actual a la vista
        ]);
    }

    public function store(Request $request)
    {
        // Validar los datos del formulario de creación
        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
        ]);

        // Crear un nuevo blog con los datos del formulario
        Blog::create([
            'titulo' => $request->titulo,
            'contenido' => $request->contenido,
            'autor_id' => auth()->user()->id, // ID del autor (usuario autenticado)
            'fecha_publicacion' => now(), // Fecha y hora actuales
        ]);

        // Redirigir al usuario con un mensaje de éxito
        return redirect()->route('blogs.create')->with('success', 'Blog creado exitosamente.');
    }

    public function update(Request $request, Blog $blog)
    {
        // Verificar que el usuario está autorizado para editar este blog
        $this->authorize('update', $blog);

        // Validar los datos del formulario de edición
        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
        ]);

        // Actualizar los campos del blog con los datos validados
        $blog->titulo = $request->titulo;
        $blog->contenido = $request->contenido;
        $blog->save(); // Guardar los cambios

        // Redirigir al usuario con un mensaje de éxito
        return redirect()->back()->with('success', 'Blog actualizado exitosamente.');
    }

    public function destroy(Blog $blog)
    {
        // Verificar que el usuario está autorizado para eliminar este blog
        $this->authorize('delete', $blog);

        // Eliminar el blog de la base de datos
        $blog->delete();

        // Redirigir al usuario con un mensaje de éxito
        return redirect()->back()->with('success', 'Blog eliminado exitosamente.');
    }
}
