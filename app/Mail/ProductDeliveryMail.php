<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;

class ProductDeliveryMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Order $order
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Spiritual Wisdom Ebook - ' . $this->order->product->title,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.product-delivery',
        );
    }

    public function attachments(): array
    {
        $pdfPath = storage_path('app/' . $this->order->product->pdf_path);
        
        if (file_exists($pdfPath)) {
            return [
                Attachment::fromPath($pdfPath)
                    ->as($this->order->product->title . '.pdf')
                    ->withMime('application/pdf'),
            ];
        }

        return [];
    }
}
