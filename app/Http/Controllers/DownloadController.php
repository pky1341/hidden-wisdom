<?php

namespace App\Http\Controllers;

use App\Models\Download;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DownloadController extends Controller
{
    public function download(string $token)
    {
        $download = Download::where('token', $token)->firstOrFail();

        if ($download->isExpired()) {
            abort(410, 'Download link has expired');
        }

        if ($download->isDownloaded()) {
            abort(403, 'This download link has already been used');
        }

        $download->update([
            'downloaded_at' => now(),
            'ip_address' => request()->ip(),
        ]);

        $order = $download->order;
        $product = $order->product;

        return Storage::disk('private')->download(
            $product->pdf_path,
            $product->title . '.pdf'
        );
    }
}
