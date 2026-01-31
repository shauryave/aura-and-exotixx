
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  sizes: string[];
  imageUrl: string;
  isSoldOut: boolean;
  category: string;
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export interface User {
  email: string;
  isAdmin: boolean;
}

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  bannerMessage: string;
  showBanner: boolean;
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  upiId: string;
}

export type Page = 'home' | 'catalog' | 'contact' | 'admin' | 'login' | 'payment';
