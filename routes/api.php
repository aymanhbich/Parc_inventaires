<?php

use App\Http\Controllers\AddSortieController;
use App\Http\Controllers\AgentsController;
use App\Http\Controllers\ArticleConstroller;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\famille_sous_produit;
use App\Http\Controllers\FamilleController;
use App\Http\Controllers\FamilleSortieController;
use App\Http\Controllers\LivraisonArticleController;
use App\Http\Controllers\LivraisonController;
use App\Http\Controllers\MarcheController;
use App\Http\Controllers\Sortie_articleController;
use App\Http\Controllers\SortieController;
use App\Http\Controllers\sousfamillefromfamille;
use App\Models\famille_sortie;
use App\Models\Sortie_article;
use App\Models\Sorties;
use App\Models\SousFamille;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\GetSousfa;
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
// Route::get('familles/{familleId}/sous-familles', [GetSousfa::class, 'getSousFamille']);

Route::get('/famille', [FamilleController::class, 'index']);
Route::get('/famille/{id}/sousfamille', [sousfamillefromfamille::class, 'index']);
Route::get('/famille/{id}', [famille_sous_produit::class, 'famille']);
Route::get('/sous_famille/{id}', [famille_sous_produit::class, 'sous_famille']);
Route::get('/produit/{id}', [famille_sous_produit::class, 'produit']);
Route::get('/article/{id}', [famille_sous_produit::class, 'article']);
Route::post('/add_article', [ArticleController::class, 'store']);
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/all', [ArticleController::class, 'all']);
Route::get('/famille_sortie', [FamilleSortieController::class, 'index']);
Route::get('/agents', [AgentsController::class, 'index']);
Route::post('/add_sortie', [SortieController::class, 'store'])->name('add-sortie.store');
Route::get('/sorties', [SortieController::class, 'index'])->name('add-sortie.index');
Route::get('/agents', [AgentsController::class, 'index'])->name('add-sortie.index');
Route::get('/famille_sorties', [FamilleSortieController::class, 'index'])->name('add-sortie.index');
Route::get('/markets', [MarcheController::class, 'index'])->name('markets.index');
Route::post('/add_market', [MarcheController::class, 'store'])->name('add_market.store');
Route::get('/livraison', [LivraisonController::class, 'index'])->name('show_livraison.index');
Route::post('/add_delivery', [LivraisonController::class, 'store'])->name('add_livraison.store');
Route::get('/livraisons/{numBl}/id-livraison', [LivraisonController::class, 'getIdLivraisonByNumBl'])->name('getIdLivraisonByNumBl.store');
Route::post('/livraisons/{livraisonId}/add-article', [LivraisonArticleController::class, 'store'])->name('add_article_with_quantite.store');
Route::patch('/associate/{livraison}', [LivraisonController::class, 'update']);
Route::get('/test', [LivraisonArticleController::class, 'index'])->name('show_livraison.index');
Route::post('/quantite/decrease', [LivraisonArticleController::class, 'decreaseQuantity']); 
Route::post('/articleminesquantite', [Sortie_articleController::class, 'store'])->name('article.store'); 
Route::get('/articleminesquantite', [Sortie_articleController::class, 'index'])->name('article.store'); 
Route::get('/sortie/{id_sortie}/{id_article}/quantite', [Sortie_articleController::class,'index'])->name('article.showquantite');
Route::apiResources([
    'familles' => FamilleController::class,
    'familles_sorties' => FamilleSortieController::class,
    'sorties' => SortieController::class,

]);
require __DIR__.'/auth.php';