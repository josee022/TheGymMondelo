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
        $this->middleware('auth');
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
    public function create()
    {
        $user = auth()->user();
        $isEntrenador = $user->entrenador()->exists();
        $blogs = Blog::with('autor')->orderBy('fecha_publicacion', 'desc')->paginate(2);

        return Inertia::render('Blogs/Create', [
            'auth' => ['user' => $user],
            'isEntrenador' => $isEntrenador,
            'blogs' => $blogs,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
        ]);

        Blog::create([
            'titulo' => $request->titulo,
            'contenido' => $request->contenido,
            'autor_id' => auth()->user()->id,
            'fecha_publicacion' => now(),
        ]);

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
        $this->authorize('update', $blog);

        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
        ]);

        $blog->titulo = $request->titulo;
        $blog->contenido = $request->contenido;
        $blog->save();

        return redirect()->back()->with('success', 'Blog actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        $this->authorize('delete', $blog);

        $blog->delete();

        return redirect()->back()->with('success', 'Blog eliminado exitosamente.');
    }
}
