import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Components/AdminLayout';

export default function Dashboard({ stats, recent_orders }) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <h1 className="mb-8 text-3xl font-bold text-gray-800">Dashboard</h1>

            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-lg bg-white p-6 shadow">
                    <div className="text-sm text-gray-600">Total Products</div>
                    <div className="text-3xl font-bold text-[#5B3A29]">{stats.total_products}</div>
                    <div className="mt-1 text-xs text-gray-500">{stats.active_products} active</div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <div className="text-sm text-gray-600">Paid Orders</div>
                    <div className="text-3xl font-bold text-green-600">{stats.paid_orders}</div>
                    <div className="mt-1 text-xs text-gray-500">{stats.failed_orders} failed</div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <div className="text-sm text-gray-600">Total Revenue</div>
                    <div className="text-3xl font-bold text-[#5B3A29]">₹{Number(stats.total_revenue || 0).toFixed(2)}</div>
                    <div className="mt-1 text-xs text-gray-500">AOV ₹{Number(stats.average_order_value || 0).toFixed(2)}</div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <div className="text-sm text-gray-600">Unread Messages</div>
                    <div className="text-3xl font-bold text-orange-600">{stats.unread_messages}</div>
                    <div className="mt-1 text-xs text-gray-500">{stats.total_orders} total orders</div>
                </div>
            </div>

            <div className="rounded-lg bg-white shadow">
                <div className="flex items-center justify-between border-b p-6">
                    <h2 className="text-xl font-bold">Recent Orders</h2>
                    <Link href="/admin/orders" className="text-[#5B3A29] hover:text-[#C6A75E]">
                        View all →
                    </Link>
                </div>

                {recent_orders.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No orders yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[780px]">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Order</th>
                                    <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Product</th>
                                    <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Status</th>
                                    <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {recent_orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm">#{order.id}</td>
                                        <td className="px-6 py-4 text-sm">{order.user_name || order.user_email}</td>
                                        <td className="px-6 py-4 text-sm">{order.product?.title}</td>
                                        <td className="px-6 py-4 text-sm">₹{Number(order.amount).toFixed(2)}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`rounded-full px-2 py-1 text-xs ${
                                                order.payment_status === 'paid'
                                                    ? 'bg-green-100 text-green-800'
                                                    : order.payment_status === 'pending'
                                                      ? 'bg-yellow-100 text-yellow-800'
                                                      : 'bg-red-100 text-red-800'
                                            }`}>
                                                {order.payment_status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
