"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { FaArrowLeft } from 'react-icons/fa6';

// ব্যাকগ্রাউন্ডের ভাসমান সার্কেলগুলোর অ্যানিমেশন কনফিগারেশন
const floatingVariants = {
  animate: (i) => ({
    y: [0, -40, 0],
    x: [0, i * 20, 0],
    transition: {
      duration: 6 + i * 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  })
};

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50/50 via-white to-emerald-50/40 overflow-hidden relative px-4">
      
      {/* 🔮 ব্যাকগ্রাউন্ডে চমৎকার ভাসমান বাবল বা এলিমেন্টস */}
      <motion.div 
        custom={1} animate="animate" variants={floatingVariants}
        className="absolute top-10 left-10 md:left-24 w-32 h-32 bg-cyan-200/30 rounded-full blur-2xl pointer-events-none"
      />
      <motion.div 
        custom={-1} animate="animate" variants={floatingVariants}
        className="absolute bottom-16 right-10 md:right-24 w-44 h-44 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        custom={1.5} animate="animate" variants={floatingVariants}
        className="absolute top-1/2 left-2/3 w-24 h-24 bg-cyan-100/40 rounded-full blur-xl pointer-events-none"
      />

      <div className="text-center z-10 max-w-2xl w-full">
        {/* 404 বড় টেক্সট অ্যানিমেশন */}
        <motion.h1 
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="text-[120px] sm:text-[160px] md:text-[200px] font-black tracking-tighter bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-600 bg-clip-text text-transparent leading-none"
        >
          404
        </motion.h1>

        {/* নিচের কন্টেন্ট অ্যানিমেশন */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 tracking-tight">
            Oops! This Space Does not Exist
          </h2>
          
          <p className="text-slate-500 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed font-medium">
            It looks like you’ve taken a wrong turn or this study room has been relocated. Let us get you back to focus! 📖✨
          </p>

          {/* রেসপনসিভ ও থিম ম্যাচিং হোম বাটন */}
          <div className="flex justify-center">
            <Link href="/" passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-emerald-600/10 flex items-center gap-2 tracking-wide"
                >
                  <FaArrowLeft className="text-sm" />
                  Return Home
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
