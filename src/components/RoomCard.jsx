import { FaExternalLinkAlt } from "react-icons/fa";
import { FiGrid, FiUsers, FiClock } from "react-icons/fi";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const RoomCard = ({ room }) => {
    // Data Destructuring
    const { 
        _id, 
        roomName, 
        description, 
        imageUrl, 
        floor, 
        capacity, 
        hourlyRate, 
        amenities,
        status 
    } = room;

    return (
        <div className="group border border-slate-200/80 rounded-2xl overflow-hidden bg-white hover:shadow-xl hover:border-cyan-200/50 transition-all duration-300 flex flex-col h-full w-full">
            
            {/* Image Section */}
            <div className="relative w-full h-[200px] sm:h-[220px] overflow-hidden bg-slate-100 flex-shrink-0">
                <Image
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={roomName || "Study Room"}
                    src={imageUrl || "https://unsplash.com"}
                    height={400}
                    width={400}
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                />
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3 z-10">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-sm backdrop-blur-sm ${
                        status === "available" 
                        ? "bg-emerald-500/10 text-emerald-700 border-emerald-200/60" 
                        : "bg-amber-500/10 text-amber-700 border-amber-200/60"
                    }`}>
                        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Available"}
                    </span>
                </div>
            </div>

            {/* Content Details */}
            <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-4">
                
                {/* Info Area */}
                <div className="space-y-3">
                    {/* Title & Rate */}
                    <div className="flex justify-between items-start gap-3">
                        <h2 className="text-lg sm:text-xl font-bold text-slate-800 line-clamp-1 group-hover:text-cyan-600 transition-colors">
                            {roomName}
                        </h2>
                        <div className="text-right flex-shrink-0">
                            <div className="flex items-baseline gap-0.5 justify-end">
                                <span className="text-xl font-black text-cyan-600">${hourlyRate}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">per hour</span>
                        </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 min-h-[36px] sm:min-h-[40px] leading-relaxed">
                        {description}
                    </p>

                    {/* Core Features Specs (Grid, Users) */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                        <div className="flex items-center gap-2 min-w-0">
                            <FiGrid className="text-cyan-500 flex-shrink-0" size={14} />
                            <span className="truncate">{floor}</span>
                        </div>
                        <div className="flex items-center gap-2 min-w-0">
                            <FiUsers className="text-cyan-500 flex-shrink-0" size={14} />
                            <span className="truncate">Up to {capacity} people</span>
                        </div>
                    </div>

                    {/* Amenities List */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {amenities?.slice(0, 3).map((amenity, index) => (
                            <span 
                                key={index} 
                                className="bg-slate-100 text-slate-600 text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-md border border-slate-200/60"
                            >
                                {amenity}
                            </span>
                        ))}
                        {amenities?.length > 3 && (
                            <span className="text-[11px] text-slate-400 font-medium self-center pl-1">
                                +{amenities.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Booking Redirection CTA */}
                <div className="pt-2 flex-shrink-0">
                    <Link href={`/rooms/${_id}`} className="w-full block">
                        <Button 
                            variant="flat" 
                            className="w-full font-bold bg-slate-100 group-hover:bg-cyan-600 group-hover:text-white text-slate-700 gap-2 rounded-xl py-5 transition-all duration-300"
                        >
                            <FaExternalLinkAlt size={12} />
                            Book Workspace
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default RoomCard;
