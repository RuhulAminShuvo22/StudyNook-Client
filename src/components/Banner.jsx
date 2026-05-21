import { Separator } from "@heroui/react";
// আইকন ব্যবহারের জন্য lucide-react ব্যবহার করা হয়েছে (যদি না থাকে ইন্সটল করে নিন অথবা নিজের মতো আইকন দিন)
import { CalendarDays, ShieldCheck, DoorOpen, Users, ArrowRight } from "lucide-react"; 

const Banner = () => {
  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.7)),url('/assets/banner.png')] bg-cover bg-center text-white flex justify-between flex-col items-center min-h-[500px] md:h-150 relative">
      
      {/* Hero Area */}
      <div className="p-6 md:p-10 text-center flex justify-center flex-col items-center gap-4 flex-1 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Find Your Perfect <br className="hidden md:inline" /> Study Room
        </h1>

        <p className="text-base md:text-xl text-gray-300 max-w-2xl">
          Browse and book quiet, private study rooms in your library. <br className="hidden md:inline" /> 
          List your own room and earn.
        </p>

        {/* Feature Badges (Optional - As per Image) */}
        <div className="grid grid-cols-2 md:flex gap-4 md:gap-6 my-2 text-sm text-gray-300">
          <div className="flex items-center gap-2"><CalendarDays size={18} className="text-cyan-400" /> Easy Booking</div>
          <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-cyan-400" /> No Double Bookings</div>
          <div className="flex items-center gap-2"><DoorOpen size={18} className="text-cyan-400" /> Private Rooms</div>
          <div className="flex items-center gap-2"><Users size={18} className="text-cyan-400" /> Student Focused</div>
        </div>

        {/* Explore Button */}
        <div className="mt-2">
          <a 
            href="/rooms" 
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium px-6 py-3 rounded-md cursor-pointer transition-all duration-300 shadow-lg"
          >
            Explore Rooms <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Bottom Info Bar / Stats Bar */}
      <div className="bg-black/40 backdrop-blur-md flex flex-wrap justify-center md:justify-between gap-6 py-4 px-8 w-full max-w-5xl md:rounded-t-xl border border-white/10">
        
        {/* Stat 1 */}
        <div className="flex items-center gap-3 min-w-[150px]">
          <Users size={24} className="text-cyan-400" />
          <div>
            <h3 className="text-lg font-bold leading-tight">500+</h3>
            <p className="text-xs text-gray-400">Happy Students</p>
          </div>
        </div>

        <div className="hidden md:block">
          <Separator variant="tertiary" orientation="vertical" className="h-10 border-white/20" />
        </div>

        {/* Stat 2 */}
        <div className="flex items-center gap-3 min-w-[150px]">
          <DoorOpen size={24} className="text-cyan-400" />
          <div>
            <h3 className="text-lg font-bold leading-tight">120+</h3>
            <p className="text-xs text-gray-400">Study Rooms</p>
          </div>
        </div>

        <div className="hidden md:block">
          <Separator variant="tertiary" orientation="vertical" className="h-10 border-white/20" />
        </div>

        {/* Stat 3 */}
        <div className="flex items-center gap-3 min-w-[150px]">
          <ShieldCheck size={24} className="text-cyan-400" />
          <div>
            <h3 className="text-lg font-bold leading-tight">Secure</h3>
            <p className="text-xs text-gray-400">& Reliable</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;
