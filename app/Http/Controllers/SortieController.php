<?php

namespace App\Http\Controllers;

use App\Models\Sorties;
use App\Http\Requests\StoreSortiesRequest;
use App\Http\Requests\UpdateSortiesRequest;
use App\Models\LivraisonArticle;
use Carbon\Carbon;

class SortieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sorties = Sorties::all();
        // $sorties = famille_sortie::with('add_sorties')->get();
        // $sorties = Agents::with('add_sorties')->get();
        return response()->json($sorties);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSortiesRequest $request)
    {
        $numsortie = $this->generateNumBl();
        $addSortie = Sorties::create([
            'date_operation' => $request->date_operation,
            'num_sortie' => $numsortie, // Corrected line
            'id_sorties_famille' => $request->input('famille_sortie'),
            'id_agent' => $request->input('agent'),
            'type_operation' => $request->type_operation,
            'commentaire' => $request->commentaire,
        ]);
        
        // $livraisonArticle = LivraisonArticle::findOrFail($request->input('livraison_article_id'));
        // Return a response
        return response()->json(['message' => 'AddSortie created successfully', 'id_sortie' => $addSortie->id_sortie], 201);
    }
    private function generateNumBl()
{
    // Get the last two digits of the current year
    $year = date('y');
    
    // Get today's month
    $month = date('m');
    
    // Generate random numbers for the rest of the value
    $randomNumbers = mt_rand(1000, 9999); // Generate a random 4-digit number
    
    // Ensure the length of random numbers doesn't exceed 6 characters
    $randomNumbers = substr($randomNumbers, 0, 6 - strlen($year) - strlen($month));
    // Concatenate the components to form the numBl value
    $numBl = $year . $month . $randomNumbers;
    return $numBl;
}
    /**
     * Display the specified resource.
     */
    public function show(Sorties $sorties)
    {
        //
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSortiesRequest $request, Sorties $sorties)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sorties $sorties)
    {
        //
    }
}
