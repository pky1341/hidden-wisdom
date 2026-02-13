<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        private ProductService $productService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Home', [
            'featuredProduct' => $this->productService->getFeaturedProduct(),
        ]);
    }
}
