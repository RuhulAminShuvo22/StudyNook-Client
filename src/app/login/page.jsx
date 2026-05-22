"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";

const formVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

const LoginPage = () => {

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name") || "User";
    
    toast.success(`Welcome back to StudyNook! 🚀`, {
      style: { border: '1px solid #10B981', padding: '16px', color: '#1E293B', fontWeight: '600' },
      iconTheme: { primary: '#059669', secondary: '#FFF' },
    });
  };

  const handleGoogleLogin = () => {
    toast.loading("Connecting with Google...", { id: "google-auth" });
    setTimeout(() => {
      toast.success("Successfully logged in with Google! 🎉", { id: "google-auth" });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50/40 via-white to-emerald-50/30 px-4 py-12">
      <Toaster position="top-center" reverseOrder={false} />

      <motion.div 
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-white border border-cyan-100/60 rounded-3xl shadow-xl shadow-cyan-600/5 p-8 md:p-10"
      >
        {/* 🖼️ আপনার কাস্টম লোগো ইমেজ */}
        <div className="flex justify-center mb-6">
          <img 
            src="/assets/studynook.png" 
            alt="StudyNook Logo" 
            className="h-14 w-auto object-contain"
          />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Welcome Back to <span className="text-emerald-600">StudyNook</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 font-medium">
            Sign in to manage your quiet room bookings.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              name="email"
              placeholder="name@example.com"
              required
              className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium text-slate-800"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-emerald-600 hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium text-slate-800"
            />
          </div>

          <Button 
            type="submit"
            size="lg"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-emerald-600/10 transition-all mt-2"
          >
            Sign In
          </Button>
        </form>

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
          <span className="relative px-3 bg-white text-[10px] font-bold text-slate-400 uppercase tracking-widest">OR</span>
        </div>

        <Button
          variant="bordered"
          size="lg"
          onClick={handleGoogleLogin}
          className="w-full border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50/50 font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-lg shrink-0" />
          Continue with Google
        </Button>

        <div className="text-center mt-8 text-xs font-medium text-slate-500">
          Do not have an account?{" "}
          <Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline transition-all">
            Register
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
