import RoomCard from "@/components/RoomCard"; // Nishchit krun component path thik ache কিনা

const RoomsPage = async () => {
    // Local server theke server-side data fetch
    const res = await fetch('http://localhost:5000/rooms', { cache: 'no-store' });
    const rooms = await res.json();

    // Amenities list options for filter sidebar
    const amenityOptions = ["Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "Air Conditioning"];

    return (
        <div className="bg-slate-50/50 min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Top Header Section */}
                <div className="mb-10">
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        All <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">Study Rooms</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-500 mt-2">
                        Browse the full catalog. Filter by amenity, price, or search by name.
                    </p>
                </div>

                {/* Main Content Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    
                    {/* Left Sidebar Filter Section */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6 lg:sticky lg:top-24">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800 text-base">Refine</h3>
                            <button className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors">✕ Reset</button>
                        </div>

                        {/* Search Input Box */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Search by name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Quiet Pod" 
                                className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-400"
                            />
                        </div>

                        {/* Amenities Filter Radio/Check */}
                        <div className="space-y-2.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Amenities</label>
                            <div className="space-y-2">
                                {amenityOptions.map((amenity) => (
                                    <label key={amenity} className="flex items-center gap-2.5 text-sm font-medium text-slate-600 cursor-pointer group">
                                        <input 
                                            type="checkbox" 
                                            className="w-4 h-4 rounded-md border-slate-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                                        />
                                        <span className="group-hover:text-slate-900 transition-colors">{amenity}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Hourly Rate Filter Min/Max */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Hourly rate ($)</label>
                            <div className="grid grid-cols-2 gap-3">
                                <input 
                                    type="number" 
                                    placeholder="Min" 
                                    className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all text-center"
                                />
                                <input 
                                    type="number" 
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
                            Showing <span className="font-bold text-slate-800">{rooms?.length || 0}</span> of <span className="font-bold text-slate-800">{rooms?.length || 0}</span> rooms
                        </div>

                        {/* Dynamic Responsive Grid for Room Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {
                                rooms?.map(room => (
                                    <RoomCard 
                                        key={room._id} 
                                        room={room} 
                                    />
                                ))
                            }
                        </div>

                        {/* Fallback layout empty status case */}
                        {rooms?.length === 0 && (
                            <div className="text-center py-20 bg-white border border-dashed border-slate-300 rounded-2xl">
                                <p className="text-slate-400 font-medium">No study spaces listed yet.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RoomsPage;
