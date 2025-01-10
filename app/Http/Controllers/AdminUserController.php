<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    // Método para mostrar el listado de usuarios, con filtro de búsqueda opcional
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

    // Método para mostrar los detalles de un usuario específico
    public function show($id)
    {
        $usuario = User::findOrFail($id); // Busca el usuario por ID o lanza una excepción si no se encuentra

        return Inertia::render('Admin/UsuarioDetalle', [
            'usuario' => $usuario, // Pasamos los datos del usuario a la vista
        ]);
    }

    // Método para mostrar el formulario de edición de un usuario
    public function edit($id)
    {
        $usuario = User::findOrFail($id); // Busca el usuario por ID o lanza una excepción si no se encuentra

        return Inertia::render('Admin/UsuarioEditar', [
            'usuario' => $usuario // Pasamos los datos del usuario a la vista para su edición
        ]);
    }

    // Método para actualizar un usuario
    public function update(Request $request, $id)
    {
        $usuario = User::findOrFail($id); // Busca el usuario por ID

        // Validación de los datos del formulario
        $request->validate([
            'name' => 'required|string|max:255', // El nombre es obligatorio y no puede exceder los 255 caracteres
            'email' => 'required|email|max:255|unique:users,email,' . $usuario->id, // El email es obligatorio, único, y no debe coincidir con el del mismo usuario
            'rol' => 'required|in:admin,cliente', // El rol debe ser uno de los valores especificados
            'biografia' => 'nullable|string', // La biografía es opcional
            'fecha_nacimiento' => 'nullable|date', // Fecha de nacimiento opcional
            'sexo' => 'nullable|in:Masculino,Femenino,Otro', // Sexo opcional, con valores específicos
            'altura' => 'nullable|numeric', // Altura opcional, debe ser un número
            'peso' => 'nullable|numeric', // Peso opcional, debe ser un número
            'nivel_actividad' => 'nullable|in:Sedentario,Ligero,Moderado,Activo,Muy Activo', // Nivel de actividad opcional con valores específicos
            'puntos' => 'nullable|integer|min:0', // Puntos opcionales, deben ser un número entero mayor o igual a 0
            'password' => 'nullable|confirmed|min:6', // La contraseña es opcional, pero si se ingresa debe tener al menos 6 caracteres y ser confirmada
            'foto_perfil' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Foto de perfil opcional, debe ser una imagen válida
        ]);

        // Actualizar los campos básicos del usuario
        $usuario->fill($request->except(['password', 'password_confirmation', 'foto_perfil']));

        // Si se proporcionó una nueva contraseña, la actualizamos
        if ($request->filled('password')) {
            $usuario->password = Hash::make($request->password); // Encriptamos la nueva contraseña
        }

        // Manejo de la imagen de perfil
        if ($request->hasFile('foto_perfil')) {
            // Si el usuario tiene una imagen de perfil anterior, la eliminamos
            if ($usuario->foto_perfil && file_exists(public_path('fotos_perfil/' . $usuario->foto_perfil))) {
                unlink(public_path('fotos_perfil/' . $usuario->foto_perfil)); // Elimina la imagen anterior
            }

            // Guardamos la nueva imagen
            $imagen = $request->file('foto_perfil');
            $imagenPath = time() . '_' . $imagen->getClientOriginalName(); // Nombre único para la imagen
            $imagen->move(public_path('fotos_perfil'), $imagenPath); // Mueve la imagen a la carpeta de fotos_perfil

            $usuario->foto_perfil = $imagenPath; // Guardamos la ruta de la nueva imagen
        }

        $usuario->save(); // Guardamos los cambios en la base de datos

        return redirect()
            ->route('admin.usuarios') // Redirige al listado de usuarios
            ->with('success', 'Usuario actualizado con éxito.');
    }

    // Método para eliminar un usuario
    public function destroy($id)
    {
        $usuario = User::findOrFail($id); // Busca el usuario por ID
        $usuario->delete(); // Elimina al usuario de la base de datos

        return redirect()->route('admin.usuarios')->with('success', 'Usuario eliminado correctamente.');
    }

    // Método para suspender o reactivar un usuario
    public function suspend($id)
    {
        $usuario = User::findOrFail($id); // Busca el usuario por ID
        $usuario->suspendido = !$usuario->suspendido; // Cambia el estado de "suspendido"
        $usuario->save(); // Guarda el cambio de estado

        return redirect()->route('admin.usuarios')->with('success', 'Estado de usuario actualizado correctamente.');
    }
}
