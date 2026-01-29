
import React from 'react';
import { Wallpaper, Review } from './types';
import { Leaf, UserCheck, ShieldCheck, Award } from 'lucide-react';

export const CATEGORIES = [
  { name: 'Modern', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=600' },
  { name: 'Abstract & Geometric', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600' },
  { name: 'Scenic', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600' },
  { name: 'Kids', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600' },
  { name: 'Nature', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600' },
  { name: 'Abstract', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600' },
  { name: 'Classic & Vintage', image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=600' },
  { name: 'Middle Eastern', image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=600' },
  { name: 'East Asian', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600' },
  { name: 'Indian Heritage', image: 'https://images.unsplash.com/photo-1524492459426-14f99640bc9f?auto=format&fit=crop&q=80&w=600' },
  { name: 'Florals', image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=600' },
  { name: 'Art', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600' },
  { name: 'Animals', image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&q=80&w=600' },
  { name: 'Spiritual', image: 'https://images.unsplash.com/photo-1545062990-4a95e0e72752?auto=format&fit=crop&q=80&w=600' },
  { name: 'Textile', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=600' },
  { name: 'Cities & Maps', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=600' },
  { name: 'Photographic', image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=600' },
  { name: 'South East Asian', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=600' },
  { name: 'Silk Route', image: 'https://images.unsplash.com/photo-1512100356956-c1227c331f01?auto=format&fit=crop&q=80&w=600' },
];

export const SUB_CATEGORIES: Record<string, string[]> = {
  'Modern': ['Geometric', 'Minimalistic', 'Urban', 'Industrial'],
  'Florals': ['Vintage', 'Tropical', 'Botanical', 'Dainty'],
  'Abstract': ['Concept', 'Fluid', 'Textured', 'Gradient'],
};

export const SPACES = [
  { name: 'Living Room', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=400' },
  { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=400' },
  { name: 'Dining Room', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=400' },
  { name: 'Kids Room', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400' },
  { name: 'Bathroom', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=400' },
  { name: 'Pooja Room', image: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?auto=format&fit=crop&q=80&w=400' },
  { name: 'Home Offices / Studio', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400' },
  { name: 'Offices & Corporate', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=400' },
  { name: 'Restaurants, Cafés & Bars', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400' },
  { name: 'Hotels & Resorts', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400' },
  { name: 'Salons, Spas & Wellness', image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=400' },
];

export const MOODS = [
  { name: 'Calm', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800', description: 'Serene textures and soft palettes.' },
  { name: 'Bold', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800', description: 'High contrast and striking patterns.' },
  { name: 'Playful', image: 'https://images.unsplash.com/photo-1513694490325-24b3921b3dca?auto=format&fit=crop&q=80&w=800', description: 'Vibrant colors and imaginative designs.' },
];

export const PROMISES = [
  { name: 'Eco-friendly', icon: <Leaf className="w-8 h-8 text-rose-800" /> },
  { name: 'Professional installation', icon: <UserCheck className="w-8 h-8 text-rose-800" /> },
  { name: 'Scratch-resistant', icon: <ShieldCheck className="w-8 h-8 text-rose-800" /> },
  { name: '5-year warranty', icon: <Award className="w-8 h-8 text-rose-800" /> },
];

export const MOCK_WALLPAPERS: Wallpaper[] = [
  { id: '1', name: 'Black Beige Textured Horizontal', price: 75.65, image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600', category: 'Abstract', roomType: 'Home Offices / Studio', collection: 'Concept Design', surface: 'Matte', mood: 'Bold', color: 'Beige' },
  { id: '2', name: 'Distressed Vertical Texture Beige', price: 75.65, image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600', category: 'Abstract', roomType: 'Living Room', collection: 'Concept Design', surface: 'Matte', mood: 'Calm', color: 'Beige' },
  { id: '3', name: 'Abstract Fringed Vertical Blue', price: 75.65, image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=600', category: 'Modern', roomType: 'Bedroom', collection: 'Concept Design', surface: 'Glossy', mood: 'Bold', color: 'Blue' },
  { id: '4', name: 'Geometric Tribal Pattern Beige', price: 75.65, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=600', category: 'Classic & Vintage', roomType: 'Living Room', collection: 'Concept Design', surface: 'Matte', mood: 'Bold', color: 'Beige' },
  { id: '5', name: 'Abstract Geometric Kilim Grey', price: 75.65, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600', category: 'Modern', roomType: 'Living Room', collection: 'Concept Design', surface: 'Matte', mood: 'Sophisticated', color: 'Grey' },
  { id: '6', name: 'Geometric Pattern Teal Pink', price: 75.65, image: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?auto=format&fit=crop&q=80&w=600', category: 'Modern', roomType: 'Kids Room', collection: 'Pattern Design', surface: 'Glossy', mood: 'Playful', color: 'Pink' },
];

export const REVIEWS: Review[] = [
  { id: '1', customerName: 'Sarah Jenkins', text: 'Absolutely love my new bedroom mural. The installation was seamless and the colors are exactly as shown.', image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=600' },
  { id: '2', customerName: 'Michael Chen', text: 'The custom design process was so easy. Our office wall looks incredible now. Highly recommend MahattaArt!', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600' },
];
