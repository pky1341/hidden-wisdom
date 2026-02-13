import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../Components/AdminLayout';

export default function Index({ orders, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.payment_status || '');

    const applyFilters = (event) => {
        event.preventDefault();

        router.get('/admin/orders', {
            search: search || undefined,
            payment_status: status || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Orders" />

            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
            </div>

            <form onSubmit={applyFilters} className="mb-5 grid gap-3 rounded-lg bg-white p-4 shadow sm:grid-cols-3">
                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by email, name, razorpay id"
                    className="rounded-md border border-gray-300 px-3 py-2"
                />
                <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-md border border-gray-300 px-3 py-2">
                    <option value="">All statuses</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                </select>
                <button type="submit" className="rounded-md bg-[#5B3A29] px-4 py-2 text-white hover:bg-[#C6A75E]">
                    Apply Filters
                </button>
            </form>

            <div className="overflow-x-auto rounded-lg bg-white shadow">
                <table className="w-full min-w-[980px]">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Order</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Customer</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Product</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Amount</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Payment Status</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Razorpay Order</th>
                            <th className="px-6 py-3 text-right text-xs uppercase text-gray-500">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.data.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm">#{order.id}</td>
                                <td className="px-6 py-4 text-sm">
                                    <div>{order.user_name || 'N/A'}</div>
                                    <div className="text-xs text-gray-500">{order.user_email}</div>
                                </td>
                                <td className="px-6 py-4 text-sm">{order.product?.title || 'N/A'}</td>
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
                                <td className="px-6 py-4 text-xs text-gray-600">{order.razorpay_order_id}</td>
                                <td className="px-6 py-4 text-right text-sm">
                                    <Link href={`/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-800">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {orders.links.length > 3 && (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {orders.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`px-4 py-2 text-sm rounded ${
                                link.active ? 'bg-[#5B3A29] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                            } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
