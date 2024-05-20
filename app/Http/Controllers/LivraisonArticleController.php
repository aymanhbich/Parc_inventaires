<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\livraison;
use App\Models\LivraisonArticle;
use Exception;
use Illuminate\Http\Request;

class LivraisonArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
{
    $articleId = 1; // Replace 1 with the actual ID of the article

    $livraisons = Livraison::whereHas('articles', function ($query) use ($articleId) {
        $query->where('article.id_article', $articleId); // Specify the table name or alias
    })->get();

    return response()->json($livraisons);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $livraisonId)
{
    $livraison = Livraison::findOrFail($livraisonId);
$article = Article::findOrFail($request->input('article'));
$quantite = $request->input('quantite');

// Check if the article is already attached to the delivery
if ($livraison->articles()->where('livraison_article.id_article', $article->id_article)->exists()) {
    // If the article exists, update the quantity
    $livraison->articles()->updateExistingPivot($article->id_article, ['quantite' => $livraison->articles()->where('livraison_article.id_article', $article->id_article)->first()->pivot->quantite + $quantite]);
} else {
    // If the article does not exist, attach it with the given quantity
    $livraison->articles()->attach($article->id_article, ['quantite' => $quantite]);
}

return response()->json(['message' => 'Article added to livraison successfully'], 200);

}



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
