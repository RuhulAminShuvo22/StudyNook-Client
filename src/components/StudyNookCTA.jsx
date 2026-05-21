"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiPlusCircle, FiSearch, FiLayers, FiShield, FiTrendingUp } from "react-icons/fi";

const StudyNookCTA = () => {
    // সেকশনের ভেতর যোগ করা অতিরিক্ত ৩টি ট্রাস্ট-ফিচার (আপনার কোডটি হুবহু রাখা হয়েছে)
    const miniFeatures = [
        { icon: <FiLayers className="text-cyan-600" />, text: "Instant Slots" },
        { icon: <FiShield className="text-emerald-600" />, text: "Verified Hosts" },
        { icon: <FiTrendingUp className="text-cyan-600" />, text: "Zero Double-Bookings" }
    ];

    // Framer Motion অ্যানিমেশন ভেরিয়েন্টস (আপনার কোডটি হুবহু রাখা হয়েছে)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { type: "spring", stiffness: 90, damping: 15 } 
        }
    };

    return (
        <section className="relative min-h-[520px] md:h-[540px] flex items-center justify-center overflow-hidden w-full bg-slate-100 border-t border-b border-slate-200/60 py-12 md:py-0">
            
            {/* 🌌 ব্যাকগ্রাউন্ড ইমেজ - অপাসিটি বাড়িয়ে ৪০% বেশি স্পষ্ট করা হয়েছে */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.45] saturate-[1.2] scale-100 pointer-events-none"
                style={{
                    backgroundImage: "url('/assets/CTA.png')",
                }}
            />

            {/* 🎨 লাইট-মোড ব্যালেন্সড ওভারলে */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-slate-50/60 to-white/85" />
            <div className="absolute top-0 left-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-cyan-400/15 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-emerald-400/15 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none animate-pulse" />

            {/* 🎯 মেইন কন্টেন্ট এরিয়া */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center w-full"
            >
                {/* ছোট প্রিমিয়াম ব্যাজ */}
                <motion.div 
                    variants={itemVariants}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500/15 to-emerald-500/15 border border-cyan-500/30 text-cyan-700 font-bold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-6 shadow-sm cursor-default backdrop-blur-sm"
                >
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
                    Maximize Academic Focus
                </motion.div>

                {/* মেইন হেডিং - টেক্সট সাইজ মোবাইলের জন্য অপ্টিমাইজ করা হয়েছে */}
                <motion.h2 
                    variants={itemVariants}
                    className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-5 text-slate-900 leading-tight max-w-3xl drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)] px-2"
                >
                    Ready to Secure Your Next <br />
                    <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">Perfect Study Session?</span>
                </motion.h2>

                {/* ডেসক্রিপশন টেক্সট */}
                <motion.p 
                    variants={itemVariants}
                    className="text-xs sm:text-sm md:text-base text-slate-800 mb-8 max-w-2xl font-semibold leading-relaxed drop-shadow-[0_1px_5px_rgba(255,255,255,0.9)] px-2 sm:px-4"
                >
                    Join hundreds of students focusing smarter in private spaces, or list your own controlled university library slot to start earning today.
                </motion.p>

                {/* ট্রাস্ট ফিচার ব্যাজেস - স্মুথ র‍্যাপিং গ্যাপ কনফিগারেশন */}
                <motion.div 
                    variants={itemVariants}
                    className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 md:gap-6 mb-10 md:mb-12 w-full px-2"
                >
                    {miniFeatures.map((feat, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -2, scale: 1.03 }}
                            className="flex items-center gap-2 px-3 sm:px-3.5 py-2 bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm text-[10px] sm:text-xs font-bold text-slate-700 rounded-xl cursor-default whitespace-nowrap"
                        >
                            {feat.icon}
                            {feat.text}
                        </motion.div>
                    ))}
                </motion.div>

                {/* ⚡ ডুয়াল অ্যাকশন বাটন সেকশন - ফুল রেসপন্সিভ ফ্লেক্স লেআউট */}
                <motion.div 
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0"
                >
                    {/* Primary Button: Explore Rooms */}
                    <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                        <Link href="/rooms" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-extrabold px-6 sm:px-8 py-3.5 rounded-full shadow-md hover:shadow-cyan-500/20 transition-all duration-300 group cursor-pointer tracking-wide text-xs whitespace-nowrap">
                            <FiSearch size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                            EXPLORE ROOMS NOW
                            <FiArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                        </Link>
                    </motion.div>

                    {/* Secondary Button: List Your Room */}
                    <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                        <Link href="/add-room" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-extrabold px-6 sm:px-8 py-3.5 rounded-full shadow-sm transition-all duration-300 group cursor-pointer tracking-wide text-xs whitespace-nowrap">
                            <FiPlusCircle size={16} className="text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
                            LIST YOUR ROOM
                        </Link>
                    </motion.div>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default StudyNookCTA;
