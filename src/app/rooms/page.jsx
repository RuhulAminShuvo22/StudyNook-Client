"use client";

import { useState, useEffect } from "react";
import RoomCard from "@/components/RoomCard";



const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [searchName, setSearchName] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const amenityOptions = ["Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "Air Conditioning"];

    // 1. Fetch data from Local Server (Only Runs Once)
    useEffect(() => {
        fetch("http://localhost:5000/rooms")
            .then((res) => res.json())
            .then((data) => {
                setRooms(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching rooms:", err);
                setLoading(false);
            });
    }, []);

    // 2. Pure Derived State Logic (No useEffect = No Warning! 🚀)
    const filteredRooms = rooms.filter((room) => {
        // Search by Name
        if (searchName.trim() !== "" && !room.roomName?.toLowerCase().includes(searchName.toLowerCase())) {
            return false;
        }

        // Filter by Amenities
        if (selectedAmenities.length > 0 && !selectedAmenities.every((amenity) => room.amenities?.includes(amenity))) {
            return false;
        }

        // Filter by Min Price
        if (minPrice !== "" && room.hourlyRate < parseFloat(minPrice)) {
            return false;
        }

        // Filter by Max Price
        if (maxPrice !== "" && room.hourlyRate > parseFloat(maxPrice)) {
            return false;
        }

        return true;
    });

    // Handle Amenity Checkbox
    const handleAmenityChange = (amenity) => {
        if (selectedAmenities.includes(amenity)) {
            setSelectedAmenities(selectedAmenities.filter((item) => item !== amenity));
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

    // Reset All Filters
    const handleReset = () => {
        setSearchName("");
        setSelectedAmenities([]);
        setMinPrice("");
        setMaxPrice("");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-cyan-600 font-bold">
                Loading study spaces...
            </div>
        );
    }

    return (
        <div className="bg-slate-50/50 min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Top Header */}
                <div className="mb-10">
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        All <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">Study Rooms</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-500 mt-2">
                        Browse the full catalog. Filter by amenity, price, or search by name.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    
                    {/* Left Sidebar Filter */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6 lg:sticky lg:top-24">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800 text-base">Refine</h3>
                            <button 
                                onClick={handleReset}
                                className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
                            >
                                ✕ Reset
                            </button>
                        </div>

                        {/* Search Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Search by name</label>
                            <input 
                                type="text" 
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                placeholder="e.g. Quiet Pod" 
                                className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-400"
                            />
                        </div>

                        {/* Amenities Checkbox */}
                        <div className="space-y-2.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Amenities</label>
                            <div className="space-y-2">
                                {amenityOptions.map((amenity) => (
                                    <label key={amenity} className="flex items-center gap-2.5 text-sm font-medium text-slate-600 cursor-pointer group">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedAmenities.includes(amenity)}
                                            onChange={() => handleAmenityChange(amenity)}
                                            className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                                        />
                                        <span className="group-hover:text-slate-900 transition-colors">{amenity}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Hourly Rate Filter */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Hourly rate ($)</label>
                            <div className="grid grid-cols-2 gap-3">
                                <input 
                                    type="number" 
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    placeholder="Min" 
                                    className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all text-center"
                                />
                                <input 
                                    type="number" 
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    placeholder="Max" 
                                    className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all text-center"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side Cards Area */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Summary Data Counter */}
                        <div className="text-sm font-medium text-slate-500 bg-slate-100/60 inline-block px-4 py-1.5 rounded-full border border-slate-200/40">
                            Showing <span className="font-bold text-slate-800">{filteredRooms.length}</span> of <span className="font-bold text-slate-800">{rooms.length}</span> rooms
                        </div>

                        {/* Dynamic Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {
                                filteredRooms.map(room => (
                                    <RoomCard 
                                        key={room._id} 
                                        room={room} 
                                    />
                                ))
                            }
                        </div>

                        {/* If no data found after filter */}
                        {filteredRooms.length === 0 && (
                            <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl">
                                <p className="text-slate-400 font-medium">No study spaces match your filters.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RoomsPage;
