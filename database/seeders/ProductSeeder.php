<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'title' => 'The Path of Dharma: Ancient Wisdom for Modern Living',
            'slug' => 'path-of-dharma',
            'description' => 'Discover timeless principles of dharma to improve emotional clarity, decision making, and spiritual discipline in modern life.',
            'preview_content' => '"When life feels heavy, dharma gives direction. When mind feels noisy, dharma gives stillness."',
            'price' => 999,
            'discount_price' => 199,
            'currency' => 'INR',
            'file_path' => 'products/path-of-dharma.pdf',
            'preview_image' => null,
            'status' => 'active',
        ]);
    }
}
