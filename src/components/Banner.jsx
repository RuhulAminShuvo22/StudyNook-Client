"use client";

import { motion } from "framer-motion";
import { Separator } from "@heroui/react";
import { CalendarDays, ShieldCheck, DoorOpen, Users, ArrowRight } from "lucide-react"; 

const Banner = () => {
  // Framer Motion ভেরিয়েন্টস কনফিগারেশন (আপনার কোডটি হুবহু রাখা হয়েছে)
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
    <div className="bg-[linear-gradient(rgba(15,23,42,0.45),rgba(15,23,42,0.65)),url('/assets/Banner.png')] bg-cover bg-center text-white flex justify-between flex-col items-center min-h-[600px] sm:min-h-[550px] md:h-[600px] lg:h-[650px] relative w-full pt-20 md:pt-24 overflow-hidden">
      
      {/* Ambient Gradient Glow In Hero Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[400px] md:w-[500px] h-[260px] sm:h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Wrapper with Framer Motion */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 sm:p-6 md:p-10 text-center flex justify-center flex-col items-center gap-4 md:gap-5 flex-1 w-full max-w-4xl relative z-10"
      >
        
        {/* Main Heading */}
        <motion.h1 
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-tight md:leading-none"
        >
          Find Your Perfect <br className="hidden sm:inline" /> 
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Study Room</span>
        </motion.h1>

        {/* Description text */}
        <motion.p 
          variants={itemVariants}
          className="text-sm sm:text-base md:text-xl text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow-sm px-2 sm:px-0"
        >
          Browse and book quiet, private study rooms in your library. <br className="hidden sm:inline" /> 
          List your own room and earn.
        </motion.p>

        {/* Feature Badges with Hover Effect */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 lg:flex lg:flex-wrap justify-center gap-2.5 md:gap-4 my-2 sm:my-3 text-[11px] sm:text-xs md:text-sm text-slate-100 w-full max-w-lg lg:max-w-none px-4"
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
              className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full cursor-default transition-colors duration-200"
            >
              {badge.icon} <span className="truncate">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Explore Button */}
        <motion.div variants={itemVariants} className="mt-2 w-full sm:w-auto px-4 sm:px-0">
          <motion.a 
            href="/rooms" 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold w-full sm:w-auto px-6 sm:px-7 py-3 md:py-3.5 text-sm md:text-base rounded-full transition-all duration-300 shadow-md hover:shadow-cyan-500/20 group cursor-pointer"
          >
            Explore Rooms 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom Info Bar / Stats Bar - Fully Optimized for All Screen Layouts */}
      <motion.div 
        variants={statsVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/10 backdrop-blur-xl grid grid-cols-3 md:flex md:flex-wrap md:justify-between gap-2 sm:gap-4 md:gap-4 py-4 md:py-5 px-3 sm:px-6 md:px-8 w-full max-w-5xl md:rounded-t-2xl border-t md:border-x border-white/20 shadow-2xl relative z-10 mb-0"
      >
        
        {/* Stat 1 */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3.5 justify-center md:justify-start cursor-pointer group"
        >
          <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg sm:rounded-xl border border-white/10 shadow-inner group-hover:bg-cyan-500/20 transition-colors duration-300">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-sm sm:text-base md:text-xl font-extrabold leading-none text-white">500+</h3>
            <p className="text-[9px] sm:text-xs text-slate-300 mt-1">Students</p>
          </div>
        </motion.div>

        {/* Medium and Large View Separator */}
        <div className="hidden md:block self-center">
          <Separator variant="tertiary" orientation="vertical" className="h-8 border-white/20" />
        </div>

        {/* Stat 2 */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3.5 justify-center md:justify-start cursor-pointer group"
        >
          <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg sm:rounded-xl border border-white/10 shadow-inner group-hover:bg-cyan-500/20 transition-colors duration-300">
            <DoorOpen className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-sm sm:text-base md:text-xl font-extrabold leading-none text-white">120+</h3>
            <p className="text-[9px] sm:text-xs text-slate-300 mt-1">Rooms</p>
          </div>
        </motion.div>

        {/* Medium and Large View Separator */}
        <div className="hidden md:block self-center">
          <Separator variant="tertiary" orientation="vertical" className="h-8 border-white/20" />
        </div>

        {/* Stat 3 */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3.5 justify-center md:justify-start cursor-pointer group"
        >
          <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg sm:rounded-xl border border-white/10 shadow-inner group-hover:bg-cyan-500/20 transition-colors duration-300">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-sm sm:text-base md:text-xl font-extrabold leading-none text-white">Secure</h3>
            <p className="text-[9px] sm:text-xs text-slate-300 mt-1">Reliable</p>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Banner;
