"use client"
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log({ email, password });
            // Handle login logic here
            const loginResponse = await signIn('credentials', {
                password, email
            })
            console.log('Response from next signin function =>', loginResponse)
        } catch (error) {
            console.log('Error in front page of handle signin function =>', error)
        }

    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
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

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account? <Link href="/pages/login" className="font-semibold text-blue-500 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
