<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'design_article',
        'id_produit',
        'code_bar',
        'unite_de_article',
    ];
    use HasFactory;
    protected $table = 'article'; // Specify the correct table name
    protected $primaryKey = 'id_article'; // Specify the primary key column
    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    }
    public function livraisons()
{
    return $this->belongsToMany(livraison::class, 'livraison_article', 'id_article', 'id_livraison')
    ->withPivot('quantite')
    ->withTimestamps();
}
public function sorties()
{
    return $this->belongsToMany(Sorties::class, 'sortie_article','id_article','id_sortie');
}
}
