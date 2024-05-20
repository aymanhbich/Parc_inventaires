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
        Schema::create('livraisons', function (Blueprint $table) {
            $table->id('id_livraison');
            $table->date('date_livraison')->nullable();
            $table->string('num_bl')->unique();
            $table->string('reference')->nullable();
            $table->unsignedBigInteger('id_agent')->nullable();
            $table->enum('type_BL', ['Marche', 'BC', 'Convention'])->nullable(false);
            $table->foreign('id_agent')->references('id_agent')->on('agents')->onDelete('cascade');
            $table->string('commentaire',255)->nullable();
            $table->unsignedBigInteger('id_marche')->nullable();
            $table->foreign('id_marche')->references('id_marche')->on('marches')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livraisons');
    }
};
