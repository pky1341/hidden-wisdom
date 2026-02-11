import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../Components/AdminLayout';

export default function ContactSubmissions({ submissions }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this submission?')) {
            router.delete(`/admin/contacts/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Contact Submissions" />

            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Contact Submissions</h1>
                <p className="text-gray-600 mt-2">View all customer inquiries and messages</p>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {submissions.data.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No contact submissions yet</p>
                    </div>
                )}

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-gray-100">
                    {submissions.data.map((submission) => (
                        <div key={submission.id} className="p-4 space-y-2">
                            <div className="font-semibold text-gray-900">{submission.name}</div>
                            <a
                                href={`mailto:${submission.email}`}
                                className="text-sm text-blue-600 hover:underline break-all"
                            >
                                {submission.email}
                            </a>
                            <p className="text-sm text-gray-700 break-words">{submission.message}</p>
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-xs text-gray-500">
                                    {new Date(submission.created_at).toLocaleDateString()}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(submission.id)}
                                    className="text-sm text-red-600 hover:text-red-800"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {submissions.data.map((submission) => (
                                <tr key={submission.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {submission.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <a href={`mailto:${submission.email}`} className="text-blue-600 hover:underline">
                                            {submission.email}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                                        <div className="line-clamp-2">{submission.message}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {new Date(submission.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(submission.id)}
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
            </div>

            {/* Pagination */}
            {submissions.links.length > 3 && (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {submissions.links.map((link, index) => (
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
