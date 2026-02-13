import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';

export default function Index({ customers }) {
    return (
        <AdminLayout>
            <Head title="Customers" />

            <h1 className="mb-8 text-3xl font-bold text-gray-800">Customers</h1>

            <div className="overflow-x-auto rounded-lg bg-white shadow">
                <table className="w-full min-w-[760px]">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Name</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Email</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Orders</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Total Spent</th>
                            <th className="px-6 py-3 text-right text-xs uppercase text-gray-500">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {customers.data.map((customer) => (
                            <tr key={customer.user_email}>
                                <td className="px-6 py-4 text-sm">{customer.user_name || 'Customer'}</td>
                                <td className="px-6 py-4 text-sm">{customer.user_email}</td>
                                <td className="px-6 py-4 text-sm">{customer.total_orders}</td>
                                <td className="px-6 py-4 text-sm">₹{Number(customer.total_spent).toFixed(2)}</td>
                                <td className="px-6 py-4 text-right text-sm">
                                    <Link href={`/admin/customers/${encodeURIComponent(customer.user_email)}`} className="text-blue-600 hover:text-blue-800">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
