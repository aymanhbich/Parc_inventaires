<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SousFamille extends Model
{
    use HasFactory;
    protected $table = 'sous_famille'; // Specify the correct table name
    protected $primaryKey = 'id_sous_famille'; // Specify the primary key column
    public function famille()
    {
        return $this->belongsTo(Famille::class,'id_famille');
    }
    public function produit()
    {
        return $this->hasMany(Produit::class, 'id_sous_famille');
    }
    
}
