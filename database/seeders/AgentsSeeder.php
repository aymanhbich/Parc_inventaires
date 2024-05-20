<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Agents;
use Illuminate\Database\Seeder;

class AgentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Agents::factory()->create([
            'nom_agent' => 'Ramdani mohammed',
        ]);
        Agents::factory()->create([
            'nom_agent' => 'Ouled hadj mohammed',
        ]);
        Agents::factory()->create([
            'nom_agent' => 'Azouzi hachem',
        ]);
        Agents::factory()->create([
            'nom_agent' => 'Kassale abdelkrim',
        ]);
    }
}
