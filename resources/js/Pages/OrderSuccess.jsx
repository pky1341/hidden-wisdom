import { Head, Link } from '@inertiajs/react';
import SpiritualLayout from '../Components/SpiritualLayout';

export default function OrderSuccess({ product, order, download }) {
    return (
        <SpiritualLayout>
            <Head title="Payment Successful" />

            <section className="mx-auto max-w-3xl px-4 py-20">
                <div className="rounded-2xl border border-[#d8be86] bg-white p-8 text-center shadow-sm">
                    <h1 className="font-['Cinzel'] text-4xl text-[#4f2f1f]">Payment Successful</h1>
                    <p className="mt-4 font-['Lora'] text-lg text-[#6b4530]">
                        Your order for <strong>{product.title}</strong> is confirmed.
                    </p>

                    <div className="mt-8 rounded-xl border border-[#d8be86] bg-[#fffaf1] p-5 text-left">
                        <p className="font-['Lora'] text-sm text-[#6b4530]">Order ID: #{order.id}</p>
                        <p className="mt-1 font-['Lora'] text-sm text-[#6b4530]">Email: {order.user_email}</p>
                        <p className="mt-1 font-['Lora'] text-sm text-[#6b4530]">Amount Paid: ₹{Number(order.amount).toFixed(2)}</p>
                        <p className="mt-1 font-['Lora'] text-sm text-[#6b4530]">
                            Link Expires: {new Date(download.expires_at).toLocaleString()}
                        </p>
                    </div>

                    <a
                        href={download.url}
                        className="mt-8 inline-block rounded-md border-2 border-[#5b3a29] bg-[#5b3a29] px-8 py-4 font-['Lora'] text-lg text-[#f5ebdd] transition hover:border-[#c6a75e] hover:bg-[#c6a75e] hover:text-[#4f2f1f]"
                    >
                        Download Ebook PDF
                    </a>

                    <p className="mt-4 font-['Lora'] text-sm text-[#6b4530]">
                        A delivery email was also sent with the same secure link.
                    </p>

                    <Link href="/" className="mt-8 inline-block font-['Lora'] text-[#5b3a29] underline decoration-[#c6a75e] underline-offset-4">
                        Return to Home
                    </Link>
                </div>
            </section>
        </SpiritualLayout>
    );
}
