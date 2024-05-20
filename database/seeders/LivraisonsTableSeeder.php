<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LivraisonsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = ['Marche', 'BC', 'Convention'];

        // Generate 10 random entries for the 'livraison' table
        for ($i = 0; $i < 10; $i++) {
            DB::table('livraisons')->insert([
                'date_livraison' => Carbon::now()->subDays(rand(1, 365)), // Random date within the past year
                'num_bl' => 'BL' . rand(1000, 9999), // Random BL number
                'reference' => 'Reference ' . rand(1, 100), // Random reference
                'id_agent' => rand(1, 3), // Random agent ID (assuming there are 10 agents)
                'type_BL' => $types[array_rand($types)], // Random type of BL
                'commentaire' => 'Comment ' . rand(1, 100), // Random comment
                'id_marche' => rand(1, 10), // Random marche ID (assuming there are 10 marches)
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
