import { Head, Link } from '@inertiajs/react';
import SpiritualLayout from '../Components/SpiritualLayout';

export default function Home({ featuredProduct }) {
    return (
        <SpiritualLayout>
            <Head title="Ancient Dharma Wisdom for Modern Life" />
            
            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-20">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-[url('/images/lotus.svg')] bg-contain bg-no-repeat"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-[url('/images/lotus.svg')] bg-contain bg-no-repeat transform rotate-180"></div>
                </div>
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="mb-8">
                        <div className="w-20 h-1 bg-[#C6A75E] mx-auto mb-8"></div>
                        <h1 className="font-['Cinzel'] text-5xl md:text-7xl text-[#5B3A29] mb-6 leading-tight">
                            Ancient Dharma Wisdom<br />for Modern Life
                        </h1>
                        <div className="w-20 h-1 bg-[#C6A75E] mx-auto mt-8"></div>
                    </div>
                    
                    <p className="font-['Lora'] text-xl md:text-2xl text-[#5B3A29]/80 mb-12 leading-relaxed max-w-2xl mx-auto">
                        Discover timeless spiritual teachings that illuminate your path to inner peace and enlightenment
                    </p>
                    
                    {featuredProduct && (
                        <Link
                            href={`/product/${featuredProduct.slug}`}
                            className="inline-block bg-[#5B3A29] text-[#F5EBDD] px-12 py-4 rounded-sm font-['Lora'] text-lg hover:bg-[#C6A75E] hover:text-[#5B3A29] transition-all duration-300 border-2 border-[#5B3A29] hover:border-[#C6A75E]"
                        >
                            Explore Sacred Teachings
                        </Link>
                    )}
                </div>
            </section>

            {/* Featured Product Section */}
            {featuredProduct && (
                <section className="py-20 px-4 bg-white/30">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-['Cinzel'] text-4xl text-[#5B3A29] mb-4">
                                Featured Wisdom
                            </h2>
                            <div className="w-16 h-1 bg-[#C6A75E] mx-auto"></div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                {featuredProduct.cover_image ? (
                                    <img 
                                        src={`/storage/${featuredProduct.cover_image}`}
                                        alt={featuredProduct.title}
                                        className="w-full aspect-[3/4] object-cover rounded-lg shadow-xl"
                                    />
                                ) : (
                                    <div className="aspect-[3/4] bg-gradient-to-br from-[#5B3A29] to-[#C6A75E] rounded-lg shadow-xl flex items-center justify-center p-8">
                                        <span className="text-[#F5EBDD] font-['Cinzel'] text-3xl text-center">
                                            {featuredProduct.title}
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                <h3 className="font-['Cinzel'] text-3xl text-[#5B3A29] mb-6">
                                    {featuredProduct.title}
                                </h3>
                                <p className="font-['Lora'] text-lg text-[#5B3A29]/80 mb-8 leading-relaxed">
                                    {featuredProduct.description}
                                </p>
                                <div className="flex items-center gap-6 mb-8">
                                    <span className="font-['Cinzel'] text-3xl text-[#C6A75E]">
                                        {featuredProduct.formatted_price}
                                    </span>
                                    <span className="text-[#5B3A29]/60 font-['Lora']">
                                        Digital Ebook
                                    </span>
                                </div>
                                <Link
                                    href={`/product/${featuredProduct.slug}`}
                                    className="inline-block bg-[#5B3A29] text-[#F5EBDD] px-10 py-3 rounded-sm font-['Lora'] hover:bg-[#C6A75E] hover:text-[#5B3A29] transition-all duration-300 border-2 border-[#5B3A29] hover:border-[#C6A75E]"
                                >
                                    Begin Your Journey
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Values Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#C6A75E]/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <span className="text-3xl">🕉️</span>
                            </div>
                            <h3 className="font-['Cinzel'] text-xl text-[#5B3A29] mb-4">
                                Authentic Teachings
                            </h3>
                            <p className="font-['Lora'] text-[#5B3A29]/70">
                                Rooted in ancient wisdom, preserved for modern seekers
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#C6A75E]/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <span className="text-3xl">🪷</span>
                            </div>
                            <h3 className="font-['Cinzel'] text-xl text-[#5B3A29] mb-4">
                                Inner Transformation
                            </h3>
                            <p className="font-['Lora'] text-[#5B3A29]/70">
                                Practical guidance for spiritual growth and awakening
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#C6A75E]/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <span className="text-3xl">📿</span>
                            </div>
                            <h3 className="font-['Cinzel'] text-xl text-[#5B3A29] mb-4">
                                Timeless Wisdom
                            </h3>
                            <p className="font-['Lora'] text-[#5B3A29]/70">
                                Universal truths that transcend time and culture
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </SpiritualLayout>
    );
}
