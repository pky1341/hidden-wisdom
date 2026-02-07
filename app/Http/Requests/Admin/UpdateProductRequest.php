<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

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
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['required', 'string', 'max:3'],
            'pdf' => ['nullable', 'file', 'mimes:pdf', 'max:51200'],
            'cover_image' => ['nullable', 'image', 'max:5120'],
            'is_active' => ['boolean'],
        ];
    }
}
