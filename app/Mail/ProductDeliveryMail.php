<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ProductDeliveryMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Order $order
    ) {
        $this->order->loadMissing(['product', 'download']);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Ebook Is Ready - ' . $this->order->product->title,
        );
    }

    public function content(): Content
    {
        $downloadToken = $this->order->download?->download_token;
        $downloadUrl = $downloadToken ? route('download', $downloadToken) : null;

        return new Content(
            view: 'emails.product-delivery',
            with: [
                'order' => $this->order,
                'downloadUrl' => $downloadUrl,
                'downloadExpiresAt' => $this->order->download?->expires_at?->format('d M Y, h:i A'),
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
