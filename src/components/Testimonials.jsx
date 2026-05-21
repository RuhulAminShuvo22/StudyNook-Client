"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiCheckCircle } from "react-icons/fi";

const Testimonials = () => {
    // লোকাল এসেটস পাথ (আপনার কোডটি হুবহু রাখা হয়েছে)
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

    // Framer Motion ভেরিয়েন্টস (আপনার কোডটি হুবহু রাখা হয়েছে)
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
        <section className="py-16 md:py-24 bg-white relative overflow-hidden border-b border-slate-200/60 w-full">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-1/3 w-[280px] sm:w-96 h-[280px] sm:h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[280px] sm:w-96 h-[280px] sm:h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 relative z-10">

                {/* Top Section - Fully Responsive alignment */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
                    <div className="w-full md:max-w-2xl">
                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 text-cyan-600 font-semibold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                            Community Feedback
                        </div>

                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                            What Our <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">Users Say</span>
                        </h2>
                        <p className="text-slate-500 mt-2.5 md:mt-3 text-xs sm:text-sm md:text-base max-w-md leading-relaxed">
                            Real experiences from students and library hosts leveraging StudyNook for optimized learning.
                        </p>
                    </div>

                    {/* Nav Controls - Hidden only on small mobile and visible from sm screens */}
                    <div className="hidden sm:flex items-center gap-3 self-end">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-cyan-600 hover:border-cyan-500/30 transition-colors duration-300 shadow-sm cursor-pointer"
                        >
                            <FiArrowLeft size={16} />
                        </motion.button>

                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-cyan-600 hover:border-cyan-500/30 transition-colors duration-300 shadow-sm cursor-pointer"
                        >
                            <FiArrowRight size={16} />
                        </motion.button>
                    </div>
                </div>

                {/* Reviews Grid */}
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
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
                            className="group bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-slate-200/80 p-5 sm:p-8 rounded-2xl flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-5 sm:gap-6 transition-all duration-300 shadow-sm hover:shadow-xl relative cursor-pointer overflow-hidden w-full"
                        >
                            {/* Decorative Quote Mark */}
                            <span className="absolute -bottom-6 -left-2 text-[100px] sm:text-[120px] font-serif font-black select-none text-slate-200/20 group-hover:text-cyan-500/5 transition-colors duration-300 pointer-events-none">
                                “
                            </span>

                            {/* Review Content */}
                            <div className="flex-1 relative z-10 w-full">
                                <p className="text-slate-600 group-hover:text-slate-700 font-medium text-xs sm:text-sm md:text-base leading-relaxed">
                                    &quot;{testimonial.review}&quot;
                                </p>

                                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-100 flex items-center gap-2">
                                    <div className="flex-1">
                                        <h4 className="text-slate-900 group-hover:text-cyan-600 font-bold transition-colors duration-300 text-xs sm:text-sm md:text-base truncate">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-slate-400 font-semibold text-[10px] sm:text-xs mt-0.5 truncate">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                    <FiCheckCircle size={14} className="text-emerald-500 self-center opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>

                            {/* Local Image Container - Desktop layout, column order reversed on mobile layout */}
                            <div className="flex-shrink-0 relative self-start sm:self-center">
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    width={96}
                                    height={96}
                                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-xl shadow-sm border border-slate-200/60 group-hover:scale-105 transition-transform duration-500"
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
