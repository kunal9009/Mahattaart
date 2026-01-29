
import React, { useState, useEffect } from 'react';
import { Page, Wallpaper, CartItem } from './types';
import Home from './pages/Home';
import Listing from './pages/Listing';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedFilter, setSelectedFilter] = useState<{ type: string; value: string } | null>(null);
  
  // E-commerce State
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<CartItem[]>([]);

  // Auto-scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const navigateToListing = (type: string, value: string) => {
    setSelectedFilter({ type, value });
    setCurrentPage(Page.Listing);
  };

  const navigateToHome = () => {
    setSelectedFilter(null);
    setCurrentPage(Page.Home);
  };

  const toggleWishlist = (id: string) => {
    setWishlistIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addToCart = (wallpaper: Wallpaper) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === wallpaper.id);
      if (existing) {
        return prev.map(item => 
          item.id === wallpaper.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...wallpaper, quantity: 1 }];
    });
    // Optional: Switch to cart or show a toast
    setCurrentPage(Page.Cart);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home onNavigateListing={navigateToListing} />;
      case Page.Listing:
        return (
          <Listing 
            initialFilter={selectedFilter} 
            onToggleWishlist={toggleWishlist}
            wishlistIds={wishlistIds}
            onAddToCart={addToCart}
          />
        );
      case Page.Wishlist:
        return (
          <Wishlist 
            wishlistIds={wishlistIds} 
            onToggleWishlist={toggleWishlist}
            onAddToCart={addToCart}
            onNavigateListing={() => navigateToListing('all', 'all')}
          />
        );
      case Page.Cart:
        return (
          <Cart 
            items={cart} 
            onUpdateQuantity={updateCartQuantity} 
            onRemoveItem={removeFromCart}
            onNavigateListing={() => navigateToListing('all', 'all')}
          />
        );
      default:
        return <Home onNavigateListing={navigateToListing} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Promotional Discount Band */}
      <div className="bg-rose-900 text-white text-[9px] font-black uppercase tracking-[0.3em] py-1 px-4 text-center z-50 border-b border-rose-800 shadow-sm leading-none flex items-center justify-center gap-1 h-5">
        Get 10% off on your first wallpaper order! Use code: <span className="bg-white text-rose-900 px-1.5 rounded-[1px] ml-1 font-mono leading-none py-0.5">FIRST10</span>
      </div>

      <Header 
        onNavigateHome={navigateToHome} 
        onNavigateListing={() => navigateToListing('all', 'all')} 
        onNavigateWishlist={() => setCurrentPage(Page.Wishlist)}
        onNavigateCart={() => setCurrentPage(Page.Cart)}
        wishlistCount={wishlistIds.size}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
};

export default App;
