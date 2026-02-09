<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Product::where('is_active', true);

        if ($request->category) {
            $query->where('category_id', $request->category);
        }

        $products = $query->latest()->paginate(12);
        $categories = Category::where('is_active', true)->get();

        return Inertia::render('Products', [
            'products' => $products,
            'categories' => $categories,
            'selectedCategory' => $request->category,
        ]);
    }
}
