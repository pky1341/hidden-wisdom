<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'preview_content' => ['nullable', 'string'],
            'category_id' => ['nullable', 'integer', Rule::exists('categories', 'id')],
            'price' => ['required', 'numeric', 'min:1'],
            'discount_price' => ['nullable', 'numeric', 'min:1', 'lt:price'],
            'currency' => ['required', 'string', 'size:3'],
            'pdf' => ['nullable', 'file', 'mimes:pdf', 'max:51200'],
            'preview_image' => ['nullable', 'image', 'max:5120'],
            'status' => ['required', Rule::in(['active', 'inactive'])],
        ];
    }
}
