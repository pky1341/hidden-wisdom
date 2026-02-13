<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;

class ProductService
{
    private const ACTIVE_PRODUCTS_CACHE_KEY = 'products.active';
    private const FEATURED_PRODUCT_CACHE_KEY = 'products.featured';

    public function getActiveProducts(): Collection
    {
        if (! Schema::hasTable('products')) {
            return new Collection();
        }

        return Cache::remember(
            self::ACTIVE_PRODUCTS_CACHE_KEY,
            now()->addMinutes((int) config('payment.products_cache_minutes', 15)),
            fn () => Product::query()
                ->active()
                ->latest()
                ->get()
        );
    }

    public function findBySlug(string $slug): ?Product
    {
        if (! Schema::hasTable('products')) {
            return null;
        }

        return Product::query()
            ->active()
            ->where('slug', $slug)
            ->first();
    }

    public function findActiveById(int $id): ?Product
    {
        if (! Schema::hasTable('products')) {
            return null;
        }

        return Product::query()
            ->active()
            ->whereKey($id)
            ->first();
    }

    public function getFeaturedProduct(): ?Product
    {
        if (! Schema::hasTable('products')) {
            return null;
        }

        return Cache::remember(
            self::FEATURED_PRODUCT_CACHE_KEY,
            now()->addMinutes((int) config('payment.products_cache_minutes', 15)),
            fn () => Product::query()
                ->active()
                ->latest()
                ->first()
        );
    }

    public function clearCache(): void
    {
        Cache::forget(self::ACTIVE_PRODUCTS_CACHE_KEY);
        Cache::forget(self::FEATURED_PRODUCT_CACHE_KEY);
    }
}
