<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use Illuminate\Http\Request;

class AdminContactoController extends Controller
{
    public function index()
    {
        $contactos = Contacto::with('usuario')->latest()->paginate(10);
        return inertia('Admin/ContactosIndex', [
            'contactos' => $contactos,
        ]);
    }
}
