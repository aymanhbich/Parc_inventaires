<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sortie_article extends Model
{
    protected $table = 'sortie_article'; // Adjust if your table name is different
    protected $fillable = [
        'id_sortie',
        'id_article',
        'quantite',
    ];
    use HasFactory;
}