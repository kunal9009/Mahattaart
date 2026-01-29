
import React from 'react';
import { MOCK_WALLPAPERS } from '../constants';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Wallpaper } from '../types';

interface WishlistProps {
  wishlistIds: Set<string>;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (item: Wallpaper) => void;
  onNavigateListing: () => void;
}

const Wishlist: React.FC<WishlistProps> = ({ 
  wishlistIds, 
  onToggleWishlist, 
  onAddToCart,
  onNavigateListing
}) => {
  const wishlistItems = MOCK_WALLPAPERS.filter(wp => wishlistIds.has(wp.id));

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="bg-rose-50 p-8 rounded-full mb-6">
          <Heart className="w-16 h-16 text-rose-200" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-500 max-w-md mb-10 italic">
          Start exploring our museum-grade collections and save your favorite designs for later.
        </p>
        <button 
          onClick={onNavigateListing}
          className="bg-rose-900 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-rose-800 transition-all flex items-center gap-2"
        >
          Explore Collection <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col items-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4 tracking-wider">Your Wishlist</h1>
        <div className="flex items-center gap-4">
          <div className="w-12 h-px bg-rose-200"></div>
          <Heart className="w-4 h-4 text-rose-800 fill-rose-800" />
          <div className="w-12 h-px bg-rose-200"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {wishlistItems.map((item) => (
          <div key={item.id} className="group flex flex-col bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="aspect-[4/5] overflow-hidden relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <button 
                onClick={() => onToggleWishlist(item.id)}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-full text-rose-800 shadow-md hover:bg-rose-800 hover:text-white transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-serif font-bold text-gray-800">{item.name}</h3>
                <span className="text-rose-900 font-black text-lg">₹{item.price}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-6">
                {item.collection} • {item.roomType}
              </p>
              <button 
                onClick={() => onAddToCart(item)}
                className="mt-auto w-full bg-rose-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-rose-800 transition-all shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
