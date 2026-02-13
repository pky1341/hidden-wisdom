import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from '../../../Components/AdminLayout';

export default function Create() {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        title: '',
        description: '',
        preview_content: '',
        price: '',
        discount_price: '',
        currency: 'INR',
        pdf: null,
        preview_image: null,
        status: 'active',
    });

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success('Product created successfully.');
        }
    }, [recentlySuccessful]);

    const handleSubmit = (event) => {
        event.preventDefault();
        post('/admin/products', {
            onError: () => toast.error('Please fix validation errors.'),
        });
    };

    return (
        <AdminLayout>
            <Head title="Add New Product" />

            <div className="mb-8">
                <Link href="/admin/products" className="text-[#5B3A29] hover:text-[#C6A75E]">
                    ← Back to products
                </Link>
                <h1 className="mt-3 text-3xl font-bold text-gray-800">Add New Product</h1>
            </div>

            <div className="max-w-3xl rounded-lg bg-white p-8 shadow">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Title *</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(event) => setData('title', event.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#5B3A29]"
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Description *</label>
                        <textarea
                            value={data.description}
                            onChange={(event) => setData('description', event.target.value)}
                            rows="4"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#5B3A29]"
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Preview Excerpt</label>
                        <textarea
                            value={data.preview_content}
                            onChange={(event) => setData('preview_content', event.target.value)}
                            rows="3"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#5B3A29]"
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Original Price *</label>
                            <input
                                type="number"
                                min="1"
                                step="0.01"
                                value={data.price}
                                onChange={(event) => setData('price', event.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#5B3A29]"
                            />
                            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Discount Price</label>
                            <input
                                type="number"
                                min="1"
                                step="0.01"
                                value={data.discount_price}
                                onChange={(event) => setData('discount_price', event.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#5B3A29]"
                            />
                            {errors.discount_price && <p className="mt-1 text-sm text-red-600">{errors.discount_price}</p>}
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Currency</label>
                            <input
                                type="text"
                                maxLength={3}
                                value={data.currency}
                                onChange={(event) => setData('currency', event.target.value.toUpperCase())}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#5B3A29]"
                            />
                            {errors.currency && <p className="mt-1 text-sm text-red-600">{errors.currency}</p>}
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">PDF File * (max 50MB)</label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(event) => setData('pdf', event.target.files[0])}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            />
                            {errors.pdf && <p className="mt-1 text-sm text-red-600">{errors.pdf}</p>}
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Preview Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => setData('preview_image', event.target.files[0])}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            />
                            {errors.preview_image && <p className="mt-1 text-sm text-red-600">{errors.preview_image}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Status *</label>
                        <select
                            value={data.status}
                            onChange={(event) => setData('status', event.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[#5B3A29]"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-[#5B3A29] px-8 py-3 text-white transition hover:bg-[#C6A75E] disabled:opacity-50"
                    >
                        {processing ? 'Creating...' : 'Create Product'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
