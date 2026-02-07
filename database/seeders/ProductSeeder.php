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
            'description' => 'Discover the timeless principles of Dharma that have guided spiritual seekers for thousands of years. This comprehensive ebook explores the fundamental teachings of righteous living, karma, and the path to liberation. Learn how to apply these ancient principles in your modern life to find peace, purpose, and spiritual fulfillment.',
            'preview_content' => '"When you live in alignment with Dharma, every action becomes a prayer, every moment becomes sacred, and every challenge becomes an opportunity for growth. This is not merely philosophy—it is the art of living with wisdom and grace."',
            'price' => 99.00,
            'currency' => 'INR',
            'pdf_path' => 'products/path-of-dharma.pdf',
            'cover_image' => null,
            'is_active' => true,
        ]);
    }
}
