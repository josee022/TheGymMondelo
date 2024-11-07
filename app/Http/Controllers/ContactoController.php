<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactoController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'asunto' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:20',
            'mensaje' => 'required|string',
        ]);

        $data['usuario_id'] = Auth::id();

        Contacto::create($data);

        return response()->json(['message' => 'Mensaje guardado correctamente.']);
    }
}
