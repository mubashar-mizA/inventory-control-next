'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function OtpForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get('email');

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(120);
    const [resending, setResending] = useState(false);
    const [localTime, setLocalTime] = useState('');

    useEffect(() => {
        if (!email) router.push('/auth/register');
    }, [email, router]);

    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    useEffect(() => {
        const updateTime = () => setLocalTime(new Date().toLocaleTimeString());
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Verification failed');

            setSuccess('✅ Verification successful! Redirecting...');
            setTimeout(() => router.push('/pages/login'), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResending(true);
        setError('');
        try {
            const res = await fetch('/api/auth/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) throw new Error('Failed to resend OTP');
            setResendTimer(120);
        } catch (err) {
            setError('Unable to resend OTP. Please try again.');
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">

                <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">Verify OTP</h2>

                {/* Timer & Time Row */}
                <div className="py-5 flex items-center justify-between text-sm text-gray-600 ">
                    {/* Local Time */}
                    <div>
                        <span className="font-medium">Local Time:</span>{' '}
                        <span suppressHydrationWarning>{localTime}</span>
                    </div>

                    {/* Circle or Resend */}
                    {resendTimer > 0 ? (
                        <div className="relative h-12 w-12 flex items-center justify-center">
                            <svg className="h-5 w-5 transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                    className="text-gray-300"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                    d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className="text-blue-500"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeDasharray={`${(resendTimer / 120) * 100}, 100`}
                                    d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            {/* <div className="absolute inset-0 flex items-center justify-center text-blue-700 font-semibold">
                                {resendTimer}s
                            </div> */}
                        </div>
                    ) : (
                        <button
                            onClick={handleResend}
                            disabled={resending}
                            className="font-semibold text-blue-600 hover:underline disabled:opacity-50"
                        >
                            {resending ? 'Sending...' : 'Resend OTP'}
                        </button>
                    )}
                </div>

                {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}
                {success && <p className="mb-4 text-green-600 text-sm">{success}</p>}

                <form onSubmit={handleVerify} className="space-y-5">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-green-600 py-2 text-white font-semibold hover:bg-green-700 transition"
                    >
                        {loading ? 'Verifying...' : 'Verify'}
                    </button>
                </form>

                {/* Note paragraph */}
                <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">Please note</h3>
                    <p className="text-sm text-gray-600">
                        If you don’t see the OTP in your inbox, please check your <strong>Spam</strong> or <strong>Promotions</strong> folder.
                    </p>
                </div>


            </div>
        </div>
    );
}

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div className="text-center py-10 text-gray-600">Loading...</div>}>
            <OtpForm />
        </Suspense>
    );
}
