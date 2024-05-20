<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\livraison>
 */
class LivraisonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $startDate = Carbon::create(2022, 1, 1); // Start date: January 1, 2022
        $endDate = Carbon::now(); // End date: Current date
        
        $year = $endDate->year; // Get the current year
        
        return [
            'date_livraison' => $this->faker->dateTimeBetween($startDate, $endDate)->format('Y-m-d'),
            'num_bl' => "bl_" . $year . "/" . str_pad($this->faker->unique()->numberBetween(1, 999), 3, '0', STR_PAD_LEFT),
            'reference' => $this->faker->sentence(),
            'id_agent' => $this->faker->numberBetween(1, 3), // Adjust the range as needed
            'type_BL' => $this->faker->randomElement(['Marche', 'BC', 'Convention']),
            'commentaire' => $this->faker->paragraph(),
        ];
    }
}
