<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Famille extends Model
{
    use HasFactory;
    protected $table = 'famille'; // Specify the correct table name
    protected $primaryKey = 'id_famille'; // Specify the primary key column
    public function sous_famille()
    {
        return $this->hasMany(SousFamille::class, 'id_famille');
    }
}
