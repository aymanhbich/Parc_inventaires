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
        Schema::create('produit', function (Blueprint $table) {
            $table->id('id_produit');
            $table->unsignedBigInteger('id_sous_famille');
            $table->string('nom_produit', 255)->nullable(false);
            $table->timestamps();

            // Define foreign key constraint
            $table->foreign('id_sous_famille')
                  ->references('id_sous_famille')
                  ->on('sous_famille')
                  ->onDelete('cascade'); // optional, to cascade delete related records
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produit');
    }
};
