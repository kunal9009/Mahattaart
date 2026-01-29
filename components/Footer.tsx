
import React from 'react';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Youtube, Linkedin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#333333] text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Condensed Newsletter & Contact Bar */}
        <div className="py-10 border-b border-gray-600 flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="md:w-1/4 space-y-4">
            <div className="flex flex-col">
              <input 
                type="email" 
                placeholder="Email for news..." 
                className="bg-white text-gray-900 px-4 py-2 text-sm border-none w-full focus:ring-2 focus:ring-rose-800 outline-none"
              />
              <button className="bg-rose-900 text-white py-2 font-bold uppercase text-[9px] tracking-widest hover:bg-rose-800 transition-all mt-1">
                Subscribe
              </button>
            </div>
            <div className="flex gap-3">
              <button className="hover:text-rose-400 transition-colors"><Facebook className="w-3.5 h-3.5" /></button>
              <button className="hover:text-rose-400 transition-colors"><Linkedin className="w-3.5 h-3.5" /></button>
              <button className="hover:text-rose-400 transition-colors"><Twitter className="w-3.5 h-3.5" /></button>
              <button className="hover:text-rose-400 transition-colors"><Instagram className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:flex-1">
            <div className="space-y-3">
              <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] border-b border-gray-700 pb-1">MahattaArt</h4>
              <ul className="space-y-1.5 text-[10px] font-medium text-gray-400">
                <li><button className="hover:text-white transition-colors">About Us</button></li>
                <li><button className="hover:text-white transition-colors">Partners</button></li>
                <li><button className="hover:text-white transition-colors">Career</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] border-b border-gray-700 pb-1">Help</h4>
              <ul className="space-y-1.5 text-[10px] font-medium text-gray-400">
                <li><button className="hover:text-white transition-colors">FAQ's</button></li>
                <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors">Contact-Us</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] border-b border-gray-700 pb-1">Retail</h4>
              <ul className="space-y-1.5 text-[10px] font-medium text-gray-400">
                <li><span className="cursor-default">Noida</span></li>
                <li><span className="cursor-default">Faridabad</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compressed Bottom Contact Info Bar */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold text-gray-300">info@mahattaart.com</p>
          </div>
          <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">
            @2024 Mahatta Art Design. All right reserved.
          </div>
        </div>
      </div>

      {/* Floating Buttons - Optimized Position */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-8 h-8 bg-gray-800 text-white rounded flex items-center justify-center hover:bg-gray-700 transition-all opacity-70 hover:opacity-100"
        >
          <ArrowRight className="w-3.5 h-3.5 -rotate-90" />
        </button>
        <button className="w-12 h-12 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
          <Phone className="w-5 h-5" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
