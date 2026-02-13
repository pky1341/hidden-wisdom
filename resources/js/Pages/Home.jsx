import { Head, Link } from '@inertiajs/react';
import SpiritualLayout from '../Components/SpiritualLayout';

export default function Home({ featuredProduct }) {
    const hasProduct = Boolean(featuredProduct);

    return (
        <SpiritualLayout>
            <Head title="Ancient Wisdom for Modern Clarity" />

            <div className="relative overflow-hidden bg-[#f5ebdd]">
                <div className="pointer-events-none absolute -top-36 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#c6a75e]/20 blur-3xl" />

                <section className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
                    <p className="mb-4 rounded-full border border-[#c6a75e]/50 px-4 py-1 font-['Lora'] text-sm uppercase tracking-[0.18em] text-[#7d5435]">
                        Limited Time Spiritual Edition
                    </p>
                    <h1 className="font-['Cinzel'] text-4xl text-[#4f2f1f] sm:text-6xl leading-tight">
                        Break Mental Noise.
                        <br />
                        Return to Inner Stillness.
                    </h1>
                    <p className="mt-6 max-w-2xl font-['Lora'] text-lg leading-relaxed text-[#6b4530]">
                        A practical ebook that translates timeless dharma wisdom into daily clarity, peace, and purpose.
                    </p>
                    {hasProduct && (
                        <Link
                            href={`/product/${featuredProduct.slug}`}
                            className="mt-10 rounded-md border-2 border-[#5b3a29] bg-[#5b3a29] px-10 py-4 font-['Lora'] text-lg text-[#f5ebdd] transition hover:border-[#c6a75e] hover:bg-[#c6a75e] hover:text-[#4f2f1f]"
                        >
                            Get Instant Access
                        </Link>
                    )}
                </section>

                <section className="mx-auto max-w-6xl px-4 py-14">
                    <div className="rounded-2xl border border-[#d8be86] bg-white/60 p-8 md:p-12">
                        <h2 className="font-['Cinzel'] text-3xl text-[#4f2f1f]">If You Feel Stuck, You Are Not Alone</h2>
                        <div className="mt-6 grid gap-4 font-['Lora'] text-[#6b4530] md:grid-cols-2">
                            <p>Overthinking steals your focus and drains your spiritual energy.</p>
                            <p>Modern stress disconnects you from discipline, meaning, and calm.</p>
                            <p>You consume content daily but still lack a clear inner compass.</p>
                            <p>You want practical guidance, not abstract philosophy.</p>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-4 py-12">
                    <h2 className="text-center font-['Cinzel'] text-3xl text-[#4f2f1f]">What You Get Inside</h2>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        <article className="rounded-xl border border-[#d8be86] bg-white p-6">
                            <h3 className="font-['Cinzel'] text-xl text-[#5b3a29]">Step-by-Step Clarity Framework</h3>
                            <p className="mt-3 font-['Lora'] text-[#6b4530]">Simple daily rituals to reduce stress and think with focus.</p>
                        </article>
                        <article className="rounded-xl border border-[#d8be86] bg-white p-6">
                            <h3 className="font-['Cinzel'] text-xl text-[#5b3a29]">Actionable Dharma Principles</h3>
                            <p className="mt-3 font-['Lora'] text-[#6b4530]">Learn how to apply timeless teachings in work, relationships, and decisions.</p>
                        </article>
                        <article className="rounded-xl border border-[#d8be86] bg-white p-6">
                            <h3 className="font-['Cinzel'] text-xl text-[#5b3a29]">Instant Digital Access</h3>
                            <p className="mt-3 font-['Lora'] text-[#6b4530]">Secure checkout and immediate PDF delivery after payment confirmation.</p>
                        </article>
                    </div>
                </section>

                {hasProduct && (
                    <>
                        <section className="mx-auto max-w-6xl px-4 py-12">
                            <div className="grid items-center gap-8 rounded-2xl border border-[#d8be86] bg-white p-8 md:grid-cols-2">
                                <div>
                                    <h2 className="font-['Cinzel'] text-3xl text-[#4f2f1f]">Preview the Ebook</h2>
                                    <p className="mt-4 font-['Lora'] leading-relaxed text-[#6b4530]">
                                        Readable structure, practical exercises, and contemplation prompts designed for immediate use.
                                    </p>
                                    <Link
                                        href={`/product/${featuredProduct.slug}`}
                                        className="mt-6 inline-block font-['Lora'] text-[#5b3a29] underline decoration-[#c6a75e] underline-offset-4"
                                    >
                                        Open Full Product Page
                                    </Link>
                                </div>
                                <div className="overflow-hidden rounded-xl border border-[#d8be86] bg-[#f8f1e1] p-3">
                                    {featuredProduct.preview_image_url ? (
                                        <img
                                            src={featuredProduct.preview_image_url}
                                            alt={featuredProduct.title}
                                            className="aspect-[3/4] w-full rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="flex aspect-[3/4] items-center justify-center rounded-lg bg-gradient-to-br from-[#5b3a29] to-[#c6a75e] px-8 text-center font-['Cinzel'] text-2xl text-[#f5ebdd]">
                                            {featuredProduct.title}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        <section className="mx-auto max-w-6xl px-4 py-12">
                            <div className="rounded-2xl border-2 border-[#c6a75e] bg-[#fffaf1] p-8 text-center">
                                <h2 className="font-['Cinzel'] text-3xl text-[#4f2f1f]">Special Launch Pricing</h2>
                                <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
                                    <span className="font-['Lora'] text-xl text-[#7d5435] line-through">{featuredProduct.formatted_original_price}</span>
                                    <span className="font-['Cinzel'] text-5xl text-[#b27e2e]">{featuredProduct.formatted_price}</span>
                                    {featuredProduct.has_discount && (
                                        <span className="rounded-full bg-[#5b3a29] px-3 py-1 font-['Lora'] text-sm text-[#f5ebdd]">
                                            Save {featuredProduct.discount_percentage}%
                                        </span>
                                    )}
                                </div>
                                <p className="mt-4 font-['Lora'] text-[#6b4530]">One-time payment. No recurring charges.</p>
                                <Link
                                    href={`/product/${featuredProduct.slug}`}
                                    className="mt-8 inline-block rounded-md border-2 border-[#5b3a29] bg-[#5b3a29] px-10 py-4 font-['Lora'] text-lg text-[#f5ebdd] transition hover:border-[#c6a75e] hover:bg-[#c6a75e] hover:text-[#4f2f1f]"
                                >
                                    Get Instant Access
                                </Link>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </SpiritualLayout>
    );
}
