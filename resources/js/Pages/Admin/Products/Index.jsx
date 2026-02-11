import { Head, Link, router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import AdminLayout from '../../../Components/AdminLayout';

export default function Index({ products }) {
    const deleteProduct = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/admin/products/${id}`, {
                onSuccess: () => toast.success('Product deleted successfully!'),
                onError: () => toast.error('Failed to delete product.')
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Products" />

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Products</h1>
                <Link
                    href="/admin/products/create"
                    className="bg-[#5B3A29] text-white px-6 py-3 rounded-lg hover:bg-[#C6A75E] transition-colors text-center w-full sm:w-auto"
                >
                    + Add New Product
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {products.data.length === 0 && (
                    <div className="text-center py-12 text-gray-500">No products found.</div>
                )}

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-gray-100">
                    {products.data.map((product) => (
                        <div key={product.id} className="p-4 space-y-3">
                            <div>
                                <div className="font-medium text-gray-900 break-words">{product.title}</div>
                                <div className="text-xs text-gray-500 break-all">{product.slug}</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-900">₹{product.price}</span>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    product.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {product.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <div className="text-xs text-gray-500">
                                {new Date(product.created_at).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <Link
                                    href={`/admin/products/${product.id}/edit`}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => deleteProduct(product.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full min-w-[760px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.data.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{product.title}</div>
                                        <div className="text-sm text-gray-500">{product.slug}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">₹{product.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            product.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {product.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(product.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm">
                                        <div className="inline-flex items-center gap-3">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => deleteProduct(product.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {products.links.length > 3 && (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {products.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`px-3 sm:px-4 py-2 rounded text-sm ${
                                link.active
                                    ? 'bg-[#5B3A29] text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
