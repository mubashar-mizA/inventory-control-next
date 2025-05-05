"use client"

import { motion } from "framer-motion"
import InventoryLink from "./components/InventoryLink"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800 flex flex-col">
      <header className="py-6 px-4 md:px-12 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">InventoryPro</h1>

        <div className={'animate-pulse font-bold bg-blue-600 text-white px-10 py-2'}>
          <InventoryLink linkTxt={'Login'} linkUrl={'/pages/login'} />
        </div>

      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-20 w-full max-w-7xl py-12">
          {/* Left: Text + Button */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between flex-1"
          >
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
                Take Control of Your Inventory
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                InventoryPro helps you streamline, track, and manage your stock
                in real time with accuracy and simplicity. Make smarter
                decisions, reduce waste, and maximize profit.
              </p>
            </div>
            <div className="border flex items-center justify-center border-blue-600 animate-pulse transition bg-blue-600 text-white">
              <InventoryLink
                linkTxt={'Get Started Now'}
                linkUrl={'/pages/login'}
                className="hover:text-white rounded-lg px-6 py-3 font-semibold "
              />
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center flex-1"
          >

            <img
              src="https://b1622763.smushcdn.com/1622763/wp-content/uploads/2022/04/Make-Inventory-Control-Your-competitive-advantage_blog-image-1024x379.jpg?lossy=1&strip=1&webp=1"
              alt="Warehouse inventory management"
              className="shadow-2xl border border-gray-200 w-full h-5/6 object-left-top mt-14"
            />
          </motion.div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} InventoryPro. All rights reserved.
      </footer>
    </div>
  )
}
