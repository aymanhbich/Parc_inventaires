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
        Schema::create('sorties', function (Blueprint $table) {
            $table->id('id_sortie');
            $table->date('date_operation')->nullable();
            $table->string('num_sortie')->nullable()->unique();
            $table->unsignedBigInteger('id_sorties_famille')->nullable(false);
            $table->string('type_operation')->nullable();
            $table->unsignedBigInteger('id_agent');
            // $table->unsignedBigInteger('id_article');
            $table->string('commentaire')->nullable();

            $table->foreign('id_sorties_famille')
                  ->references('id_sorties_famille')
                  ->on('famille_sorties')
                  ->onDelete('cascade'); // optional, to cascade delete related records
            $table->foreign('id_agent')
                  ->references('id_agent')
                  ->on('agents')
                  ->onDelete('cascade'); // optional, to cascade delete related records
            // $table->foreign('id_article')->references('id_article')->on('article')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sorties');
    }
};
