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
        $search = $request->input('search'); // Obtenemos el término de búsqueda si existe en la solicitud

        $usuarios = User::select('id', 'name', 'email', 'created_at', 'rol', 'suspendido')
            ->when($search, function ($query, $search) {
                // Si $search tiene un valor, filtramos los usuarios cuyo nombre coincida con el término de búsqueda.
                $query->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($search) . '%']); // LIKE Y % para buscar la letra entera en el array no solo la primera del nombre
            })
            ->orderBy('created_at', 'desc') // Ordenamos los resultados por fecha de creación en orden descendente
            ->paginate(10); // Paginamos los resultados, mostrando 10 usuarios por página

        // Retornamos la vista con los datos de los usuarios y el término de búsqueda actual
        return Inertia::render('Admin/Usuarios', [
            'usuarios' => $usuarios,
            'search' => $search
        ]);
    }




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
            'password' => 'nullable|confirmed|min:6',
            'foto_perfil' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validación de imagen
        ]);

        $usuario->fill($request->except(['password', 'password_confirmation', 'foto_perfil']));

        if ($request->filled('password')) {
            $usuario->password = Hash::make($request->password);
        }

        // Manejo del archivo subido directamente en la carpeta `public/fotos_perfil`
        if ($request->hasFile('foto_perfil')) {
            $file = $request->file('foto_perfil');
            $filename = time() . '_' . $file->getClientOriginalName(); // Nombre único
            $destinationPath = public_path('fotos_perfil');

            // Crear la carpeta si no existe
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            // Mover el archivo a la carpeta
            $file->move($destinationPath, $filename);

            // Eliminar la foto anterior si existe
            if ($usuario->foto_perfil && file_exists(public_path('fotos_perfil/' . $usuario->foto_perfil))) {
                unlink(public_path('fotos_perfil/' . $usuario->foto_perfil));
            }

            // Guardar el nuevo nombre en la base de datos
            $usuario->foto_perfil = $filename;
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
        $usuario->suspendido = !$usuario->suspendido;
        $usuario->save();

        return redirect()->route('admin.usuarios')->with('success', 'Estado de usuario actualizado correctamente.');
    }
}
