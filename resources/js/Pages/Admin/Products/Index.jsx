import { Head, Link, router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import AdminLayout from '../../../Components/AdminLayout';

export default function Index({ products }) {
    const deleteProduct = (id) => {
        if (!confirm('Delete this product?')) {
            return;
        }

        router.delete(`/admin/products/${id}`, {
            onSuccess: () => toast.success('Product deleted.'),
            onError: () => toast.error('Failed to delete product.'),
        });
    };

    return (
        <AdminLayout>
            <Head title="Manage Products" />

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                <Link href="/admin/products/create" className="rounded-lg bg-[#5B3A29] px-6 py-3 text-center text-white hover:bg-[#C6A75E]">
                    + Add Product
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg bg-white shadow">
                <table className="w-full min-w-[900px]">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Title</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Original</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Discount</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Final</th>
                            <th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Status</th>
                            <th className="px-6 py-3 text-right text-xs uppercase text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.data.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{product.title}</div>
                                    <div className="text-xs text-gray-500">{product.slug}</div>
                                </td>
                                <td className="px-6 py-4 text-sm">₹{Number(product.price).toFixed(2)}</td>
                                <td className="px-6 py-4 text-sm">{product.discount_price ? `₹${Number(product.discount_price).toFixed(2)}` : '—'}</td>
                                <td className="px-6 py-4 text-sm font-semibold">₹{Number(product.effective_price).toFixed(2)}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`rounded-full px-2 py-1 text-xs ${
                                        product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {product.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right text-sm">
                                    <div className="inline-flex items-center gap-3">
                                        <Link href={`/admin/products/${product.id}/edit`} className="text-blue-600 hover:text-blue-800">
                                            Edit
                                        </Link>
                                        <button type="button" onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-800">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {products.data.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No products found.</div>
                )}
            </div>

            {products.links.length > 3 && (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {products.links.map((link, index) => (
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
