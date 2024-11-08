<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEstadoToContactoTable extends Migration
{
    public function up()
    {
        Schema::table('contacto', function (Blueprint $table) {
            $table->enum('estado', ['NoContestado', 'Contestado'])->default('NoContestado');
        });
    }

    public function down()
    {
        Schema::table('contacto', function (Blueprint $table) {
            $table->dropColumn('estado');
        });
    }
}
