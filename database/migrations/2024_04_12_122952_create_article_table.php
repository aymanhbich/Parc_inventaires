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
        Schema::create('article', function (Blueprint $table) {
            $table->id('id_article');
            $table->string('design_article', 255)->nullable(false);
            // $table->unsignedBigInteger('id_famille')->nullable();
            // $table->unsignedBigInteger('id_sous_famille')->nullable();
            $table->unsignedBigInteger('id_produit');
            $table->binary('code_bar')->nullable(); // Storing barcode images as BLOB
            $table->enum('unite_de_article', ['unite', 'cm', 'km', 'kg'])->nullable(false); // Restricting values to the specified set
            $table->timestamps();

            // Define foreign key constraints
            // $table->foreign('id_famille')
            //       ->references('id_famille')
            //       ->on('famille')
            //       ->onDelete('cascade');

            // $table->foreign('id_sous_famille')
            //       ->references('id_sous_famille')
            //       ->on('sous_famille')
            //       ->onDelete('cascade');

            $table->foreign('id_produit')
                  ->references('id_produit')
                  ->on('produit')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article');
    }
};
