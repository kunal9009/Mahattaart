
import React, { useRef } from 'react';
import { CATEGORIES, SPACES, MOODS, MOCK_WALLPAPERS, PROMISES, REVIEWS } from '../constants';
import { ArrowRight, ChevronLeft, ChevronRight, Upload, CheckCircle, Quote, Leaf, Award } from 'lucide-react';
import Hero from '../components/Hero';

interface HomeProps {
  onNavigateListing: (type: string, value: string) => void;
  onOpenNUR?: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateListing, onOpenNUR }) => {
  const trendingRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const spaceScrollRef = useRef<HTMLDivElement>(null);

  const scrollTrending = (direction: 'left' | 'right') => {
    if (trendingRef.current) {
      const { scrollLeft, clientWidth } = trendingRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      trendingRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const scrollNav = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - 300 : scrollLeft + 300;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero onBrowse={() => onNavigateListing('all', 'all')} onOpenNUR={onOpenNUR} />

      {/* Viewport Optimized: Category & Space Navigation */}
      <div className="bg-white">
        {/* Section 1 — Shop by Category */}
        <section className="pt-4 pb-2 max-w-7xl mx-auto px-6 w-full relative">
          <div className="flex flex-col items-center text-center mb-2">
            <h2 className="text-base md:text-lg font-serif font-bold text-gray-800 tracking-tight uppercase">Shop by Category</h2>
            <div className="w-8 h-0.5 bg-rose-200 mt-1"></div>
          </div>
          <div className="relative group/scroll">
            <button 
              onClick={() => scrollNav(categoryScrollRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-1.5 bg-white shadow-md rounded-full opacity-0 group-hover/scroll:opacity-100 transition-opacity hidden md:flex"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-rose-900" />
            </button>
            <div 
              ref={categoryScrollRef}
              className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
            >
              {CATEGORIES.map((cat) => (
                <div 
                  key={cat.name}
                  onClick={() => onNavigateListing('category', cat.name)}
                  className="flex-shrink-0 group cursor-pointer flex flex-col items-center gap-1.5 w-16 md:w-20"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-gray-100 shadow-sm group-hover:border-rose-900 group-hover:shadow-md transition-all duration-500">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <span className="text-gray-600 font-bold text-[7px] md:text-[8px] tracking-widest uppercase group-hover:text-rose-900 transition-colors text-center truncate w-full px-1">{cat.name}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => scrollNav(categoryScrollRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-1.5 bg-white shadow-md rounded-full opacity-0 group-hover/scroll:opacity-100 transition-opacity hidden md:flex"
            >
              <ChevronRight className="w-3.5 h-3.5 text-rose-900" />
            </button>
          </div>
        </section>

        {/* Section 2 — Shop by Space */}
        <section className="bg-rose-50/10 py-3 border-t border-rose-50/50 relative">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex flex-col items-center mb-3">
              <h2 className="text-base md:text-lg font-serif font-bold text-gray-800 tracking-tight uppercase">Shop by Space</h2>
              <div className="w-8 h-0.5 bg-rose-200 mt-1"></div>
            </div>
            <div className="relative group/scroll-space">
              <button 
                onClick={() => scrollNav(spaceScrollRef, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-1.5 bg-white shadow-md rounded-full opacity-0 group-hover/scroll-space:opacity-100 transition-opacity hidden md:flex"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-rose-900" />
              </button>
              <div 
                ref={spaceScrollRef}
                className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
              >
                {SPACES.map((space) => (
                  <div 
                    key={space.name}
                    onClick={() => onNavigateListing('roomType', space.name)}
                    className="flex-shrink-0 flex flex-col items-center gap-1.5 group cursor-pointer w-16 md:w-20"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-white shadow-sm group-hover:border-rose-900 group-hover:shadow-md transition-all duration-500">
                      <img src={space.image} alt={space.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <span className="font-bold text-gray-600 uppercase tracking-widest text-[7px] md:text-[8px] group-hover:text-rose-900 transition-colors text-center truncate w-full px-1">{space.name}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => scrollNav(spaceScrollRef, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-1.5 bg-white shadow-md rounded-full opacity-0 group-hover/scroll-space:opacity-100 transition-opacity hidden md:flex"
              >
                <ChevronRight className="w-3.5 h-3.5 text-rose-900" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Mood Discovery */}
      <section className="py-12 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">Mood Discovery</h2>
          <div className="w-16 h-1 bg-rose-200 mt-3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOODS.map((mood) => (
            <div 
              key={mood.name}
              onClick={() => onNavigateListing('mood', mood.name)}
              className="relative h-[400px] md:h-[500px] group overflow-hidden rounded-[1.5rem] cursor-pointer shadow-md"
            >
              <img src={mood.image} alt={mood.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="uppercase text-[10px] tracking-[0.3em] mb-2 block font-bold opacity-60">Visual Setting</span>
                <h3 className="text-3xl font-serif font-bold mb-2">{mood.name}</h3>
                <p className="text-xs text-gray-300 mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{mood.description}</p>
                <button className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  Explore <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending & Recommended */}
      <section className="bg-white py-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">Trending Designs</h2>
            <div className="w-16 h-1 bg-rose-200 mt-3 mb-6"></div>
            <div className="flex gap-2">
              <button onClick={() => scrollTrending('left')} className="p-3 border border-gray-100 rounded-full hover:bg-rose-50 transition-all"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={() => scrollTrending('right')} className="p-3 border border-gray-100 rounded-full hover:bg-rose-50 transition-all"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
          
          <div ref={trendingRef} className="flex gap-6 overflow-x-auto snap-x no-scrollbar pb-6">
            {MOCK_WALLPAPERS.map((wp) => (
              <div key={wp.id} className="min-w-[280px] snap-start group cursor-pointer flex flex-col">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 mb-3 relative shadow-sm">
                  <img src={wp.image} alt={wp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] font-bold text-rose-900 shadow-sm uppercase tracking-tighter">
                    Top Rated
                  </div>
                </div>
                <h3 className="font-bold text-base text-gray-800 tracking-tight">{wp.name}</h3>
                <p className="text-rose-900 font-bold mt-0.5 tracking-widest text-[10px] uppercase">Starts from ₹{wp.price}/sq ft</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Design Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-neutral-900 rounded-[2rem] overflow-hidden flex flex-col items-center shadow-xl">
          <div className="w-full p-8 lg:p-16 flex flex-col items-center text-center text-white">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">Your Design, Our Wallpaper.</h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-sm max-w-2xl font-light italic">
              Upload high-res images. We verify, scale, and print to your exact wall size.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-10 text-left">
              {[
                { title: 'Resolution Check', desc: 'Real-time blur verification.' },
                { title: 'Designer Review', desc: 'Expert layout refinement.' },
                { title: 'Intelligent Scaling', desc: 'Match your wall dimensions.' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-rose-900/30 p-2 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-rose-500" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{feature.title}</p>
                    <p className="text-[10px] text-gray-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <label className="bg-white text-rose-900 px-10 py-4 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer hover:bg-rose-50 transition-all w-full lg:w-fit shadow-lg text-[10px]">
              <Upload className="w-4 h-4" />
              Upload Design
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">How It Works</h2>
          <div className="w-16 h-1 bg-rose-200 mt-3"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: 1, title: 'Choose', desc: 'Pick from catalog or upload custom.' },
            { step: 2, title: 'Measure', desc: 'Enter dimensions or book expert help.' },
            { step: 3, title: 'Manufacture', desc: 'Eco-friendly printing, custom size.' },
            { step: 4, title: 'Install', desc: 'Professional, museum-grade finish.' },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-xl bg-rose-50 text-rose-900 flex items-center justify-center text-xl font-black mb-4 group-hover:bg-rose-900 group-hover:text-white transition-all shadow-sm">
                {item.step}
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light text-xs px-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Mahatta Art & Eco-Friendly Condensed */}
      <section className="py-16 bg-rose-50/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 justify-around">
            <div className="max-w-md text-center md:text-left">
               <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <Leaf className="w-8 h-8 text-green-700" />
                  <h2 className="text-2xl font-serif font-bold text-green-900">Eco-Friendly</h2>
               </div>
               <p className="text-green-800/70 text-sm font-light leading-relaxed">100% PVC-Free, non-toxic, and odor-free. Healthy walls for your family.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 flex-1">
              {PROMISES.map((promise) => (
                <div key={promise.name} className="flex flex-col items-center gap-3 group">
                  <div className="bg-white p-6 rounded-full group-hover:bg-rose-900 transition-colors shadow-sm">
                    {React.cloneElement(promise.icon as React.ReactElement, { className: "w-6 h-6 text-rose-900 group-hover:text-white" })}
                  </div>
                  <span className="font-bold text-gray-800 uppercase tracking-widest text-[8px] text-center">{promise.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 border-y border-rose-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">Testimonials</h2>
            <div className="w-16 h-1 bg-rose-200 mt-3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="flex gap-6 bg-white p-6 rounded-[1.5rem] shadow-sm border border-rose-50">
                <div className="w-1/3 aspect-[4/5] rounded-[1rem] overflow-hidden shrink-0">
                  <img src={rev.image} alt="Installation" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <Quote className="w-6 h-6 text-rose-200" />
                  <p className="italic text-gray-600 leading-relaxed text-sm font-light line-clamp-4">"{rev.text}"</p>
                  <span className="font-black text-rose-900 uppercase tracking-widest text-[9px] mt-2">— {rev.customerName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-rose-900 rounded-[2.5rem] py-16 px-8 text-center text-white flex flex-col items-center shadow-lg relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 relative z-10">Transform your home today.</h2>
          <p className="text-rose-100/70 mb-10 text-base font-light italic relative z-10">Join thousands of homeowners choosing curated artisan designs.</p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <button 
              onClick={() => onNavigateListing('all', 'all')}
              className="bg-white text-rose-900 px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-rose-50 transition-all text-[10px] shadow-md"
            >
              Shop Collection
            </button>
            <button className="bg-transparent border border-white/40 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white/10 transition-all text-[10px] backdrop-blur-sm">
              Upload Custom
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
