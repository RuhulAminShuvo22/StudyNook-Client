"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
    FiPlusCircle,
    FiFileText,
    FiImage,
    FiGrid,
    FiUsers,
    FiDollarSign
} from "react-icons/fi";

import {
    TextField,
    Label,
    Input,
    FieldError,
    TextArea,
    Button
} from "@heroui/react";

const AddRoomPage = () => {

    // Amenities State
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    // Loading State
    const [loading, setLoading] = useState(false);

    // Amenities Options
    const amenityOptions = [
        "Whiteboard",
        "Projector",
        "Wi-Fi",
        "Power Outlets",
        "Quiet Zone",
        "Air Conditioning"
    ];

    // Handle Amenities
    const handleAmenityChange = (amenity) => {

        if (selectedAmenities.includes(amenity)) {

            setSelectedAmenities(
                selectedAmenities.filter(
                    (item) => item !== amenity
                )
            );

        } else {

            setSelectedAmenities([
                ...selectedAmenities,
                amenity
            ]);
        }
    };

    // Handle Submit
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        const formData = new FormData(e.target);

        const roomData = {
            roomName: formData.get("roomName"),
            description: formData.get("description"),
            imageUrl: formData.get("imageUrl"),
            floor: formData.get("floor"),
            capacity: parseInt(formData.get("capacity")),
            hourlyRate: parseFloat(formData.get("hourlyRate")),
            amenities: selectedAmenities,
            status: "available",
            createdAt: new Date()
        };

        console.log("Submitting Room Data:", roomData);

        try {

            const response = await fetch(
                "http://localhost:5000/rooms",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(roomData)
                }
            );

            const data = await response.json();

            console.log(data);

            if (data.insertedId) {

                toast.success(
                    "🎉 Study Space Added Successfully!",
                    {
                        duration: 4000,
                        style: {
                            borderRadius: "12px",
                            background: "#0f172a",
                            color: "#fff",
                            padding: "14px 18px"
                        }
                    }
                );

                e.target.reset();

                setSelectedAmenities([]);

            } else {

                toast.error(
                    "❌ Failed To Add Room",
                    {
                        duration: 4000,
                        style: {
                            borderRadius: "12px",
                            background: "#7f1d1d",
                            color: "#fff",
                            padding: "14px 18px"
                        }
                    }
                );
            }

        } catch (error) {

            console.error("Error:", error);

            toast.error(
                "❌ Failed To Add Room",
                {
                    duration: 4000,
                    style: {
                        borderRadius: "12px",
                        background: "#7f1d1d",
                        color: "#fff",
                        padding: "14px 18px"
                    }
                }
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <main className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 mt-10">

                {/* Heading */}
                <div className="text-center mb-12">

                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 text-cyan-600 font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4">

                        <FiPlusCircle className="animate-pulse" />

                        Host Workspace

                    </div>

                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">

                        List a New{" "}

                        <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">

                            Study Space

                        </span>

                    </h1>

                    <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-md mx-auto">

                        Fill out the specifications below to publish your premium study room.

                    </p>

                </div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 16
                    }}
                    className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl"
                >

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Room Name */}
                            <div className="md:col-span-3">

                                <TextField
                                    name="roomName"
                                    isRequired
                                    className="w-full"
                                >

                                    <Label className="text-slate-700 font-bold text-sm mb-2 flex items-center gap-2">

                                        <FiFileText className="text-cyan-500" />

                                        Room Name

                                    </Label>

                                    <Input
                                        name="roomName"
                                        placeholder="e.g. Quantum Lab"
                                    />

                                    <FieldError className="text-red-500 text-xs mt-1" />

                                </TextField>

                            </div>

                            {/* Description */}
                            <div className="md:col-span-3">

                                <TextField
                                    name="description"
                                    isRequired
                                    className="w-full"
                                >

                                    <Label className="text-slate-700 font-bold text-sm mb-2 flex items-center gap-2">

                                        <FiFileText className="text-cyan-500" />

                                        Description

                                    </Label>

                                    <TextArea
                                        name="description"
                                        placeholder="Describe the room environment..."
                                        className="min-h-[120px]"
                                    />

                                    <FieldError className="text-red-500 text-xs mt-1" />

                                </TextField>

                            </div>

                            {/* Image URL */}
                            <div className="md:col-span-3">

                                <TextField
                                    name="imageUrl"
                                    isRequired
                                    className="w-full"
                                >

                                    <Label className="text-slate-700 font-bold text-sm mb-2 flex items-center gap-2">

                                        <FiImage className="text-cyan-500" />

                                        Image URL

                                    </Label>

                                    <Input
                                        name="imageUrl"
                                        type="url"
                                        placeholder="https://example.com/image.jpg"
                                    />

                                    <FieldError className="text-red-500 text-xs mt-1" />

                                </TextField>

                            </div>

                            {/* Floor */}
                            <div>

                                <TextField
                                    name="floor"
                                    isRequired
                                    className="w-full"
                                >

                                    <Label className="text-slate-700 font-bold text-sm mb-2 flex items-center gap-2">

                                        <FiGrid className="text-cyan-500" />

                                        Floor

                                    </Label>

                                    <Input
                                        name="floor"
                                        placeholder="3rd Floor"
                                    />

                                    <FieldError className="text-red-500 text-xs mt-1" />

                                </TextField>

                            </div>

                            {/* Capacity */}
                            <div>

                                <TextField
                                    name="capacity"
                                    isRequired
                                    className="w-full"
                                >

                                    <Label className="text-slate-700 font-bold text-sm mb-2 flex items-center gap-2">

                                        <FiUsers className="text-cyan-500" />

                                        Capacity

                                    </Label>

                                    <Input
                                        name="capacity"
                                        type="number"
                                        placeholder="4"
                                        min="1"
                                    />

                                    <FieldError className="text-red-500 text-xs mt-1" />

                                </TextField>

                            </div>

                            {/* Hourly Rate */}
                            <div>

                                <TextField
                                    name="hourlyRate"
                                    isRequired
                                    className="w-full"
                                >

                                    <Label className="text-slate-700 font-bold text-sm mb-2 flex items-center gap-2">

                                        <FiDollarSign className="text-cyan-500" />

                                        Hourly Rate ($)

                                    </Label>

                                    <Input
                                        name="hourlyRate"
                                        type="number"
                                        placeholder="5"
                                        min="0"
                                    />

                                    <FieldError className="text-red-500 text-xs mt-1" />

                                </TextField>

                            </div>

                            {/* Amenities */}
                            <div className="md:col-span-3 mt-4">

                                <Label className="text-slate-900 font-black text-sm mb-4 block tracking-wide">

                                    Select Amenities

                                </Label>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                                    {amenityOptions.map((option) => {

                                        const isChecked =
                                            selectedAmenities.includes(option);

                                        return (

                                            <motion.div
                                                key={option}
                                                whileHover={{
                                                    y: -2
                                                }}
                                                whileTap={{
                                                    scale: 0.98
                                                }}
                                                onClick={() =>
                                                    handleAmenityChange(option)
                                                }
                                                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                                                    isChecked
                                                        ? "border-cyan-500 bg-cyan-50"
                                                        : "border-slate-200 bg-white"
                                                }`}
                                            >

                                                <div
                                                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                                        isChecked
                                                            ? "bg-cyan-500 border-cyan-500"
                                                            : "border-slate-300"
                                                    }`}
                                                >

                                                    {isChecked && (
                                                        <div className="w-2 h-2 rounded-full bg-white" />
                                                    )}

                                                </div>

                                                <span
                                                    className={`text-sm font-medium ${
                                                        isChecked
                                                            ? "text-cyan-700"
                                                            : "text-slate-700"
                                                    }`}
                                                >
                                                    {option}
                                                </span>

                                            </motion.div>
                                        );
                                    })}

                                </div>

                            </div>

                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 border-t border-slate-100 mt-8">

                            <motion.div
                                whileHover={{
                                    scale: 1.01
                                }}
                                whileTap={{
                                    scale: 0.98
                                }}
                            >

                                <Button
                                    type="submit"
                                    isDisabled={loading}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold py-4 rounded-xl"
                                >

                                    {loading
                                        ? "Publishing..."
                                        : "PUBLISH STUDY SPACE"}

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