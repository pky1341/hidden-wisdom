<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderRequest;
use App\Http\Requests\VerifyPaymentRequest;
use App\Services\OrderService;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use RuntimeException;

class PaymentController extends Controller
{
    public function __construct(
        private OrderService $orderService,
        private ProductService $productService,
    ) {}

    public function createOrder(CreateOrderRequest $request): JsonResponse
    {
        $product = $this->productService->findActiveById((int) $request->integer('product_id'));

        abort_if(! $product, 404, 'Product not found.');

        $order = $this->orderService->createPendingOrder($product, $request->validated());

        return response()->json([
            'order_id' => $order->razorpay_order_id,
            'amount' => (int) round((float) $order->amount * 100),
            'currency' => $order->currency,
            'local_order_id' => $order->id,
        ]);
    }

    public function verifyPayment(VerifyPaymentRequest $request): JsonResponse
    {
        $order = $this->orderService->findByRazorpayOrderId($request->string('razorpay_order_id')->toString());

        abort_if(! $order, 404, 'Order not found.');

        try {
            $download = $this->orderService->processPayment($order, $request->validated());
        } catch (RuntimeException $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 422);
        }

        return response()->json([
            'success' => true,
            'message' => 'Payment verified successfully.',
            'download_token' => $download->download_token,
            'download_url' => route('download', $download->download_token),
            'success_url' => route('orders.success', $download->download_token),
        ]);
    }
}
