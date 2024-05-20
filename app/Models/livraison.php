<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class livraison extends Model

{
    protected $primaryKey = 'id_livraison'; 
    protected $fillable = [
        'date_livraison',
        'num_bl',
        'reference',
        'id_agent',
        'commentaire',
        'id_marche'
    ];
    use HasFactory;
    public function agents()
    {
        return $this->belongsTo(Agents::class, 'id_agent');
    }
    public function articles()
{
    return $this->belongsToMany(Article::class, 'livraison_article', 'id_livraison', 'id_article')
                ->withPivot('quantite')
                ->withTimestamps();
}
public function marches()
    {
        return $this->belongsTo(Marche::class, 'id_marche');
    }
}
