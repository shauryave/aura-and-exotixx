
import React, { useState } from 'react';
import { Product } from '../types';
import { Search, ShoppingBag } from 'lucide-react';

interface CatalogProps {
  products: Product[];
  addToCart: (product: Product, size: string) => void;
}

export default function Catalog({ products, addToCart }: CatalogProps) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    addToCart(product, size);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-black min-h-screen">
      <header className="mb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">The Catalog</h1>
        <p className="text-stone-500 text-xs uppercase tracking-[0.4em]">Explore our dark artisanal series</p>
      </header>

      {/* Enhanced Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 text-[9px] tracking-[0.2em] uppercase transition-all rounded-full border ${
                filter === cat 
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                  : 'bg-transparent border-white/10 text-stone-500 hover:text-white hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" size={16} />
          <input 
            type="text" 
            placeholder="Search our vaults..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-stone-900/50 border border-white/5 rounded-full text-xs text-white focus:outline-none focus:border-purple-500 transition-all"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group relative flex flex-col glass-card p-4 rounded-xl hover:border-purple-500/30 transition-all duration-500">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-6 bg-stone-900">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110 ${product.isSoldOut ? 'opacity-20' : ''}`}
              />
              
              {product.isSoldOut ? (
                <div className="absolute top-4 left-4 bg-red-900/80 backdrop-blur-md text-white text-[8px] tracking-[0.2em] uppercase px-3 py-1 font-bold rounded-sm">
                  Deactivated
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                   <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-white text-black px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-bold flex items-center space-x-2 hover:bg-purple-500 hover:text-white transition-colors rounded-full"
                   >
                     <ShoppingBag size={14} />
                     <span>Acquire Now</span>
                   </button>
                </div>
              )}
            </div>
            
            <div className="flex-grow space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-serif text-lg text-white group-hover:text-purple-400 transition-colors leading-tight">{product.name}</h3>
                <span className="text-green-400 font-bold text-sm tracking-tighter">${product.price}</span>
              </div>
              
              {!product.isSoldOut && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {product.sizes.map(size => (
                    <button 
                      key={size} 
                      onClick={() => handleSizeSelect(product.id, size)}
                      className={`text-[8px] px-3 py-1 border transition-all rounded-sm ${
                        (selectedSizes[product.id] || product.sizes[0]) === size 
                          ? 'border-purple-500 bg-purple-500 text-white' 
                          : 'border-white/10 text-stone-500 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-stone-600 font-serif italic text-xl">The vaults are empty for this query.</p>
        </div>
      )}
    </div>
  );
}
