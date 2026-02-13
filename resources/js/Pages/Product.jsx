import { Head, useForm, Link } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import SpiritualLayout from '../Components/SpiritualLayout';
import Alert from '../Components/Alert';

const CHECKOUT_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

export default function Product({ product, razorpayKey }) {
    const [processing, setProcessing] = useState(false);
    const [alert, setAlert] = useState(null);

    const { data, setData, errors } = useForm({
        user_name: '',
        user_email: '',
        user_phone: '',
    });

    const isDiscounted = useMemo(() => product.has_discount, [product.has_discount]);

    useEffect(() => {
        if (!alert) {
            return undefined;
        }

        const timer = setTimeout(() => setAlert(null), 6000);
        return () => clearTimeout(timer);
    }, [alert]);

    const loadRazorpayScript = () => {
        if (window.Razorpay) {
            return Promise.resolve(true);
        }

        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = CHECKOUT_SCRIPT;
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePurchase = async (event) => {
        event.preventDefault();

        if (!data.user_email) {
            setAlert({ type: 'error', message: 'Email is required to deliver your ebook.' });
            return;
        }

        setProcessing(true);
        setAlert({ type: 'info', message: 'Preparing secure checkout...' });

        const scriptLoaded = await loadRazorpayScript();

        if (!scriptLoaded) {
            setAlert({ type: 'error', message: 'Could not load Razorpay checkout. Please retry.' });
            setProcessing(false);
            return;
        }

        try {
            const createOrderResponse = await axios.post('/create-order', {
                product_id: product.id,
                user_name: data.user_name,
                user_email: data.user_email,
                user_phone: data.user_phone,
            });

            const options = {
                key: razorpayKey,
                order_id: createOrderResponse.data.order_id,
                amount: createOrderResponse.data.amount,
                currency: createOrderResponse.data.currency,
                name: 'Hidden Wisdom',
                description: product.title,
                prefill: {
                    name: data.user_name,
                    email: data.user_email,
                    contact: data.user_phone,
                },
                notes: {
                    product_id: product.id,
                },
                theme: {
                    color: '#5b3a29',
                },
                modal: {
                    ondismiss: () => {
                        setAlert({ type: 'warning', message: 'Payment cancelled. Your order is still pending.' });
                        setProcessing(false);
                    },
                },
                handler: async (response) => {
                    setAlert({ type: 'info', message: 'Verifying payment signature...' });

                    try {
                        const verifyResponse = await axios.post('/verify-payment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (verifyResponse.data.success && verifyResponse.data.success_url) {
                            window.location.assign(verifyResponse.data.success_url);
                            return;
                        }

                        setAlert({ type: 'error', message: verifyResponse.data.message || 'Payment verification failed.' });
                    } catch (verifyError) {
                        const message = verifyError?.response?.data?.message || 'Payment could not be verified. Contact support with your payment ID.';
                        setAlert({ type: 'error', message });
                    } finally {
                        setProcessing(false);
                    }
                },
            };

            const checkout = new window.Razorpay(options);

            checkout.on('payment.failed', (response) => {
                const description = response?.error?.description || 'Payment failed. Please try again.';
                setAlert({ type: 'error', message: description });
                setProcessing(false);
            });

            checkout.open();
            setAlert(null);
        } catch (createOrderError) {
            const message = createOrderError?.response?.data?.message || 'Unable to create order at the moment.';
            setAlert({ type: 'error', message });
            setProcessing(false);
        }
    };

    return (
        <SpiritualLayout>
            <Head title={product.title} />

            <div className="mx-auto max-w-6xl px-4 py-14">
                {alert && (
                    <div className="mb-6">
                        <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
                    </div>
                )}

                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="rounded-2xl border border-[#d8be86] bg-white p-5 shadow-sm">
                        {product.preview_image_url ? (
                            <img src={product.preview_image_url} alt={product.title} className="aspect-[3/4] w-full rounded-xl object-cover" />
                        ) : (
                            <div className="flex aspect-[3/4] items-center justify-center rounded-xl bg-gradient-to-br from-[#5b3a29] to-[#c6a75e] p-8 text-center font-['Cinzel'] text-3xl text-[#f5ebdd]">
                                {product.title}
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="font-['Lora'] text-sm uppercase tracking-[0.2em] text-[#7d5435]">Digital Ebook</p>
                        <h1 className="mt-2 font-['Cinzel'] text-4xl leading-tight text-[#4f2f1f]">{product.title}</h1>
                        <p className="mt-6 font-['Lora'] text-lg leading-relaxed text-[#6b4530]">{product.description}</p>

                        {product.preview_content && (
                            <blockquote className="mt-6 rounded-xl border-l-4 border-[#c6a75e] bg-white/60 p-4 font-['Lora'] italic text-[#6b4530]">
                                {product.preview_content}
                            </blockquote>
                        )}

                        <div className="mt-8 rounded-2xl border border-[#d8be86] bg-[#fffaf1] p-6">
                            <div className="mb-5 flex flex-wrap items-end gap-3">
                                {isDiscounted && (
                                    <span className="font-['Lora'] text-xl text-[#7d5435] line-through">
                                        {product.formatted_original_price}
                                    </span>
                                )}
                                <span className="font-['Cinzel'] text-5xl text-[#b27e2e]">{product.formatted_price}</span>
                                {isDiscounted && (
                                    <span className="rounded-full bg-[#5b3a29] px-3 py-1 font-['Lora'] text-sm text-[#f5ebdd]">
                                        Save {product.discount_percentage}%
                                    </span>
                                )}
                            </div>

                            <form className="space-y-4" onSubmit={handlePurchase}>
                                <div>
                                    <label className="mb-2 block font-['Lora'] text-[#4f2f1f]">Name (optional)</label>
                                    <input
                                        type="text"
                                        value={data.user_name}
                                        onChange={(event) => setData('user_name', event.target.value)}
                                        className="w-full rounded-md border border-[#d8be86] bg-white px-4 py-3 focus:border-[#b27e2e] focus:outline-none"
                                    />
                                    {errors.user_name && <p className="mt-1 text-sm text-red-700">{errors.user_name}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block font-['Lora'] text-[#4f2f1f]">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={data.user_email}
                                        onChange={(event) => setData('user_email', event.target.value)}
                                        className="w-full rounded-md border border-[#d8be86] bg-white px-4 py-3 focus:border-[#b27e2e] focus:outline-none"
                                    />
                                    {errors.user_email && <p className="mt-1 text-sm text-red-700">{errors.user_email}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block font-['Lora'] text-[#4f2f1f]">Phone (optional)</label>
                                    <input
                                        type="tel"
                                        value={data.user_phone}
                                        onChange={(event) => setData('user_phone', event.target.value)}
                                        className="w-full rounded-md border border-[#d8be86] bg-white px-4 py-3 focus:border-[#b27e2e] focus:outline-none"
                                    />
                                    {errors.user_phone && <p className="mt-1 text-sm text-red-700">{errors.user_phone}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-md border-2 border-[#5b3a29] bg-[#5b3a29] px-8 py-4 font-['Lora'] text-lg text-[#f5ebdd] transition hover:border-[#c6a75e] hover:bg-[#c6a75e] hover:text-[#4f2f1f] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {processing ? 'Processing...' : 'Buy Now - Get Instant Access'}
                                </button>
                            </form>

                            <p className="mt-4 text-center font-['Lora'] text-sm text-[#6b4530]">
                                Secure payment with Razorpay. PDF delivered instantly after signature verification.
                            </p>
                        </div>

                        <Link href="/" className="mt-6 inline-block font-['Lora'] text-[#5b3a29] underline decoration-[#c6a75e] underline-offset-4">
                            Back to landing page
                        </Link>
                    </div>
                </div>
            </div>
        </SpiritualLayout>
    );
}
