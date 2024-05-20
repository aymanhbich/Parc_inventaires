<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Produit;
use Illuminate\Database\Seeder;

class ProduitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Produit::factory()->create([
            'id_sous_famille' => '1',
            'nom_produit' => 'Produit combustibles'
        ]);
        Produit::factory()->create([
            'id_sous_famille' => '1',
            'nom_produit' => 'Produit d\'entretien'
        ]);
        Produit::factory()->create([
            'id_sous_famille' => '1',
            'nom_produit' => 'Fornitures de bureau'
        ]);
        Produit::factory()->create([
            'id_sous_famille' => '1',
            'nom_produit' => 'Fornitures pour materiel technique et informatique'
        ]);
        Produit::factory()->create([
            'id_sous_famille' => '1',
            'nom_produit' => 'Produit teritiores'
        ]);
        Produit::factory()->create([
            'id_sous_famille' => '1',
            'nom_produit' => 'Trophets'
        ]);
    }
}
