<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use App\Services\RazorpayService;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService,
        private RazorpayService $razorpayService,
    ) {}

    public function show(string $slug): Response
    {
        $product = $this->productService->findBySlug($slug);

        abort_if(! $product, 404);

        return Inertia::render('Product', [
            'product' => $product,
            'razorpayKey' => $this->razorpayService->getPublicKey(),
        ]);
    }
}
