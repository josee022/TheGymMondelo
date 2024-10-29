<?php


namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $usuarios = User::select('id', 'name', 'email', 'created_at', 'rol', 'suspendido')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Usuarios', [
            'usuarios' => $usuarios,
        ]);
    }


    // Nueva función para mostrar detalles de un usuario específico
    public function show($id)
    {
        $usuario = User::findOrFail($id);

        return Inertia::render('Admin/UsuarioDetalle', [
            'usuario' => $usuario,
        ]);
    }

    public function edit($id)
    {
        $usuario = User::findOrFail($id);

        return Inertia::render('Admin/UsuarioEditar', [
            'usuario' => $usuario
        ]);
    }

    public function update(Request $request, $id)
    {
        $usuario = User::findOrFail($id);

        // Validar todos los campos
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $usuario->id,
            'rol' => 'required|in:admin,cliente',
            'biografia' => 'nullable|string',
            'fecha_nacimiento' => 'nullable|date',
            'sexo' => 'nullable|in:Masculino,Femenino,Otro',
            'altura' => 'nullable|numeric',
            'peso' => 'nullable|numeric',
            'nivel_actividad' => 'nullable|in:Sedentario,Ligero,Moderado,Activo,Muy Activo',
            'puntos' => 'nullable|integer|min:0',
            'password' => 'nullable|confirmed|min:6', // Validar si la contraseña se incluye
        ]);

        // Actualizar los campos del usuario excepto la contraseña
        $usuario->fill($request->except('password', 'password_confirmation'));

        // Solo actualizar la contraseña si se ha introducido una nueva
        if ($request->filled('password')) {
            $usuario->password = Hash::make($request->password);
        }

        $usuario->save();

        return redirect()->route('admin.usuarios')->with('success', 'Usuario actualizado correctamente');
    }

    public function destroy($id)
    {
        $usuario = User::findOrFail($id);
        $usuario->delete();

        return redirect()->route('admin.usuarios')->with('success', 'Usuario eliminado correctamente.');
    }

    public function suspend($id)
    {
        $usuario = User::findOrFail($id);
        $usuario->suspendido = !$usuario->suspendido; // Cambia el estado
        $usuario->save();

        return redirect()->route('admin.usuarios')->with('success', 'Estado de usuario actualizado correctamente.');
    }
}
