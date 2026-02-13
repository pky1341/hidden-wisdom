<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Ebook Is Ready</title>
</head>
<body style="margin:0;padding:0;background:#f5ebdd;font-family:Georgia,serif;color:#4f2f1f;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px;">
    <tr>
        <td align="center">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border:1px solid #e5d5b3;border-radius:12px;overflow:hidden;">
                <tr>
                    <td style="padding:24px;background:#5b3a29;color:#f5ebdd;">
                        <h1 style="margin:0;font-size:26px;line-height:1.3;">Your Purchase Is Confirmed</h1>
                        <p style="margin:10px 0 0;opacity:.9;">Thank you for choosing Hidden Wisdom.</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding:24px;">
                        <p style="margin:0 0 12px;">Hi {{ $order->user_name ?: 'Reader' }},</p>
                        <p style="margin:0 0 16px;line-height:1.6;">
                            Your ebook <strong>{{ $order->product->title }}</strong> is ready.
                            @if($downloadUrl && $downloadExpiresAt)
                                This secure link expires on <strong>{{ $downloadExpiresAt }}</strong>.
                            @endif
                        </p>
                        @if($downloadUrl)
                            <p style="margin:24px 0;">
                                <a href="{{ $downloadUrl }}" style="display:inline-block;background:#c6a75e;color:#4f2f1f;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:700;">
                                    Download Your Ebook
                                </a>
                            </p>
                        @else
                            <p style="margin:24px 0;line-height:1.6;color:#775846;">
                                Your download link is being prepared. Please contact support if you do not receive a follow-up email.
                            </p>
                        @endif
                        <p style="margin:0;color:#775846;font-size:14px;line-height:1.6;">
                            Order ID: #{{ $order->id }}<br>
                            Payment ID: {{ $order->razorpay_payment_id }}
                        </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
