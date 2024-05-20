<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LivraisonArticle extends Model
{
    protected $table = 'livraison_article'; // Adjust if your table name is different
    protected $primaryKey = 'id_livraison';

    protected $fillable = [
        'id_livraison',
        'id_article',
        'quantite', // Quantity of the article in the delivery
        // Add other fields if any
    ];
    use HasFactory;
}
