"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";

// ফর্ম কার্ডের এন্ট্রেন্স অ্যানিমেশন
const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 90, damping: 15, staggerChildren: 0.08 } 
  }
};

// প্রতিটি ইনপুট ফিল্ড ও বাটনের জন্য ফেড-ইন স্লাইড অ্যানিমেশন
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

// ব্যাকগ্রাউন্ডের ভাসমান সার্কেলগুলোর অ্যানিমেশন
const bubbleVariants = {
  animate: (i) => ({
    y: [0, -30, 0],
    x: [0, i * 15, 0],
    transition: { duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut" }
  })
};

const RegisterPage = () => {

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const password = formData.get("password");

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!", {
        style: { border: '1px solid #EF4444', padding: '16px', color: '#1E293B', fontWeight: '600' },
      });
      return;
    }

    toast.success(`Welcome to StudyNook, ${name}! 🎉`, {
      style: { border: '1px solid #10B981', padding: '16px', color: '#1E293B', fontWeight: '600' },
      iconTheme: { primary: '#059669', secondary: '#FFF' },
    });
  };

  const handleGoogleLogin = () => {
    toast.loading("Connecting with Google...", { id: "google-auth" });
    setTimeout(() => {
      toast.success("Successfully logged in with Google! 🚀", { id: "google-auth" });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50/40 via-white to-emerald-50/30 px-4 py-12 relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      {/* 🔮 ব্যাকগ্রাউন্ড অ্যাম্বিয়েন্ট ভাসমান এলিমেন্টস */}
      <motion.div custom={1} animate="animate" variants={bubbleVariants} className="absolute top-12 left-12 w-32 h-32 bg-cyan-200/20 rounded-full blur-2xl pointer-events-none" />
      <motion.div custom={-1} animate="animate" variants={bubbleVariants} className="absolute bottom-16 right-12 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* মেইন অ্যানিমেটেড ফর্ম কন্টেইনার */}
      <motion.div 
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-white border border-cyan-100/60 rounded-3xl shadow-xl shadow-cyan-600/5 p-8 md:p-10 z-10"
      >
        {/* 🖼️ লোগো ব্রিদিং অ্যানিমেশন */}
        <motion.div 
          className="flex justify-center mb-2"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img 
            src="/assets/studynook.png" 
            alt="StudyNook Logo" 
            className="h-28 w-auto object-contain"
          />
        </motion.div>

        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Create a <span className="text-emerald-600">StudyNook</span> Account
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 font-medium">
            Start booking quiet rooms today.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Name
            </label>
            <input 
              type="text" 
              name="name"
              placeholder="Your full name"
              required
              className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white hover:border-slate-300 transition-all font-medium text-slate-800 shadow-sm"
            />
          </motion.div>

          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email
            </label>
            <input 
              type="email" 
              name="email"
              placeholder="name@example.com"
              required
              className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white hover:border-slate-300 transition-all font-medium text-slate-800 shadow-sm"
            />
          </motion.div>

          {/* Photo URL Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Photo URL
            </label>
            <input 
              type="url" 
              name="photoUrl"
              placeholder="https://..."
              className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white hover:border-slate-300 transition-all font-medium text-slate-800 shadow-sm"
            />
          </motion.div>

          {/* Password Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all hover:border-slate-300 font-medium text-slate-800 shadow-sm"
            />
            <p className="text-[10px] text-slate-400 mt-1.5 font-medium">
              At least 6 characters, with uppercase and lowercase letters.
            </p>
          </motion.div>

          {/* Register Button with Hover Scaling */}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button 
              type="submit"
              size="lg"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-emerald-600/10 transition-colors mt-2"
            >
              Register
            </Button>
          </motion.div>
        </form>

        <motion.div variants={itemVariants} className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
          <span className="relative px-3 bg-white text-[10px] font-bold text-slate-400 uppercase tracking-widest">OR</span>
        </motion.div>

        {/* Google Button with Hover Scaling */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button
            variant="bordered"
            size="lg"
            onClick={handleGoogleLogin}
            className="w-full border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50/50 font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-lg shrink-0" />
            Continue with Google
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-8 text-xs font-medium text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline transition-all">
            Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
