import { Separator } from "@heroui/react";
import { CalendarDays, ShieldCheck, DoorOpen, Users, ArrowRight } from "lucide-react"; 

const Banner = () => {
  return (
    <div className="bg-[linear-gradient(rgba(15,23,42,0.45),rgba(15,23,42,0.65)),url('/assets/Banner.png')] bg-cover bg-center text-white flex justify-between flex-col items-center min-h-[550px] md:h-[600px] relative w-full pt-16">
      
      {/* Ambient Gradient Glow In Hero Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Area */}
      <div className="p-6 md:p-10 text-center flex justify-center flex-col items-center gap-5 flex-1 max-w-4xl relative z-10">
        
        {/* Main Heading with Gradient Accent */}
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight md:leading-none">
          Find Your Perfect <br className="hidden md:inline" /> 
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Study Room</span>
        </h1>

        {/* Description text */}
        <p className="text-base md:text-xl text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow-sm">
          Browse and book quiet, private study rooms in your library. <br className="hidden md:inline" /> 
          List your own room and earn.
        </p>

        {/* Feature Badges with Backdrop glass styling */}
        <div className="grid grid-cols-2 md:flex flex-wrap justify-center gap-3 md:gap-4 my-3 text-xs md:text-sm text-slate-100">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full"><CalendarDays size={16} className="text-cyan-400" /> Easy Booking</div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full"><ShieldCheck size={16} className="text-cyan-400" /> No Double Bookings</div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full"><DoorOpen size={16} className="text-cyan-400" /> Private Rooms</div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full"><Users size={16} className="text-cyan-400" /> Student Focused</div>
        </div>

        {/* Explore Button - Fully Matched with Register Button */}
        <div className="mt-2">
          <a 
            href="/rooms" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-cyan-500/20 group cursor-pointer"
          >
            Explore Rooms 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Bottom Info Bar / Stats Bar - High Tech Frosted Glass Design */}
      <div className="bg-white/10 backdrop-blur-xl flex flex-wrap justify-center md:justify-between gap-6 md:gap-4 py-5 px-8 w-full max-w-5xl md:rounded-t-2xl border-t md:border-x border-white/20 shadow-2xl relative z-10 mb-0">
        
        {/* Stat 1 */}
        <div className="flex items-center gap-3.5 min-w-[160px] justify-center md:justify-start">
          <div className="p-2 bg-white/10 rounded-xl border border-white/10 shadow-inner">
            <Users size={22} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold leading-none text-white">500+</h3>
            <p className="text-xs text-slate-300 mt-1">Happy Students</p>
          </div>
        </div>

        <div className="hidden md:block self-center">
          <Separator variant="tertiary" orientation="vertical" className="h-8 border-white/20" />
        </div>

        {/* Stat 2 */}
        <div className="flex items-center gap-3.5 min-w-[160px] justify-center md:justify-start">
          <div className="p-2 bg-white/10 rounded-xl border border-white/10 shadow-inner">
            <DoorOpen size={22} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold leading-none text-white">120+</h3>
            <p className="text-xs text-slate-300 mt-1">Study Rooms</p>
          </div>
        </div>

        <div className="hidden md:block self-center">
          <Separator variant="tertiary" orientation="vertical" className="h-8 border-white/20" />
        </div>

        {/* Stat 3 */}
        <div className="flex items-center gap-3.5 min-w-[160px] justify-center md:justify-start">
          <div className="p-2 bg-white/10 rounded-xl border border-white/10 shadow-inner">
            <ShieldCheck size={22} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold leading-none text-white">Secure</h3>
            <p className="text-xs text-slate-300 mt-1">& Reliable</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;
