import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

const adminLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/orders', label: 'Orders' },
    { href: '/admin/customers', label: 'Customers' },
    { href: '/admin/contacts', label: 'Contacts' },
];

export default function AdminLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [url]);

    const isActiveLink = (href) => {
        if (href === '/admin') {
            return url === '/admin';
        }

        return url === href || url.startsWith(`${href}/`);
    };

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            router.post('/admin/logout');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Toaster position="top-right" />
            {/* Admin Header */}
            <header className="bg-[#5B3A29] text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
                    <div className="flex justify-between items-center gap-3">
                        <Link href="/admin" className="text-xl md:text-2xl font-bold">
                            🕉️ Admin Panel
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex gap-6" aria-label="Admin navigation">
                            {adminLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={isActiveLink(link.href) ? 'text-[#C6A75E]' : 'hover:text-[#C6A75E]'}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Link href="/" className="text-sm hover:text-[#C6A75E]">
                                ← View Website
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                            >
                                Logout
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden text-white p-2 border border-[#C6A75E]/40 rounded-md bg-[#6b412d]"
                            aria-expanded={mobileMenuOpen}
                            aria-controls="admin-mobile-menu"
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
                        <div id="admin-mobile-menu" className="lg:hidden mt-4 pb-2 border-t border-[#C6A75E]/30 pt-4">
                            <div className="space-y-1 rounded-lg bg-[#6b412d] p-2">
                                {adminLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`block py-2 px-3 rounded ${
                                            isActiveLink(link.href)
                                                ? 'bg-[#C6A75E]/25 text-[#F5EBDD]'
                                                : 'hover:text-[#C6A75E] hover:bg-[#C6A75E]/15'
                                        }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <Link
                                    href="/"
                                    className="block py-2 px-3 rounded border border-[#C6A75E]/40 hover:text-[#C6A75E]"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    ← View Website
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full text-left bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-8">
                {children}
            </main>
        </div>
    );
}
