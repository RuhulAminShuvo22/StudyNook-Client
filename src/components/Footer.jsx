import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-600 px-6 md:px-16 pt-20 pb-10 border-t border-slate-200 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Branding Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-12 mb-12 border-b border-slate-200 gap-6">
          <div className="group">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent group-hover:from-cyan-600 group-hover:to-emerald-600 transition-all duration-500 cursor-pointer">
              StudySpace
            </h1>
            <p className="mt-3 max-w-md text-sm md:text-base text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
              Discover and reserve the ultimate quiet environment for your learning and deep focus sessions.
            </p>
          </div>

          {/* Newsletter Input Box */}
          <div className="w-full lg:max-w-md">
            <h3 className="text-slate-900 text-xs font-semibold uppercase tracking-widest mb-3">Stay Updated</h3>
            <div className="flex items-center bg-white border border-slate-300 rounded-lg p-1.5 focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-500/10 transition-all duration-300 shadow-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none flex-1 text-sm text-slate-900 px-3 w-full"
              />
              <button className="flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-medium text-xs px-4 py-2 rounded-md transition-all duration-300 group shadow-md cursor-pointer">
                Join <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Links & Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          
          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-slate-900 text-xs font-bold tracking-widest uppercase border-l-2 border-cyan-500 pl-3">
              Useful Links
            </h3>
            <ul className="space-y-3 text-sm">
              {['Home', 'Rooms', 'About Us'].map((link) => (
                <li key={link}>
                  <a 
                    href={`/${link.toLowerCase().replace(' ', '')}`}
                    className="hover:text-cyan-600 transition-all duration-300 flex items-center gap-1 group font-medium"
                  >
                    <span className="w-0 h-[1.5px] bg-cyan-500 group-hover:w-3 transition-all duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-4">
            <h3 className="text-slate-900 text-xs font-bold tracking-widest uppercase border-l-2 border-emerald-500 pl-3">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 group cursor-pointer hover:text-slate-900 transition-colors">
                <div className="p-2 bg-white border border-slate-200 rounded-md group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all shadow-sm">
                  <Mail size={16} className="text-slate-500 group-hover:text-emerald-600" />
                </div>
                <span className="font-medium">support@studyspace.com</span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer hover:text-slate-900 transition-colors">
                <div className="p-2 bg-white border border-slate-200 rounded-md group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all shadow-sm">
                  <Phone size={16} className="text-slate-500 group-hover:text-emerald-600" />
                </div>
                <span className="font-medium">+1 (555) 019-2834</span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer hover:text-slate-900 transition-colors">
                <div className="p-2 bg-white border border-slate-200 rounded-md group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all shadow-sm">
                  <MapPin size={16} className="text-slate-500 group-hover:text-emerald-600" />
                </div>
                <span className="font-medium">Central Library, Block C</span>
              </li>
            </ul>
          </div>

          {/* Social Icons Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-slate-900 text-xs font-bold tracking-widest uppercase border-l-2 border-cyan-500 pl-3">
              Connect With Us
            </h3>
            <p className="text-sm">Follow our social channels for updates and tips.</p>
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={18} />, color: 'hover:text-blue-600 hover:border-blue-500/30 hover:bg-blue-500/5', url: '#' },
                { icon: <Twitter size={18} />, color: 'hover:text-slate-900 hover:border-slate-400/30 hover:bg-slate-100', url: '#' }, 
                { icon: <Linkedin size={18} />, color: 'hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/5', url: '#' },
                { icon: <Instagram size={18} />, color: 'hover:text-pink-600 hover:border-pink-500/30 hover:bg-pink-500/5', url: '#' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  className={`p-2.5 bg-white border border-slate-200 rounded-lg text-slate-500 transition-all duration-300 hover:-translate-y-1 shadow-sm ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 mt-16 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-slate-400">
            © {currentYear} <span className="text-slate-600 font-semibold">StudySpace</span>. All rights reserved.
          </p>

          <div className="flex gap-6 text-slate-400">
            <a href="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
