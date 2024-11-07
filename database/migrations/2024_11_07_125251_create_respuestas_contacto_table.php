<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRespuestasContactoTable extends Migration
{
    public function up()
    {
        Schema::create('respuestas_contacto', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contacto_id')->constrained('contacto')->onDelete('cascade');
            $table->text('respuesta');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('respuestas_contacto');
    }
}
