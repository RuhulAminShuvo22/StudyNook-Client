"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // পেজ স্ক্রোল ট্রানজিশন হ্যান্ডেল করার জন্য ইফেক্ট
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 15) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
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
                ? "bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm py-1" 
                : "bg-white border-b border-gray-100 py-2"
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo Area */}
                    <Link href="/" className="flex items-center group transition-transform duration-300 hover:scale-[1.02]">
                        <Image
                            src="/assets/studynook.png"
                            width={110}
                            height={110}
                            alt="StudyNook Logo"
                            className="w-[110px] h-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Middle Menu - Desktop with Sliding Line Animation */}
                    <ul className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-slate-600">
                        {menuLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="relative py-2 text-slate-600 hover:text-cyan-600 font-medium transition-colors duration-300 group"
                                >
                                    {link.name}
                                    {/* স্লিক আন্ডারলাইন এনিমেশন */}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-500 to-emerald-500 group-hover:w-full transition-all duration-300" />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Right Menu - Desktop Action Buttons */}
                    <ul className="hidden md:flex items-center gap-5 text-sm font-medium">
                        <li>
                            <Link
                                href="/login"
                                className="text-slate-600 hover:text-cyan-600 transition-colors duration-300 py-2 px-3 rounded-md hover:bg-slate-50"
                            >
                                Login
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/register"
                                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-cyan-500/10 cursor-pointer"
                            >
                                Register
                            </Link>
                        </li>
                    </ul>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-slate-700 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-all cursor-pointer"
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

                {/* Animated Mobile Dropdown Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 origin-top transform ${
                    isOpen ? "max-h-[450px] opacity-100 pb-5" : "max-h-0 opacity-0 pointer-events-none"
                }`}>
                    <ul className="flex flex-col gap-2 pt-2 text-sm font-medium text-slate-700 border-t border-slate-100">
                        {menuLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-cyan-600 transition-all"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        {/* Mobile Auth Divider */}
                        <div className="h-[1px] bg-slate-100 my-2" />

                        <li>
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="block py-2.5 px-3 rounded-lg hover:bg-slate-50 hover:text-cyan-600 transition-all"
                            >
                                Login
                            </Link>
                        </li>

                        <li className="px-3 pt-2">
                            <Link
                                href="/register"
                                onClick={() => setIsOpen(false)}
                                className="block text-center bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold py-2.5 rounded-full shadow-sm"
                            >
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
