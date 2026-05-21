"use client";

import { motion } from "framer-motion";
import { HiOutlineUserPlus, HiOutlinePlusCircle, HiOutlineMagnifyingGlass, HiOutlineCheckCircle } from "react-icons/hi2";

const HowItWorks = () => {
    const steps = [
        {
            icon: <HiOutlineUserPlus className="text-3xl text-cyan-500 group-hover:text-white transition-colors duration-300" />,
            title: "1. Secure Authentication",
            description: "Register or login to your dashboard. Session payloads are securely managed with industry-standard JWT in HTTP-Only cookies."
        },
        {
            icon: <HiOutlinePlusCircle className="text-3xl text-emerald-500 group-hover:text-white transition-colors duration-300" />,
            title: "2. List Your Space",
            description: "Easily list and host your controlled library study rooms by inputting custom time-slots, specifications, and layout rules."
        },
        {
            icon: <HiOutlineMagnifyingGlass className="text-3xl text-cyan-500 group-hover:text-white transition-colors duration-300" />,
            title: "3. Smart Discovery",
            description: "Instantly browse, query, and isolate perfect private rooms utilizing real-time advanced filters for precise dates and hours."
        },
        {
            icon: <HiOutlineCheckCircle className="text-3xl text-emerald-500 group-hover:text-white transition-colors duration-300" />,
            title: "4. Conflict-Free Booking",
            description: "Reserve slots instantly. Our built-in verification engine automatically runs conflict-detection to eliminate double-booking errors."
        }
    ];

    // Framer Motion অ্যানিমেশন কনফিগারেশন (WhyChooseUs ফরম্যাট অনুসরণ করে)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { type: "spring", stiffness: 100, damping: 15 } 
        }
    };

    return (
        <section className="bg-white py-24 relative overflow-hidden border-b border-slate-200/60">
            {/* Ambient background glow matching layout design */}
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 text-cyan-600 font-semibold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
                        Application Workflow
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        How Does <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">StudyNook</span> Work?
                    </h2>
                    <p className="text-slate-500 mt-4 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        A clean full-stack architectural breakdown showing how students and library room hosts interact with the platform seamlessly.
                    </p>
                </div>

                {/* Highly Interactive Grid - Matched with your design */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {steps.map((step, idx) => (
                        <motion.div 
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -6, scale: 1.01 }}
                            className="group flex flex-col items-center text-center p-6 bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-slate-200/80 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl relative cursor-pointer"
                        >
                            {/* Step Number Badge */}
                            <span className="absolute top-4 right-5 text-sm font-black text-slate-200 group-hover:text-cyan-500/20 transition-colors duration-300">
                                0{idx + 1}
                            </span>

                            {/* Animated Icon Container */}
                            <div className="p-4 bg-white border border-slate-100 rounded-2xl group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-emerald-500 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-500 mb-6 flex-shrink-0">
                                {step.icon}
                            </div>

                            {/* Step Text Contents */}
                            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                                {step.title}
                            </h3>
                            <p className="text-slate-500 group-hover:text-slate-600 text-xs md:text-sm leading-relaxed font-medium px-1">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default HowItWorks;
