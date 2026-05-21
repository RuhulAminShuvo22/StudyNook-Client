"use client"; 

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Framer Motion এন্ট্রান্স অ্যানিমেশন ভেরিয়েন্টস (আপনার কোডটি হুবহু রাখা হয়েছে)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 16 } 
    }
  };

  return (
    <footer className="bg-slate-50 text-slate-600 px-4 sm:px-6 md:px-16 pt-12 md:pt-14 pb-6 border-t border-slate-200 relative overflow-hidden w-full">
      
      {/* 🔮 ১. অ্যাম্বিয়েন্ট ব্যাকগ্রাউন্ড লিকুইড লাইট গ্লো লেয়ার */}
      <div className="absolute top-0 right-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-[80px] sm:blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-gradient-to-tr from-emerald-400/10 to-transparent rounded-full blur-[80px] sm:blur-[100px] pointer-events-none animate-pulse" />

      {/* 📐 ২. মডার্ন মাইক্রো ডট-গ্রিড প্যাটার্ন */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:3.5rem_3.5rem] opacity-25 pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* 🎯 মেইন কন্টেন্ট এরিয়া উইথ ফ্রেমার মোশন */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-7xl mx-auto relative z-10"
      >
        
        {/* Top Branding Section - অতিরিক্ত মার্জিন mb-16 থেকে কমিয়ে mb-8 করা হয়েছে */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-6 md:pb-8 mb-8 border-b border-slate-200/80 gap-6">
          <motion.div variants={itemVariants} className="group cursor-pointer w-full lg:max-w-xl">
            <motion.h1 
              whileHover={{ scale: 1.02 }}
              className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent group-hover:from-cyan-600 group-hover:to-emerald-600 transition-all duration-500"
            >
              StudyNook
            </motion.h1>
            <p className="mt-2 max-w-md text-xs sm:text-sm text-slate-500 group-hover:text-slate-600 transition-colors duration-300 font-medium leading-relaxed">
              Discover and reserve the ultimate quiet environment for your learning and deep focus sessions.
            </p>
          </motion.div>

          {/* Newsletter Input Box */}
          <motion.div variants={itemVariants} className="w-full lg:max-w-md">
            <h3 className="text-slate-900 text-[11px] font-bold uppercase tracking-widest mb-2.5">Stay Updated</h3>
            <div className="flex items-center bg-white border border-slate-300 rounded-xl p-1 focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-500/10 transition-all duration-300 shadow-sm w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none flex-1 text-xs text-slate-900 px-2 sm:px-3 w-full font-medium"
              />
              <motion.button 
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-bold text-[10px] sm:text-xs px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 group shadow-md cursor-pointer whitespace-nowrap"
              >
                Join <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Links & Info Grid - গ্যাপ এবং নিচের মার্জিন mb-16 থেকে কমিয়ে mb-6 করা হয়েছে */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-6">
          
          {/* Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <h3 className="text-slate-900 text-[11px] font-bold tracking-widest uppercase border-l-2 border-cyan-500 pl-2.5">
              Useful Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold">
              {['Home', 'Rooms', 'About Us'].map((link) => (
                <li key={link}>
                  <Link 
                    href={`/${link.toLowerCase().replace(' ', '')}`}
                    className="hover:text-cyan-600 transition-colors duration-300 flex items-center gap-1 group font-medium w-fit relative py-0.5"
                  >
                    <span className="w-1 h-1 bg-cyan-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 mr-1" />
                    {link}
                    <span className="absolute bottom-0 left-2 w-0 h-[1.5px] bg-cyan-500 group-hover:w-[80%] transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <h3 className="text-slate-900 text-[11px] font-bold tracking-widest uppercase border-l-2 border-emerald-500 pl-2.5">
              Contact Info
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              {[
                { icon: <Mail size={14} className="text-slate-500 group-hover:text-emerald-500 transition-colors" />, text: "support@studynook.com" },
                { icon: <Phone size={14} className="text-slate-500 group-hover:text-emerald-500 transition-colors" />, text: "+1 (555) 019-2834" },
                { icon: <MapPin size={14} className="text-slate-500 group-hover:text-emerald-500 transition-colors" />, text: "Central Library, Block C" }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-2.5 group cursor-pointer hover:text-slate-900 transition-colors break-all"
                >
                  <div className="p-1.5 bg-white border border-slate-200 rounded-xl group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all shadow-sm flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="font-semibold text-xs">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Icons Section */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2 sm:col-span-2 md:col-span-1">
            <h3 className="text-slate-900 text-[11px] font-bold tracking-widest uppercase border-l-2 border-cyan-500 pl-2.5">
              Connect With Us
            </h3>
            <p className="text-xs font-medium text-slate-400">Follow our social channels for updates and tips.</p>
            <div className="flex flex-wrap gap-2 pt-0.5">
              {[
                { 
                  // Facebook
                  icon: <svg className="w-[15px] h-[15px] fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>, 
                  color: 'hover:text-blue-600 hover:border-blue-500/30 hover:bg-blue-500/5'
                },
                { 
                  // X (Twitter)
                  icon: <svg className="w-[15px] h-[15px] fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, 
                  color: 'hover:text-slate-900 hover:border-slate-400/30 hover:bg-slate-100'
                }, 
                { 
                  // LinkedIn
                  icon: <svg className="w-[15px] h-[15px] fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, 
                  color: 'hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/5'
                },
                { 
                  // Instagram
                  icon: <svg className="w-[15px] h-[15px] fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>, 
                  color: 'hover:text-pink-600 hover:border-pink-500/30 hover:bg-pink-500/5'
                }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 bg-white border border-slate-200 rounded-lg text-slate-500 shadow-sm flex items-center justify-center transition-colors duration-300 ${social.color}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - মার্জিন mt-16 থেকে কমিয়ে mt-8 করা হয়েছে */}
        <div className="border-t border-slate-200 mt-8 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-center sm:text-left">
          <p className="text-slate-400 order-2 sm:order-1">
            © {currentYear} <span className="text-slate-600 font-bold">StudyNook</span>. All rights reserved.
          </p>

          <div className="flex gap-4 sm:gap-6 text-slate-400 order-1 sm:order-2">
            <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
