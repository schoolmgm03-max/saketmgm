"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      {/* Animated 404 */}
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-[120px] font-extrabold text-[#f82f53] drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-gray-800"
      >
        Oops! Page Not Found
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-4 text-gray-600 text-lg max-w-xl"
      >
        The page you’re looking for doesn’t exist or has been moved.  
        Don’t worry — let’s get you back on track!
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-8 flex gap-4"
      >
        <Link
          href="/"
          className="px-6 py-3 bg-[#f82f53] text-white font-semibold rounded-lg shadow hover:scale-105 transition"
        >
          Go Home
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 border border-[#f82f53] text-[#f82f53] font-semibold rounded-lg shadow hover:bg-[#f82f53] hover:text-white transition"
        >
          Contact Us
        </Link>
      </motion.div>

      {/* Decorative background effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <div className="w-[300px] h-[300px] bg-[#f82f53] rounded-full blur-3xl absolute -top-20 -left-20"></div>
        <div className="w-[300px] h-[300px] bg-pink-400 rounded-full blur-3xl absolute bottom-0 right-0"></div>
      </motion.div>
    </div>
  );
}
