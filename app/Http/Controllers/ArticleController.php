<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request)
{
    // Check if the 'all' query parameter is present
    if ($request->has('all')) {
        // Retrieve all articles from the database without pagination
        $articles = Article::all();
    } else {
        // Retrieve articles with pagination
        $articles = Article::paginate(4);
    }

    // Return a JSON response containing the articles
    return response()->json($articles);
}
    public function all()
{
    // Retrieve all articles from the database without pagination
    $articles = Article::all();
    
    // Return a view to display the list of articles
    return response()->json($articles);
}
    public function store(Request $request)
    {
        $article = Article::create([
            'design_article' => $request->input('designation'),
            'id_produit' => $request->input('produit'),
            'code_bar' => $request->input('codebar'),
            'unite_de_article' => $request->input('Unite'),
        ]);
        return response()->json(['message' => 'Article created successfully','data' => $article], 201);
    }
}
