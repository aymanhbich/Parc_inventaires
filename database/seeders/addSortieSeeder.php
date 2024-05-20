<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\addSortie;
use Illuminate\Database\Seeder;

class addSortieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        addSortie::factory()->create([
            'date_operation' => '2024-04-04',
            'id_sorties_famille' => 1,
            'type_operation' => 'Sortie(consommé)',
            'id_agent' => 1,
            'commentaire' => 'test commentaire',
        ]);
        addSortie::factory()->create([
            'date_operation' => '2024-04-04',
            'id_sorties_famille' => 2,
            'type_operation' => 'Sortie(degrade)',
            'id_agent' => 1,
            'commentaire' => 'test commentaire 2',
        ]);
    }
}
