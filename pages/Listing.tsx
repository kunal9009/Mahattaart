
import React, { useState, useMemo } from 'react';
import { MOCK_WALLPAPERS, CATEGORIES, SPACES, SUB_CATEGORIES } from '../constants';
import { Filter, ChevronDown, Heart, Plus, ChevronRight, ArrowLeft, X } from 'lucide-react';
import { Wallpaper } from '../types';

interface ListingProps {
  initialFilter: { type: string; value: string } | null;
  onToggleWishlist: (id: string) => void;
  wishlistIds: Set<string>;
  onAddToCart: (item: Wallpaper) => void;
}

const Listing: React.FC<ListingProps> = ({ 
  initialFilter, 
  onToggleWishlist, 
  wishlistIds,
  onAddToCart 
}) => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Relevance');
  const [activeFilters, setActiveFilters] = useState({
    category: initialFilter?.type === 'category' ? initialFilter.value : 'all',
    roomType: initialFilter?.type === 'roomType' ? initialFilter.value : 'all',
    mood: initialFilter?.type === 'mood' ? initialFilter.value : 'all',
    subCategory: 'all'
  });

  const categoryContext = useMemo(() => {
    if (activeFilters.category !== 'all') {
      return CATEGORIES.find(c => c.name === activeFilters.category);
    }
    return CATEGORIES[2];
  }, [activeFilters.category]);

  const subCategories = useMemo(() => {
    if (activeFilters.category !== 'all' && SUB_CATEGORIES[activeFilters.category]) {
      return SUB_CATEGORIES[activeFilters.category];
    }
    return ['Patterns', 'Abstract', 'Minimalist', 'Classic'];
  }, [activeFilters.category]);

  const filteredWallpapers = useMemo(() => {
    return MOCK_WALLPAPERS.filter(wp => {
      if (activeFilters.category !== 'all' && wp.category !== activeFilters.category) return false;
      if (activeFilters.roomType !== 'all' && wp.roomType !== activeFilters.roomType) return false;
      if (activeFilters.mood !== 'all' && wp.mood !== activeFilters.mood) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low → High') return a.price - b.price;
      if (sortBy === 'Price: High → Low') return b.price - a.price;
      return 0;
    });
  }, [activeFilters, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Reduced Landing Context Section */}
      <section className="relative h-[280px] md:h-[350px] w-full flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <img 
          src={categoryContext?.image} 
          alt="Context" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" 
        />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 tracking-tight">
            {activeFilters.category === 'all' ? 'Collection' : activeFilters.category}
          </h1>
          <p className="text-rose-100/70 text-sm md:text-base font-light italic mb-6">
            Curated artisan wall coverings for sophisticated interiors.
          </p>
          
          {/* Compressed Subcategory Navigation */}
          <div className="flex items-center justify-center gap-4 overflow-x-auto no-scrollbar py-2">
            <button 
              onClick={() => setActiveFilters(prev => ({ ...prev, subCategory: 'all' }))}
              className="flex-shrink-0"
            >
              <div className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all ${activeFilters.subCategory === 'all' ? 'bg-white text-rose-900 border-white' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}>
                All
              </div>
            </button>
            {subCategories.map(sub => (
              <button 
                key={sub}
                onClick={() => setActiveFilters(prev => ({ ...prev, subCategory: sub }))}
                className="flex-shrink-0"
              >
                <div className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all ${activeFilters.subCategory === sub ? 'bg-white text-rose-900 border-white' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}>
                  {sub}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tightened Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-gray-400">
          <button className="flex items-center gap-1 hover:text-rose-900 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
          <span className="w-px h-2 bg-gray-200"></span>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setActiveFilters(p => ({...p, category: 'all'}))} className="hover:text-rose-900">All</button>
            <ChevronRight className="w-2.5 h-2.5" />
            <button className="text-rose-900">{activeFilters.category}</button>
          </div>
        </div>
        <div className="text-[9px] font-bold text-gray-300 uppercase tracking-widest italic">
          {filteredWallpapers.length} Wallpapers
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col">
        {/* Optimized Filters Bar */}
        <div className="flex items-center justify-between mb-10">
          <button 
            onClick={() => setFilterDrawerOpen(true)}
            className="bg-rose-900 text-white px-6 py-3 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-rose-800 transition-all shadow-sm"
          >
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>

          <div className="relative group">
            <button className="flex items-center gap-6 px-4 py-3 border-b border-rose-900 text-[10px] font-black uppercase tracking-widest text-gray-800 bg-gray-50/30">
              Sort: {sortBy} <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div className="absolute top-full right-0 mt-0 bg-white border border-gray-50 shadow-xl z-40 w-56 hidden group-hover:block divide-y divide-gray-50">
              {['Relevance', 'Newest', 'Price: Low → High', 'Price: High → Low'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => setSortBy(opt)}
                  className="w-full text-left px-4 py-3 hover:bg-rose-50 text-[9px] font-bold uppercase tracking-widest text-gray-600 transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wallpaper Grid with Reduced Spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredWallpapers.map((wp) => (
            <div key={wp.id} className="group relative cursor-pointer flex flex-col">
              <div className="aspect-[3/4] rounded-[1.5rem] overflow-hidden bg-gray-50 mb-4 relative shadow-sm border border-gray-100">
                <img src={wp.image} alt={wp.name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 z-10">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(wp.id); }}
                    className={`bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-md transition-colors ${wishlistIds.has(wp.id) ? 'text-rose-800' : 'text-gray-400 hover:text-rose-800'}`}
                  >
                    <Heart className={`w-4 h-4 ${wishlistIds.has(wp.id) ? 'fill-rose-800' : ''}`} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToCart(wp); }}
                    className="bg-rose-900 text-white p-2 rounded-full shadow-md hover:bg-rose-800 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-0.5 px-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-gray-800 group-hover:text-rose-900 transition-colors truncate pr-4">{wp.name}</h3>
                  <p className="text-lg font-serif font-black text-rose-900">₹{wp.price}</p>
                </div>
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-gray-400 italic">
                  <span>{wp.collection}</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                  <span>{wp.surface}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Sidebar - Tighter Padding */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setFilterDrawerOpen(false)}></div>
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col p-8 overflow-y-auto animate-slide-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800">Refine</h2>
              <button onClick={() => setFilterDrawerOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-rose-900 mb-4 border-b border-rose-50 pb-1">Type</h3>
                <div className="flex flex-wrap gap-2">
                  {['Pattern', 'Concept', 'Mural', 'Textured'].map(t => (
                    <button key={t} className="px-3 py-1.5 rounded-full border border-gray-100 text-[10px] font-bold hover:border-rose-900 transition-all">{t}</button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-rose-900 mb-4 border-b border-rose-50 pb-1">Atmosphere</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Calm', 'Bold', 'Playful', 'Sophisticated'].map(m => (
                    <button 
                      key={m}
                      onClick={() => setActiveFilters(p => ({...p, mood: m}))} 
                      className={`px-3 py-2 rounded-lg border text-[9px] font-bold uppercase tracking-widest transition-all ${activeFilters.mood === m ? 'bg-rose-900 text-white border-rose-900' : 'border-gray-50 hover:border-rose-100'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setFilterDrawerOpen(false)}
              className="mt-12 w-full bg-rose-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-md hover:bg-rose-800 transition-all"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listing;
