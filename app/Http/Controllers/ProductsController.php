<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller
{
    public function __construct(
        private ProductService $productService
    ) {}

    public function index(Request $request): Response
    {
        $query = $this->productService->getActiveProducts();

        if ($request->category) {
            $query = $query->where('category_id', $request->category);
        }

        $products = $query->paginate(12);
        $categories = \App\Models\Category::where('is_active', true)->get();

        return Inertia::render('Products', [
            'products' => $products,
            'categories' => $categories,
            'selectedCategory' => $request->category,
        ]);
    }
}
