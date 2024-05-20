<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marche extends Model
{
    protected $primaryKey = 'id_marche';
    protected $fillable = [
        'date_marche',
        'reference', // Add 'id_sorties_famille' to the fillable array
        'type_marche', // Add 'id_sorties_famille' to the fillable array
        'fournisseur',
        'intitule',
    ];
    public function livraisons()
    {
        return $this->hasMany(Livraison::class, 'id_marche');
    }
    use HasFactory;
}
