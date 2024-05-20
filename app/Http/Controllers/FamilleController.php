<?php

namespace App\Http\Controllers;

use App\Models\Famille;
use App\Http\Requests\StoreFamilleRequest;
use App\Http\Requests\UpdateFamilleRequest;

class FamilleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $familles = Famille::with('sous_famille.produit.article')->get();
        return response()->json($familles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFamilleRequest $request)
    {
        return 'ok';
    }

    /**
     * Display the specified resource.
     */
    public function show(Famille $famille)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFamilleRequest $request, Famille $famille)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Famille $famille)
    {
        //
    }
}
