<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\LivraisonArticle;
use App\Models\Sortie_article;
use App\Models\Sorties;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Sortie_articleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $id_sortie, $id_article)
{
    // Retrieve the quantity for the given id_sortie and id_article
    $quantity = DB::table('sortie_article')
        ->where('id_sortie', $id_sortie)
        ->where('id_article', $id_article)
        ->sum('quantite');

    // Return a JSON response with the quantity
    return response()->json(['quantity' => $quantity]);
}



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */

     public function store(Request $request)
{
    // Retrieve the id_article and quantite from the request
    $id_article = $request->input('id_article');
    $requestedQuantity = $request->input('quantite');
    $id_sortie = $request->input('id_sortie'); // Ensure you pass id_sortie in the request

    // Check if the article exists and has a quantity greater than 0 in livraison_article
    $livraisonEntry = DB::table('livraison_article')
        ->where('id_article', $id_article)
        ->first();

    if (!$livraisonEntry) {
        // Return a JSON response indicating that the article does not exist
        return response()->json(['message' => 'Article does not exist'], 400);
    }

    
    if ($livraisonEntry->quantite == 0) {
        // Return a JSON response indicating that there is not enough quantity available
        return response()->json(['message' => 'Not enough quantity available'], 400);
    }
    // Retrieve the article
    $article = Article::findOrFail($id_article);

    // Retrieve all livraisons with pivot data for the given article
    $livraisons = $article->livraisons()->orderBy('livraison_article.created_at', 'asc')->get();

    // Variable to keep track of remaining quantity to decrement
    $remainingQuantity = $requestedQuantity;

    foreach ($livraisons as $livraison) {
        // Retrieve the current quantity from pivot data
        $currentQuantity = $livraison->pivot->quantite;

        // Determine the quantity to decrement for this livraison
        $quantityToDecrement = min($remainingQuantity, $currentQuantity);

        // Decrement the quantity in the pivot table
        $article->livraisons()->updateExistingPivot($livraison->id_livraison, ['quantite' => $currentQuantity - $quantityToDecrement]);

        // Update the remaining quantity
        $remainingQuantity -= $quantityToDecrement;

        // Break the loop if remaining quantity becomes 0
        if ($remainingQuantity <= 0) {
            break;
        }
    }
    
    // Check if the remaining quantity is greater than 0
    if ($remainingQuantity > 0) {
        // Check if the sortie_article pivot entry already exists
        $existingEntry = DB::table('sortie_article')
            ->where('id_sortie', $id_sortie)
            ->where('id_article', $id_article)
            ->first();

        if ($existingEntry) {
            // Update the existing pivot entry with the new quantity sum
            $newQuantity = $existingEntry->quantite + $requestedQuantity;
            $article->sorties()->updateExistingPivot($id_sortie, [
                'quantite' => $newQuantity,
                'updated_at' => now()
            ]);
        } else {
            // Attach the sortie with the total decremented quantity to the sortie_article pivot table
            $article->sorties()->attach($id_sortie, [
                'quantite' => $requestedQuantity,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }

    // Return a JSON response with a success message
    return response()->json(['message' => 'Quantity decremented and sortie article recorded successfully']);
}


     
     




    



    /**
     * Display the specified resource.
     */
    public function show(Sortie_article $sortie_article)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sortie_article $sortie_article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sortie_article $sortie_article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sortie_article $sortie_article)
    {
        //
    }
}
