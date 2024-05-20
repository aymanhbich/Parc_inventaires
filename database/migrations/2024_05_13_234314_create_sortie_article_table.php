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
        Schema::create('sortie_article', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_sortie');
            $table->unsignedBigInteger('id_article');
            $table->integer('quantite')->default(0);
            $table->foreign('id_sortie')->references('id_sortie')->on('sorties')->onDelete('cascade');
            $table->foreign('id_article')->references('id_article')->on('article')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sortie_article');
    }
};
