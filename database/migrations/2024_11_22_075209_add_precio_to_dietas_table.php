<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('dietas', function (Blueprint $table) {
            $table->decimal('precio', 8, 2)->default(0.00)->after('descripcion');
        });
    }

    public function down()
    {
        Schema::table('dietas', function (Blueprint $table) {
            $table->dropColumn('precio');
        });
    }
};
