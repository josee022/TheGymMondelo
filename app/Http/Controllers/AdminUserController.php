<?php


namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $usuarios = User::select('id', 'name', 'email', 'created_at', 'rol')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Usuarios', [
            'usuarios' => $usuarios,
        ]);
    }
}
