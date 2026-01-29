
export interface Wallpaper {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  roomType: string;
  collection: string;
  surface: 'Glossy' | 'Matte';
  mood: string;
  color: string;
}

export interface CartItem extends Wallpaper {
  quantity: number;
}

export interface Review {
  id: string;
  customerName: string;
  text: string;
  image: string;
}

export enum Page {
  Home = 'home',
  Listing = 'listing',
  Custom = 'custom',
  Wishlist = 'wishlist',
  Cart = 'cart'
}
