import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import SpiritualLayout from '../Components/SpiritualLayout';
import Alert from '../Components/Alert';

export default function Contact() {
    const { flash = {} } = usePage().props;
    const [alert, setAlert] = useState(() => {
        if (flash?.success) {
            return { type: 'success', message: flash.success };
        }

        if (flash?.error) {
            return { type: 'error', message: flash.error };
        }

        return null;
    });
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        message: '',
    });

    useEffect(() => {
        if (flash?.success) {
            setAlert({ type: 'success', message: flash.success });
            return;
        }

        if (flash?.error) {
            setAlert({ type: 'error', message: flash.error });
        }
    }, [flash?.success, flash?.error]);

    useEffect(() => {
        if (!alert) {
            return undefined;
        }

        const timer = setTimeout(() => setAlert(null), 5000);
        return () => clearTimeout(timer);
    }, [alert]);

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();
        setAlert(null);

        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: () => {
                setAlert({
                    type: 'error',
                    message: 'Please correct the highlighted fields and try again.',
                });
            },
        });
    };

    return (
        <SpiritualLayout>
            <Head title="Contact Us" />

            <div className="max-w-3xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="font-['Cinzel'] text-5xl text-[#5B3A29] mb-6">
                        Connect With Us
                    </h1>
                    <div className="w-20 h-1 bg-[#C6A75E] mx-auto mb-6"></div>
                    <p className="font-['Lora'] text-lg text-[#5B3A29]/70">
                        We welcome your questions, thoughts, and spiritual inquiries
                    </p>
                </div>

                {alert && (
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                )}

                <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl mb-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block font-['Lora'] text-[#5B3A29] mb-2 text-lg">
                                Name *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-[#C6A75E]/30 rounded focus:border-[#C6A75E] focus:outline-none bg-[#F5EBDD] font-['Lora']"
                                required
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-['Lora'] text-[#5B3A29] mb-2 text-lg">
                                Email *
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-[#C6A75E]/30 rounded focus:border-[#C6A75E] focus:outline-none bg-[#F5EBDD] font-['Lora']"
                                required
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-['Lora'] text-[#5B3A29] mb-2 text-lg">
                                Message *
                            </label>
                            <textarea
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                rows="6"
                                className="w-full px-4 py-3 border-2 border-[#C6A75E]/30 rounded focus:border-[#C6A75E] focus:outline-none bg-[#F5EBDD] font-['Lora'] resize-none"
                                required
                            ></textarea>
                            {errors.message && (
                                <p className="text-red-600 text-sm mt-1">{errors.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#5B3A29] text-[#F5EBDD] px-8 py-4 rounded font-['Lora'] text-lg hover:bg-[#C6A75E] hover:text-[#5B3A29] transition-all duration-300 border-2 border-[#5B3A29] hover:border-[#C6A75E] disabled:opacity-50"
                        >
                            {processing ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-lg shadow text-center">
                        <div className="text-3xl mb-3">📧</div>
                        <h3 className="font-['Cinzel'] text-lg text-[#5B3A29] mb-2">Email</h3>
                        <a href="mailto:pky463775@gmail.com" className="font-['Lora'] text-[#C6A75E] hover:underline">
                            pky463775@gmail.com
                        </a>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow text-center">
                        <div className="text-3xl mb-3">📱</div>
                        <h3 className="font-['Cinzel'] text-lg text-[#5B3A29] mb-2">Phone</h3>
                        <a href="tel:+917235804914" className="font-['Lora'] text-[#C6A75E] hover:underline">
                            +91 7235804914
                        </a>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="font-['Lora'] text-[#5B3A29]/70 italic">
                        "In the silence between words, wisdom speaks"
                    </p>
                </div>
            </div>
        </SpiritualLayout>
    );
}
