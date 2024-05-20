<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class famille_sortie extends Model
{
    use HasFactory;
    protected $table = 'famille_sorties';
    protected $primaryKey = 'id_sorties_famille';
    public function add_sorties()
    {
        return $this->hasMany(addSortie::class, 'id_sorties_famille');
    }
}
