
import React, { useState, useRef } from 'react';
import { Product, SiteConfig } from '../types';
// Added Image as ImageIcon and DollarSign to the imports to fix missing name errors
import { Plus, Trash2, Edit2, X, Check, Upload, Layout, Camera, Smartphone, Mail, Type, ToggleRight, FileText, Image as ImageIcon, DollarSign } from 'lucide-react';

interface AdminProps {
  products: Product[];
  config: SiteConfig;
  onUpdateProducts: (products: Product[]) => void;
  onUpdateConfig: (config: SiteConfig) => void;
}

export default function Admin({ products, config, onUpdateProducts, onUpdateConfig }: AdminProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'site'>('products');
  
  const [productImageBase64, setProductImageBase64] = useState<string | null>(null);
  const [heroImageBase64, setHeroImageBase64] = useState<string | null>(null);
  const productFileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const finalImageUrl = productImageBase64 || (formData.get('imageUrl') as string);

    const newProduct: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      imageUrl: finalImageUrl,
      isSoldOut: formData.get('isSoldOut') === 'on',
      sizes: (formData.get('sizes') as string).split(',').map(s => s.trim()).filter(Boolean),
    };

    if (editingProduct) {
      onUpdateProducts(products.map(p => p.id === editingProduct.id ? newProduct : p));
    } else {
      onUpdateProducts([...products, newProduct]);
    }
    setEditingProduct(null);
    setIsAdding(false);
    setProductImageBase64(null);
  };

  const handleUpdateConfig = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const finalHeroUrl = heroImageBase64 || (formData.get('heroImageUrl') as string);

    const newConfig: SiteConfig = {
      ...config,
      heroTitle: formData.get('heroTitle') as string,
      heroSubtitle: formData.get('heroSubtitle') as string,
      heroImageUrl: finalHeroUrl,
      bannerMessage: formData.get('bannerMessage') as string,
      showBanner: formData.get('showBanner') === 'on',
      aboutText: formData.get('aboutText') as string,
      contactEmail: formData.get('contactEmail') as string,
      contactPhone: formData.get('contactPhone') as string,
      upiId: formData.get('upiId') as string,
    };
    onUpdateConfig(newConfig);
    alert('Synchronized: Global parameters have been updated across the network.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 bg-black min-h-screen selection:bg-purple-900 selection:text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 border-b border-white/5 pb-12">
        <div>
          <h1 className="text-5xl md:text-7xl font-serif text-white italic tracking-tighter">Authority Console</h1>
          <p className="text-purple-500 text-[10px] uppercase tracking-[0.6em] mt-4 font-bold">Network Core Synchronization</p>
        </div>
        <div className="flex bg-stone-900/40 p-1.5 rounded-full border border-white/10 backdrop-blur-2xl">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-10 py-3.5 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full transition-all duration-500 ${activeTab === 'products' ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'text-stone-500 hover:text-white'}`}
          >
            Inventory Management
          </button>
          <button 
            onClick={() => setActiveTab('site')}
            className={`px-10 py-3.5 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full transition-all duration-500 ${activeTab === 'site' ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'text-stone-500 hover:text-white'}`}
          >
            Manifest Configuration
          </button>
        </div>
      </div>

      {activeTab === 'products' ? (
        <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-serif text-stone-400 italic">Registry Entries</h2>
            <button 
              onClick={() => { setIsAdding(true); setEditingProduct(null); setProductImageBase64(null); }}
              className="flex items-center space-x-3 bg-purple-600 text-white px-10 py-5 text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-purple-700 hover:scale-105 transition-all rounded-sm shadow-[0_0_40px_rgba(168,85,247,0.3)]"
            >
              <Plus size={18} />
              <span>Add Entry</span>
            </button>
          </div>

          {(isAdding || editingProduct) && (
            <div className="glass-card p-10 md:p-20 rounded-3xl animate-in slide-in-from-top-6 border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-16 border-b border-white/5 pb-10">
                <h3 className="text-4xl font-serif text-white italic">{editingProduct ? 'Modify Archive' : 'Initiate New Registration'}</h3>
                <button onClick={() => { setIsAdding(false); setEditingProduct(null); setProductImageBase64(null); }} className="text-stone-500 hover:text-white transition-all transform hover:rotate-90">
                  <X size={36} strokeWidth={1} />
                </button>
              </div>
              
              <form onSubmit={handleSaveProduct} className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <label className="text-[11px] uppercase tracking-[0.4em] font-bold text-stone-500 flex items-center">
                       <ImageIcon className="mr-3 text-purple-500" size={16} /> Production Visuals
                    </label>
                    <div className="relative group">
                      <div 
                        onClick={() => productFileInputRef.current?.click()}
                        className="w-full aspect-[4/5] bg-stone-950 border border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer group-hover:border-purple-500/50 transition-all duration-700 overflow-hidden relative shadow-inner"
                      >
                        {productImageBase64 || editingProduct?.imageUrl ? (
                          <>
                            <img src={productImageBase64 || editingProduct?.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="" />
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-500 backdrop-blur-sm">
                              <Camera className="text-white mb-4 animate-bounce" size={40} strokeWidth={1} />
                              <span className="text-[11px] uppercase tracking-[0.3em] text-white font-bold">Replace Manifest Image</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-stone-900/50 p-8 rounded-full mb-6 border border-white/5">
                              <Upload className="text-stone-700 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-500" size={48} strokeWidth={1} />
                            </div>
                            <p className="text-stone-600 text-[10px] tracking-[0.3em] uppercase font-bold text-center px-12 leading-relaxed">Drop or Click to Upload Production Grade Media</p>
                          </>
                        )}
                      </div>
                      <input type="file" ref={productFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setProductImageBase64)} />
                      <div className="mt-8 flex items-center space-x-4">
                        <input name="imageUrl" defaultValue={productImageBase64 ? "" : editingProduct?.imageUrl} placeholder="EXTERNAL SOURCE LINK (OVERRIDE)..." className="w-full bg-stone-950 border-b border-white/5 py-4 text-[10px] tracking-[0.3em] text-stone-600 focus:outline-none focus:border-purple-500 uppercase transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-3">
                    <label className="text-[11px] uppercase tracking-[0.4em] font-bold text-stone-500 flex items-center">
                      <Type className="mr-3 text-purple-500" size={16} /> Identification
                    </label>
                    <input name="name" defaultValue={editingProduct?.name} required placeholder="DESIGNATION NAME" className="w-full bg-stone-900/20 border-b border-white/10 p-5 text-2xl text-white font-serif italic focus:outline-none focus:border-purple-500 transition-colors uppercase" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[11px] uppercase tracking-[0.4em] font-bold text-stone-500 flex items-center">
                        <DollarSign className="mr-3 text-purple-500" size={16} /> Valuation ($)
                      </label>
                      <input name="price" type="number" defaultValue={editingProduct?.price} required className="w-full bg-stone-900/20 border-b border-white/10 p-5 text-green-500 font-mono text-2xl focus:outline-none focus:border-green-500 transition-colors" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] uppercase tracking-[0.4em] font-bold text-stone-500 flex items-center">
                        <Layout className="mr-3 text-purple-500" size={16} /> Collection
                      </label>
                      <input name="category" defaultValue={editingProduct?.category} required className="w-full bg-stone-900/20 border-b border-white/10 p-5 text-stone-400 text-xs focus:outline-none focus:border-purple-500 uppercase tracking-[0.3em] transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[11px] uppercase tracking-[0.4em] font-bold text-stone-500 flex items-center">
                      <ToggleRight className="mr-3 text-purple-500" size={16} /> Availability Matrix
                    </label>
                    <input name="sizes" defaultValue={editingProduct?.sizes.join(', ')} placeholder="DIMENSIONS: XS, S, M, L..." required className="w-full bg-stone-900/20 border-b border-white/10 p-5 text-[11px] text-stone-500 focus:outline-none focus:border-purple-500 tracking-[0.4em] font-bold transition-colors uppercase" />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[11px] uppercase tracking-[0.4em] font-bold text-stone-500 flex items-center">
                      <FileText className="mr-3 text-purple-500" size={16} /> Product Manifest (Narrative)
                    </label>
                    <textarea name="description" rows={5} defaultValue={editingProduct?.description} required className="w-full bg-stone-900/20 border border-white/5 p-6 text-sm text-stone-400 focus:outline-none focus:border-purple-500 rounded-xl font-light leading-relaxed italic transition-colors" />
                  </div>

                  <div className="flex items-center space-x-5 py-6 group cursor-pointer" onClick={() => {
                    const cb = document.getElementById('isSoldOut') as HTMLInputElement;
                    if (cb) cb.checked = !cb.checked;
                  }}>
                    <input type="checkbox" name="isSoldOut" defaultChecked={editingProduct?.isSoldOut} className="w-8 h-8 accent-red-600 rounded bg-stone-950 border-white/10 cursor-pointer" id="isSoldOut" />
                    <label htmlFor="isSoldOut" className="text-[11px] uppercase tracking-[0.4em] font-bold text-red-500/80 cursor-pointer group-hover:text-red-500 transition-colors">De-Authorize Visibility / Sold Out</label>
                  </div>
                  
                  <button type="submit" className="w-full bg-white text-black py-7 text-[12px] tracking-[0.6em] uppercase font-bold hover:bg-green-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-sm">
                    Finalize Synchronization
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            {products.map(product => (
              <div key={product.id} className="glass-card flex flex-col md:flex-row items-center p-8 rounded-3xl border-white/5 group hover:border-white/20 transition-all duration-500 bg-stone-900/10">
                <div className="relative w-28 h-40 bg-stone-950 rounded-xl overflow-hidden shadow-2xl shrink-0">
                   <img src={product.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-110" alt="" />
                </div>
                <div className="mt-8 md:mt-0 md:ml-12 flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-serif text-white tracking-tight">{product.name}</h3>
                  <div className="flex flex-col md:flex-row items-center md:space-x-8 mt-3 space-y-2 md:space-y-0">
                    <span className="text-[10px] text-stone-500 uppercase tracking-[0.3em] font-bold border-r border-white/10 pr-8 hidden md:inline">{product.category}</span>
                    <span className="text-green-500/80 font-mono text-lg font-bold tracking-tighter">${product.price}</span>
                  </div>
                </div>
                <div className="my-8 md:my-0 flex items-center px-12 border-x border-white/5">
                   {product.isSoldOut ? (
                    <span className="px-6 py-2 bg-red-900/10 text-red-500 text-[9px] uppercase tracking-[0.4em] font-bold rounded-full border border-red-500/20">Deactivated</span>
                  ) : (
                    <span className="px-6 py-2 bg-green-900/10 text-green-500 text-[9px] uppercase tracking-[0.4em] font-bold rounded-full border border-green-500/20">Authorized</span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => { setEditingProduct(product); setIsAdding(false); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="p-5 text-stone-500 hover:text-purple-400 hover:bg-white/5 rounded-full transition-all"><Edit2 size={22} /></button>
                  <button onClick={() => { if(confirm('Purge this asset from the registry?')) onUpdateProducts(products.filter(p => p.id !== product.id)); }} className="p-5 text-stone-500 hover:text-red-500 hover:bg-white/5 rounded-full transition-all"><Trash2 size={22} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-card p-12 md:p-24 rounded-[3rem] border-white/5 shadow-2xl animate-in fade-in duration-1000">
          <div className="flex items-center space-x-6 mb-20 border-b border-white/5 pb-12">
             <div className="p-5 bg-purple-600/10 rounded-3xl border border-purple-500/20">
               <Layout className="text-purple-500" size={40} strokeWidth={1} />
             </div>
             <div>
               <h2 className="text-5xl font-serif text-white italic tracking-tight">Global Manifest</h2>
               <p className="text-stone-500 text-[10px] uppercase tracking-[0.4em] font-bold mt-2">Adjusting Public Perception</p>
             </div>
          </div>

          <form onSubmit={handleUpdateConfig} className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-16">
              <div className="space-y-8">
                <h3 className="text-[12px] uppercase tracking-[0.5em] font-bold text-white border-l-2 border-purple-500 pl-6 flex items-center">
                  <FileText className="mr-3" size={16} /> Home Presence & Hero
                </h3>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600">Primary Headline</label>
                  <input name="heroTitle" defaultValue={config.heroTitle} className="w-full bg-stone-950 border border-white/5 p-6 text-2xl text-white font-serif focus:outline-none focus:border-purple-500/50 rounded-sm transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600">Sub-Manifest Descriptor</label>
                  <input name="heroSubtitle" defaultValue={config.heroSubtitle} className="w-full bg-stone-950 border border-white/5 p-6 text-sm text-stone-400 focus:outline-none focus:border-purple-500/50 rounded-sm transition-all" />
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-[12px] uppercase tracking-[0.5em] font-bold text-white border-l-2 border-purple-500 pl-6 flex items-center">
                  <ImageIcon className="mr-3" size={16} /> Identity Background
                </h3>
                <div className="relative group">
                  <div 
                    onClick={() => heroFileInputRef.current?.click()}
                    className="w-full h-56 bg-stone-950 border border-white/5 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/30 transition-all duration-700 overflow-hidden relative shadow-inner"
                  >
                    <img src={heroImageBase64 || config.heroImageUrl} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000" alt="" />
                    <div className="relative z-10 flex flex-col items-center">
                      <Camera className="text-stone-600 mb-4 animate-pulse" size={32} strokeWidth={1} />
                      <span className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold group-hover:text-white transition-colors">Replace Master Visual</span>
                    </div>
                  </div>
                </div>
                <input type="file" ref={heroFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setHeroImageBase64)} />
                <div className="space-y-3">
                   <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600">Visual Source Link</label>
                   <input name="heroImageUrl" defaultValue={heroImageBase64 ? "" : config.heroImageUrl} className="w-full bg-transparent border-b border-white/5 py-4 text-[10px] tracking-[0.4em] text-stone-600 focus:outline-none focus:border-purple-500 transition-colors uppercase" placeholder="EXTERNAL SOURCE OVERRIDE..." />
                </div>
              </div>

              <div className="space-y-8 pt-8">
                 <h3 className="text-[12px] uppercase tracking-[0.5em] font-bold text-white border-l-2 border-purple-500 pl-6 flex items-center">
                   <ToggleRight className="mr-3" size={16} /> Global Announcements
                 </h3>
                 <div className="flex items-center space-x-6 p-6 bg-stone-900/30 border border-white/5 rounded-xl cursor-pointer" onClick={() => {
                   const cb = document.getElementById('showBanner') as HTMLInputElement;
                   if (cb) cb.checked = !cb.checked;
                 }}>
                   <input type="checkbox" name="showBanner" defaultChecked={config.showBanner} className="w-6 h-6 accent-purple-600 rounded cursor-pointer" id="showBanner" />
                   <label htmlFor="showBanner" className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-500 cursor-pointer">Activate Protocol Banner</label>
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600">Banner Transmission</label>
                   <input name="bannerMessage" defaultValue={config.bannerMessage} className="w-full bg-stone-950 border border-white/5 p-6 text-xs text-purple-400 font-bold tracking-[0.2em] focus:outline-none focus:border-purple-500 rounded-sm transition-all" />
                 </div>
              </div>
            </div>

            <div className="space-y-16">
              <div className="space-y-8">
                <h3 className="text-[12px] uppercase tracking-[0.5em] font-bold text-white border-l-2 border-green-500 pl-6 flex items-center">
                  <Smartphone className="mr-3" size={16} /> Financial Architecture
                </h3>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600">Protocol Destination (UPI)</label>
                  <div className="relative group">
                    <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-800 group-focus-within:text-green-500 transition-colors" size={20} />
                    <input name="upiId" defaultValue={config.upiId} className="w-full pl-16 bg-stone-950 border border-white/5 p-6 text-sm text-green-500 font-mono tracking-[0.2em] font-bold focus:outline-none focus:border-green-500/30 rounded-sm transition-all" />
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                <h3 className="text-[12px] uppercase tracking-[0.5em] font-bold text-white border-l-2 border-purple-500 pl-6 flex items-center">
                  <Mail className="mr-3" size={16} /> Global Communications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600">Master Email</label>
                    <input name="contactEmail" defaultValue={config.contactEmail} className="w-full bg-stone-950 border border-white/5 p-6 text-xs text-white focus:outline-none focus:border-purple-500/50 rounded-sm transition-all tracking-widest" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600">Signal Frequency (Phone)</label>
                    <input name="contactPhone" defaultValue={config.contactPhone} className="w-full bg-stone-950 border border-white/5 p-6 text-xs text-white focus:outline-none focus:border-purple-500/50 rounded-sm transition-all tracking-widest" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600">Narrative Archive (About Us)</label>
                  <textarea name="aboutText" rows={6} defaultValue={config.aboutText} className="w-full bg-stone-950 border border-white/5 p-6 text-sm text-stone-500 focus:outline-none focus:border-purple-500/50 rounded-xl font-light leading-relaxed italic transition-all" />
                </div>
              </div>

              <div className="pt-16 border-t border-white/5">
                <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-8 text-[12px] tracking-[0.7em] uppercase font-bold hover:shadow-[0_0_60px_rgba(34,197,94,0.3)] transition-all transform hover:-translate-y-2 rounded-sm active:scale-95 shadow-2xl">
                  Commit Synchronisation
                </button>
                <p className="text-center text-[9px] uppercase tracking-[0.4em] text-stone-700 mt-8 font-bold">Parameters will be propagated across the global network.</p>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
