
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram, ChevronRight, Trash2, Plus, Minus, LogOut, User as UserIcon } from 'lucide-react';
import { useStore } from './store/useStore';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Payment from './pages/Payment';

const Navbar = ({ user, cartCount, onOpenCart, onLogout }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Contact', path: '/contact' },
  ];

  if (user?.isAdmin) {
    links.push({ name: 'Authority', path: '/admin' });
  }

  // Display a masked or generic identity for privacy as requested
  const displayEmail = user?.isAdmin ? 'Authority Console' : 'Guest Account';

  return (
    <nav className="bg-black/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-serif tracking-widest text-white font-bold group">
              AURA <span className="text-purple-500 group-hover:text-green-400 transition-colors">EXOTIXX</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-300 ${
                  location.pathname === link.path ? 'text-purple-400 font-bold border-b border-purple-500 pb-1' : 'text-stone-500 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-6 pl-6 border-l border-white/10">
              <button onClick={onOpenCart} className="relative text-stone-500 hover:text-green-400 transition-all transform hover:scale-110">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <div className="group relative">
                <button className="text-stone-500 hover:text-white transition-all transform hover:scale-110">
                  <UserIcon size={20} />
                </button>
                <div className="absolute right-0 top-full pt-4 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="glass-card p-6 rounded-xl w-56 shadow-2xl border-white/10">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500 mb-1 font-bold">Identity</p>
                    <p className="text-[11px] text-white mb-6 font-medium tracking-tight truncate">{displayEmail}</p>
                    <button onClick={onLogout} className="w-full flex items-center justify-center py-2 px-4 bg-stone-900 border border-white/5 text-[10px] uppercase tracking-widest text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all rounded">
                      <LogOut size={12} className="mr-2" /> De-Authenticate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center md:hidden space-x-6">
            <button onClick={onOpenCart} className="relative text-stone-500">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-stone-950 border-t border-white/5 p-8 space-y-6 animate-in fade-in slide-in-from-top-4">
          {links.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="block text-sm uppercase tracking-[0.3em] text-stone-400 hover:text-white border-b border-white/5 pb-4">
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-widest text-stone-600">{displayEmail}</span>
            <button onClick={onLogout} className="text-[10px] uppercase tracking-[0.2em] text-red-500 font-bold px-4 py-2 border border-red-500/20 rounded">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, removeFromCart }: any) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  const total = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-stone-950 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col border-l border-white/5 animate-in slide-in-from-right duration-300">
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/50">
            <h2 className="text-3xl font-serif text-white italic tracking-tight">The Bag <span className="text-purple-500">.</span></h2>
            <button onClick={onClose} className="text-stone-500 hover:text-white transition-colors"><X size={28} strokeWidth={1} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <ShoppingBag size={80} strokeWidth={0.5} className="mb-6 text-stone-700" />
                <p className="font-serif italic text-xl text-stone-400">Your selection is empty.</p>
                <button onClick={onClose} className="mt-8 text-[10px] uppercase tracking-[0.4em] text-purple-400 hover:text-white transition-all underline underline-offset-8">Continue Browsing</button>
              </div>
            ) : (
              <div className="space-y-10">
                {cart.map((item: any) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex space-x-6 group">
                    <div className="relative w-24 h-32 bg-stone-900 rounded-sm overflow-hidden shrink-0">
                      <img src={item.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-sm font-bold text-white tracking-tight uppercase">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="text-stone-700 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                        </div>
                        <p className="text-[10px] text-stone-600 uppercase tracking-widest font-bold">Size {item.selectedSize}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4 bg-white/5 px-3 py-1.5 rounded-sm border border-white/5">
                          <button onClick={() => updateQuantity(item.id, item.selectedSize, -1)} className="text-stone-500 hover:text-white transition-colors"><Minus size={14} /></button>
                          <span className="text-xs text-white font-mono w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.selectedSize, 1)} className="text-stone-500 hover:text-white transition-colors"><Plus size={14} /></button>
                        </div>
                        <span className="text-green-400 text-base font-bold font-mono tracking-tighter">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-10 bg-stone-900/40 backdrop-blur-xl border-t border-white/10 space-y-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-stone-500 uppercase tracking-[0.3em] font-bold">Order Valuation</span>
                <span className="text-3xl font-serif text-white font-bold tracking-tighter">${total}</span>
              </div>
              <button 
                onClick={() => { navigate('/payment'); onClose(); }}
                className="w-full bg-white text-black py-6 text-[11px] tracking-[0.5em] uppercase font-bold hover:bg-purple-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
              >
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const { 
    products, config, cart, user, login, logout, 
    updateProducts, updateConfig, addToCart, removeFromCart, updateQuantity, clearCart, loading 
  } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (loading) return null;
  if (!user) return <Login onLogin={login} />;

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-black selection:bg-purple-900 selection:text-white">
        {config.showBanner && (
          <div className="bg-gradient-to-r from-purple-900 via-stone-900 to-green-900 text-white py-3 text-[9px] tracking-[0.5em] uppercase text-center font-bold overflow-hidden border-b border-white/5">
            <div className="animate-pulse inline-block">{config.bannerMessage}</div>
          </div>
        )}
        
        <Navbar 
          user={user} 
          cartCount={cartCount} 
          onOpenCart={() => setIsCartOpen(true)} 
          onLogout={logout} 
        />

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home config={config} products={products} />} />
            <Route path="/catalog" element={<Catalog products={products} addToCart={addToCart} />} />
            <Route path="/contact" element={<Contact config={config} />} />
            <Route path="/payment" element={<Payment cart={cart} config={config} onOrderComplete={clearCart} />} />
            <Route 
              path="/admin" 
              element={user.isAdmin ? <Admin products={products} config={config} onUpdateProducts={updateProducts} onUpdateConfig={updateConfig} /> : <Navigate to="/" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="bg-stone-950 border-t border-white/5 py-32">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-20">
            <div className="md:col-span-2 space-y-8">
              <h2 className="text-3xl font-serif font-bold text-white tracking-widest">AURA <span className="text-purple-500">EXOTIXX</span></h2>
              <p className="text-stone-600 text-sm max-w-sm leading-relaxed font-light italic">{config.aboutText}</p>
              <div className="flex space-x-8 text-stone-700">
                <Instagram size={22} className="hover:text-purple-400 cursor-pointer transition-colors" />
                <span className="text-[10px] uppercase tracking-widest font-bold border-l border-white/10 pl-8">Noir Collection {new Date().getFullYear()}</span>
              </div>
            </div>
            <div className="space-y-10">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white">Archives</h3>
              <ul className="space-y-6 text-xs text-stone-600">
                <li><Link to="/" className="hover:text-purple-400 transition-colors uppercase tracking-widest">The Entry</Link></li>
                <li><Link to="/catalog" className="hover:text-purple-400 transition-colors uppercase tracking-widest">The Series</Link></li>
                <li><Link to="/contact" className="hover:text-purple-400 transition-colors uppercase tracking-widest">Consultancy</Link></li>
              </ul>
            </div>
            <div className="space-y-10">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white">Registry</h3>
              <ul className="space-y-6 text-xs text-stone-600">
                <li className="tracking-widest">{config.contactEmail}</li>
                <li className="tracking-widest">{config.contactPhone}</li>
                <li className="text-[9px] text-stone-800 uppercase tracking-[0.2em] pt-4">Encrypted Experience</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
}
