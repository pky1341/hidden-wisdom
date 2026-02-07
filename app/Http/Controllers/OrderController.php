<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderRequest;
use App\Services\RazorpayService;
use App\Services\OrderService;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(
        private RazorpayService $razorpayService,
        private OrderService $orderService,
        private ProductService $productService
    ) {}

    public function create(CreateOrderRequest $request): JsonResponse
    {
        $product = $this->productService->findBySlug($request->product_id);

        abort_if(!$product, 404);

        $order = $this->razorpayService->createOrder($product, $request->validated());

        return response()->json([
            'order_id' => $order->razorpay_order_id,
            'amount' => $order->amount * 100,
            'currency' => $order->currency,
        ]);
    }

    public function verify(Request $request): JsonResponse
    {
        $request->validate([
            'razorpay_order_id' => 'required|string',
            'razorpay_payment_id' => 'required|string',
            'razorpay_signature' => 'required|string',
        ]);

        $order = $this->orderService->findByRazorpayOrderId($request->razorpay_order_id);

        abort_if(!$order, 404);

        $success = $this->orderService->processPayment($order, $request->all());

        return response()->json([
            'success' => $success,
            'message' => $success ? 'Payment successful! Check your email for the ebook.' : 'Payment verification failed.',
        ]);
    }
}
