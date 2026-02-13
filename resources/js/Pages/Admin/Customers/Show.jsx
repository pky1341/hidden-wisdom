import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';

export default function Show({ orders, stats, email }) {
    return (
        <AdminLayout>
            <Head title={`Customer ${email}`} />

            <div className="mb-8">
                <Link href="/admin/customers" className="text-[#5B3A29] hover:text-[#C6A75E]">
                    ← Back to customers
                </Link>
                <h1 className="mt-3 text-3xl font-bold text-gray-800">{stats.customer_name}</h1>
                <p className="text-gray-600">{email}</p>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-5 shadow">
                    <div className="text-sm text-gray-600">Total Paid Orders</div>
                    <div className="text-2xl font-bold text-[#5B3A29]">{stats.total_orders}</div>
                </div>
                <div className="rounded-lg bg-white p-5 shadow">
                    <div className="text-sm text-gray-600">Total Spent</div>
                    <div className="text-2xl font-bold text-[#5B3A29]">₹{Number(stats.total_spent).toFixed(2)}</div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg bg-white shadow">
                <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Order</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Product</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Amount</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Status</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 text-sm">#{order.id}</td>
                                <td className="px-6 py-4 text-sm">{order.product?.title}</td>
                                <td className="px-6 py-4 text-sm">₹{Number(order.amount).toFixed(2)}</td>
                                <td className="px-6 py-4 text-sm">{order.payment_status}</td>
                                <td className="px-6 py-4 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
