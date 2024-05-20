<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;
    protected $table = 'produit'; // Specify the correct table name
    protected $primaryKey = 'id_produit'; // Specify the primary key column
    public function sous_famille()
    {
        return $this->belongsTo(SousFamille::class,'id_sous_famille');
    }
//     public function famille(){
//     return $this->belongsTo(Famille::class, 'id_famille');
// }
    public function article(){
    return $this->hasMany(Article::class, 'id_produit');
}
}