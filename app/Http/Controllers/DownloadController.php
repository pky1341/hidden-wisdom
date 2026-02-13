<?php

namespace App\Http\Controllers;

use App\Models\Download;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DownloadController extends Controller
{
    public function download(string $token)
    {
        $download = Download::with(['order.product'])
            ->whereToken($token)
            ->firstOrFail();

        if ($download->isExpired()) {
            abort(410, 'Download link has expired.');
        }

        $order = $download->order;

        if (! $order->isPaid()) {
            abort(403, 'Payment is not verified for this download link.');
        }

        $product = $order->product;

        if (! $product?->file_path || ! Storage::disk('private')->exists($product->file_path)) {
            abort(404, 'File is not available anymore.');
        }

        $download->update([
            'downloaded_at' => now(),
            'ip_address' => request()->ip(),
        ]);

        $filename = Str::slug($product->title) . '.pdf';

        return Storage::disk('private')->download($product->file_path, $filename);
    }
}
