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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = auth()->user();
        $isEntrenador = $user->entrenador()->exists();

        $search = $request->input('search'); // Capturar el término de búsqueda

        $blogs = Blog::with('autor')
            ->when($search, function ($query, $search) {
                $query->where('titulo', 'like', '%' . $search . '%'); // Filtrar por título
            })
            ->orderBy('fecha_publicacion', 'desc')
            ->paginate(2); // Asegurarse de que la paginación funcione correctamente

        return Inertia::render('Blogs/Create', [
            'auth' => ['user' => $user],
            'isEntrenador' => $isEntrenador,
            'blogs' => $blogs,
            'search' => $search, // Enviar el término de búsqueda actual a la vista
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos de entrada.
        $request->validate([
            'titulo' => 'required|string|max:255', // Título requerido, cadena de texto con un máximo de 255 caracteres.
            'contenido' => 'required|string', // Contenido requerido, cadena de texto.
        ]);

        // Crear un nuevo blog con los datos validados.
        Blog::create([
            'titulo' => $request->titulo,
            'contenido' => $request->contenido,
            'autor_id' => auth()->user()->id, // ID del autor (usuario actualmente autenticado).
            'fecha_publicacion' => now(), // Fecha y hora actual.
        ]);

        // Redirigir al usuario a la página de creación de blogs con un mensaje de éxito.
        return redirect()->route('blogs.create')->with('success', 'Blog creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        $this->authorize('update', $blog); // Verificar que el usuario está autorizado para actualizar el blog.

        // Validar los datos de entrada.
        $request->validate([
            'titulo' => 'required|string|max:255', // Título requerido, cadena de texto con un máximo de 255 caracteres.
            'contenido' => 'required|string', // Contenido requerido, cadena de texto.
        ]);

        // Actualizar el blog con los datos validados.
        $blog->titulo = $request->titulo;
        $blog->contenido = $request->contenido;
        $blog->save(); // Guardar los cambios en la base de datos.

        // Redirigir al usuario a la página anterior con un mensaje de éxito.
        return redirect()->back()->with('success', 'Blog actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        $this->authorize('delete', $blog); // Verificar que el usuario está autorizado para eliminar el blog.

        $blog->delete(); // Eliminar el blog de la base de datos.

        // Redirigir al usuario a la página anterior con un mensaje de éxito.
        return redirect()->back()->with('success', 'Blog eliminado exitosamente.');
    }
}
