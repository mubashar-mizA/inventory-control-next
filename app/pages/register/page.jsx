'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegistration = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Registration failed');

            router.push(`/pages/otp-verification?email=${encodeURIComponent(email)}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-800">
                    Get Register
                </h2>

                {error && (
                    <p className="mb-4 text-center text-sm text-red-600">{error}</p>
                )}

                <form onSubmit={handleRegistration} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-200 text-black font-bold py-2 rounded-lg hover:bg-blue-400 transition"
                    >
                        {loading ? 'Registering...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <a href="/pages/login" className="font-semibold text-blue-500 hover:underline">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
