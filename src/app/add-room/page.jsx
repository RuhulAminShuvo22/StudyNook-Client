"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlusCircle, FiFileText, FiImage, FiGrid, FiUsers, FiDollarSign } from "react-icons/fi";
import { 
    TextField, 
    Label, 
    Input,
    FieldError, 
    TextArea,
    Button
} from "@heroui/react";

const AddRoomPage = () => {
    // অ্যারেনিটি সিলেক্ট করার জন্য স্টেট ডিক্লেয়ারেশন
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const amenityOptions = [
        "Whiteboard", "Projector", "Wi-Fi", 
        "Power Outlets", "Quiet Zone", "Air Conditioning"
    ];

    // চেকবক্স হ্যান্ডেল করার ফাংশন (সিলেক্টেড ভ্যালুগুলো অ্যারেতে পুশ হবে)
    const handleAmenityChange = (amenity) => {
        if (selectedAmenities.includes(amenity)) {
            setSelectedAmenities(selectedAmenities.filter(item => item !== amenity));
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

    // ফর্ম সাবমিট হ্যান্ডলার
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const roomData = {
            roomName: formData.get("roomName"),
            description: formData.get("description"),
            imageUrl: formData.get("imageUrl"),
            floor: formData.get("floor"),
            capacity: parseInt(formData.get("capacity")),
            hourlyRate: parseFloat(formData.get("hourlyRate")),
            amenities: selectedAmenities, // অ্যারে অব স্ট্রিং হিসেবে ডেটা যাবে
            status: "available", // ডিফল্ট স্ট্যাটাস
            createdAt: new Date()
        };

        console.log("Submitting Room Data to Backend:", roomData);
        // এখানে আপনার ব্যাকএন্ড এপিআই fetch('http://localhost:5000/rooms', {...}) কল করবেন
    };

    return (
        <main className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Ambient Background Glow Layer */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 mt-10">
                
                {/* 🎯 প্রিমিয়াম হেডিং সেকশন */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 text-cyan-600 font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                        <FiPlusCircle className="animate-pulse" /> Host Workspace
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                        List a New <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">Study Space</span>
                    </h1>
                    <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md mx-auto">
                        Fill out the specifications below to list your controlled library room onto the StudyNook grid.
                    </p>
                </div>

                {/* 📝 ইন্টারঅ্যাক্টিভ ফর্ম কন্টেইনার (Framer Motion অ্যানিমেশন সহ) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 16 }}
                    className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-100 dark:shadow-none"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Room Name */}
                            <div className="md:col-span-3">
                                <TextField name="roomName" isRequired className="w-full">
                                    <Label className="text-slate-700 font-bold text-sm mb-2 flex items-center gap-2">
                                        <FiFileText className="text-cyan-500" /> Room Name
                                    </Label>
                                    <Input placeholder="e.g., Quantum Computing Lab A" className="rounded-xl border-slate-200 focus:border-cyan-500 bg-slate-50/50" />
                                    <FieldError className="text-rose-500 text-xs mt-1" />
                                </TextField>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-3">
                                <TextField name="description" isRequired className="w-full">
                                    <Label className="text-slate-700 font-bold text-sm mb-2 flex items-center gap-2">
                                        <FiFileText className="text-cyan-500" /> Description
                                    </Label>
                                    <TextArea
                                        placeholder="Describe the quiet rules, specialized devices, equipment, or target focus environment..."
                                        className="rounded-xl border-slate-200 focus:border-cyan-500 bg-slate-50/50 min-h-[120px]"
                                    />
                                    <FieldError className="text-rose-500 text-xs mt-1" />
                                </TextField>
                            </div>

                            {/* Image URL */}
                            <div className="md:col-span-3">
                                <TextField name="imageUrl" isRequired className="w-full">
                                    <Label className="text-slate-700 font-bold text-sm mb-2 flex items-center gap-2">
                                        <FiImage className="text-cyan-500" /> Image URL
                                    </Label>
                                    <Input type="url" placeholder="https://unsplash.com" className="rounded-xl border-slate-200 focus:border-cyan-500 bg-slate-50/50" />
                                    <FieldError className="text-rose-500 text-xs mt-1" />
                                </TextField>
                            </div>

                            {/* Floor Field */}
                            <div>
                                <TextField name="floor" isRequired className="w-full">
                                    <Label className="text-slate-700 font-bold text-sm mb-2 flex items-center gap-2">
                                        <FiGrid className="text-cyan-500" /> Floor
                                    </Label>
                                    <Input placeholder="e.g., 3rd Floor" className="rounded-xl border-slate-200 focus:border-cyan-500 bg-slate-50/50" />
                                    <FieldError className="text-rose-500 text-xs mt-1" />
                                </TextField>
                            </div>

                            {/* Capacity Field */}
                            <div>
                                <TextField name="capacity" type="number" isRequired className="w-full">
                                    <Label className="text-slate-700 font-bold text-sm mb-2 flex items-center gap-2">
                                        <FiUsers className="text-cyan-500" /> Capacity
                                    </Label>
                                    <Input type="number" placeholder="4" min="1" className="rounded-xl border-slate-200 focus:border-cyan-500 bg-slate-50/50" />
                                    <FieldError className="text-rose-500 text-xs mt-1" />
                                </TextField>
                            </div>

                            {/* Hourly Rate Field */}
                            <div>
                                <TextField name="hourlyRate" type="number" isRequired className="w-full">
                                    <Label className="text-slate-700 font-bold text-sm mb-2 flex items-center gap-2">
                                        <FiDollarSign className="text-cyan-500" /> Hourly Rate ($)
                                    </Label>
                                    <Input type="number" placeholder="5" min="0" className="rounded-xl border-slate-200 focus:border-cyan-500 bg-slate-50/50" />
                                    <FieldError className="text-rose-500 text-xs mt-1" />
                                </TextField>
                            </div>

                            {/* 🛠️ Amenities Checkbox Set (ইমেজের গ্রিড ফরম্যাট অনুসরণ করে ডিজাইনকৃত) */}
                            <div className="md:col-span-3 mt-4">
                                <Label className="text-slate-900 font-black text-sm mb-4 block tracking-wide">
                                    Select Available Amenities
                                </Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                                    {amenityOptions.map((option) => {
                                        const isChecked = selectedAmenities.includes(option);
                                        return (
                                            <motion.div
                                                key={option}
                                                whileHover={{ y: -1, scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                                onClick={() => handleAmenityChange(option)}
                                                className={`flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer select-none transition-all duration-200 ${
                                                    isChecked 
                                                        ? "bg-gradient-to-r from-cyan-500/5 to-emerald-500/5 border-cyan-500/60 shadow-sm shadow-cyan-500/5" 
                                                        : "bg-slate-50/60 hover:bg-slate-50 border-slate-200/80"
                                                }`}
                                            >
                                                {/* কাস্টম প্রিমিয়াম রেডিও/চেক ইন্ডিকেটর সার্কেল */}
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                                    isChecked ? "border-cyan-500 bg-cyan-500" : "border-slate-300 bg-white"
                                                }`}>
                                                    {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                </div>
                                                <span className={`text-xs sm:text-sm font-semibold transition-colors ${
                                                    isChecked ? "text-cyan-700" : "text-slate-600"
                                                }`}>
                                                    {option}
                                                </span>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>

                        {/* ⚡ সাবমিট বাটন - আপনার থিমের সাথে সামঞ্জস্যপূর্ণ রাউন্ডেড ডিজাইন */}
                        <div className="pt-6 border-t border-slate-100 mt-8">
                            <motion.div whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.99 }}>
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-extrabold py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-cyan-500/10 tracking-wide text-xs cursor-pointer"
                                >
                                    PUBLISH STUDY SPACE LISTING
                                </Button>
                            </motion.div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </main>
    );
};

export default AddRoomPage;
