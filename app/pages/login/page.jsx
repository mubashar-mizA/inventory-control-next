'use client'

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React from "react";

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loadingMessage, setLoadingMessage] = React.useState('');
    const [failureMessage, setFailureMessage] = React.useState('');
    const [showOverlay, setShowOverlay] = React.useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowOverlay(true);
        setLoadingMessage("Logging you in...");

        const startTime = Date.now();

        try {
            const loginResponse = await signIn('credentials', {
                redirect: false,
                email,
                password
            });

            // Ensure 5-second minimum delay
            const elapsed = Date.now() - startTime;
            if (elapsed < 5000) {
                await new Promise((res) => setTimeout(res, 5000 - elapsed));
            }

            if (loginResponse.ok) {
                // Update overlay message to show redirection
                setLoadingMessage("Redirecting to dashboard...");
                await new Promise((res) => setTimeout(res, 2000));
                router.push('/pages/dashboard');
            } else {
                setShowOverlay(false);
                setFailureMessage("Invalid credentials.");
                setTimeout(() => setFailureMessage(''), 2000);
            }

        } catch (error) {
            setShowOverlay(false);
            setFailureMessage("Something went wrong.");
            setTimeout(() => setFailureMessage(''), 2000);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
            {/* Overlay when loading or redirecting */}
            {showOverlay && (
                <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm bg-black/30">
                    <div className="rounded-xl bg-white px-6 py-4 text-lg font-semibold text-gray-700 shadow-lg">
                        {loadingMessage}
                        <div className="mt-2 h-5 w-5 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
                    </div>
                </div>
            )}

            <div className={`w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl z-10 ${showOverlay ? 'blur-sm pointer-events-none' : ''}`}>
                <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">Welcome Back 👋</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition hover:bg-blue-600"
                    >
                        Sign In
                    </button>
                </form>

                {failureMessage && (
                    <p className="mt-4 text-center text-red-600">{failureMessage}</p>
                )}

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don&apos;t have an account? <Link href="/pages/register" className="font-semibold text-blue-500 hover:underline">Register</Link>
                </p>

            </div>
        </div>
    );
}
