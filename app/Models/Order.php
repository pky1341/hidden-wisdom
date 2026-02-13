<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Schema;

class Order extends Model
{
    private static ?string $resolvedStatusColumn = null;
    private static ?string $resolvedEmailColumn = null;
    private static ?string $resolvedNameColumn = null;
    private static ?string $resolvedPhoneColumn = null;

    protected $fillable = [
        'product_id',
        'user_name',
        'user_email',
        'user_phone',
        'customer_name',
        'customer_email',
        'customer_phone',
        'amount',
        'currency',
        'razorpay_order_id',
        'razorpay_payment_id',
        'razorpay_signature',
        'payment_status',
        'status',
        'paid_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'paid_at' => 'datetime',
    ];

    protected $appends = [
        'payment_status',
        'user_name',
        'user_email',
        'user_phone',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function download(): HasOne
    {
        return $this->hasOne(Download::class);
    }

    public function scopeWherePaymentStatus(Builder $query, string $status): Builder
    {
        return $query->where(self::paymentStatusColumn(), $status);
    }

    public function scopePaid(Builder $query): Builder
    {
        return $query->where(self::paymentStatusColumn(), 'paid');
    }

    public function scopeFailed(Builder $query): Builder
    {
        return $query->where(self::paymentStatusColumn(), 'failed');
    }

    public function isPaid(): bool
    {
        return $this->payment_status === 'paid';
    }

    public function markAsPaid(string $paymentId, string $signature): void
    {
        $statusColumn = self::paymentStatusColumn();

        $this->update([
            $statusColumn => 'paid',
            'razorpay_payment_id' => $paymentId,
            'razorpay_signature' => $signature,
            'paid_at' => now(),
        ]);
    }

    public function markAsFailed(): void
    {
        $this->update([
            self::paymentStatusColumn() => 'failed',
        ]);
    }

    public function getPaymentStatusAttribute($value): ?string
    {
        return $value ?? ($this->attributes['status'] ?? null);
    }

    public function getUserNameAttribute($value): ?string
    {
        return $value ?? ($this->attributes['customer_name'] ?? null);
    }

    public function getUserEmailAttribute($value): ?string
    {
        return $value ?? ($this->attributes['customer_email'] ?? null);
    }

    public function getUserPhoneAttribute($value): ?string
    {
        return $value ?? ($this->attributes['customer_phone'] ?? null);
    }

    public static function paymentStatusColumn(): string
    {
        if (self::$resolvedStatusColumn) {
            return self::$resolvedStatusColumn;
        }

        return self::$resolvedStatusColumn = self::resolveColumn('payment_status', 'status', 'payment_status');
    }

    public static function emailColumn(): string
    {
        if (self::$resolvedEmailColumn) {
            return self::$resolvedEmailColumn;
        }

        return self::$resolvedEmailColumn = self::resolveColumn('user_email', 'customer_email', 'user_email');
    }

    public static function nameColumn(): string
    {
        if (self::$resolvedNameColumn) {
            return self::$resolvedNameColumn;
        }

        return self::$resolvedNameColumn = self::resolveColumn('user_name', 'customer_name', 'user_name');
    }

    public static function phoneColumn(): string
    {
        if (self::$resolvedPhoneColumn) {
            return self::$resolvedPhoneColumn;
        }

        return self::$resolvedPhoneColumn = self::resolveColumn('user_phone', 'customer_phone', 'user_phone');
    }

    private static function resolveColumn(string $preferred, string $fallback, string $default): string
    {
        $table = (new self())->getTable();

        try {
            if (Schema::hasColumn($table, $preferred)) {
                return $preferred;
            }

            if (Schema::hasColumn($table, $fallback)) {
                return $fallback;
            }
        } catch (\Throwable) {
            return $default;
        }

        return $default;
    }
}
