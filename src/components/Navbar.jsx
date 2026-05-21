

"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, User, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/assets/studynook.png"
                            width={110}
                            height={110}
                            alt="StudyNook Logo"
                            className="w-[110px] h-auto object-contain"
                        />
                    </Link>

                    {/* Left Menu - Desktop */}
                    <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-700">
                        <li>
                            <Link
                                href="/"
                                className="text-sky-500 hover:text-sky-600 transition-colors"
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/rooms"
                                className="hover:text-sky-500 transition-colors"
                            >
                                Rooms
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/my-bookings"
                                className="hover:text-sky-500 transition-colors"
                            >
                                My Bookings
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/my-listings"
                                className="hover:text-sky-500 transition-colors"
                            >
                                My Listings
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/add-room"
                                className="flex items-center gap-1 hover:text-sky-500 transition-colors"
                            >

                                Add Room
                            </Link>
                        </li>
                    </ul>




                    {/* Right Menu - Desktop */}
                    <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-700">



                        <li>
                            <Link
                                href="/login"
                                className="hover:text-sky-500 transition-colors"
                            >
                                Login
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/register"
                                className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors"
                            >
                                Register
                            </Link>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-700"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-5">

                        <ul className="flex flex-col gap-4 text-sm font-medium text-gray-700">

                            <li>
                                <Link
                                    href="/"
                                    className="block hover:text-sky-500"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/rooms"
                                    className="hover:text-sky-500 transition-colors"
                                >
                                    Rooms
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/my-bookings"
                                    className="block hover:text-sky-500"
                                >
                                    My Bookings
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/my-listings"
                                    className="hover:text-sky-500 transition-colors"
                                >
                                    My Listings
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/add-room"
                                    className="flex items-center gap-1 hover:text-sky-500 transition-colors"
                                >

                                    Add Room
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/login"
                                    className="block hover:text-sky-500"
                                >
                                    Login
                                </Link>
                            </li>

                            <li>
                            <Link
                                href="/register"
                                className="block hover:text-sky-500"
                            >
                                Register
                            </Link>
                        </li>

                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;