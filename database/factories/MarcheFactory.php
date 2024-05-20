<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Marhce>
 */
class MarcheFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = Carbon::create(2022, 1, 1); // Start date: January 1, 2022
        $endDate = now(); // End date: Current date

        $year = $endDate->year; // Get the current year

        return [
            'date_marche' => $this->faker->dateTimeBetween($startDate, $endDate)->format('Y-m-d'),
            'reference' => $this->faker->sentence(),
            'type_marche' => $this->faker->randomElement(['Marche', 'BC', 'Convention']),
            'fournisseur' => $this->faker->name(),
            'intitule' => $this->faker->sentence(),
        ];
    }
}
