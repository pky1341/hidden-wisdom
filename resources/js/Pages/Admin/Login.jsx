import { Head, useForm } from '@inertiajs/react';

export default function Login({ errors }) {
    const { data, setData, post, processing } = useForm({
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen bg-[#F5EBDD] flex items-center justify-center px-4">
            <Head title="Admin Login" />

            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="font-['Cinzel'] text-4xl text-[#5B3A29] mb-4">
                        🕉️ Admin Panel
                    </h1>
                    <div className="w-20 h-1 bg-[#C6A75E] mx-auto mb-4"></div>
                    <p className="font-['Lora'] text-[#5B3A29]/70">
                        Enter password to access admin dashboard
                    </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block font-['Lora'] text-[#5B3A29] mb-2 text-lg">
                                Admin Password
                            </label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-[#C6A75E]/30 rounded-lg focus:border-[#C6A75E] focus:outline-none bg-[#F5EBDD] font-['Lora']"
                                placeholder="Enter admin password"
                                required
                                autoFocus
                            />
                            {errors.password && (
                                <p className="text-red-600 text-sm mt-2">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#5B3A29] text-[#F5EBDD] px-8 py-4 rounded-lg font-['Lora'] text-lg hover:bg-[#C6A75E] hover:text-[#5B3A29] transition-all duration-300 border-2 border-[#5B3A29] hover:border-[#C6A75E] disabled:opacity-50"
                        >
                            {processing ? 'Logging in...' : 'Login to Admin Panel'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/" className="text-[#5B3A29]/60 hover:text-[#C6A75E] text-sm font-['Lora']">
                            ← Back to Website
                        </a>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-[#5B3A29]/60 text-sm font-['Lora']">
                        Default password: <code className="bg-white px-2 py-1 rounded">spiritual@2024</code>
                    </p>
                    <p className="text-[#5B3A29]/60 text-xs mt-2 font-['Lora']">
                        Change in .env: ADMIN_PASSWORD
                    </p>
                </div>
            </div>
        </div>
    );
}
