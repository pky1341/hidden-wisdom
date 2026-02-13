<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderRequest;
use App\Http\Requests\VerifyPaymentRequest;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function __construct(
        private PaymentController $paymentController
    ) {}

    public function create(CreateOrderRequest $request): JsonResponse
    {
        return $this->paymentController->createOrder($request);
    }

    public function verify(VerifyPaymentRequest $request): JsonResponse
    {
        return $this->paymentController->verifyPayment($request);
    }
}
