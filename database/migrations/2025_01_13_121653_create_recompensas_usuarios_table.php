<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('recompensas_usuarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('recompensa_id')->constrained()->onDelete('cascade');
            $table->timestamp('adquirido_en')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'recompensa_id']);
        });
    }

    public function down(): void {
        Schema::dropIfExists('recompensas_usuarios');
    }
};
