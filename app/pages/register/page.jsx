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
        <div className="flex min-h-screen items-center justify-center bg-gray-100 sm:px-4 p-0">
            <div className="w-full max-w-md  bg-white p-8 shadow-2xl">

                <div className='flex justify-between items-center mb-2'>

                    <h2 className="text-2xl font-extrabold text-gray-800">
                        Get Register
                    </h2>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="mb-2 text-blue-600  sm:text-4xl text-4xl flex items-center"
                    >
                        ←
                    </button>
                </div>


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
                            className="w-full  border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
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
                            className="w-full  border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
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
                            className="w-full border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="••••••••"
                        />
                    </div>
                    <div className='flex gap-2 text-sm md:text-lg'>
                        <input type="checkbox" name="" id="" />
                        <p>Agree to <a href="" className='border-b text-blue-700'>Terms and conditions</a></p>
                    </div>
                    <div className=''>
                        <span className='text-sm'>We will never share credentials with anyone elese </span>
                        <span className=' text-red-600 relative'>*</span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-b from-indigo-00 to-indigo-600 text-white font-bold py-2   transition"
                    >
                        {loading ? 'Registering...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500 ">
                    Already have an account?{" "}
                    <a href="/pages/login" className="font-semibold text-blue-500 hover:underline animate-pulse border-b">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
