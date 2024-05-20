<?php

namespace App\Http\Controllers;

use App\Models\livraison;
use App\Models\Marche;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class LivraisonController extends Controller
{
    public function getIdLivraisonByNumBl($numBl)
    {
        $livraison = Livraison::where('num_bl', $numBl)->first();
        if ($livraison) {
            return response()->json(['id_livraison' => $livraison->id_livraison]);
        } else {
            return response()->json(['message' => 'Livraison not found'], 404);
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $livraison = livraison::all();
  
        // $sorties = famille_sortie::with('add_sorties')->get();
        // $sorties = Agents::with('add_sorties')->get();
        return response()->json($livraison);


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $addLivraison = livraison::create([
                'date_livraison' => $request->date_livraison,
                'num_bl' => $request->num_bl,
                'reference' => $request->reference,
                'id_agent' => $request->input('agent_beni'),
                'commentaire' => $request->commentaire,
            ]);
            return response()->json(['message' => 'livraison created successfully', 'id_livraison' => $addLivraison->id_livraison, 'data' => $addLivraison], 201);
        } catch (QueryException $e) {
            if ($e->errorInfo[1] === 1062) {
                // Duplicate entry violation
                return response()->json(['error' => 'The specified num_bl already exists.'], 409);
            } else {
                // Other database error
                return response()->json(['error' => 'Database error occurred.'], 500);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(livraison $livraison)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, livraison $livraison)
{
    $marcheId = $request->input('id_marche');

    // Check if id_marche exists in the marches table
    if (!Marche::where('id_marche', $marcheId)->exists()) {
        return response()->json(['error' => 'Invalid id_marche '], 400);
    }

    $livraison->update(['id_marche' => $marcheId]);

    return response()->json(['message' => 'Livraison updated successfully'], 200);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(livraison $livraison)
    {
        //
    }
}
