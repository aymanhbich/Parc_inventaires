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
        Schema::create('livraison_article', function (Blueprint $table) {
            $table->id('id_livraison_article');
            $table->unsignedBigInteger('id_livraison');
            $table->unsignedBigInteger('id_article');
            $table->integer('quantite')->nullable();
            $table->foreign('id_livraison')->references('id_livraison')->on('livraisons')->onDelete('cascade');
            $table->foreign('id_article')->references('id_article')->on('article')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livraison_article');
    }
};
