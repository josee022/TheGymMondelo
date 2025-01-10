<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactoController extends Controller
{
    public function store(Request $request)
    {
        // Validación de los datos del formulario
        $data = $request->validate([
            'nombre' => 'required|string|max:255', // El nombre es obligatorio y debe ser una cadena de texto de máximo 255 caracteres
            'email' => 'required|email|max:255', // El email es obligatorio y debe ser un email válido
            'asunto' => 'nullable|string|max:255', // El asunto es opcional y debe ser una cadena de texto de máximo 255 caracteres
            'telefono' => 'nullable|string|max:20', // El teléfono es opcional y debe ser una cadena de texto de máximo 20 caracteres
            'mensaje' => 'required|string', // El mensaje es obligatorio y debe ser una cadena de texto
        ]);

        // Asignación del ID del usuario autenticado al mensaje de contacto
        $data['usuario_id'] = Auth::id(); // Se asocia el ID del usuario autenticado al mensaje

        // Creación de un nuevo registro en la base de datos para el mensaje de contacto
        Contacto::create($data);

        // Respuesta JSON confirmando que el mensaje fue guardado correctamente
        return response()->json(['message' => 'Mensaje guardado correctamente.']);
    }
}
