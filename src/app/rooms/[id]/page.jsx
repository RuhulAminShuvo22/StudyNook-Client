"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiGrid, FiUsers, FiDollarSign, FiCheckCircle } from "react-icons/fi";

const RoomDetailsPage = () => {
    const { id } = useParams(); // URL থেকে ডাইনামিক id রিড করার জন্য
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ব্যাকএন্ড থেকে নির্দিষ্ট আইডির রুমের ডিটেইলস ডাটা ফেচ করা
        fetch(`http://localhost:5000/rooms/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setRoom(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching room details:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-bold">
                ❌ Room details not found!
            </div>
        );
    }

    return (
        <main className="bg-slate-50 dark:bg-slate-950 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl transition-colors duration-300">
                
                {/* রুমের নাম ও ফ্লোর */}
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">{room.roomName}</h1>
                <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 mb-6">
                    <FiGrid /> {room.floor}
                </p>

                {/* ছবি ডিসপ্লে */}
                <div className="relative w-full h-[250px] md:h-[450px] rounded-2xl overflow-hidden mb-8 border border-slate-100 dark:border-slate-800">
                    <Image 
                        src={room.imageUrl || "/assets/placeholder.png"} 
                        alt={room.roomName}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* তথ্য ও স্পেসিফিকেশন */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">About this Study Space</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">{room.description}</p>
                        </div>

                        {/* Amenities */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Available Amenities</h3>
                            <div className="flex flex-wrap gap-2.5">
                                {room.amenities?.map((amenity, index) => (
                                    <span key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
                                        <FiCheckCircle className="text-emerald-500" /> {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* বুকিং কার্ড সাইডবার */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6 h-fit space-y-5">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
                            <span className="text-slate-500 dark:text-slate-400 font-medium text-sm flex items-center gap-1"><FiUsers /> Capacity</span>
                            <span className="text-slate-900 dark:text-white font-bold text-base">{room.capacity} People</span>
                        </div>
                        <div className="flex justify-between items-center pb-2">
                            <span className="text-slate-500 dark:text-slate-400 font-medium text-sm flex items-center gap-1"><FiDollarSign /> Price</span>
                            <span className="text-xl font-black text-slate-900 dark:text-white">${room.hourlyRate}/hr</span>
                        </div>

                        <button className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-extrabold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-cyan-500/10 tracking-wide text-xs cursor-pointer">
                            RESERVE THIS SLOT
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default RoomDetailsPage;
