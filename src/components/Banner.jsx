"use client";

import { motion } from "framer-motion";
import { Separator } from "@heroui/react";
import { CalendarDays, ShieldCheck, DoorOpen, Users, ArrowRight } from "lucide-react"; 

const Banner = () => {
  // Framer Motion ভেরিয়েন্টস কনফিগারেশন
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 90, damping: 14 } 
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 80, damping: 16, delay: 0.6 } 
    }
  };

  return (
    <div className="bg-[linear-gradient(rgba(15,23,42,0.45),rgba(15,23,42,0.65)),url('/assets/Banner.png')] bg-cover bg-center text-white flex justify-between flex-col items-center min-h-[550px] md:h-[600px] relative w-full pt-16 overflow-hidden">
      
      {/* Ambient Gradient Glow In Hero Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Wrapper with Framer Motion */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 md:p-10 text-center flex justify-center flex-col items-center gap-5 flex-1 max-w-4xl relative z-10"
      >
        
        {/* Main Heading */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-black tracking-tight leading-tight md:leading-none"
        >
          Find Your Perfect <br className="hidden md:inline" /> 
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Study Room</span>
        </motion.h1>

        {/* Description text */}
        <motion.p 
          variants={itemVariants}
          className="text-base md:text-xl text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow-sm"
        >
          Browse and book quiet, private study rooms in your library. <br className="hidden md:inline" /> 
          List your own room and earn.
        </motion.p>

        {/* Feature Badges with Hover Effect */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:flex flex-wrap justify-center gap-3 md:gap-4 my-3 text-xs md:text-sm text-slate-100"
        >
          {[
            { icon: <CalendarDays size={16} className="text-cyan-400" />, text: "Easy Booking" },
            { icon: <ShieldCheck size={16} className="text-cyan-400" />, text: "No Double Bookings" },
            { icon: <DoorOpen size={16} className="text-cyan-400" />, text: "Private Rooms" },
            { icon: <Users size={16} className="text-cyan-400" />, text: "Student Focused" }
          ].map((badge, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full cursor-default transition-colors duration-200"
            >
              {badge.icon} {badge.text}
            </motion.div>
          ))}
        </motion.div>

        {/* Explore Button */}
        <motion.div variants={itemVariants} className="mt-2">
          <motion.a 
            href="/rooms" 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-cyan-500/20 group cursor-pointer"
          >
            Explore Rooms 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom Info Bar / Stats Bar - Animated Entrance */}
      <motion.div 
        variants={statsVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/10 backdrop-blur-xl flex flex-wrap justify-center md:justify-between gap-6 md:gap-4 py-5 px-8 w-full max-w-5xl md:rounded-t-2xl border-t md:border-x border-white/20 shadow-2xl relative z-10 mb-0"
      >
        
        {/* Stat 1 */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="flex items-center gap-3.5 min-w-[160px] justify-center md:justify-start cursor-pointer group"
        >
          <div className="p-2 bg-white/10 rounded-xl border border-white/10 shadow-inner group-hover:bg-cyan-500/20 transition-colors duration-300">
            <Users size={22} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold leading-none text-white">500+</h3>
            <p className="text-xs text-slate-300 mt-1">Happy Students</p>
          </div>
        </motion.div>

        <div className="hidden md:block self-center">
          <Separator variant="tertiary" orientation="vertical" className="h-8 border-white/20" />
        </div>

        {/* Stat 2 */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="flex items-center gap-3.5 min-w-[160px] justify-center md:justify-start cursor-pointer group"
        >
          <div className="p-2 bg-white/10 rounded-xl border border-white/10 shadow-inner group-hover:bg-cyan-500/20 transition-colors duration-300">
            <DoorOpen size={22} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold leading-none text-white">120+</h3>
            <p className="text-xs text-slate-300 mt-1">Study Rooms</p>
          </div>
        </motion.div>

        <div className="hidden md:block self-center">
          <Separator variant="tertiary" orientation="vertical" className="h-8 border-white/20" />
        </div>

        {/* Stat 3 */}
        <div className="flex items-center gap-3.5 min-w-[160px] justify-center md:justify-start cursor-pointer group">
          <div className="p-2 bg-white/10 rounded-xl border border-white/10 shadow-inner group-hover:bg-cyan-500/20 transition-colors duration-300">
            <ShieldCheck size={22} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold leading-none text-white">Secure</h3>
            <p className="text-xs text-slate-300 mt-1">& Reliable</p>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Banner;
