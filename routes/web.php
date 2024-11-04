<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminProductoController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AdquisicionProgramaController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ClaseController;
use App\Http\Controllers\ClasesAdminController;
use App\Http\Controllers\ComentarioForoController;
use App\Http\Controllers\DietaController;
use App\Http\Controllers\EntrenadorController;
use App\Http\Controllers\ForoController;
use App\Http\Controllers\GraficaController;
use App\Http\Controllers\InicioController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgramaController;
use App\Http\Controllers\ProgramasAdminController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\SuscripcionController;
use App\Http\Controllers\TrainerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Grupo de rutas de clientes
Route::middleware(['auth', 'client', 'suspension'])->group(function () {

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
    Route::post('/suscripciones/{id}/disable', [SuscripcionController::class, 'disable'])->name('suscripciones.disable');

    // Rutas para dietas
    Route::resource('dietas', DietaController::class);
    Route::post('/dietas/{id}/delete', [DietaController::class, 'delete'])->name('dietas.delete');

    // Rutas para programas
    Route::resource('programas', ProgramaController::class);
    Route::post('/inscribir-programa', [AdquisicionProgramaController::class, 'inscribir'])->name('inscribir.programa');
    Route::post('/programas/{id}/delete', [AdquisicionProgramaController::class, 'delete'])->name('programas.delete');

    // Ruta para la vista de contacto
    Route::get('/contacto', function () {
        return Inertia::render('Contacto/Index');
    })->name('contacto');

    // Rutas para la tienda
    Route::resource('tienda', ProductoController::class);
    Route::post('/carrito/agregar', [PedidoController::class, 'agregarAlCarrito']);
    Route::post('/carrito/actualizar', [PedidoController::class, 'actualizarCarrito']);
    Route::post('/carrito/eliminar', [PedidoController::class, 'eliminarDelCarrito']);
    Route::post('/carrito/pedido', [PedidoController::class, 'realizarPedido']);

    // Ruta para pedidos
    Route::get('/pedidos/{id}/show', [PedidoController::class, 'show'])->name('pedidos.show');
});

// Grupo de rutas de administración
Route::middleware(['auth', 'admin'])->group(function () {

    // Ruta panel de control admin
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

    // Ruta control de usuarios por el admin
    Route::get('/admin/usuarios', [AdminUserController::class, 'index'])->name('admin.usuarios');
    Route::get('/admin/usuarios/{id}', [AdminUserController::class, 'show'])->name('admin.usuarios.show');
    Route::get('/admin/usuarios/{id}/edit', [AdminUserController::class, 'edit'])->name('admin.usuarios.edit');
    Route::put('/admin/usuarios/{id}', [AdminUserController::class, 'update'])->name('admin.usuarios.update');
    Route::delete('/admin/usuarios/{id}', [AdminUserController::class, 'destroy'])->name('admin.usuarios.destroy');
    Route::post('/admin/usuarios/{id}/suspend', [AdminUserController::class, 'suspend'])->name('admin.usuarios.suspend');

    // Rutas de gestión de productos por el admin
    Route::get('/admin/productos', [AdminProductoController::class, 'index'])->name('admin.productos');
    Route::get('/admin/productos/create', [AdminProductoController::class, 'create'])->name('admin.productos.create');
    Route::post('/admin/productos', [AdminProductoController::class, 'store'])->name('admin.productos.store');
    Route::get('/admin/productos/{producto}/edit', [AdminProductoController::class, 'edit'])->name('admin.productos.edit');
    Route::put('/admin/productos/{producto}', [AdminProductoController::class, 'update'])->name('admin.productos.update');
    Route::delete('/admin/productos/{producto}', [AdminProductoController::class, 'destroy'])->name('admin.productos.destroy');

    // Rutas de gestión de reportes y análisis por el admin
    Route::get('/admin/reportes', [ReporteController::class, 'index'])->name('admin.reportes');
    Route::get('/admin/reportes/ingresos-mensuales', [ReporteController::class, 'ingresosMensuales'])->name('admin.reportes.ingresosMensuales');
    Route::get('/admin/pedidos/{id}/gestionar', [ReporteController::class, 'showPedido'])->name('admin.pedidos.show');
    Route::post('/admin/pedidos/{id}/actualizar-estado', [ReporteController::class, 'actualizarEstadoPedido'])->name('admin.pedidos.actualizarEstado');
    Route::get('/admin/reportes/pdf', [ReporteController::class, 'generarPdf'])->name('reportes.pdf');

    // Rutas de gráficas informativas y seguimiento
    Route::get('/admin/graficas', [GraficaController::class, 'index'])->name('admin.graficas');
    Route::get('/admin/graficas/clases-mas-adquiridas', [GraficaController::class, 'clasesMasAdquiridas'])->name('admin.graficas.clasesMasAdquiridas');
    Route::get('/admin/graficas/productos-mas-adquiridos', [GraficaController::class, 'productosMasAdquiridos'])->name('admin.graficas.productosMasAdquiridos');
    Route::get('/admin/graficas/programas-mas-adquiridos', [GraficaController::class, 'programasMasAdquiridos'])->name('admin.graficas.programasMasAdquiridos');
    Route::get('/admin/graficas/suscripciones-mas-adquiridas', [GraficaController::class, 'suscripcionesMasAdquiridas'])->name('admin.graficas.suscripcionesMasAdquiridas');

    // Rutas de gestion de entrenadores por el admin
    Route::get('/admin/mister', [TrainerController::class, 'index'])->name('admin.mister');
    Route::post('/admin/mister/convertir-a-entrenador/{id}', [TrainerController::class, 'convertirEnEntrenador'])->name('admin.mister.convertir');
    Route::delete('/admin/mister/deshabilitar-entrenador/{id}', [TrainerController::class, 'deshabilitarEntrenador'])->name('admin.mister.deshabilitar');
    Route::post('/admin/mister/editar-entrenador/{id}', [TrainerController::class, 'editarEntrenador'])->name('admin.mister.editar');

    // Rutas para gestionar clases por el admin
    Route::get('/admin/clases', [ClasesAdminController::class, 'index'])->name('admin.clases');
    Route::post('/admin/clases', [ClasesAdminController::class, 'store'])->name('admin.clases.store');
    Route::put('/admin/clases/{id}', [ClasesAdminController::class, 'update'])->name('admin.clases.update');
    Route::delete('/admin/clases/{id}', [ClasesAdminController::class, 'destroy'])->name('admin.clases.destroy');

    // Rutas para gestionar programas por el admin
    Route::get('/admin/programas', [ProgramasAdminController::class, 'index'])->name('admin.programas');
    Route::post('/admin/programas', [ProgramasAdminController::class, 'store'])->name('admin.programas.store');
    Route::put('/admin/programas/{id}', [ProgramasAdminController::class, 'update'])->name('admin.programas.update');
    Route::delete('/admin/programas/{id}', [ProgramasAdminController::class, 'destroy'])->name('admin.programas.destroy');
});

// Ruta para usuarios suspendidos
Route::get('/suspendido', [ProfileController::class, 'showSuspended'])->name('usuario.suspendido');

require __DIR__ . '/auth.php';
