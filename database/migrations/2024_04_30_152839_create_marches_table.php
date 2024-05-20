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
        Schema::create('marches', function (Blueprint $table) {
            $table->id("id_marche");
            $table->date('date_marche')->nullable(false);
            $table->string('reference')->nullable(false);
            $table->enum('type_marche', ['Marche', 'BC', 'Convention'])->nullable(false);
            $table->string('fournisseur')->nullable();
            $table->string('intitule')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marches');
    }
};
