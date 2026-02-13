<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Product::query()->active();

        if ($request->filled('category')) {
            $query->where('category_id', $request->integer('category'));
        }

        $products = $query->latest()->paginate(12)->withQueryString();
        $categories = Category::where('is_active', true)->get();

        return Inertia::render('Products', [
            'products' => $products,
            'categories' => $categories,
            'selectedCategory' => $request->integer('category') ?: null,
        ]);
    }
}
