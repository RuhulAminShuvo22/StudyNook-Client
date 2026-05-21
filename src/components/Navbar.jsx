"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // পেজ স্ক্রোল ডিটেকশন ইফেক্ট
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuLinks = [
        { name: "Home", href: "/" },
        { name: "Rooms", href: "/rooms" },
        { name: "My Bookings", href: "/my-bookings" },
        { name: "My Listings", href: "/my-listings" },
        { name: "Add Room", href: "/add-room" },
    ];

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${
            isScrolled 
                ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_2px_15px_-10px_rgba(0,0,0,0.04)] py-1" 
                : "bg-white border-b border-slate-100 py-2.5"
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* বড় লোগোটি সুন্দরভাবে সেট করার জন্য উচ্চতা পারফেক্টলি h-16 রাখা হয়েছে */}
                <div className="flex items-center justify-between h-16">

                    {/* 🚀 লোগো সেকশন - চারপাশের অতিরিক্ত স্পেস কেটে লোগো বড় করা হয়েছে */}
                    <motion.div 
                        className="flex items-center select-none"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    >
                        <Link href="/" className="flex items-center relative group">
                            {/* লোগোর পেছনের প্রিমিয়াম গ্লো ইফেক্ট */}
                            <span className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* কন্টেইনার এবং মিক্স-ব্লেন্ড মোড অপ্টিমাইজেশন */}
                            <div className="relative w-[160px] h-[60px] flex items-center justify-center overflow-hidden mix-blend-multiply">
                                <Image
                                    src="/assets/studynook.png"
                                    width={160}
                                    height={60}
                                    alt="StudyNook Logo"
                                    /* 
                                      scale-[1.65] ব্যবহারের মাধ্যমে ইমেজের ভেতরের অতিরিক্ত 
                                      ফাঁকা জায়গা বাদ দিয়ে আসল লোগোটিকে জুম করে বড় করা হয়েছে।
                                    */
                                    className="w-full h-full object-contain scale-[1.65] transform transition-transform"
                                    priority
                                />
                            </div>
                        </Link>
                    </motion.div>

                    {/* 🎯 মিডল মেনু - স্লিক ফলোয়ার ক্যাপসুল অ্যানিমেশন (ট্যাবলেট ও ডেক্সটপের জন্য) */}
                    <ul 
                        className="hidden md:flex items-center gap-1 text-[13.5px] font-semibold text-slate-600 relative"
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {menuLinks.map((link, index) => (
                            <li key={link.href} className="relative">
                                <Link 
                                    href={link.href} 
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    className={`relative z-10 px-3 py-1.5 rounded-full block transition-colors duration-200 tracking-wide ${
                                        hoveredIndex === index ? "text-cyan-600" : "text-slate-600"
                                    }`}
                                >
                                    {link.name}
                                </Link>

                                <AnimatePresence>
                                    {hoveredIndex === index && (
                                        <motion.span
                                            layoutId="navHoverPill"
                                            className="absolute inset-0 bg-slate-100/80 border border-slate-200/30 rounded-full z-0"
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.96 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </li>
                        ))}
                    </ul>

                    {/* ⚡ রাইট মেনু - প্রিমিয়াম গ্রেডিয়েন্ট বাটন লেআউট (ট্যাবলেট ও ডেক্সটপের জন্য) */}
                    <div className="hidden md:flex items-center gap-4 text-[13.5px] font-semibold">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                            <Link
                                href="/login"
                                className="text-slate-600 hover:text-cyan-600 transition-colors duration-200 py-1.5 px-2 block"
                            >
                                Login
                            </Link>
                        </motion.div>

                        <motion.div 
                            whileHover={{ scale: 1.03, y: -0.5 }} 
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link
                                href="/register"
                                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-bold px-4.5 py-1.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-cyan-500/10 flex items-center gap-1 group tracking-wide text-xs"
                            >
                                Register
                                <FiArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* মোবাইল মেনু টগল বাটন (শুধুমাত্র ছোট স্ক্রিনে দেখা যাবে) */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-1.5 text-slate-700 hover:text-cyan-600 hover:bg-slate-50 rounded-xl transition-all"
                    >
                        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </motion.button>
                </div>

                {/* 📱 মোবাইল ড্রপডাউন মেনু (মোবাইল ও ছোট ট্যাবলেটের জন্য রেসপনসিভ ভিউ) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ type: "spring", stiffness: 130, damping: 17 }}
                            className="md:hidden overflow-hidden border-t border-slate-100"
                        >
                            <ul className="flex flex-col gap-1 py-3 text-sm font-semibold text-slate-700">
                                {menuLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-cyan-600 transition-all duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                                
                                {/* মোবাইল ভিউ-র জন্য বাটন দুটি নিচে যোগ করা হলো */}
                                <div className="grid grid-cols-2 gap-2 pt-3 px-4 border-t border-slate-100/60">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="text-center py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 font-bold transition-all"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold transition-all flex items-center justify-center gap-1 text-xs"
                                    >
                                        Register
                                        <FiArrowUpRight size={14} />
                                    </Link>
                                </div>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
