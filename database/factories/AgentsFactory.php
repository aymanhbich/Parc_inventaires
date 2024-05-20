<?php

namespace Database\Factories;

use App\Models\Agents;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Agents>
 */
class AgentsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Agents::class;
    public function definition(): array
    {
        return [
            'nom_agent' => $this->faker->name,
        ];
    }
}
