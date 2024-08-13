<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InicioController extends Controller
{
    public function index()
    {
        $blogs = Blog::with('autor')->get();

        return Inertia::render('Inicio', [
            'auth' => auth()->user(),
            'blogs' => $blogs
        ]);
    }
}
