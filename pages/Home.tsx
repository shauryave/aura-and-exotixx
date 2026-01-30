
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import { Product, SiteConfig } from '../types';

interface HomeProps {
  config: SiteConfig;
  products: Product[];
}

export default function Home({ config, products }: HomeProps) {
  const featured = products.filter(p => !p.isSoldOut).slice(0, 3);

  return (
    <div className="space-y-32 pb-32 bg-black">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={config.heroImageUrl} 
            alt="Hero" 
            className="w-full h-full object-cover opacity-60 grayscale scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black" />
          <div className="absolute inset-0 bg-purple-900/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-9xl font-serif text-white mb-8 leading-tight tracking-tight">
            {config.heroTitle}
          </h1>
          <p className="text-sm md:text-lg text-stone-400 uppercase tracking-[0.6em] mb-12 max-w-2xl mx-auto">
            {config.heroSubtitle}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <Link 
              to="/catalog" 
              className="group relative px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-purple-500 hover:text-white transition-all overflow-hidden"
            >
              <span className="relative z-10">Explore Catalog</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-white/5 pb-8">
          <div>
            <h2 className="text-4xl font-serif text-white mb-2">Curated Originals</h2>
            <p className="text-stone-500 text-xs uppercase tracking-widest">Selected highlights from the noir series</p>
          </div>
          <Link to="/catalog" className="mt-4 md:mt-0 text-purple-400 hover:text-white text-[10px] uppercase font-bold tracking-[0.2em] transition-all flex items-center">
            View All Series <ChevronRight size={16} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featured.map((product) => (
            <Link key={product.id} to="/catalog" className="group">
              <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-stone-900">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all duration-700" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-purple-400 transition-colors">{product.name}</h3>
              <div className="flex justify-between items-center">
                <p className="text-stone-500 text-[10px] uppercase tracking-widest">{product.category}</p>
                <p className="text-green-400 font-bold tracking-tighter">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Star size={32} className="text-purple-500 mx-auto mb-10 opacity-50" />
          <h2 className="text-4xl md:text-6xl font-serif text-white italic leading-tight mb-12">
            "We don't just dress bodies; we drape auras in the finest shadows."
          </h2>
          <div className="h-px w-24 bg-stone-800 mx-auto mb-8" />
          <p className="text-[10px] text-stone-600 uppercase tracking-[0.4em] font-bold">The Exotic Noir Standards</p>
        </div>
      </section>
    </div>
  );
}
