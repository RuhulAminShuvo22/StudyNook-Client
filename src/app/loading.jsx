"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LoadingPage = () => {
    return (

        <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

            <div className="flex flex-col items-center justify-center gap-6 relative z-10">

                {/* Animated Logo */}
                <motion.div
                    animate={{
                        scale: [1, 1.08, 1],
                        rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative"
                >

                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 blur-2xl rounded-full" />

                    <Image
                        src="/assets/studynook.png"
                        width={180}
                        height={180}
                        alt="StudyNook Logo"
                        className="relative object-contain"
                        priority
                    />

                </motion.div>

                {/* Spinner */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                    className="w-12 h-12 border-[3px] border-slate-200 border-t-cyan-500 rounded-full"
                />

                {/* Text */}
                <div className="text-center">

                    <motion.h2
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.8,
                        }}
                        className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent"
                    >
                        Loading StudyNook...
                    </motion.h2>

                    <p className="text-slate-500 text-sm mt-2 tracking-wide">
                        Preparing your workspace ✨
                    </p>

                </div>

            </div>

        </div>
    );
};

export default LoadingPage;