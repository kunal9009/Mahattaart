
import React from 'react';
import { ChevronRight, Upload } from 'lucide-react';

interface HeroProps {
  onBrowse: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBrowse }) => {
  return (
    <section className="relative h-[65vh] min-h-[400px] w-full overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=1600"
        alt="Premium Wallpaper Hero"
        className="absolute inset-0 w-full h-full object-cover brightness-75 transition-transform duration-[10s] hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start text-white">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold max-w-2xl leading-tight mb-4">
          Premium Wallpapers <br/> for Modern Spaces
        </h1>
        <p className="text-base md:text-lg text-gray-200 max-w-lg mb-8 leading-relaxed font-light">
          Artisan designs, eco-friendly materials, and professional installation. Elevate your home with MahattaArt.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button 
            onClick={onBrowse}
            className="bg-white text-black px-7 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-gray-100 transition-all group shadow-lg"
          >
            Browse Designs
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-7 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
            <Upload className="w-3 h-3" />
            Upload Your Own
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
