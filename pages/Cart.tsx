
import React from 'react';
import { CartItem } from '../types';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onNavigateListing: () => void;
}

const Cart: React.FC<CartProps> = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  onNavigateListing
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping as per top banner
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="bg-rose-50 p-8 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-rose-200" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">Your Shopping Cart is Empty</h2>
        <p className="text-gray-500 max-w-md mb-10 italic">
          Ready to transform your walls? Browse our curated designs and add them to your cart.
        </p>
        <button 
          onClick={onNavigateListing}
          className="bg-rose-900 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-rose-800 transition-all flex items-center gap-2"
        >
          Browse Wallpapers <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col items-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4 tracking-wider">Your Shopping Cart</h1>
        <div className="flex items-center gap-4">
          <div className="w-12 h-px bg-rose-200"></div>
          <ShoppingBag className="w-4 h-4 text-rose-800" />
          <div className="w-12 h-px bg-rose-200"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-full sm:w-40 aspect-square rounded-2xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                      {item.collection} • {item.surface}
                    </p>
                  </div>
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="text-gray-300 hover:text-rose-800 transition-colors p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center border border-gray-100 rounded-full p-1 bg-gray-50/50">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all text-gray-600"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-gray-800">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all text-gray-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-rose-900 font-black text-xl">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">₹{item.price}/sq ft</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Summary Summary */}
        <div className="lg:col-span-1">
          <div className="bg-rose-50/30 border border-rose-100 rounded-[2.5rem] p-10 sticky top-40">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-8 tracking-tight">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="font-bold">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="text-sm font-medium">Shipping</span>
                <span className="text-green-600 font-bold uppercase text-xs tracking-widest">Free</span>
              </div>
              <div className="pt-4 border-t border-rose-200 flex justify-between items-end">
                <span className="text-gray-800 font-bold text-lg">Total Amount</span>
                <span className="text-rose-900 font-black text-3xl">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-rose-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:bg-rose-800 transition-all mb-6">
              Proceed to Checkout
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-rose-800 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> Secure Payment Guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
