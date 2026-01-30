
import React, { useState, useRef } from 'react';
import { Product, SiteConfig } from '../types';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon, Check, Ban, DollarSign, Smartphone, Mail, Upload, Layout } from 'lucide-react';

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
    alert('Vault settings synchronized successfully.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 bg-black min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
        <div>
          <h1 className="text-4xl font-serif text-white">Central Command</h1>
          <p className="text-stone-500 text-[10px] uppercase tracking-widest mt-1">Authorized Personnel: shauryave1717@gmail.com</p>
        </div>
        <div className="flex bg-stone-900 p-1 rounded-full border border-white/5">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-8 py-3 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${activeTab === 'products' ? 'bg-purple-600 text-white' : 'text-stone-500 hover:text-white'}`}
          >
            Inventory
          </button>
          <button 
            onClick={() => setActiveTab('site')}
            className={`px-8 py-3 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${activeTab === 'site' ? 'bg-purple-600 text-white' : 'text-stone-500 hover:text-white'}`}
          >
            Manifest
          </button>
        </div>
      </div>

      {activeTab === 'products' ? (
        <div className="space-y-12">
          <div className="flex justify-between items-center border-b border-white/5 pb-8">
            <h2 className="text-2xl font-serif text-white">Product Registry</h2>
            <button 
              onClick={() => { setIsAdding(true); setEditingProduct(null); setProductImageBase64(null); }}
              className="flex items-center space-x-3 bg-white text-black px-8 py-4 text-[10px] tracking-widest uppercase font-bold hover:bg-green-500 hover:text-white transition-all rounded-sm"
            >
              <Plus size={16} />
              <span>Register New Item</span>
            </button>
          </div>

          {(isAdding || editingProduct) && (
            <div className="glass-card p-10 rounded-xl animate-in slide-in-from-top-4">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-serif text-white italic">{editingProduct ? 'Update Item Metadata' : 'New Entry Creation'}</h3>
                <button onClick={() => { setIsAdding(false); setEditingProduct(null); setProductImageBase64(null); }} className="text-stone-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Item Designation</label>
                    <input name="name" defaultValue={editingProduct?.name} required className="w-full bg-black/50 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-purple-500 rounded" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Valuation ($)</label>
                      <input name="price" type="number" defaultValue={editingProduct?.price} required className="w-full bg-black/50 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-purple-500 rounded" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Series</label>
                      <input name="category" defaultValue={editingProduct?.category} required className="w-full bg-black/50 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-purple-500 rounded" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Dimensions (CSV)</label>
                    <input name="sizes" defaultValue={editingProduct?.sizes.join(', ')} placeholder="XS, S, M, L" required className="w-full bg-black/50 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-purple-500 rounded" />
                  </div>
                  <div className="flex items-center space-x-3 pt-4">
                    <input type="checkbox" name="isSoldOut" defaultChecked={editingProduct?.isSoldOut} className="w-5 h-5 accent-purple-600 rounded" id="isSoldOut" />
                    <label htmlFor="isSoldOut" className="text-[10px] uppercase tracking-widest font-bold text-red-400 cursor-pointer">Deactivate / Sold Out</label>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Visual Identity</label>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                        <button 
                          type="button" 
                          onClick={() => productFileInputRef.current?.click()}
                          className="flex items-center space-x-2 bg-stone-900 border border-white/10 text-stone-300 px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all rounded"
                        >
                          <Upload size={14} />
                          <span>Upload Assets</span>
                        </button>
                        {productImageBase64 && <Check className="text-green-500" size={16} />}
                      </div>
                      <input type="file" ref={productFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setProductImageBase64)} />
                      <input name="imageUrl" defaultValue={productImageBase64 ? "" : editingProduct?.imageUrl} placeholder="URL Override" className="w-full bg-black/50 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-purple-500 rounded" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Detailed Narrative</label>
                    <textarea name="description" rows={4} defaultValue={editingProduct?.description} required className="w-full bg-black/50 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-purple-500 rounded" />
                  </div>
                  
                  <button type="submit" className="w-full bg-purple-600 text-white py-5 text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-purple-700 transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                    Synchronize Vault
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="glass-card overflow-hidden rounded-xl border-white/5 shadow-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-stone-400">Designation</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-stone-400">Valuation</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-stone-400">Status</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-bold text-stone-400 text-right">Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-6">
                        <img src={product.imageUrl} className="w-16 h-20 object-cover grayscale rounded" alt="" />
                        <div>
                          <p className="font-serif text-lg text-white font-medium">{product.name}</p>
                          <p className="text-[9px] text-stone-500 uppercase tracking-widest">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-green-400 font-bold font-mono tracking-tighter">${product.price}</span>
                    </td>
                    <td className="px-8 py-6">
                      {product.isSoldOut ? (
                        <span className="px-3 py-1 bg-red-900/20 text-red-500 text-[8px] uppercase tracking-widest font-bold rounded-full border border-red-900/30">Offline</span>
                      ) : (
                        <span className="px-3 py-1 bg-green-900/20 text-green-500 text-[8px] uppercase tracking-widest font-bold rounded-full border border-green-900/30">Active</span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end space-x-4">
                        <button onClick={() => setEditingProduct(product)} className="text-stone-500 hover:text-purple-400 transition-colors"><Edit2 size={18} /></button>
                        <button onClick={() => onUpdateProducts(products.filter(p => p.id !== product.id))} className="text-stone-500 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-card p-12 rounded-xl animate-in fade-in">
          <h2 className="text-3xl font-serif text-white mb-12 italic">Manifest Configuration</h2>
          <form onSubmit={handleUpdateConfig} className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Hero Designation</label>
                <input name="heroTitle" defaultValue={config.heroTitle} className="w-full bg-stone-900 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-purple-500 rounded" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Hero Sub-Manifest</label>
                <input name="heroSubtitle" defaultValue={config.heroSubtitle} className="w-full bg-stone-900 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-purple-500 rounded" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Master Visual Asset</label>
                <button type="button" onClick={() => heroFileInputRef.current?.click()} className="flex items-center space-x-2 bg-stone-900 border border-white/10 p-4 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all rounded w-full justify-center">
                  <Layout size={14} /> <span>Upload Master Visual</span>
                </button>
                <input type="file" ref={heroFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setHeroImageBase64)} />
                <input name="heroImageUrl" defaultValue={heroImageBase64 ? "" : config.heroImageUrl} className="w-full bg-stone-900 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-purple-500 rounded" placeholder="URL Master" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">UPI Protocol ID</label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" size={18} />
                  <input name="upiId" defaultValue={config.upiId} className="w-full pl-12 bg-stone-900 border border-white/10 p-4 text-sm text-green-400 font-mono focus:outline-none focus:border-green-500 rounded" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Global Comms</label>
                  <input name="contactEmail" defaultValue={config.contactEmail} className="w-full bg-stone-900 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-purple-500 rounded" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Signal ID</label>
                  <input name="contactPhone" defaultValue={config.contactPhone} className="w-full bg-stone-900 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-purple-500 rounded" />
                </div>
              </div>
              <div className="space-y-2 pt-8">
                <button type="submit" className="w-full bg-green-600 text-white py-6 text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-green-700 transition-all shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                  Execute Global Synchronization
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
