
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactoTable extends Migration
{
    public function up()
    {
        Schema::create('contacto', function (Blueprint $table) {
            $table->id();
            $table->foreignId('usuario_id')->constrained('users')->onDelete('cascade'); // Relación con la tabla de usuarios
            $table->string('nombre');
            $table->string('email');
            $table->string('asunto')->nullable(); // Campo opcional para el asunto
            $table->string('telefono')->nullable(); // Campo opcional para el teléfono
            $table->text('mensaje');
            $table->timestamps(); // Crea los campos created_at y updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('contacto');
    }
}
