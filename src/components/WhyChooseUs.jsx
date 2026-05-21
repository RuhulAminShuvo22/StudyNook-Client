"use client";

import { motion } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineAdjustments, HiOutlineClock } from "react-icons/hi2";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiArrowUpRight } from "react-icons/fi";

const WhyChooseUs = () => {
    const features = [
        {
            icon: <HiOutlineClock className="text-3xl text-cyan-500 group-hover:text-white transition-colors duration-300" />,
            title: "Conflict-Free Booking",
            description: "Advanced time-conflict detection automatically prevents double-bookings, ensuring your selected slot is 100% locked for you.",
        },
        {
            icon: <HiOutlineShieldCheck className="text-3xl text-emerald-500 group-hover:text-white transition-colors duration-300" />,
            title: "Secure JWT Authentication",
            description: "Your session and data are protected using industry-standard JSON Web Tokens stored securely in HTTP-Only cookies.",
        },
        {
            icon: <LuLayoutDashboard className="text-3xl text-amber-500 group-hover:text-white transition-colors duration-300" />,
            title: "Dual Management Control",
            description: "Dedicated dashboards for every user to seamlessly host and list rooms or track, modify, and manage current bookings.",
        },
        {
            icon: <HiOutlineAdjustments className="text-3xl text-indigo-500 group-hover:text-white transition-colors duration-300" />,
            title: "Smart Discovery Filter",
            description: "Instantly browse, look up, and isolate rooms based on real-time availability, library locations, and custom time frames.",
        }
    ];

    // Framer Motion এর অ্যানিমেশন কনফিগারেশন
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 } // একটির পর একটি কার্ড আসবে
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { type: "spring", stiffness: 100, damping: 15 } 
        }
    };

    return (
        <section className="bg-slate-50 py-24 border-t border-b border-slate-200/60 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
                
                {/* Header Grid Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 text-cyan-600 font-semibold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
                            Core Architecture
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                            Engineered for <br />
                            <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">Seamless Collaboration</span>
                        </h2>
                    </div>
                    
                    <p className="text-slate-600 max-w-md text-sm md:text-base leading-relaxed">
                        StudyNook connects hosts and students through an optimized, recruiter-friendly full-stack solution tailored for high-efficiency library management.
                    </p>
                </div>

                {/* Framer Motion Wrapper for Animated Grid */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {features.map((feature, idx) => (
                        <motion.div 
                            key={idx} 
                            variants={cardVariants}
                            whileHover={{ y: -6, scale: 1.01 }} // হোভার করলে কার্ড সামান্য উপরে উঠবে
                            className="group bg-white p-8 md:p-10 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-slate-300/50 transition-all duration-300 flex flex-col sm:flex-row items-start gap-6 relative overflow-hidden cursor-pointer"
                        >
                            {/* Card Hover Corner Gradient Effect */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Animated Icon Container */}
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-emerald-500 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-500 flex-shrink-0">
                                {feature.icon}
                            </div>

                            {/* Text Contents */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <FiArrowUpRight size={18} className="text-slate-300 group-hover:text-cyan-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                                </div>
                                <p className="text-slate-600 text-sm md:text-base leading-relaxed group-hover:text-slate-700 transition-colors">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Recruiter-focused Call to Action at Bottom */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 bg-white border border-slate-200/70 p-6 md:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
                            <HiOutlineShieldCheck className="text-2xl" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-slate-900">Looking for the technical implementation?</h4>
                            <p className="text-sm text-slate-500 mt-0.5">Explore full responsiveness and robust backend security validations.</p>
                        </div>
                    </div>
                    <a 
                        href="/rooms" 
                        className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-cyan-500/10 flex items-center gap-1.5 group whitespace-nowrap cursor-pointer"
                    >
                        Try Live Booking <FiArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
};

export default WhyChooseUs;
