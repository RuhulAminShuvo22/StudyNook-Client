"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiCheckCircle } from "react-icons/fi";

const Testimonials = () => {
    // লোকাল এসেটস পাথ (person1.png এবং person2.png) যুক্ত করা হয়েছে
    const testimonials = [
        {
            id: 1,
            name: "Michael Chen",
            role: "Computer Science Student",
            image: "/assets/person1.png",
            review:
                "StudyNook completely saved my finals week! The time-conflict detection is brilliant. I booked a private library room instantly for our group project without any double-booking hassles."
        },
        {
            id: 2,
            name: "Sarah Johnson",
            role: "Library Resource Manager",
            image: "/assets/person2.png",
            review:
                "As a room host, managing our library spaces has never been this seamless. The dedicated host dashboard allows me to track listings and approvals with absolute transparency."
        }
    ];

    // Framer Motion ভেরিয়েন্টস
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 35 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { type: "spring", stiffness: 95, damping: 16 } 
        }
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden border-b border-slate-200/60">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 text-cyan-600 font-semibold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                            Community Feedback
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                            What Our <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">Users Say</span>
                        </h2>
                        <p className="text-slate-500 mt-3 text-sm md:text-base max-w-md leading-relaxed">
                            Real experiences from students and library hosts leveraging StudyNook for optimized learning.
                        </p>
                    </div>

                    {/* Nav Controls */}
                    <div className="hidden md:flex items-center gap-3">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-cyan-600 hover:border-cyan-500/30 transition-colors duration-300 shadow-sm cursor-pointer"
                        >
                            <FiArrowLeft size={16} />
                        </motion.button>

                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-cyan-600 hover:border-cyan-500/30 transition-colors duration-300 shadow-sm cursor-pointer"
                        >
                            <FiArrowRight size={16} />
                        </motion.button>
                    </div>
                </div>

                {/* Reviews Grid */}
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            variants={cardVariants}
                            whileHover={{ y: -6, scale: 1.01 }}
                            className="group bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-slate-200/80 p-8 rounded-2xl flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-6 transition-all duration-300 shadow-sm hover:shadow-xl relative cursor-pointer overflow-hidden"
                        >
                            {/* Decorative Quote Mark */}
                            <span className="absolute -bottom-6 -left-2 text-[120px] font-serif font-black select-none text-slate-200/20 group-hover:text-cyan-500/5 transition-colors duration-300 pointer-events-none">
                                “
                            </span>

                            {/* Review Content */}
                            <div className="flex-1 relative z-10">
                                <p className="text-slate-600 group-hover:text-slate-700 font-medium text-sm md:text-base leading-relaxed">
                                    &quot;{testimonial.review}&quot;
                                </p>

                                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2">
                                    <div>
                                        <h4 className="text-slate-900 group-hover:text-cyan-600 font-bold transition-colors duration-300 text-sm md:text-base">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-slate-400 font-semibold text-xs mt-0.5">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                    <FiCheckCircle size={14} className="text-emerald-500 self-start mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>

                            {/* Local Image Container */}
                            <div className="flex-shrink-0 relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    width={96}
                                    height={96}
                                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shadow-sm border border-slate-200/60 group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Testimonials;
