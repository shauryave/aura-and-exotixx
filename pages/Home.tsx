
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
    <div className="space-y-24 md:space-y-32 pb-32 bg-black">
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={config.heroImageUrl} 
            alt="Hero" 
            className="w-full h-full object-cover opacity-60 grayscale scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black" />
          <div className="absolute inset-0 bg-purple-900/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-serif text-white mb-6 md:mb-8 leading-tight tracking-tight animate-in fade-in slide-in-from-top-10 duration-1000">
            {config.heroTitle}
          </h1>
          <p className="text-[10px] md:text-lg text-stone-400 uppercase tracking-[0.4em] md:tracking-[0.6em] mb-10 md:mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            {config.heroSubtitle}
          </p>
          <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-1000 delay-500">
            <Link 
              to="/catalog" 
              className="w-full sm:w-auto px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all active:scale-95 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            >
              Explore Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-12 md:mb-16 border-b border-white/5 pb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">Curated Originals</h2>
            <p className="text-stone-500 text-[9px] md:text-xs uppercase tracking-widest">Selected highlights from the noir series</p>
          </div>
          <Link to="/catalog" className="text-purple-400 hover:text-white text-[10px] uppercase font-bold tracking-[0.2em] transition-all flex items-center">
            View All Series <ChevronRight size={14} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {featured.map((product) => (
            <Link key={product.id} to="/catalog" className="group">
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-stone-900 rounded-xl">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all duration-700" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-purple-400 transition-colors tracking-tight">{product.name}</h3>
              <div className="flex justify-between items-center">
                <p className="text-stone-500 text-[9px] uppercase tracking-widest font-bold">{product.category}</p>
                <p className="text-green-400 font-mono font-bold tracking-tighter text-lg">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative py-24 md:py-32 overflow-hidden px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Star size={28} className="text-purple-500 mx-auto mb-8 opacity-50" />
          <h2 className="text-3xl md:text-6xl font-serif text-white italic leading-tight mb-10">
            "We don't just dress bodies; we drape auras in the finest shadows."
          </h2>
          <div className="h-px w-20 bg-stone-800 mx-auto mb-8" />
          <p className="text-[9px] text-stone-600 uppercase tracking-[0.4em] font-bold">The Exotic Noir Standards</p>
        </div>
      </section>
    </div>
  );
}
