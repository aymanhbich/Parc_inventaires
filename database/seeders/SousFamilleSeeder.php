<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\SousFamille;
use Illuminate\Database\Seeder;

class SousFamilleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SousFamille::factory()->create([
            'id_famille' => '1',
            'nom_sous_famille' => 'Matières et Fournitures consommable'
        ]);
        SousFamille::factory()->create([
            'id_famille' => '1',
            'nom_sous_famille' => 'Produit non stockés de matiéres et de fourniture'
        ]);
        SousFamille::factory()->create([
            'id_famille' => '1',
            'nom_sous_famille' => 'Travaux, études et prestations de services'
        ]);
    }
}
