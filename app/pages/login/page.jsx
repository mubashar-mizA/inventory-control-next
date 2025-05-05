'use client';

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React from "react";

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [failureMessage, setFailureMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFailureMessage("");

        const startTime = Date.now();

        try {
            const loginResponse = await signIn('credentials', {
                redirect: false,
                email,
                password
            });

            const elapsed = Date.now() - startTime;
            if (elapsed < 3000) {
                await new Promise((res) => setTimeout(res, 3000 - elapsed));
            }

            if (loginResponse.ok) {
                await new Promise((res) => setTimeout(res, 1000));
                router.push('/pages/dashboard');
            } else {
                setFailureMessage("Invalid credentials.");
                setTimeout(() => setFailureMessage(''), 2000);
            }
        } catch (error) {
            setFailureMessage("Something went wrong.");
            setTimeout(() => setFailureMessage(''), 2000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col md:flex-row h-screen">
            {/* Back Button */}
            <div className="absolute top-0 right-10 flex justify-end p-4 ">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="text-white text-5xl flex items-center"
                >
                    ←
                </button>
            </div>

            {/* Left Section */}
            <div className="w-full h-full flex flex-col justify-center md:w-1/2 bg-white p-8 gap-5">
                <form onSubmit={handleSubmit} className="space-y-5 w-full flex flex-col mx-auto sm:w-4/5">
                    <div className="w-full">
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
                            Welcome Back
                        </h2>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="w-full">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full font-bold px-4 py-2 text-white flex items-center justify-center gap-2
                                ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-gradient-to-b from-indigo-500 to-indigo-400'}
                            `}
                        >
                            {loading && (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                </svg>
                            )}
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{' '}
                        <Link href="/pages/register" className="font-semibold text-blue-500 hover:underline animate-pulse">
                            Register
                        </Link>
                    </p>
                </form>

                {failureMessage && (
                    <p className="mt-4 text-center text-sm text-red-600">{failureMessage}</p>
                )}

                <ul className="w-full flex flex-col mx-auto sm:w-4/5 mt-6 text-sm text-gray-500">
                    <li>Need Help?</li>
                    <li>Contact us!</li>
                    <li>Forgot password?</li>
                </ul>
            </div>

            {/* Right Section */}
            <div className="hidden md:flex w-full h-full md:w-1/2 bg-gradient-to-b from-indigo-500 to-indigo-400 p-8 items-center justify-center text-white">
                <p className="text-xl font-semibold text-center italic">
                    Master your inventory with precision and purpose—every item counts, every goal matters.
                </p>
            </div>
        </div>
    );
}
