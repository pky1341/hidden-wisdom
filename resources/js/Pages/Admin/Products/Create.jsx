import { Head, useForm, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from '../../../Components/AdminLayout';

export default function Create() {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        title: '',
        description: '',
        preview_content: '',
        price: '',
        currency: 'INR',
        pdf: null,
        cover_image: null,
        is_active: true,
    });

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success('Product created successfully!');
        }
    }, [recentlySuccessful]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/products', {
            onError: () => {
                toast.error('Failed to create product. Please check the form.');
            }
        });
    };

    return (
        <AdminLayout>
            <Head title="Add New Product" />

            <div className="mb-6 sm:mb-8">
                <Link href="/admin/products" className="text-[#5B3A29] hover:text-[#C6A75E] text-sm sm:text-base">
                    ← Back to Products
                </Link>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-3 sm:mt-4">Add New Product</h1>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-8 max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Title *
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A29] focus:border-transparent"
                            required
                        />
                        {errors.title && <div className="text-red-600 text-sm mt-1">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows="5"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A29] focus:border-transparent"
                            required
                        />
                        {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preview Content (Optional)
                        </label>
                        <textarea
                            value={data.preview_content}
                            onChange={(e) => setData('preview_content', e.target.value)}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A29] focus:border-transparent"
                            placeholder="A preview quote or excerpt from the ebook..."
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price *
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A29] focus:border-transparent"
                                required
                            />
                            {errors.price && <div className="text-red-600 text-sm mt-1">{errors.price}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Currency
                            </label>
                            <select
                                value={data.currency}
                                onChange={(e) => setData('currency', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A29] focus:border-transparent"
                            >
                                <option value="INR">INR (₹)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            PDF File * (Max 50MB)
                        </label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setData('pdf', e.target.files[0])}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A29] focus:border-transparent"
                            required
                        />
                        {errors.pdf && <div className="text-red-600 text-sm mt-1">{errors.pdf}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cover Image (Optional, Max 5MB)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('cover_image', e.target.files[0])}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A29] focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="w-4 h-4 text-[#5B3A29] border-gray-300 rounded focus:ring-[#5B3A29]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                            Active (visible on website)
                        </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#5B3A29] text-white px-8 py-3 rounded-lg hover:bg-[#C6A75E] transition-colors disabled:opacity-50 w-full sm:w-auto"
                        >
                            {processing ? 'Creating...' : 'Create Product'}
                        </button>
                        <Link
                            href="/admin/products"
                            className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors text-center w-full sm:w-auto"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
