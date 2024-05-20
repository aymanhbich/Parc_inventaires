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
        Schema::create('sous_famille', function (Blueprint $table) {
            $table->id('id_sous_famille');
            $table->unsignedBigInteger('id_famille');
            $table->string('nom_sous_famille', 255);
            $table->timestamps();

            // Define foreign key constraint
            $table->foreign('id_famille')
                  ->references('id_famille')
                  ->on('famille')
                  ->onDelete('cascade'); // optional, to cascade delete related records
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sous_famille');
    }
};
