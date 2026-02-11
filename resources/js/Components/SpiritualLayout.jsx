import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function SpiritualLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [url]);

    const isActiveLink = (href) => {
        if (href === '/products') {
            return url.startsWith('/products') || url.startsWith('/product/');
        }

        return url === href;
    };

    return (
        <div className="min-h-screen bg-[#F5EBDD] font-['Lora'] overflow-x-hidden">
            {/* Header */}
            <header className="bg-white/50 backdrop-blur-sm border-b-2 border-[#C6A75E]/30 sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 py-4" aria-label="Main navigation">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="font-['Cinzel'] text-xl md:text-2xl text-[#5B3A29] hover:text-[#C6A75E] transition-colors">
                            🕉️ Hidden Wisdom
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex gap-8 text-base">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`font-['Lora'] transition-colors ${
                                        isActiveLink(link.href)
                                            ? 'text-[#C6A75E]'
                                            : 'text-[#5B3A29] hover:text-[#C6A75E]'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden inline-flex items-center justify-center text-[#5B3A29] p-2 border border-[#C6A75E]/50 rounded-md bg-white/80"
                            aria-expanded={mobileMenuOpen}
                            aria-controls="site-mobile-menu"
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div
                            id="site-mobile-menu"
                            className="md:hidden mt-4 pb-4 pt-3 border-t border-[#C6A75E]/30"
                        >
                            <div className="space-y-1 rounded-lg bg-white/80 p-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`block font-['Lora'] transition-colors py-2 px-3 rounded ${
                                            isActiveLink(link.href)
                                                ? 'bg-[#C6A75E]/20 text-[#5B3A29]'
                                                : 'text-[#5B3A29] hover:text-[#C6A75E] hover:bg-[#C6A75E]/10'
                                        }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </nav>
            </header>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-[#5B3A29] text-[#F5EBDD] py-12 px-4 mt-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="font-['Cinzel'] text-xl mb-4">Hidden Wisdom</h3>
                            <p className="font-['Lora'] text-[#F5EBDD]/80 text-sm">
                                Bringing ancient spiritual teachings to modern seekers on their path to enlightenment.
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="font-['Cinzel'] text-xl mb-4">Quick Links</h3>
                            <div className="flex flex-col gap-2">
                                <Link href="/" className="text-[#F5EBDD]/80 hover:text-[#C6A75E] transition-colors text-sm">
                                    Home
                                </Link>
                                <Link href="/products" className="text-[#F5EBDD]/80 hover:text-[#C6A75E] transition-colors text-sm">
                                    Products
                                </Link>
                                <Link href="/about" className="text-[#F5EBDD]/80 hover:text-[#C6A75E] transition-colors text-sm">
                                    About Us
                                </Link>
                                <Link href="/contact" className="text-[#F5EBDD]/80 hover:text-[#C6A75E] transition-colors text-sm">
                                    Contact
                                </Link>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-['Cinzel'] text-xl mb-4">Contact Us</h3>
                            <div className="flex flex-col gap-2 text-sm">
                                <a href="mailto:pky463775@gmail.com" className="text-[#F5EBDD]/80 hover:text-[#C6A75E] transition-colors">
                                    📧 pky463775@gmail.com
                                </a>
                                <a href="tel:+917235804914" className="text-[#F5EBDD]/80 hover:text-[#C6A75E] transition-colors">
                                    📱 +91 7235804914
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-['Cinzel'] text-xl mb-4">Follow Us</h3>
                            <div className="flex gap-4">
                                <a href="https://www.youtube.com/@sanatan-stories-j8x" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-[#C6A75E] transition-colors" title="YouTube">
                                    <img src="/assets/icons/youtube.png" alt="YouTube" className="w-8 h-8 object-contain" />
                                </a>
                                <a href="https://www.instagram.com/sanatan_stories_46/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-[#C6A75E] transition-colors" title="Instagram">
                                    <img src="/assets/icons/instagram.png" alt="Instagram" className="w-8 h-8 object-contain" />
                                </a>
                                <a href="https://www.facebook.com/share/17x4LhQmma/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-[#C6A75E] transition-colors" title="Facebook">
                                    <img src="/assets/icons/facebook.png" alt="Facebook" className="w-8 h-8 object-contain" />
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-[#C6A75E]/30 pt-8 text-center">
                        <p className="text-[#F5EBDD]/60 text-sm font-['Lora']">
                            © {new Date().getFullYear()} Hidden Wisdom. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
