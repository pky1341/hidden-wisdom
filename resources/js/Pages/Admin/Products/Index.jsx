import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';

export default function Index({ products }) {
    const deleteProduct = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/admin/products/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Products" />

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                <Link
                    href="/admin/products/create"
                    className="bg-[#5B3A29] text-white px-6 py-3 rounded-lg hover:bg-[#C6A75E] transition-colors"
                >
                    + Add New Product
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
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
                                <td className="px-6 py-4 text-right text-sm space-x-2">
                                    <Link
                                        href={`/admin/products/${product.id}/edit`}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {products.links.length > 3 && (
                <div className="mt-6 flex justify-center gap-2">
                    {products.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`px-4 py-2 rounded ${
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
