
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X, Sparkles, Heart, ShoppingCart, ChevronRight,
  Check, ArrowRight, MessageCircle, RotateCcw
} from 'lucide-react';
import { Wallpaper } from '../types';
import { MOCK_WALLPAPERS } from '../constants';

// ─── Types ────────────────────────────────────────────────────────────────────

type ConversationStep =
  | 'room'
  | 'pattern'
  | 'color'
  | 'mood'
  | 'loading'
  | 'suggestions'
  | 'done';

type MessageType =
  | 'text'
  | 'user-reply'
  | 'room-options'
  | 'pattern-options'
  | 'color-swatches'
  | 'mood-grid'
  | 'suggestions'
  | 'loading'
  | 'quick-actions';

interface ChatMessage {
  id: string;
  role: 'nur' | 'user';
  type: MessageType;
  text?: string;
  options?: { label: string; emoji?: string; description?: string; colorClass?: string }[];
  suggestions?: Wallpaper[];
}

interface UserPreferences {
  room: string;
  patterns: string[];
  colors: string[];
  mood: string;
}

export interface NURChatProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (wallpaper: Wallpaper) => void;
  onToggleWishlist: (id: string) => void;
  wishlistIds: Set<string>;
  onNavigateListing: (type: string, value: string) => void;
  onNavigateCart: () => void;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const ROOM_OPTIONS = [
  { label: 'Living Room', emoji: '🛋️' },
  { label: 'Bedroom', emoji: '🛏️' },
  { label: 'Office', emoji: '💼' },
  { label: 'Kids Room', emoji: '🎨' },
  { label: 'Dining Room', emoji: '🍽️' },
  { label: 'Others', emoji: '🏠' },
];

const PATTERN_OPTIONS = [
  { label: 'Floral', emoji: '🌸' },
  { label: 'Geometric', emoji: '⬡' },
  { label: 'Modern', emoji: '◈' },
  { label: 'Abstract', emoji: '〰' },
  { label: 'Classic', emoji: '✦' },
  { label: 'Scenic', emoji: '🌿' },
];

const COLOR_OPTIONS = [
  { name: 'Warm White', hex: '#F5F0E8', dark: false },
  { name: 'Beige', hex: '#C9B99A', dark: false },
  { name: 'Soft Grey', hex: '#9E9B97', dark: false },
  { name: 'Navy Blue', hex: '#1B3A5C', dark: true },
  { name: 'Forest Green', hex: '#2D6A4F', dark: true },
  { name: 'Blush Pink', hex: '#F4A0B0', dark: false },
  { name: 'Burgundy', hex: '#7C1034', dark: true },
  { name: 'Golden', hex: '#D4A017', dark: false },
  { name: 'Charcoal', hex: '#3D3D3D', dark: true },
  { name: 'Teal', hex: '#2D7D7D', dark: true },
];

