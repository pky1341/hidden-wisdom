<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use Razorpay\Api\Api;

class RazorpayService
{
    private Api $api;

    public function __construct()
    {
        $this->api = new Api(
            config('services.razorpay.key'),
            config('services.razorpay.secret')
        );
    }

    public function createOrder(Product $product, array $customerData): Order
    {
        $razorpayOrder = $this->api->order->create([
            'amount' => $product->price * 100, // Amount in paise
            'currency' => $product->currency,
            'receipt' => 'order_' . time(),
        ]);

        return Order::create([
            'product_id' => $product->id,
            'customer_name' => $customerData['name'],
            'customer_email' => $customerData['email'],
            'customer_phone' => $customerData['phone'] ?? null,
            'amount' => $product->price,
            'currency' => $product->currency,
            'razorpay_order_id' => $razorpayOrder['id'],
            'status' => 'pending',
        ]);
    }

    public function verifyPayment(string $orderId, string $paymentId, string $signature): bool
    {
        $attributes = [
            'razorpay_order_id' => $orderId,
            'razorpay_payment_id' => $paymentId,
            'razorpay_signature' => $signature,
        ];

        try {
            $this->api->utility->verifyPaymentSignature($attributes);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
