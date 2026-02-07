<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

class ProductService
{
    public function getActiveProducts(): Collection
    {
        return Product::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function findBySlug(string $slug): ?Product
    {
        return Product::where('slug', $slug)
            ->where('is_active', true)
            ->first();
    }

    public function getFeaturedProduct(): ?Product
    {
        return Product::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->first();
    }
}
