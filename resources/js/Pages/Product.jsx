import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import SpiritualLayout from '../Components/SpiritualLayout';
import Alert from '../Components/Alert';
import axios from 'axios';

export default function Product({ product, razorpayKey }) {
    const [processing, setProcessing] = useState(false);
    const [alert, setAlert] = useState(null);
    const { data, setData, errors } = useForm({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePurchase = async (e) => {
        e.preventDefault();
        
        if (!data.name || !data.email) {
            setAlert({ type: 'error', message: 'Please fill in all required fields (Name and Email)' });
            return;
        }

        setProcessing(true);
        setAlert({ type: 'info', message: 'Loading payment gateway...' });

        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            setAlert({ type: 'error', message: 'Payment gateway failed to load. Please check your internet connection and try again.' });
            setProcessing(false);
            return;
        }

        try {
            const orderResponse = await axios.post('/api/orders/create', {
                product_id: product.slug,
                name: data.name,
                email: data.email,
                phone: data.phone,
            });

            setAlert(null);

            const options = {
                key: razorpayKey,
                amount: orderResponse.data.amount,
                currency: orderResponse.data.currency,
                name: 'Hidden Wisdom',
                description: product.title,
                order_id: orderResponse.data.order_id,
                handler: async function (response) {
                    setAlert({ type: 'info', message: 'Verifying payment... Please wait.' });
                    try {
                        const verifyResponse = await axios.post('/api/orders/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (verifyResponse.data.success) {
                            setAlert({ type: 'success', message: '✓ Payment successful! Your ebook has been sent to ' + data.email + '. Please check your inbox.' });
                            setTimeout(() => window.location.href = '/', 3000);
                        } else {
                            setAlert({ type: 'error', message: 'Payment verification failed. Please contact support with your payment ID.' });
                        }
                    } catch (error) {
                        setAlert({ type: 'error', message: 'Payment verification failed. Your payment may have been processed. Please contact support.' });
                    }
                    setProcessing(false);
                },
                prefill: {
                    name: data.name,
                    email: data.email,
                    contact: data.phone,
                },
                theme: {
                    color: '#5B3A29',
                },
                modal: {
                    ondismiss: function() {
                        setAlert({ type: 'warning', message: 'Payment cancelled. You can try again when ready.' });
                        setProcessing(false);
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.on('payment.failed', function (response) {
                setAlert({ type: 'error', message: 'Payment failed: ' + response.error.description + '. Please try again.' });
                setProcessing(false);
            });
            razorpay.open();
        } catch (error) {
            setAlert({ type: 'error', message: 'Failed to create order. Please try again or contact support if the issue persists.' });
            setProcessing(false);
        }
    };

    return (
        <SpiritualLayout>
            <Head title={product.title} />

            <div className="max-w-6xl mx-auto px-4 py-16">
                {alert && (
                    <div className="mb-6">
                        <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-[#C6A75E]/10 rounded-lg"></div>
                        <div className="relative bg-white p-8 rounded-lg shadow-xl">
                            {product.cover_image ? (
                                <div className="aspect-[3/4] rounded overflow-hidden">
                                    <img 
                                        src={`/storage/${product.cover_image}`} 
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="aspect-[3/4] bg-gradient-to-br from-[#5B3A29] to-[#C6A75E] rounded flex items-center justify-center">
                                    <span className="text-[#F5EBDD] font-['Cinzel'] text-3xl text-center px-8">
                                        {product.title}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div>
                        <h1 className="font-['Cinzel'] text-4xl text-[#5B3A29] mb-6">
                            {product.title}
                        </h1>
                        
                        <div className="w-16 h-1 bg-[#C6A75E] mb-8"></div>
                        
                        <p className="font-['Lora'] text-lg text-[#5B3A29]/80 mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        {product.preview_content && (
                            <div className="bg-white/50 p-6 rounded-lg mb-8 border-l-4 border-[#C6A75E]">
                                <h3 className="font-['Cinzel'] text-xl text-[#5B3A29] mb-3">
                                    Preview
                                </h3>
                                <p className="font-['Lora'] text-[#5B3A29]/70 italic">
                                    {product.preview_content}
                                </p>
                            </div>
                        )}

                        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="font-['Cinzel'] text-5xl text-[#C6A75E]">
                                    {product.formatted_price}
                                </span>
                                <span className="text-[#5B3A29]/60 font-['Lora']">
                                    One-time payment
                                </span>
                            </div>

                            <form onSubmit={handlePurchase} className="space-y-4">
                                <div>
                                    <label className="block font-['Lora'] text-[#5B3A29] mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-[#C6A75E]/30 rounded focus:border-[#C6A75E] focus:outline-none bg-[#F5EBDD]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-['Lora'] text-[#5B3A29] mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-[#C6A75E]/30 rounded focus:border-[#C6A75E] focus:outline-none bg-[#F5EBDD]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-['Lora'] text-[#5B3A29] mb-2">
                                        Phone (Optional)
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-[#C6A75E]/30 rounded focus:border-[#C6A75E] focus:outline-none bg-[#F5EBDD]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-[#5B3A29] text-[#F5EBDD] px-8 py-4 rounded font-['Lora'] text-lg hover:bg-[#C6A75E] hover:text-[#5B3A29] transition-all duration-300 border-2 border-[#5B3A29] hover:border-[#C6A75E] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Processing...' : 'Purchase Now'}
                                </button>
                            </form>

                            <p className="text-sm text-[#5B3A29]/60 mt-4 text-center font-['Lora']">
                                🔒 Secure payment via Razorpay • Instant PDF delivery
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </SpiritualLayout>
    );
}
