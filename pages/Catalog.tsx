
import React, { useState } from 'react';
import { Product } from '../types';
import { Search, ShoppingBag, X, ChevronRight, Info } from 'lucide-react';

interface CatalogProps {
  products: Product[];
  addToCart: (product: Product, size: string) => void;
}

export default function Catalog({ products, addToCart }: CatalogProps) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
      <header className="mb-20 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 pt-8 tracking-tight italic">Noir Series</h1>
        <p className="text-stone-600 text-[10px] uppercase tracking-[0.5em] font-bold">Curation of the exotic</p>
      </header>

      {/* Enhanced Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 border-y border-white/5 py-10">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-10 py-3 text-[10px] tracking-[0.2em] uppercase transition-all rounded-sm border ${
                filter === cat 
                  ? 'bg-purple-600 text-white border-purple-600' 
                  : 'bg-transparent border-white/5 text-stone-600 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-700" size={16} />
          <input 
            type="text" 
            placeholder="ACCESS VAULT KEYWORD..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-stone-950 border border-white/5 rounded-sm text-[11px] tracking-widest text-white focus:outline-none focus:border-green-500/30 transition-all uppercase"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            onClick={() => setSelectedProduct(product)}
            className="group relative flex flex-col bg-stone-900/10 p-4 rounded-xl border border-transparent hover:border-white/5 hover:bg-stone-900/20 transition-all duration-700 cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-8 bg-stone-950 shadow-2xl">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className={`w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ${product.isSoldOut ? 'opacity-10 grayscale-100' : ''}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 w-[80%]">
                 <button 
                  onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                  className="w-full bg-white text-black py-4 text-[9px] tracking-[0.3em] uppercase font-bold flex items-center justify-center space-x-2 hover:bg-green-500 hover:text-white transition-all shadow-2xl rounded-sm"
                 >
                   <ShoppingBag size={12} />
                   <span>Quick Add</span>
                 </button>
              </div>
            </div>
            
            <div className="flex-grow space-y-4 text-center">
              <h3 className="font-serif text-2xl text-stone-300 group-hover:text-white transition-colors">{product.name}</h3>
              <div className="flex justify-between items-center px-2">
                <span className="text-stone-700 text-[9px] uppercase tracking-[0.2em] font-bold">{product.category}</span>
                <span className="text-green-500/80 font-mono text-sm font-bold tracking-tighter">${product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-6xl glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] border-white/5 shadow-[0_0_100px_rgba(0,0,0,1)]">
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-6 right-6 text-stone-500 hover:text-white z-20"
            >
              <X size={28} strokeWidth={1} />
            </button>
            
            <div className="w-full md:w-1/2 h-[40vh] md:h-auto bg-stone-950 overflow-hidden">
              <img src={selectedProduct.imageUrl} className="w-full h-full object-cover animate-in zoom-in duration-1000" alt="" />
            </div>
            
            <div className="flex-1 p-8 md:p-16 overflow-y-auto space-y-12">
              <div className="space-y-4">
                <p className="text-purple-500 text-[10px] uppercase tracking-[0.5em] font-bold">{selectedProduct.category} Collection</p>
                <h2 className="text-5xl md:text-7xl font-serif text-white italic">{selectedProduct.name}</h2>
                <p className="text-green-400 font-mono text-2xl font-bold tracking-tighter">${selectedProduct.price}</p>
              </div>
              
              <div className="space-y-6">
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500 border-b border-white/5 pb-2">Manifest Description</h4>
                <p className="text-stone-400 font-light leading-relaxed text-lg italic">"{selectedProduct.description}"</p>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500">Inventory Sizing</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProduct.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => handleSizeSelect(selectedProduct.id, size)}
                      className={`px-8 py-3 text-[10px] tracking-[0.2em] uppercase border transition-all rounded-sm ${
                        (selectedSizes[selectedProduct.id] || selectedProduct.sizes[0]) === size 
                          ? 'bg-white text-black border-white' 
                          : 'bg-transparent border-white/10 text-stone-500 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button 
                  onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }}
                  className="w-full bg-purple-600 text-white py-6 text-[11px] tracking-[0.4em] uppercase font-bold hover:bg-purple-700 transition-all flex items-center justify-center space-x-4 shadow-[0_0_50px_rgba(168,85,247,0.2)]"
                >
                  <ShoppingBag size={18} />
                  <span>Secure Acquisition</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-stone-700 font-serif italic text-2xl opacity-50">Empty Archive.</p>
        </div>
      )}
    </div>
  );
}
