<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Schema;

class Download extends Model
{
    private static ?string $resolvedTokenColumn = null;

    protected $fillable = [
        'order_id',
        'download_token',
        'token',
        'expires_at',
        'downloaded_at',
        'ip_address',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'downloaded_at' => 'datetime',
    ];

    protected $appends = [
        'download_token',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function scopeWhereToken(Builder $query, string $token): Builder
    {
        return $query->where(self::tokenColumn(), $token);
    }

    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    public function getDownloadTokenAttribute($value): ?string
    {
        return $value ?? ($this->attributes['token'] ?? null);
    }

    public static function tokenColumn(): string
    {
        if (self::$resolvedTokenColumn) {
            return self::$resolvedTokenColumn;
        }

        $table = (new self())->getTable();

        try {
            if (Schema::hasColumn($table, 'download_token')) {
                return self::$resolvedTokenColumn = 'download_token';
            }

            if (Schema::hasColumn($table, 'token')) {
                return self::$resolvedTokenColumn = 'token';
            }
        } catch (\Throwable) {
            return self::$resolvedTokenColumn = 'download_token';
        }

        return self::$resolvedTokenColumn = 'download_token';
    }
}
