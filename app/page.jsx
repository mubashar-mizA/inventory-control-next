'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();
  const [loadingBtn, setLoadingBtn] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleRedirect = async (path) => {
    setLoadingBtn(path);
    await new Promise((res) => setTimeout(res, 1000));
    router.push(path);
  };

  const images = [
    'https://b1622763.smushcdn.com/1622763/wp-content/uploads/2022/04/Make-Inventory-Control-Your-competitive-advantage_blog-image-1024x379.jpg?lossy=1&strip=1&webp=1',
    'https://b1622763.smushcdn.com/1622763/wp-content/uploads/2022/04/Make-Inventory-Control-Your-competitive-advantage_blog-image-1024x379.jpg?lossy=1&strip=1&webp=1'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800 flex flex-col">
      <header className="py-6 px-4 md:px-12 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">InventoryPro</h1>
        <button
          onClick={() => handleRedirect('/pages/login')}
          className="animate-pulse font-bold bg-blue-600 text-white px-10 py-2 flex items-center gap-2"
        >
          {loadingBtn === '/pages/login' && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )}
          {loadingBtn === '/pages/login' ? 'Loading...' : 'Login'}
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-20 w-full max-w-7xl py-12">

          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between flex-1"
          >
            <div className='mt-20'>
              <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                Take Control of Your Inventory
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                InventoryPro helps you streamline, track, and manage your stock
                in real time with accuracy and simplicity. Make smarter
                decisions, reduce waste, and maximize profit.
              </p>
            </div>
            <div className="border flex items-center justify-center border-blue-600 animate-pulse transition bg-blue-600 text-white">
              <button
                onClick={() => handleRedirect('/pages/register')}
                className="hover:text-white rounded-lg px-6 py-3 font-semibold flex items-center gap-2"
              >
                {loadingBtn === '/pages/register' && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                {loadingBtn === '/pages/register' ? 'Loading...' : 'Get Started Now'}
              </button>
            </div>
          </motion.div>

          {/* Right Section with Image Slider */}
          {/* Right Section with Fade In/Out Image Slider */}
          <div className="relative flex items-center justify-center flex-1  h-[379px] w-full overflow-hidden">
            {images.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt="Inventory management"
                width={1024}
                height={379}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="absolute top-0 left-0 w-full h-full object-cover border shadow-2xl border-gray-200"
              />
            ))}
          </div>

        </div>
      </main>

      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} InventoryPro. All rights reserved.
      </footer>
    </div>
  );
}
