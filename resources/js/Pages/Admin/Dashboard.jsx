import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Components/AdminLayout';

export default function Dashboard({ stats, recent_orders, recent_messages }) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Total Products</div>
                    <div className="text-3xl font-bold text-[#5B3A29]">{stats.total_products}</div>
                    <div className="text-xs text-gray-500 mt-1">{stats.active_products} active</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Total Orders</div>
                    <div className="text-3xl font-bold text-[#5B3A29]">{stats.total_orders}</div>
                    <div className="text-xs text-gray-500 mt-1">{stats.paid_orders} paid</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Total Revenue</div>
                    <div className="text-3xl font-bold text-green-600">₹{stats.total_revenue.toFixed(2)}</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-sm text-gray-600">Pending Orders</div>
                    <div className="text-3xl font-bold text-orange-600">{stats.pending_orders}</div>
                    <div className="text-xs text-gray-500 mt-1">{stats.unread_messages} unread messages</div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow mb-8">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">Recent Orders</h2>
                    <Link href="/admin/orders" className="text-[#5B3A29] hover:text-[#C6A75E]">
                        View All →
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {recent_orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">#{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{order.customer_name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{order.product.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">₹{order.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            order.status === 'paid' ? 'bg-green-100 text-green-800' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/admin/products/create" className="bg-[#5B3A29] text-white p-6 rounded-lg shadow hover:bg-[#C6A75E] transition-colors">
                    <div className="text-2xl mb-2">📚</div>
                    <div className="font-bold">Add New Product</div>
                    <div className="text-sm opacity-90">Upload a new ebook</div>
                </Link>

                <Link href="/admin/orders" className="bg-[#5B3A29] text-white p-6 rounded-lg shadow hover:bg-[#C6A75E] transition-colors">
                    <div className="text-2xl mb-2">📦</div>
                    <div className="font-bold">View Orders</div>
                    <div className="text-sm opacity-90">Manage customer orders</div>
                </Link>

                <Link href="/admin/customers" className="bg-[#5B3A29] text-white p-6 rounded-lg shadow hover:bg-[#C6A75E] transition-colors">
                    <div className="text-2xl mb-2">👥</div>
                    <div className="font-bold">View Customers</div>
                    <div className="text-sm opacity-90">See customer analytics</div>
                </Link>
            </div>
        </AdminLayout>
    );
}
