<?php

namespace App\Services;

use App\Jobs\SendProductEmail;
use App\Models\Download;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use RuntimeException;

class OrderService
{
    public function __construct(
        private RazorpayService $razorpayService
    ) {}

    public function createPendingOrder(Product $product, array $customerData): Order
    {
        $amount = (float) $product->effective_price;
        $amountInPaise = (int) round($amount * 100);
        $receipt = 'ord_' . Str::lower(Str::random(20));

        $gatewayOrder = $this->razorpayService->createOrder(
            receipt: $receipt,
            amountInPaise: $amountInPaise,
            currency: $product->currency ?? 'INR'
        );

        $payload = [
            'product_id' => $product->id,
            'amount' => $amount,
            'currency' => strtoupper($product->currency ?? 'INR'),
            'razorpay_order_id' => $gatewayOrder['id'],
        ];

        $payload[Order::nameColumn()] = $customerData['user_name'] ?? null;
        $payload[Order::emailColumn()] = $customerData['user_email'];
        $payload[Order::phoneColumn()] = $customerData['user_phone'] ?? null;
        $payload[Order::paymentStatusColumn()] = 'pending';

        return Order::create($payload);
    }

    public function processPayment(Order $order, array $paymentData): Download
    {
        if ($order->isPaid() && $order->download) {
            return $order->download;
        }

        $isVerified = $this->razorpayService->verifyPayment(
            orderId: $paymentData['razorpay_order_id'],
            paymentId: $paymentData['razorpay_payment_id'],
            signature: $paymentData['razorpay_signature'],
        );

        if (! $isVerified) {
            $order->markAsFailed();
            throw new RuntimeException('Razorpay signature verification failed.');
        }

        if ($order->razorpay_order_id !== $paymentData['razorpay_order_id']) {
            $order->markAsFailed();
            throw new RuntimeException('Order mismatch detected during payment verification.');
        }

        /** @var Download $download */
        $download = DB::transaction(function () use ($order, $paymentData): Download {
            $order->markAsPaid(
                paymentId: $paymentData['razorpay_payment_id'],
                signature: $paymentData['razorpay_signature'],
            );

            $tokenColumn = Download::tokenColumn();

            return Download::updateOrCreate(
                ['order_id' => $order->id],
                [
                    $tokenColumn => (string) Str::uuid(),
                    'expires_at' => now()->addHours((int) config('payment.download_link_ttl_hours', 72)),
                ]
            );
        });

        SendProductEmail::dispatch($order->fresh(['product', 'download']));

        return $download;
    }

    public function findByRazorpayOrderId(string $orderId): ?Order
    {
        return Order::with(['product', 'download'])
            ->where('razorpay_order_id', $orderId)
            ->first();
    }
}
