import { Link } from '@inertiajs/react';

export default function SpiritualLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#F5EBDD] font-['Lora']">
            {/* Header */}
            <header className="bg-white/50 backdrop-blur-sm border-b-2 border-[#C6A75E]/30 sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="font-['Cinzel'] text-2xl text-[#5B3A29] hover:text-[#C6A75E] transition-colors">
                            🕉️ Hidden Wisdom
                        </Link>
                        
                        <div className="flex gap-8">
                            <Link 
                                href="/" 
                                className="font-['Lora'] text-[#5B3A29] hover:text-[#C6A75E] transition-colors"
                            >
                                Home
                            </Link>
                            <Link 
                                href="/products" 
                                className="font-['Lora'] text-[#5B3A29] hover:text-[#C6A75E] transition-colors"
                            >
                                Products
                            </Link>
                            <Link 
                                href="/about" 
                                className="font-['Lora'] text-[#5B3A29] hover:text-[#C6A75E] transition-colors"
                            >
                                About
                            </Link>
                            <Link 
                                href="/contact" 
                                className="font-['Lora'] text-[#5B3A29] hover:text-[#C6A75E] transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-[#5B3A29] text-[#F5EBDD] py-12 px-4 mt-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
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
                            <h3 className="font-['Cinzel'] text-xl mb-4">Connect</h3>
                            <p className="text-[#F5EBDD]/80 text-sm">
                                Join us on the journey to spiritual awakening and inner peace.
                            </p>
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
