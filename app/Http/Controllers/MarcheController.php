<?php

namespace App\Http\Controllers;

use App\Models\Marche;
use Illuminate\Http\Request;

class MarcheController extends Controller
{
    public function index()
    {
        $marche = Marche::all();
        // $sorties = famille_sortie::with('add_sorties')->get();
        // $sorties = Agents::with('add_sorties')->get();
        return response()->json($marche);


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $add_marche = Marche::create([
            'date_marche' => $request->date_marche,
            'reference' => $request->reference,
            'fournisseur' => $request->fournisseur,
            'type_marche' => $request->type_marche,
            'intitule' => $request->intitule,
        ]);

        // Return a response
        return response()->json(['message' => 'market created successfully', 'data' => $add_marche], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Marche $addSortie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Marche $addSortie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Marche $addSortie)
    {
        //
    }
}
