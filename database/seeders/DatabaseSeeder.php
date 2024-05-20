<?php

namespace Database\Seeders;

use App\Models\Agents;
use App\Models\Article;
use App\Models\Famille;
use App\Models\famille_sortie;
use App\Models\livraison;
use App\Models\Marche;
use App\Models\Produit;
use App\Models\SousFamille;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'role' => 'Administrateur',
            'password' => '12345678910'
        ]);
        // Define famille and sous famille data
$familles = [
    'Budget Exploitation' => [
        'Matières et Fournitures consommable',
        'Produit non stockés de matiéres et de fourniture',
        'Travaux, études et prestations de services'
    ],
    'Budget Investissement' => []
];

// Create famille and sous famille records
foreach ($familles as $nom_famille => $sous_familles) {
    $famille = Famille::factory()->create(['nom_famille' => $nom_famille]);
    foreach ($sous_familles as $nom_sous_famille) {
        $sous_famille = SousFamille::factory()->create([
            'id_famille' => $famille->id_famille, // Set the id_famille properly
            'nom_sous_famille' => $nom_sous_famille
        ]);
    }
}

// Define produit data
$produits = [
    'Matières et Fournitures consommable' => [
        'Produit combustibles',
        'Produit d\'entretien',
        'Fornitures de bureau',
        'Fornitures pour materiel technique et informatique',
        'Produit teritiores',
        'Trophets'
    ]
];

// Create produit records
foreach ($produits as $nom_sous_famille => $nom_produits) {
    foreach ($nom_produits as $nom_produit) {
        $sous_famille = SousFamille::where('nom_sous_famille', $nom_sous_famille)->first();
        $produit = Produit::factory()->create([
            'id_sous_famille' => $sous_famille->id_sous_famille,
            'nom_produit' => $nom_produit
        ]);

        // Create multiple articles for each product
        // Create multiple articles for each product
for ($i = 1; $i <= 5; $i++) {
    $design_article = 'Article ' . $nom_produit . ' ' . $i;
    $unites = ["unité", "cm", "km", "kg"];
    $unite_de_article = $unites[array_rand($unites)]; // Randomly select one of the units
    $code_bar = mt_rand(1000000000, 9999999999); // Generate random code bar

    Article::factory()->create([
        'design_article' => $design_article,
        'id_produit' => $produit->id_produit,
        'unite_de_article' => $unite_de_article,
        'code_bar' => $code_bar
    ]);
}

    }
}

// Create article records
Article::factory()->create(['design_article' => 'Article Fake', 'id_produit' => '1']);

        $famille_sorties = [
            'Toner',
            'Impression',
            'Cadeaux',
            'Materiels consomables',
            'Materiels informatique et technique',
            'Fornitur de bureaux',
        ];

        $agents = [
            'Ramdani mohammed',
            'Ouled hadj mohammed',
            'Azouzi hachem',
        ];

        // Create famille_sortie records
        foreach ($famille_sorties as $nom_sortie) {
            famille_sortie::factory()->create(['nom_sorties_famille' => $nom_sortie]);
        }

        // Create Agents records
        foreach ($agents as $nom_agent) {
            Agents::factory()->create(['nom_agent' => $nom_agent]);
        }
        livraison::factory()->count(40)->create();
        Marche::factory()->count(10)->create();
    }
}