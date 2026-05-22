"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
    FiMenu,
    FiX,
    FiArrowUpRight,
    FiMoon,
    FiSun
} from "react-icons/fi";

import { useTheme } from "next-themes";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Theme
    const { theme, setTheme } = useTheme();

    // Mounted State
    const [mounted, setMounted] = useState(false);

    // Scroll Effect
    useEffect(() => {

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    // Prevent Hydration Error
    useEffect(() => {

        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);

        return () => clearTimeout(timer);

    }, []);

    // Menu Links
    const menuLinks = [
        { name: "Home", href: "/" },
        { name: "Rooms", href: "/rooms" },
        { name: "My Bookings", href: "/my-bookings" },
        { name: "My Listings", href: "/my-listings" },
        { name: "Add Room", href: "/add-room" },
    ];

    return (

        <nav
            className={`sticky top-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800 shadow-[0_2px_15px_-10px_rgba(0,0,0,0.04)] py-1"
                    : "bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 py-2.5"
            }`}
        >

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <motion.div
                        className="flex items-center select-none"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 18
                        }}
                    >

                        <Link
                            href="/"
                            className="flex items-center relative group"
                        >

                            {/* Glow */}
                            <span className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Logo Container */}
                            <div className="relative w-[160px] h-[60px] flex items-center justify-center overflow-hidden mix-blend-multiply dark:mix-blend-normal">

                                <Image
                                    src="/assets/studynook.png"
                                    width={160}
                                    height={60}
                                    alt="StudyNook Logo"
                                    className="w-full h-full object-contain scale-[1.65] transition-transform"
                                    priority
                                />

                            </div>

                        </Link>

                    </motion.div>

                    {/* Desktop Menu */}
                    <ul
                        className="hidden md:flex items-center gap-1 text-[13.5px] font-semibold relative"
                        onMouseLeave={() =>
                            setHoveredIndex(null)
                        }
                    >

                        {menuLinks.map((link, index) => (

                            <li
                                key={link.href}
                                className="relative"
                            >

                                <Link
                                    href={link.href}
                                    onMouseEnter={() =>
                                        setHoveredIndex(index)
                                    }
                                    className={`relative z-10 px-3 py-1.5 rounded-full block transition-colors duration-200 tracking-wide ${
                                        hoveredIndex === index
                                            ? "text-cyan-600"
                                            : "text-slate-600 dark:text-slate-300"
                                    }`}
                                >

                                    {link.name}

                                </Link>

                                <AnimatePresence>

                                    {hoveredIndex === index && (

                                        <motion.span
                                            layoutId="navHoverPill"
                                            className="absolute inset-0 bg-slate-100/80 dark:bg-slate-800 border border-slate-200/30 dark:border-slate-700 rounded-full z-0"
                                            initial={{
                                                opacity: 0,
                                                scale: 0.96
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.96
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 28
                                            }}
                                        />

                                    )}

                                </AnimatePresence>

                            </li>

                        ))}

                    </ul>

                    {/* Right Menu */}
                    <div className="hidden md:flex items-center gap-4 text-[13.5px] font-semibold">

                        {/* Theme Toggle */}
                        {mounted && (

                            <motion.button
                                whileHover={{
                                    scale: 1.05
                                }}
                                whileTap={{
                                    scale: 0.92
                                }}
                                onClick={() =>
                                    setTheme(
                                        theme === "dark"
                                            ? "light"
                                            : "dark"
                                    )
                                }
                                className="p-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-yellow-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
                            >

                                {theme === "dark" ? (
                                    <FiSun size={16} />
                                ) : (
                                    <FiMoon size={16} />
                                )}

                            </motion.button>

                        )}

                        {/* Login */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                        >

                            <Link
                                href="/login"
                                className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 transition-colors duration-200 py-1.5 px-2 block"
                            >

                                Login

                            </Link>

                        </motion.div>

                        {/* Register */}
                        <motion.div
                            whileHover={{
                                scale: 1.03,
                                y: -0.5
                            }}
                            whileTap={{
                                scale: 0.97
                            }}
                        >

                            <Link
                                href="/register"
                                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-bold px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-cyan-500/10 flex items-center gap-1 group tracking-wide text-xs"
                            >

                                Register

                                <FiArrowUpRight
                                    size={14}
                                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                />

                            </Link>

                        </motion.div>

                    </div>

                    {/* Mobile Toggle */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                            setIsOpen(!isOpen)
                        }
                        className="md:hidden p-1.5 text-slate-700 dark:text-slate-300 hover:text-cyan-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
                    >

                        {isOpen ? (
                            <FiX size={22} />
                        ) : (
                            <FiMenu size={22} />
                        )}

                    </motion.button>

                </div>

                {/* Mobile Menu */}
                <AnimatePresence>

                    {isOpen && (

                        <motion.div
                            initial={{
                                opacity: 0,
                                height: 0
                            }}
                            animate={{
                                opacity: 1,
                                height: "auto"
                            }}
                            exit={{
                                opacity: 0,
                                height: 0
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 130,
                                damping: 17
                            }}
                            className="md:hidden overflow-hidden border-t border-slate-100 dark:border-slate-800"
                        >

                            <ul className="flex flex-col gap-1 py-3 text-sm font-semibold">

                                {menuLinks.map((link) => (

                                    <li key={link.href}>

                                        <Link
                                            href={link.href}
                                            onClick={() =>
                                                setIsOpen(false)
                                            }
                                            className="block px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-cyan-600 transition-all duration-200"
                                        >

                                            {link.name}

                                        </Link>

                                    </li>

                                ))}

                                {/* Mobile Theme Toggle */}
                                {mounted && (

                                    <div className="px-4 pt-3">

                                        <button
                                            onClick={() =>
                                                setTheme(
                                                    theme === "dark"
                                                        ? "light"
                                                        : "dark"
                                                )
                                            }
                                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-yellow-300 transition-all"
                                        >

                                            {theme === "dark" ? (
                                                <>
                                                    <FiSun size={16} />
                                                    Light Mode
                                                </>
                                            ) : (
                                                <>
                                                    <FiMoon size={16} />
                                                    Dark Mode
                                                </>
                                            )}

                                        </button>

                                    </div>

                                )}

                                {/* Mobile Buttons */}
                                <div className="grid grid-cols-2 gap-2 pt-3 px-4 border-t border-slate-100/60 dark:border-slate-800">

                                    <Link
                                        href="/login"
                                        onClick={() =>
                                            setIsOpen(false)
                                        }
                                        className="text-center py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold transition-all"
                                    >

                                        Login

                                    </Link>

                                    <Link
                                        href="/register"
                                        onClick={() =>
                                            setIsOpen(false)
                                        }
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