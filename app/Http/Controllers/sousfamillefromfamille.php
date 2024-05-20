<?php

namespace App\Http\Controllers;

use App\Models\Famille;

// use Illuminate\Http\Request;

class sousfamillefromfamille extends Controller
{
    public function index($id)
    {
        // Retrieve Famille records with related SousFamilles
        // $famille = Famille::with('sous_famille')->get();
        // $sousFamille = SousFamille::with('famille')->find($id);
        // $produit = Produit::with('sous_famille')->find($id);
        // Return JSON response
        $famille = Famille::with('sous_famille')->find($id);
        $sousFamilles = $famille->sous_famille;
        return response()->json($sousFamilles);
    }
}
