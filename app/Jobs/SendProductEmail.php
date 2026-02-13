<?php

namespace App\Jobs;

use App\Mail\ProductDeliveryMail;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendProductEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public Order $order
    ) {}

    public function handle(): void
    {
        $this->order->loadMissing(['product', 'download']);

        if (! $this->order->download) {
            return;
        }

        Mail::to($this->order->user_email)
            ->send(new ProductDeliveryMail($this->order));
    }
}
