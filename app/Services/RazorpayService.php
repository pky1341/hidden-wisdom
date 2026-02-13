<?php

namespace App\Services;

use Illuminate\Http\Client\Factory as HttpFactory;
use Illuminate\Support\Arr;
use RuntimeException;

class RazorpayService
{
    private const BASE_URL = 'https://api.razorpay.com/v1';

    public function __construct(
        private HttpFactory $http
    ) {}

    public function createOrder(string $receipt, int $amountInPaise, string $currency = 'INR'): array
    {
        $response = $this->http
            ->withBasicAuth($this->getKey(), $this->getSecret())
            ->acceptJson()
            ->post(self::BASE_URL . '/orders', [
                'amount' => $amountInPaise,
                'currency' => strtoupper($currency),
                'receipt' => $receipt,
                'payment_capture' => 1,
            ])
            ->throw();

        return Arr::only($response->json(), [
            'id',
            'entity',
            'amount',
            'currency',
            'receipt',
            'status',
        ]);
    }

    public function verifyPayment(string $orderId, string $paymentId, string $signature): bool
    {
        $payload = $orderId . '|' . $paymentId;
        $expectedSignature = hash_hmac('sha256', $payload, $this->getSecret());

        return hash_equals($expectedSignature, $signature);
    }

    public function getPublicKey(): string
    {
        return $this->getKey();
    }

    private function getKey(): string
    {
        $key = (string) config('services.razorpay.key');

        if ($key === '') {
            throw new RuntimeException('Razorpay key is not configured.');
        }

        return $key;
    }

    private function getSecret(): string
    {
        $secret = (string) config('services.razorpay.secret');

        if ($secret === '') {
            throw new RuntimeException('Razorpay secret is not configured.');
        }

        return $secret;
    }
}