const MOOD_OPTIONS = [
  { label: 'Calm', description: 'Serene & peaceful', colorClass: 'bg-sky-50 border-sky-200 text-sky-900' },
  { label: 'Bold', description: 'Striking & dramatic', colorClass: 'bg-red-50 border-red-200 text-red-900' },
  { label: 'Playful', description: 'Fun & vibrant', colorClass: 'bg-yellow-50 border-yellow-200 text-yellow-900' },
  { label: 'Luxury', description: 'Elegant & refined', colorClass: 'bg-purple-50 border-purple-200 text-purple-900' },
  { label: 'Rustic', description: 'Earthy & natural', colorClass: 'bg-amber-50 border-amber-200 text-amber-900' },
  { label: 'Sophisticated', description: 'Timeless & classic', colorClass: 'bg-rose-50 border-rose-200 text-rose-900' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 9);

const ROOM_TO_TYPE: Record<string, string> = {
  'Living Room': 'Living Room',
  'Bedroom': 'Bedroom',
  'Office': 'Home Offices / Studio',
  'Kids Room': 'Kids Room',
  'Dining Room': 'Dining Room',
  'Others': '',
};

const PATTERN_TO_CATEGORY: Record<string, string[]> = {
  'Floral': ['Florals'],
  'Geometric': ['Modern', 'Abstract & Geometric'],
  'Modern': ['Modern'],
  'Abstract': ['Abstract'],
  'Classic': ['Classic & Vintage'],
  'Scenic': ['Scenic', 'Nature'],
};

function getRecommendations(prefs: UserPreferences): Wallpaper[] {
  let results = [...MOCK_WALLPAPERS];

  const roomType = ROOM_TO_TYPE[prefs.room] || '';
  if (roomType) {
    const filtered = results.filter(w => w.roomType === roomType);
    if (filtered.length > 0) results = filtered;
  }

  if (prefs.patterns.length > 0) {
    const cats = prefs.patterns.flatMap(p => PATTERN_TO_CATEGORY[p] || []);
    if (cats.length > 0) {
      const filtered = results.filter(w => cats.some(c => w.category.includes(c)));
      if (filtered.length > 0) results = filtered;
    }
  }

  if (prefs.mood) {
    const filtered = results.filter(w => w.mood.toLowerCase() === prefs.mood.toLowerCase());
    if (filtered.length > 0) results = filtered;
  }

  if (prefs.colors.length > 0) {
    const colorKeywords = prefs.colors.map(c => c.toLowerCase().split(' ').pop() || '');
    const filtered = results.filter(w =>
      colorKeywords.some(kw => w.color.toLowerCase().includes(kw))
    );
    if (filtered.length > 0) results = filtered;
  }

  if (results.length < 2) results = MOCK_WALLPAPERS.slice(0, 3);
  return results.slice(0, 5);
}

async function getGeminiIntro(prefs: UserPreferences, wallpapers: Wallpaper[]): Promise<string> {
  const apiKey =
    (typeof process !== 'undefined' && (process.env as Record<string, string>).GEMINI_API_KEY) ||
    (typeof process !== 'undefined' && (process.env as Record<string, string>).API_KEY) ||
    '';

  if (!apiKey) return '';

  const prompt = `You are NUR, a friendly AI wallpaper design assistant for MahattaArt.
A customer wants wallpapers for their ${prefs.room}. They like ${prefs.patterns.join(', ') || 'various'} patterns, prefer ${prefs.colors.join(', ') || 'neutral'} colors, and want a ${prefs.mood || 'balanced'} feel.
I've curated these for them: ${wallpapers.map(w => w.name).join(', ')}.
Write ONE warm, enthusiastic sentence (max 20 words) explaining why these match perfectly. No markdown. Start with "I've curated..."`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 80, temperature: 0.7 },
        }),
      }
    );
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
  } catch {
    return '';
  }
}

// ─── NUR Avatar ───────────────────────────────────────────────────────────────

