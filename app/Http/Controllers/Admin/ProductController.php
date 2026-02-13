<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService
    ) {}

    public function index(): Response
    {
        $products = Product::latest()->paginate(20);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Products/Create');
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = $this->generateUniqueSlug($data['title']);
        $data['discount_price'] = $data['discount_price'] ?? null;

        if ($request->hasFile('pdf')) {
            $data['file_path'] = $request->file('pdf')->store('products', 'private');
        }

        if ($request->hasFile('preview_image')) {
            $data['preview_image'] = $request->file('preview_image')->store('previews', 'public');
        }

        Product::create($data);
        $this->productService->clearCache();

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully.');
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = $this->generateUniqueSlug($data['title'], $product->id);
        $data['discount_price'] = $data['discount_price'] ?? null;

        if ($request->hasFile('pdf')) {
            if ($product->file_path) {
                Storage::disk('private')->delete($product->file_path);
            }

            $data['file_path'] = $request->file('pdf')->store('products', 'private');
        }

        if ($request->hasFile('preview_image')) {
            if ($product->preview_image) {
                Storage::disk('public')->delete($product->preview_image);
            }

            $data['preview_image'] = $request->file('preview_image')->store('previews', 'public');
        }

        $product->update($data);
        $this->productService->clearCache();

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        if ($product->file_path) {
            Storage::disk('private')->delete($product->file_path);
        }

        if ($product->preview_image) {
            Storage::disk('public')->delete($product->preview_image);
        }

        $product->delete();
        $this->productService->clearCache();

        return redirect()->route('admin.products.index')
            ->with('success', 'Product deleted successfully.');
    }

    private function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $counter = 1;

        while (
            Product::query()
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->where('slug', $slug)
                ->exists()
        ) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}
