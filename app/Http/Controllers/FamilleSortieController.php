<?php

namespace App\Http\Controllers;

use App\Models\famille_sortie;
use App\Http\Requests\Storefamille_sortieRequest;
use App\Http\Requests\Updatefamille_sortieRequest;

class FamilleSortieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $familles_sorties = famille_sortie::all();
        return response()->json($familles_sorties);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Storefamille_sortieRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(famille_sortie $famille_sortie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updatefamille_sortieRequest $request, famille_sortie $famille_sortie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(famille_sortie $famille_sortie)
    {
        //
    }
}
