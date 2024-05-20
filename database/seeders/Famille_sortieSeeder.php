<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\famille_sortie;
use Illuminate\Database\Seeder;

class Famille_sortieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        famille_sortie::factory()->create([
            'nom_sorties_famille' => 'Toner',
        ]);
        famille_sortie::factory()->create([
            'nom_sorties_famille' => 'Impression',
        ]);
        famille_sortie::factory()->create([
            'nom_sorties_famille' => 'Cadeaux',
        ]);
        famille_sortie::factory()->create([
            'nom_sorties_famille' => 'Materiels consomables',
        ]);
        famille_sortie::factory()->create([
            'nom_sorties_famille' => 'Materiels informatique et technique',
        ]);
        famille_sortie::factory()->create([
            'nom_sorties_famille' => 'Fornitur de bureaux',
        ]);
    }
}