const NURAvatar: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'sm' }) => (
  <div className={`rounded-full bg-rose-900 flex items-center justify-center flex-shrink-0 shadow-sm ${size === 'sm' ? 'w-7 h-7' : 'w-9 h-9'}`}>
    <Sparkles className={size === 'sm' ? 'w-3.5 h-3.5 text-white' : 'w-4 h-4 text-white'} />
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const NURChat: React.FC<NURChatProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onNavigateListing,
  onNavigateCart,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState<ConversationStep>('room');
  const [prefs, setPrefs] = useState<UserPreferences>({ room: '', patterns: [], colors: [], mood: '' });
  const [pendingSelections, setPendingSelections] = useState<string[]>([]);
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const pushMsg = useCallback((msg: Omit<ChatMessage, 'id'>) => {
    setMessages(prev => [...prev, { ...msg, id: uid() }]);
  }, []);

  const startConversation = useCallback(() => {
    setMessages([]);
    setStep('room');
    setPrefs({ room: '', patterns: [], colors: [], mood: '' });
    setPendingSelections([]);
    setAddedToCart(new Set());

    setTimeout(() => {
      setMessages([{
        id: uid(), role: 'nur', type: 'text',
        text: "Hi! I'm NUR ✨ — your personal wallpaper design guide. Let's find the perfect wallpaper for your space.",
      }]);
    }, 300);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: uid(), role: 'nur', type: 'room-options',
        text: 'Which room are we designing today?',
        options: ROOM_OPTIONS,
      }]);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isOpen && !initialized.current) {
      initialized.current = true;
      startConversation();
    }
  }, [isOpen, startConversation]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleRoomSelect = (room: string) => {
    pushMsg({ role: 'user', type: 'user-reply', text: `${ROOM_OPTIONS.find(r => r.label === room)?.emoji} ${room}` });
    const newPrefs = { ...prefs, room };
    setPrefs(newPrefs);
    setStep('pattern');

    setTimeout(() => pushMsg({ role: 'nur', type: 'text', text: `Great choice! A ${room.toLowerCase()} sets the tone for the entire home. 🎨` }), 400);
    setTimeout(() => pushMsg({
      role: 'nur', type: 'pattern-options',
      text: 'What kind of patterns speak to you? Pick all that you like:',
      options: PATTERN_OPTIONS,
    }), 1000);
  };

  const handlePatternConfirm = () => {
    if (pendingSelections.length === 0) return;
    pushMsg({ role: 'user', type: 'user-reply', text: pendingSelections.map(p => PATTERN_OPTIONS.find(o => o.label === p)?.emoji + ' ' + p).join(', ') });
    setPrefs(prev => ({ ...prev, patterns: pendingSelections }));
    setPendingSelections([]);
    setStep('color');

    setTimeout(() => pushMsg({ role: 'nur', type: 'text', text: 'Excellent taste! Now let\'s talk color palette.' }), 400);
    setTimeout(() => pushMsg({
      role: 'nur', type: 'color-swatches',
      text: 'Which colors feel right for your space? Select all that appeal to you:',
    }), 1000);
  };

  const handleColorConfirm = () => {
    if (pendingSelections.length === 0) return;
    pushMsg({ role: 'user', type: 'user-reply', text: pendingSelections.join(', ') });
    setPrefs(prev => ({ ...prev, colors: pendingSelections }));
    setPendingSelections([]);
    setStep('mood');

    setTimeout(() => pushMsg({ role: 'nur', type: 'text', text: 'Beautiful palette! One last thing —' }), 400);
    setTimeout(() => pushMsg({
      role: 'nur', type: 'mood-grid',
      text: 'What mood do you want your room to evoke?',
      options: MOOD_OPTIONS,
    }), 1000);
  };

  const handleMoodSelect = async (mood: string) => {
    pushMsg({ role: 'user', type: 'user-reply', text: mood });
    const finalPrefs = { ...prefs, mood };
    setPrefs(finalPrefs);
    setStep('loading');

    setTimeout(() => pushMsg({ role: 'nur', type: 'loading', text: 'Curating your perfect wallpapers...' }), 400);

    const wallpapers = getRecommendations(finalPrefs);
    const geminiText = await getGeminiIntro(finalPrefs, wallpapers);

    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.type !== 'loading'));
      const intro = geminiText ||
        `I've curated ${wallpapers.length} wallpaper${wallpapers.length > 1 ? 's' : ''} that match your ${mood.toLowerCase()} ${finalPrefs.room.toLowerCase()} vision! ✨`;

      setMessages(prev => [...prev,
        { id: uid(), role: 'nur', type: 'text', text: intro },
        { id: uid(), role: 'nur', type: 'suggestions', suggestions: wallpapers },
        {
          id: uid(), role: 'nur', type: 'quick-actions',
          text: 'Love any of these? Or want me to refine the search?',
          options: [
            { label: 'Show different options' },
            { label: 'Explore all wallpapers' },
            { label: 'Start over' },
          ],
        },
      ]);
      setStep('suggestions');
    }, 2200);
  };

  const handleQuickAction = (action: string) => {
    pushMsg({ role: 'user', type: 'user-reply', text: action });

    if (action === 'Explore all wallpapers') {
      pushMsg({ role: 'nur', type: 'text', text: 'Taking you to our full collection! 🛍️' });
      setTimeout(() => { onNavigateListing('all', 'all'); onClose(); }, 800);
    } else if (action === 'Start over' || action === 'Design another room') {
      setTimeout(() => {
        initialized.current = false;
        startConversation();
      }, 400);
    } else if (action === 'View my cart') {
      pushMsg({ role: 'nur', type: 'text', text: 'Here\'s your cart. Happy designing! 🛒' });
      setTimeout(() => { onNavigateCart(); onClose(); }, 800);
    } else if (action === 'Browse collection') {
      setTimeout(() => { onNavigateListing('all', 'all'); onClose(); }, 600);
    } else {
      // Show different wallpapers
      const shuffled = [...MOCK_WALLPAPERS].sort(() => Math.random() - 0.5).slice(0, 3);
      pushMsg({ role: 'nur', type: 'text', text: 'Here are some fresh alternatives for you:' });
      setTimeout(() => pushMsg({ role: 'nur', type: 'suggestions', suggestions: shuffled }), 400);
    }
  };

  const handleCartAdd = (wallpaper: Wallpaper) => {
    onAddToCart(wallpaper);
    setAddedToCart(prev => new Set([...prev, wallpaper.id]));
    setTimeout(() => {
      setMessages(prev => [...prev,
        { id: uid(), role: 'nur', type: 'text', text: `"${wallpaper.name}" is in your cart! 🛒 Shall we keep designing?` },
        {
          id: uid(), role: 'nur', type: 'quick-actions', text: '',
          options: [
            { label: 'Design another room' },
            { label: 'View my cart' },
            { label: 'Browse collection' },
          ],
        },
      ]);
      setStep('done');
    }, 300);
  };

  const togglePending = (val: string) =>
    setPendingSelections(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);

  // ── Render a single message ──────────────────────────────────────────────────

  const renderMsg = (msg: ChatMessage) => {
    if (msg.role === 'user') {
      return (
        <div key={msg.id} className="flex justify-end mb-3">
          <div className="bg-rose-900 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[78%] text-sm leading-relaxed shadow-sm">
            {msg.text}
          </div>
        </div>
      );
    }

    return (
      <div key={msg.id} className="flex flex-col gap-2 mb-3">

        {/* Plain text / loading */}
        {(msg.type === 'text' || msg.type === 'loading') && (
          <div className="flex items-start gap-2">
            <NURAvatar />
            <div className="bg-white border border-rose-100 px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-[82%] shadow-sm">
              {msg.type === 'loading' ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{msg.text}</span>
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-800 leading-relaxed">{msg.text}</p>
              )}
            </div>
          </div>
        )}

        {/* Room selection */}
        {msg.type === 'room-options' && (
          <div className="flex items-start gap-2">
            <NURAvatar />
            <div className="flex-1 min-w-0">
              <div className="bg-white border border-rose-100 px-4 py-2.5 rounded-2xl rounded-tl-sm mb-2 shadow-sm">
                <p className="text-sm text-gray-800">{msg.text}</p>
              </div>
              {step === 'room' && (
                <div className="grid grid-cols-3 gap-1.5">
                  {ROOM_OPTIONS.map(opt => (
                    <button
                      key={opt.label}
                      onClick={() => handleRoomSelect(opt.label)}
                      className="bg-white border border-rose-100 rounded-xl py-2.5 px-1 text-center flex flex-col items-center gap-1 hover:bg-rose-900 hover:text-white hover:border-rose-900 transition-all group shadow-sm"
                    >
                      <span className="text-xl">{opt.emoji}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wide text-gray-600 group-hover:text-white leading-tight">{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pattern options – multi-select */}
        {msg.type === 'pattern-options' && (
          <div className="flex items-start gap-2">
            <NURAvatar />
            <div className="flex-1 min-w-0">
              <div className="bg-white border border-rose-100 px-4 py-2.5 rounded-2xl rounded-tl-sm mb-2 shadow-sm">
                <p className="text-sm text-gray-800">{msg.text}</p>
              </div>
              {step === 'pattern' && (
                <>
                  <div className="grid grid-cols-3 gap-1.5 mb-2">
                    {PATTERN_OPTIONS.map(opt => {
                      const selected = pendingSelections.includes(opt.label);
                      return (
                        <button
                          key={opt.label}
                          onClick={() => togglePending(opt.label)}
                          className={`border rounded-xl py-2.5 px-1 flex flex-col items-center gap-1 transition-all shadow-sm ${selected ? 'bg-rose-900 text-white border-rose-900' : 'bg-white text-gray-700 border-rose-100 hover:border-rose-400'}`}
                        >
                          <span className="text-lg">{opt.emoji}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wide leading-tight">{opt.label}</span>
                          {selected && <Check className="w-2.5 h-2.5" />}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={handlePatternConfirm}
                    disabled={pendingSelections.length === 0}
                    className="w-full bg-rose-900 text-white text-xs font-bold py-2.5 rounded-xl disabled:opacity-40 hover:bg-rose-800 transition-all flex items-center justify-center gap-1.5"
                  >
                    Confirm {pendingSelections.length > 0 ? `(${pendingSelections.length} selected)` : ''} <ChevronRight className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Color swatches */}
        {msg.type === 'color-swatches' && (
          <div className="flex items-start gap-2">
            <NURAvatar />
            <div className="flex-1 min-w-0">
              <div className="bg-white border border-rose-100 px-4 py-2.5 rounded-2xl rounded-tl-sm mb-2 shadow-sm">
                <p className="text-sm text-gray-800">{msg.text}</p>
              </div>
              {step === 'color' && (
                <>
                  <div className="flex flex-wrap gap-2 mb-2 p-3 bg-white border border-rose-100 rounded-2xl shadow-sm">
                    {COLOR_OPTIONS.map(col => {
                      const selected = pendingSelections.includes(col.name);
                      return (
                        <button
                          key={col.name}
                          onClick={() => togglePending(col.name)}
                          title={col.name}
                          className="relative w-9 h-9 rounded-full transition-all hover:scale-110 flex items-center justify-center shadow-sm"
                          style={{
                            backgroundColor: col.hex,
                            outline: selected ? '2.5px solid #881337' : '2px solid transparent',
                            outlineOffset: '2px',
                          }}
                        >
                          {selected && (
                            <Check
                              className="w-3 h-3"
                              style={{ color: col.dark ? 'white' : '#881337' }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {pendingSelections.length > 0 && (
                    <p className="text-[10px] text-gray-500 mb-1.5 px-1">Selected: {pendingSelections.join(', ')}</p>
                  )}
                  <button
                    onClick={handleColorConfirm}
                    disabled={pendingSelections.length === 0}
                    className="w-full bg-rose-900 text-white text-xs font-bold py-2.5 rounded-xl disabled:opacity-40 hover:bg-rose-800 transition-all flex items-center justify-center gap-1.5"
                  >
                    Next <ChevronRight className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Mood grid */}
        {msg.type === 'mood-grid' && (
          <div className="flex items-start gap-2">
            <NURAvatar />
            <div className="flex-1 min-w-0">
              <div className="bg-white border border-rose-100 px-4 py-2.5 rounded-2xl rounded-tl-sm mb-2 shadow-sm">
                <p className="text-sm text-gray-800">{msg.text}</p>
              </div>
              {step === 'mood' && (
                <div className="grid grid-cols-2 gap-1.5">
                  {MOOD_OPTIONS.map(mood => (
                    <button
                      key={mood.label}
                      onClick={() => handleMoodSelect(mood.label)}
                      className={`border rounded-xl px-3 py-2.5 text-left transition-all hover:shadow-md ${mood.colorClass}`}
                    >
                      <p className="font-bold text-xs">{mood.label}</p>
                      <p className="text-[9px] opacity-70 mt-0.5 leading-tight">{mood.description}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Wallpaper suggestions */}
        {msg.type === 'suggestions' && msg.suggestions && (
          <div className="pl-9 space-y-3">
            {msg.suggestions.map(wp => (
              <div key={wp.id} className="bg-white border border-rose-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={wp.image}
                    alt={wp.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => onToggleWishlist(wp.id)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all backdrop-blur-sm ${wishlistIds.has(wp.id) ? 'bg-rose-900 text-white' : 'bg-white/90 text-gray-500 hover:text-rose-900'}`}
                    >
                      <Heart className="w-3.5 h-3.5" fill={wishlistIds.has(wp.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
                    <div className="flex gap-1">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide">{wp.surface}</span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide">{wp.mood}</span>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-gray-800 text-[11px] leading-tight mb-0.5">{wp.name}</h4>
                  <p className="text-[10px] text-gray-400 mb-2.5">{wp.collection} · {wp.category}</p>
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-rose-900 font-black text-[11px]">₹{wp.price}<span className="font-normal text-gray-400">/sq ft</span></p>
                    </div>
                    <button
                      onClick={() => handleCartAdd(wp)}
                      disabled={addedToCart.has(wp.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${addedToCart.has(wp.id) ? 'bg-green-100 text-green-700 cursor-default' : 'bg-rose-900 text-white hover:bg-rose-800 active:scale-95'}`}
                    >
                      {addedToCart.has(wp.id) ? (
                        <><Check className="w-3 h-3" /> Added!</>
                      ) : (
                        <><ShoppingCart className="w-3 h-3" /> Add to Cart</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick action buttons */}
        {msg.type === 'quick-actions' && (
          <div className="pl-9">
            {msg.text && (
              <div className="bg-white border border-rose-100 px-4 py-2.5 rounded-2xl rounded-tl-sm mb-2 shadow-sm">
                <p className="text-sm text-gray-800">{msg.text}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-1.5">
              {msg.options?.map(opt => (
                <button
                  key={opt.label}
                  onClick={() => handleQuickAction(opt.label)}
                  className="border border-rose-200 bg-white text-gray-700 rounded-full px-3 py-1.5 text-[11px] font-semibold hover:bg-rose-900 hover:text-white hover:border-rose-900 transition-all shadow-sm"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-end pointer-events-none sm:p-6">
      {/* Backdrop on mobile */}
      <div
        className="absolute inset-0 bg-black/30 sm:hidden pointer-events-auto"
        onClick={onClose}
      />

      {/* Chat Panel */}
      <div
        className="relative w-full sm:w-[390px] h-[90vh] sm:h-[600px] bg-white sm:rounded-[1.5rem] shadow-2xl flex flex-col pointer-events-auto border border-rose-100 overflow-hidden"
        style={{ animation: 'nurSlideUp 0.32s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Header */}
        <div className="bg-rose-900 px-4 py-3.5 flex items-center gap-3 flex-shrink-0">
          <NURAvatar size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-sm tracking-wide font-serif">NUR</h3>
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            </div>
            <p className="text-rose-200 text-[10px] uppercase tracking-widest">AI Wallpaper Guide</p>
          </div>
          <button
            onClick={() => { initialized.current = false; startConversation(); }}
            title="Start over"
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white mr-1"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step indicator */}
        {step !== 'done' && step !== 'loading' && step !== 'suggestions' && (
          <div className="flex gap-1 px-4 py-2 bg-rose-50/50 border-b border-rose-50 flex-shrink-0">
            {(['room', 'pattern', 'color', 'mood'] as const).map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  ['room', 'pattern', 'color', 'mood'].indexOf(step) >= i ? 'bg-rose-900' : 'bg-rose-100'
                }`}
              />
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 bg-gray-50/20">
          {messages.map(renderMsg)}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-rose-50 bg-white flex-shrink-0 flex items-center justify-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-rose-300" />
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Powered by NUR AI · MahattaArt</p>
        </div>
      </div>
    </div>
  );
};

// ─── Floating Trigger Button ───────────────────────────────────────────────────

export const NURFloatingButton: React.FC<{ onClick: () => void; hasUnread?: boolean }> = ({ onClick, hasUnread }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 bg-rose-900 text-white rounded-full shadow-2xl hover:shadow-rose-900/40 hover:bg-rose-800 transition-all duration-300 active:scale-95"
    style={{ padding: '12px 20px 12px 16px' }}
  >
    {hasUnread && (
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
    )}
    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
      <Sparkles className="w-4 h-4 text-white" />
    </div>
    <div className="text-left">
      <p className="text-xs font-black tracking-wide leading-none">Design with NUR</p>
      <p className="text-[9px] text-rose-200 leading-none mt-0.5">AI Wallpaper Guide</p>
    </div>
    <ArrowRight className="w-3.5 h-3.5 text-rose-200 group-hover:translate-x-0.5 transition-transform" />
  </button>
);

export default NURChat;
