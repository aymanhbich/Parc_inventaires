<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agents extends Model
{
    protected $table = 'agents'; // Specify the correct table name
    protected $primaryKey = 'id_agent'; // Specify the primary key column
    use HasFactory;
    public function add_sorties()
    {
        return $this->hasMany(addSortie::class, 'id_agent');
    }
    public function livraisons()
    {
        return $this->hasMany(livraison::class, 'id_agent');
    }
}