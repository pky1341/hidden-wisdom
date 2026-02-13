<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    private static ?bool $hasStatusColumn = null;
    private static ?bool $hasIsActiveColumn = null;

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'description',
        'preview_content',
        'price',
        'discount_price',
        'currency',
        'file_path',
        'preview_image',
        'status',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
    ];

    protected $appends = [
        'effective_price',
        'formatted_price',
        'formatted_original_price',
        'discount_percentage',
        'has_discount',
        'preview_image_url',
    ];

    public function scopeActive(Builder $query): Builder
    {
        if ($this->tableHasColumn('status')) {
            return $query->where('status', 'active');
        }

        if ($this->tableHasColumn('is_active')) {
            return $query->where('is_active', true);
        }

        return $query;
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function getHasDiscountAttribute(): bool
    {
        return (float) $this->discount_price > 0 && (float) $this->discount_price < (float) $this->price;
    }

    public function getEffectivePriceAttribute(): float
    {
        if ($this->has_discount) {
            return (float) $this->discount_price;
        }

        return (float) $this->price;
    }

    public function getDiscountPercentageAttribute(): int
    {
        if (! $this->has_discount) {
            return 0;
        }

        $discount = ((float) $this->price - (float) $this->discount_price) / (float) $this->price;

        return (int) round($discount * 100);
    }

    public function getFormattedPriceAttribute(): string
    {
        return '₹' . number_format($this->effective_price, 0);
    }

    public function getFormattedOriginalPriceAttribute(): string
    {
        return '₹' . number_format((float) $this->price, 0);
    }

    public function getPreviewImageUrlAttribute(): ?string
    {
        $imagePath = $this->preview_image ?? $this->cover_image;

        if (! $imagePath) {
            return null;
        }

        return Storage::disk('public')->url($imagePath);
    }

    private function tableHasColumn(string $column): bool
    {
        try {
            if ($column === 'status') {
                return self::$hasStatusColumn ??= Schema::hasColumn($this->getTable(), 'status');
            }

            if ($column === 'is_active') {
                return self::$hasIsActiveColumn ??= Schema::hasColumn($this->getTable(), 'is_active');
            }
        } catch (\Throwable) {
            return false;
        }

        return false;
    }
}
