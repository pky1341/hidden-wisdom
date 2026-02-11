# Payment Gateway Setup Guide

## Razorpay Integration - Complete Setup

### 1. Get Razorpay Credentials

1. Go to https://razorpay.com/
2. Sign up / Login to your account
3. Navigate to **Settings** → **API Keys**
4. Generate **Test Keys** (for testing) or **Live Keys** (for production)
5. Copy:
   - **Key ID** (starts with `rzp_test_` or `rzp_live_`)
   - **Key Secret**

### 2. Update .env File

```bash
# Open .env file
nano /var/www/html/hidden-wisdom/.env

# Add these lines (replace with your actual keys):
RAZORPAY_KEY=rzp_test_YOUR_KEY_HERE
RAZORPAY_SECRET=YOUR_SECRET_HERE
```

### 3. Install Razorpay PHP SDK

```bash
cd /var/www/html/hidden-wisdom
composer require razorpay/razorpay
```

### 4. Clear Config Cache

```bash
php artisan config:clear
php artisan cache:clear
```

### 5. Test Payment Flow

1. Go to product page: `yourdomain.com/product/product-slug`
2. Fill in customer details
3. Click "Purchase Now"
4. Use Razorpay test cards:
   - **Success**: 4111 1111 1111 1111
   - **Failure**: 4111 1111 1111 1234
   - CVV: Any 3 digits
   - Expiry: Any future date

### 6. Email Configuration (For PDF Delivery)

Update .env for email:

```bash
# For Gmail SMTP
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME="Hidden Wisdom"
```

Then run:
```bash
php artisan config:clear
php artisan queue:work  # Start queue worker for email jobs
```

### 7. Contact Details Configuration

Update in `/resources/js/Pages/Contact.jsx`:

- **Email**: Line 68 - `mailto:contact@hiddenwisdom.com`
- **Phone**: Line 75 - `tel:+919876543210`
- **Facebook**: Line 82 - `https://facebook.com/hiddenwisdom`
- **Instagram**: Line 85 - `https://instagram.com/hiddenwisdom`
- **Twitter**: Line 88 - `https://twitter.com/hiddenwisdom`

Replace with your actual contact details and social media handles.

### 8. Payment Flow

1. **Customer fills form** → Name, Email, Phone
2. **Order created** → Stored in database with "pending" status
3. **Razorpay modal opens** → Customer enters card details
4. **Payment processed** → Razorpay handles payment
5. **Verification** → Backend verifies payment signature
6. **Order updated** → Status changed to "paid"
7. **Email sent** → PDF download link sent to customer email
8. **Success message** → Customer sees confirmation

### 9. Admin Panel Access

View all orders and contact submissions:
- Orders: `yourdomain.com/admin/orders`
- Contacts: `yourdomain.com/admin/contacts`
- Login: `yourdomain.com/admin/login`
- Password: `pradiep@123` (change in .env: ADMIN_PASSWORD)

### 10. Security Checklist

- [ ] Change ADMIN_PASSWORD in .env
- [ ] Use LIVE Razorpay keys for production
- [ ] Enable HTTPS (SSL certificate)
- [ ] Set APP_ENV=production in .env
- [ ] Set APP_DEBUG=false in .env
- [ ] Restrict admin routes with strong password

## Alert Messages Implemented

### Payment Page Alerts:
- ✓ **Success**: "Payment successful! Your ebook has been sent to [email]"
- ✕ **Error**: Detailed error messages for each failure scenario
- ℹ **Info**: "Loading payment gateway..." / "Verifying payment..."
- ⚠ **Warning**: "Payment cancelled. You can try again when ready."

### Contact Form Alerts:
- ✓ **Success**: "Thank you for your message. We will respond soon."
- Auto-dismisses after 5 seconds
- Form resets after successful submission

## Troubleshooting

**Payment fails immediately:**
- Check Razorpay credentials in .env
- Run `php artisan config:clear`
- Check browser console for errors

**Email not sending:**
- Check MAIL_* settings in .env
- Start queue worker: `php artisan queue:work`
- Check logs: `storage/logs/laravel.log`

**Razorpay modal doesn't open:**
- Check internet connection
- Verify Razorpay script loads (check browser console)
- Ensure RAZORPAY_KEY is correct

## Support

For issues, check:
1. Laravel logs: `storage/logs/laravel.log`
2. Browser console (F12)
3. Razorpay dashboard for payment status
