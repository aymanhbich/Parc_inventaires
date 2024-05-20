<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\livraison;
use Illuminate\Database\Seeder;

class LivraisonArticleTableSeeder extends Seeder
{
    public function run()
    {
            $livraisons = livraison::all();
            $articles = Article::all();

            $livraisons->each(function ($livraison) use ($articles) {
            $numArticles = $articles->count();
            $numToAdd = min(rand(1, 5), $numArticles);
            $articleIds = $articles->random($numToAdd)->pluck('id_article')->toArray(); // Adjusted to use id_article
            $quantite = rand(1, 10);

            foreach ($articleIds as $articleId) {
                // Ensure that the id_livraison is properly assigned here
                $livraison->article()->attach($articleId, ['quantite' => $quantite, 'id_livraison' => $livraison->id_livraison]);
            }
        });
    }
}
