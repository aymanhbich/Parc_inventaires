<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Famille;
use App\Models\Produit;
use App\Models\SousFamille;

// use Illuminate\Http\Request;

class famille_sous_produit extends Controller
{
    public function famille($id)
    {
        $famille = Famille::where('id_famille', $id)->get();
        return response()->json($famille);
    }
    public function sous_famille($id)
    {
        $sous_famille = SousFamille::where('id_sous_famille', $id)->get();
        return response()->json($sous_famille);
    }
    public function produit($id)
    {
        $produit = Produit::where('id_produit', $id)->get();
        return response()->json($produit);
    }
    public function article($id)
    {
        $article = Article::where('id_article', $id)->get();
        return response()->json($article);
    }
}
