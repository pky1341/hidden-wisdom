import { Link } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Admin Header */}
            <header className="bg-[#5B3A29] text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-8">
                            <Link href="/admin" className="text-2xl font-bold">
                                🕉️ Admin Panel
                            </Link>
                            <nav className="flex gap-6">
                                <Link href="/admin" className="hover:text-[#C6A75E]">Dashboard</Link>
                                <Link href="/admin/products" className="hover:text-[#C6A75E]">Products</Link>
                                <Link href="/admin/orders" className="hover:text-[#C6A75E]">Orders</Link>
                                <Link href="/admin/customers" className="hover:text-[#C6A75E]">Customers</Link>
                            </nav>
                        </div>
                        <Link href="/" className="text-sm hover:text-[#C6A75E]">
                            ← View Website
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
