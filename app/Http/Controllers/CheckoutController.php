<?php

namespace App\Http\Controllers;

use App\Models\Download;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function success(string $downloadToken): Response
    {
        $download = Download::with(['order.product'])
            ->whereToken($downloadToken)
            ->firstOrFail();

        abort_unless($download->order->isPaid(), 404);

        return Inertia::render('OrderSuccess', [
            'download' => [
                'token' => $download->download_token,
                'expires_at' => $download->expires_at,
                'url' => route('download', $download->download_token),
            ],
            'order' => [
                'id' => $download->order->id,
                'user_email' => $download->order->user_email,
                'amount' => $download->order->amount,
            ],
            'product' => [
                'title' => $download->order->product->title,
            ],
        ]);
    }
}
