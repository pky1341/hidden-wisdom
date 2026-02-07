<?php

namespace App\Services;

use App\Models\Order;
use App\Jobs\SendProductEmail;

class OrderService
{
    public function __construct(
        private RazorpayService $razorpayService
    ) {}

    public function processPayment(Order $order, array $paymentData): bool
    {
        $verified = $this->razorpayService->verifyPayment(
            $paymentData['razorpay_order_id'],
            $paymentData['razorpay_payment_id'],
            $paymentData['razorpay_signature']
        );

        if ($verified) {
            $order->markAsPaid(
                $paymentData['razorpay_payment_id'],
                $paymentData['razorpay_signature']
            );

            SendProductEmail::dispatch($order);

            return true;
        }

        $order->update(['status' => 'failed']);
        return false;
    }

    public function findByRazorpayOrderId(string $orderId): ?Order
    {
        return Order::where('razorpay_order_id', $orderId)->first();
    }
}
