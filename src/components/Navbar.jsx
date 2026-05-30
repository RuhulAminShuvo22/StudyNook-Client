
"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";

import {
  FiMenu,
  FiX,
  FiArrowUpRight,
  FiLogOut,
  FiUser,
  FiBook,
  FiHome,
} from "react-icons/fi";

import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [imageError, setImageError] = useState(false);

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

  // Logout Function
  const handleLogout = async () => {
    await authClient.signOut();

    router.push("/");
  };

  // User Name First Letter
  const userInitial =
    session?.user?.name?.charAt(0)?.toUpperCase() || "U";

  // Menu Links
  // Menu Links
  const menuLinks = session
    ? [
      { name: "Home", href: "/" },
      { name: "Rooms", href: "/rooms" },
      { name: "My Bookings", href: "/my-bookings" },
      { name: "My Listings", href: "/my-listings" },
      { name: "Add Room", href: "/add-room" },
    ]
    : [
      { name: "Home", href: "/" },
      { name: "Rooms", href: "/rooms" },
    ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_2px_15px_-10px_rgba(0,0,0,0.04)] py-1"
        : "bg-white border-b border-slate-100 py-2.5"
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
              damping: 18,
            }}
          >
            <Link
              href="/"
              className="flex items-center relative group"
            >
              {/* Glow */}
              <span className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Logo */}
              <div className="relative w-[160px] h-[60px] flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/studynook.png"
                  width={160}
                  height={60}
                  alt="StudyNook Logo"
                  className="w-full h-full object-contain scale-[1.65]"
                  priority
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <ul
            className="hidden md:flex items-center gap-1 text-[13.5px] font-semibold relative"
            onMouseLeave={() => setHoveredIndex(null)}
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
                  className={`relative z-10 px-3 py-1.5 rounded-full block transition-colors duration-200 tracking-wide ${hoveredIndex === index
                    ? "text-cyan-600"
                    : "text-slate-600"
                    }`}
                >
                  {link.name}
                </Link>

                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      layoutId="navHoverPill"
                      className="absolute inset-0 bg-slate-100/80 border border-slate-200/30 rounded-full z-0"
                      initial={{
                        opacity: 0,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.96,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 28,
                      }}
                    />
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {!session ? (
              <>
                {/* Login */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/login"
                    className="text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors duration-200 py-1.5 px-2 block"
                  >
                    Login
                  </Link>
                </motion.div>

                {/* Register */}
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    y: -0.5,
                  }}
                  whileTap={{
                    scale: 0.97,
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
              </>
            ) : (
              <div className="relative group">
                {/* Profile Button */}
                <button className="flex items-center gap-3 px-2 py-1.5 rounded-full hover:bg-slate-100 transition-all duration-200">
                  {/* User Image / Fallback */}
                  {!imageError && session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      width={42}
                      height={42}
                      alt="User"
                      onError={() =>
                        setImageError(true)
                      }
                      className="w-10 h-10 rounded-full object-cover border-2 border-cyan-100"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                      {userInitial}
                    </div>
                  )}

                  {/* User Info */}
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-bold text-slate-800 truncate max-w-[120px]">
                      {session?.user?.name}
                    </p>

                    <p className="text-[11px] text-slate-500">
                      Welcome Back 👋
                    </p>
                  </div>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 top-14 w-64 bg-white border border-slate-200 rounded-3xl shadow-2xl hidden group-hover:flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Header */}
                  <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/60">
                    <div className="flex items-center gap-3">
                      {!imageError && session?.user?.image ? (
                        <Image
                          src={session.user.image}
                          width={48}
                          height={48}
                          alt="User"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white flex items-center justify-center font-bold">
                          {userInitial}
                        </div>
                      )}

                      <div>
                        <h3 className="font-bold text-slate-800 text-sm">
                          {session?.user?.name}
                        </h3>

                        <p className="text-xs text-slate-500 truncate max-w-[160px]">
                          {session?.user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* My Bookings */}
                  <Link
                    href="/my-bookings"
                    className="px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-all"
                  >
                    <FiBook size={17} />
                    My Bookings
                  </Link>

                  {/* My Listings */}
                  <Link
                    href="/my-listings"
                    className="px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-all"
                  >
                    <FiHome size={17} />
                    My Listings
                  </Link>

                  {/* Profile */}
                  <Link
                    href="/profile"
                    className="px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-all"
                  >
                    <FiUser size={17} />

                    My Profile
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="px-5 py-3 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-all text-left font-semibold"
                  >
                    <FiLogOut size={17} />

                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              setIsOpen(!isOpen)
            }
            className="md:hidden p-1.5 text-slate-700 hover:text-cyan-600 hover:bg-slate-50 rounded-xl transition-all"
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
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 17,
              }}
              className="md:hidden overflow-hidden border-t border-slate-100"
            >
              <ul className="flex flex-col gap-1 py-3 text-sm font-semibold">
                {/* Mobile User Info */}
                {session && (
                  <div className="mx-4 mb-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    {!imageError && session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        width={50}
                        height={50}
                        alt="User"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white flex items-center justify-center font-bold">
                        {userInitial}
                      </div>
                    )}

                    <div>
                      <h3 className="font-bold text-slate-800">
                        {session?.user?.name}
                      </h3>

                      <p className="text-xs text-slate-500">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Links */}
                {menuLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() =>
                        setIsOpen(false)
                      }
                      className="block px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-cyan-600 transition-all duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                {/* Mobile Auth */}
                {!session ? (
                  <div className="grid grid-cols-2 gap-2 pt-3 px-4 border-t border-slate-100/60">
                    <Link
                      href="/login"
                      onClick={() =>
                        setIsOpen(false)
                      }
                      className="text-center py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 font-bold transition-all"
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
                ) : (
                  <div className="pt-3 px-4 border-t border-slate-100/60">
                    <button
                      onClick={async () => {
                        await handleLogout();

                        setIsOpen(false);
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold transition-all hover:opacity-90"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;