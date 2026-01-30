
import { Product, SiteConfig } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Silk Evening Gown',
    price: 299,
    description: 'A luxurious floor-length silk gown perfect for gala events.',
    sizes: ['XS', 'S', 'M', 'L'],
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800',
    isSoldOut: false,
    category: 'Evening'
  },
  {
    id: '2',
    name: 'Champagne Cocktail Dress',
    price: 189,
    description: 'Elegant shimmering dress for sophisticated evening parties.',
    sizes: ['S', 'M', 'L'],
    imageUrl: 'https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?q=80&w=800',
    isSoldOut: false,
    category: 'Cocktail'
  },
  {
    id: '3',
    name: 'Rose Quartz Summer Midi',
    price: 145,
    description: 'Lightweight linen blend in a soft rose hue.',
    sizes: ['S', 'M'],
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800',
    isSoldOut: true,
    category: 'Casual'
  },
  {
    id: '4',
    name: 'Emerald Velvet Wrap',
    price: 220,
    description: 'Stunning deep green velvet with a classic wrap silhouette.',
    sizes: ['M', 'L', 'XL'],
    imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=800',
    isSoldOut: false,
    category: 'Evening'
  }
];

export const INITIAL_CONFIG: SiteConfig = {
  heroTitle: 'Elegance Redefined',
  heroSubtitle: 'Discover the Aura of Exotic Fashion',
  heroImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000',
  bannerMessage: 'NEW SEASON COLLECTION IS HERE - 15% OFF YOUR FIRST ORDER!',
  showBanner: true,
  aboutText: 'Aura Exotixx represents the pinnacle of feminine grace and modern sophistication. We curate dresses that tell a story of confidence and timeless beauty.',
  contactEmail: 'shauryave1717@gmail.com',
  contactPhone: '9099090334',
  upiId: '9099090334@fam'
};
