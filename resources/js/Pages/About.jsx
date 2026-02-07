import { Head } from '@inertiajs/react';
import SpiritualLayout from '../Components/SpiritualLayout';

export default function About() {
    return (
        <SpiritualLayout>
            <Head title="About Us - Our Spiritual Mission" />

            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="font-['Cinzel'] text-5xl text-[#5B3A29] mb-6">
                        Our Sacred Mission
                    </h1>
                    <div className="w-20 h-1 bg-[#C6A75E] mx-auto"></div>
                </div>

                <div className="space-y-12">
                    <div className="bg-white/50 p-8 rounded-lg border-l-4 border-[#C6A75E]">
                        <p className="font-['Lora'] text-xl text-[#5B3A29]/80 leading-relaxed mb-6">
                            In a world filled with noise and distraction, we believe that ancient wisdom holds the key to modern peace. Hidden Wisdom was born from a deep reverence for the timeless spiritual teachings that have guided seekers for millennia.
                        </p>
                        <p className="font-['Lora'] text-xl text-[#5B3A29]/80 leading-relaxed">
                            Our mission is simple yet profound: to preserve and share the sacred knowledge of Dharma, making it accessible to all who seek truth, peace, and enlightenment in their daily lives.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="text-4xl mb-4">🕉️</div>
                            <h3 className="font-['Cinzel'] text-2xl text-[#5B3A29] mb-4">
                                Authentic Wisdom
                            </h3>
                            <p className="font-['Lora'] text-[#5B3A29]/70 leading-relaxed">
                                Every teaching we share is rooted in authentic spiritual traditions, carefully curated to maintain their original essence while being accessible to modern readers.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="text-4xl mb-4">🪷</div>
                            <h3 className="font-['Cinzel'] text-2xl text-[#5B3A29] mb-4">
                                Practical Guidance
                            </h3>
                            <p className="font-['Lora'] text-[#5B3A29]/70 leading-relaxed">
                                We bridge the gap between ancient philosophy and contemporary life, offering practical tools for spiritual growth and inner transformation.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#5B3A29] to-[#C6A75E] p-8 rounded-lg text-center">
                        <p className="font-['Cinzel'] text-2xl text-[#F5EBDD] italic">
                            "The light of wisdom dispels the darkness of ignorance"
                        </p>
                        <p className="font-['Lora'] text-[#F5EBDD]/80 mt-4">
                            — Ancient Vedic Wisdom
                        </p>
                    </div>

                    <div className="text-center">
                        <h2 className="font-['Cinzel'] text-3xl text-[#5B3A29] mb-6">
                            Join Our Journey
                        </h2>
                        <p className="font-['Lora'] text-lg text-[#5B3A29]/80 leading-relaxed mb-8">
                            Whether you are beginning your spiritual path or deepening your practice, we invite you to explore these timeless teachings. Together, we can rediscover the wisdom that has illuminated countless lives across the ages.
                        </p>
                    </div>
                </div>
            </div>
        </SpiritualLayout>
    );
}
