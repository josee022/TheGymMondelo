<?php

use App\Http\Controllers\AdquisicionProgramaController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ClaseController;
use App\Http\Controllers\ComentarioForoController;
use App\Http\Controllers\DietaController;
use App\Http\Controllers\EntrenadorController;
use App\Http\Controllers\ForoController;
use App\Http\Controllers\InicioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgramaController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\SuscripcionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', [ProfileController::class, 'show'])->name('dashboard');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Rutas para inicio
    Route::get('/inicio', [InicioController::class, 'index'])->name('inicio.index');

    // Rutas para entrenadores
    Route::get('/entrenadores', [EntrenadorController::class, 'index'])->name('entrenadores.index');

    // Rutas para las clases
    Route::get('/clases', [ClaseController::class, 'index'])->name('clases.index');
    Route::get('/clases/{id}', [ClaseController::class, 'show'])->name('clases.show');
    Route::post('/clases/{id}/reserve', [ClaseController::class, 'reserve'])->name('clases.reserve');

    // Rutas para reservas
    Route::post('/reservas', [ReservaController::class, 'store'])->name('reservas.store');
    Route::patch('/reservas/{reserva}', [ReservaController::class, 'update'])->name('reservas.update');
    Route::post('/reservas/{reserva}/confirm', [ReservaController::class, 'confirm'])->name('reservas.confirm');
    Route::post('/reservas/{reserva}/cancel', [ReservaController::class, 'cancel'])->name('reservas.cancel');

    // Rutas para blogs
    Route::resource('blogs', BlogController::class);

    // Rutas para foros
    Route::resource('foros', ForoController::class);

    // Rutas para comentarios
    Route::post('/comentarios/{foro}', [ComentarioForoController::class, 'store'])->name('comentarios.store');
    Route::patch('comentarios/{comentarioForo}', [ComentarioForoController::class, 'update'])->name('comentarios.update');
    Route::delete('comentarios/{comentarioForo}', [ComentarioForoController::class, 'destroy'])->name('comentarios.destroy');

    // Rutas para suscripciones
    Route::resource('suscripciones', SuscripcionController::class);

    // Ruta para deshabilitar suscripciones
    Route::post('/suscripciones/{id}/disable', [SuscripcionController::class, 'disable'])->name('suscripciones.disable');

    // Rutas para dietas
    Route::resource('dietas', DietaController::class);

    // Rutas para programas
    Route::resource('programas', ProgramaController::class);
    Route::post('/inscribir-programa', [AdquisicionProgramaController::class, 'inscribir'])->name('inscribir.programa');

    Route::get('/contacto', function () {
        return Inertia::render('Contacto/Index');
    })->name('contacto');

});

require __DIR__ . '/auth.php';
