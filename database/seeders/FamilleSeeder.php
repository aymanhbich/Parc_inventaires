<?php

namespace Database\Seeders;
use App\Models\Famille;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FamilleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Famille::factory()->create([
            'nom_famille' => 'Budget Exploitation',
        ]);
        Famille::factory()->create([
            'nom_famille' => 'Budget Investissement',
        ]);
    }
}
