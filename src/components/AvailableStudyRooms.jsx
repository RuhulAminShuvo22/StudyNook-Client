"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card, Chip } from "@heroui/react";
import { FaArrowRight, FaLocationDot, FaUsers, FaCalendarCheck } from "react-icons/fa6";
import { motion } from "framer-motion";

// ফ্রেমার মোশন অ্যানিমেশন কনফিগারেশন
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
};

const AvailableStudyRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/rooms")
            .then((res) => res.json())
            .then((data) => {
                setRooms(data);
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching rooms:", err));
    }, []);

    const featuredRooms = rooms.slice(0, 6);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16 bg-gradient-to-br from-cyan-50/30 to-emerald-50/20 rounded-2xl md:rounded-3xl my-6">
            
            {/* Top Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10 text-center sm:text-left">
                <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
                        Available <span className="text-emerald-600 relative inline-block">Study Rooms</span>
                    </h2>
                    <p className="text-slate-500 mt-2 text-xs sm:text-sm font-medium">
                        Hand-picked premium spaces recently added to StudyNook.
                    </p>
                </div>

                <Link href="/rooms" className="w-full sm:w-auto">
                    <Button
                        variant="bordered"
                        size="md"
                        className="w-full sm:w-auto border-emerald-500 text-emerald-600 bg-white font-semibold shadow-sm hover:bg-emerald-50 rounded-xl transition-all duration-300"
                    >
                        View all rooms
                        <FaArrowRight className="text-xs ml-1" />
                    </Button>
                </Link>
            </div>

            {/* Loading Spinner */}
            {loading && (
                <div className="text-center py-20">
                    <span className="loading loading-spinner loading-lg text-emerald-600"></span>
                </div>
            )}

            {/* Rooms Grid */}
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate={loading ? "hidden" : "visible"}
            >
                {featuredRooms.map((room) => (
                    <motion.div
                        key={room._id}
                        variants={cardVariants}
                        whileHover={{ y: -8 }}
                        className="h-full"
                    >
                        <Card 
                            shadow="sm" 
                            className="h-full border border-cyan-100/40 bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/5 hover:border-emerald-200 group"
                        >
                            {/* Image Section - HTML <img> ট্যাগ দিয়ে ফিক্স করা হয়েছে */}
                            <div className="relative w-full h-44 sm:h-48 overflow-hidden">
                                <img
                                    alt={room.roomName}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    src={room.imageUrl || "https://unsplash.com"}
                                />
                                <div className="absolute top-3 right-3 z-10">
                                    <span className="text-xs font-bold text-emerald-700 bg-white/90 backdrop-blur-md border border-emerald-100 px-3 py-1 rounded-full shadow-sm">
                                        ${room.hourlyRate || "0"}/hr
                                    </span>
                                </div>
                            </div>
                            
                            {/* Card Content */}
                            <div className="p-5 flex flex-col justify-between min-h-[240px] flex-grow">
                                <div>
                                    {/* Title */}
                                    <h3 className="text-base sm:text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors duration-300 mb-2">
                                        {room.roomName || "Untitled Room"}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                                        {room.description || "No description provided for this room."}
                                    </p>

                                    {/* Room Specs Icons */}
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 mb-4 font-medium">
                                        <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                                            <FaLocationDot className="text-cyan-500 shrink-0" /> {room.floor || "N/A"}
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                                            <FaUsers className="text-cyan-500 shrink-0" /> Max {room.capacity || "0"}
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                                            <FaCalendarCheck className="text-cyan-500 shrink-0" /> {room.bookingCount || "0"} bookings
                                        </span>
                                    </div>
                                </div>

                                {/* Tags & Link Button */}
                                <div>
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {room.amenities && room.amenities.length > 0 ? (
                                            room.amenities.map((amenity, idx) => (
                                                <Chip 
                                                    key={idx} 
                                                    size="sm" 
                                                    variant="flat" 
                                                    className="bg-cyan-50 text-cyan-700 border border-cyan-100/50 text-[10px] font-semibold h-5 px-2 rounded-md"
                                                >
                                                    {amenity}
                                                </Chip>
                                            ))
                                        ) : (
                                            <Chip size="sm" variant="flat" className="bg-slate-100 text-slate-600 text-[10px] font-semibold h-5 px-2 rounded-md"> Standard </Chip>
                                        )}
                                    </div>

                                    <Link href={`/rooms/${room._id}`}>
                                        <Button 
                                            size="sm"
                                            className="w-full bg-emerald-600 text-white font-semibold shadow-sm transition-all duration-300 hover:bg-emerald-700 active:scale-[0.98] py-2 rounded-xl"
                                        >
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default AvailableStudyRooms;
