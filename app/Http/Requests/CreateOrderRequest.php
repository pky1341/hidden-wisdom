<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;

class CreateOrderRequest extends FormRequest
{
    private static ?string $activeColumn = null;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $productExistsRule = Rule::exists('products', 'id');
        $activeColumn = $this->resolveActiveColumn();

        if ($activeColumn === 'status') {
            $productExistsRule = $productExistsRule->where(fn ($query) => $query->where('status', 'active'));
        } elseif ($activeColumn === 'is_active') {
            $productExistsRule = $productExistsRule->where(fn ($query) => $query->where('is_active', true));
        }

        return [
            'product_id' => [
                'required',
                'integer',
                $productExistsRule,
            ],
            'user_name' => ['nullable', 'string', 'max:255'],
            'user_email' => ['required', 'email', 'max:255'],
            'user_phone' => ['nullable', 'string', 'max:20'],
        ];
    }

    private function resolveActiveColumn(): ?string
    {
        if (self::$activeColumn !== null) {
            return self::$activeColumn;
        }

        try {
            if (Schema::hasColumn('products', 'status')) {
                return self::$activeColumn = 'status';
            }

            if (Schema::hasColumn('products', 'is_active')) {
                return self::$activeColumn = 'is_active';
            }
        } catch (\Throwable) {
            // Ignore schema probe failures here; service layer still validates active product.
        }

        return self::$activeColumn = '';
    }
}
