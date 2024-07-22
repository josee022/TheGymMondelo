<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comentarios_foros', function (Blueprint $table) {
            $table->id();
            $table->foreignId('foro_id')->constrained('foros')->onDelete('cascade');
            $table->foreignId('usuario_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('comentario_id')->nullable()->constrained('comentarios_foros')->onDelete('cascade');
            $table->text('contenido');
            $table->timestamp('fecha_comentario')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comentarios_foros');
    }
};
