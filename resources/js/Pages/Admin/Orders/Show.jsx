import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';

export default function Show({ order }) {
    return (
        <AdminLayout>
            <Head title={`Order #${order.id}`} />

            <div className="mb-8">
                <Link href="/admin/orders" className="text-[#5B3A29] hover:text-[#C6A75E]">
                    ← Back to orders
                </Link>
                <h1 className="mt-3 text-3xl font-bold text-gray-800">Order #{order.id}</h1>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="text-lg font-bold">Customer</h2>
                    <p className="mt-3 text-sm">Name: {order.user_name || 'N/A'}</p>
                    <p className="mt-1 text-sm">Email: {order.user_email}</p>
                    <p className="mt-1 text-sm">Phone: {order.user_phone || 'N/A'}</p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="text-lg font-bold">Payment</h2>
                    <p className="mt-3 text-sm">Status: {order.payment_status}</p>
                    <p className="mt-1 text-sm">Amount: ₹{Number(order.amount).toFixed(2)}</p>
                    <p className="mt-1 text-sm break-all">Razorpay Order ID: {order.razorpay_order_id}</p>
                    <p className="mt-1 text-sm break-all">Razorpay Payment ID: {order.razorpay_payment_id || 'N/A'}</p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow lg:col-span-2">
                    <h2 className="text-lg font-bold">Product & Delivery</h2>
                    <p className="mt-3 text-sm">Product: {order.product?.title || 'N/A'}</p>
                    <p className="mt-1 text-sm">Created: {new Date(order.created_at).toLocaleString()}</p>
                    <p className="mt-1 text-sm">Paid At: {order.paid_at ? new Date(order.paid_at).toLocaleString() : 'Not paid yet'}</p>
                    <p className="mt-1 text-sm break-all">Download Token: {order.download?.download_token || 'Not generated'}</p>
                    {order.download?.download_token && (
                        <a
                            href={`/download/${order.download.download_token}`}
                            className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-800"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Open Download Link
                        </a>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
