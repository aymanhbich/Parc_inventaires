<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sorties extends Model
{
    protected $fillable = [
        'date_operation',
        'num_sortie',
        'id_sorties_famille', // Add 'id_sorties_famille' to the fillable array
        'id_agent',
        'type_operation',
        'commentaire',
    ];
    protected $table = 'sorties'; // Specify the correct table name
    protected $primaryKey = 'id_sortie'; // Specify the primary key column
    use HasFactory;
    public function famille_sorties()
    {
        return $this->belongsTo(famille_sortie::class, 'id_sorties_famille');
    }

    public function agents()
    {
        return $this->belongsTo(Agents::class, 'id_agent');
    }
    public function articles()
    {
        return $this->belongsToMany(Article::class, 'sortie_article','id_sortie','id_article');
    }
}
