
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Phone, Mail, Instagram, Settings, ChevronRight, Trash2, Plus, Minus, LogOut, User as UserIcon } from 'lucide-react';
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
    links.push({ name: 'Admin', path: '/admin' });
  }

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-serif tracking-widest text-white font-bold">
              AURA <span className="text-purple-500">EXOTIXX</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[10px] tracking-[0.2em] uppercase transition-all ${
                  location.pathname === link.path ? 'text-purple-400 font-bold underline underline-offset-8' : 'text-stone-500 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-6 pl-4 border-l border-white/10">
              <button onClick={onOpenCart} className="relative text-stone-500 hover:text-green-400 transition-colors">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <div className="group relative">
                <button className="text-stone-500 hover:text-white transition-colors">
                  <UserIcon size={20} />
                </button>
                <div className="absolute right-0 top-full pt-4 hidden group-hover:block">
                  <div className="glass-card p-4 rounded-lg w-48 shadow-2xl">
                    <p className="text-[10px] text-stone-400 mb-4 break-all">{user?.email}</p>
                    <button onClick={onLogout} className="flex items-center text-xs text-red-400 hover:text-red-300 transition-colors">
                      <LogOut size={14} className="mr-2" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center md:hidden space-x-6">
            <button onClick={onOpenCart} className="relative text-stone-500">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-stone-950 border-t border-white/5 p-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          {links.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="block text-sm uppercase tracking-widest text-stone-400 hover:text-white">
              {link.name}
            </Link>
          ))}
          <button onClick={onLogout} className="text-sm uppercase tracking-widest text-red-500 font-bold pt-4 border-t border-white/10 w-full text-left">
            Sign Out
          </button>
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-stone-950 shadow-2xl flex flex-col border-l border-white/5 animate-in slide-in-from-right duration-300">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-2xl font-serif text-white italic">Bag <span className="text-purple-500">.</span></h2>
            <button onClick={onClose} className="text-stone-500 hover:text-white"><X size={24} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                <ShoppingBag size={64} strokeWidth={0.5} className="mb-4" />
                <p className="font-serif italic text-lg">Empty by design.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {cart.map((item: any) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex space-x-4">
                    <img src={item.imageUrl} className="w-20 h-28 object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-medium text-white">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="text-stone-600 hover:text-red-400"><Trash2 size={14} /></button>
                      </div>
                      <p className="text-[10px] text-stone-500 uppercase tracking-widest mb-4">Size: {item.selectedSize}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 bg-white/5 px-2 py-1 rounded">
                          <button onClick={() => updateQuantity(item.id, item.selectedSize, -1)} className="text-stone-400 hover:text-white"><Minus size={12} /></button>
                          <span className="text-xs text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.selectedSize, 1)} className="text-stone-400 hover:text-white"><Plus size={12} /></button>
                        </div>
                        <span className="text-green-400 text-sm font-bold">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-8 bg-stone-900/50 border-t border-white/5 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Estimated Total</span>
                <span className="text-2xl font-serif text-white font-bold">${total}</span>
              </div>
              <button 
                onClick={() => { navigate('/payment'); onClose(); }}
                className="w-full bg-purple-600 text-white py-5 text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-purple-700 transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)]"
              >
                Secure Checkout
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
          <div className="bg-gradient-to-r from-purple-900 to-green-900 text-white py-2 text-[10px] tracking-[0.3em] uppercase text-center font-bold overflow-hidden whitespace-nowrap">
            <div className="animate-marquee inline-block">{config.bannerMessage}</div>
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
          </Routes>
        </main>

        <footer className="bg-stone-950 border-t border-white/5 py-24">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-serif font-bold text-white mb-6">AURA <span className="text-purple-500">EXOTIXX</span></h2>
              <p className="text-stone-500 text-sm max-w-sm leading-relaxed mb-8">{config.aboutText}</p>
              <div className="flex space-x-6 text-stone-600">
                <Instagram size={20} className="hover:text-purple-400 cursor-pointer" />
                <Phone size={20} className="hover:text-green-400 cursor-pointer" />
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-8">Navigation</h3>
              <ul className="space-y-4 text-xs text-stone-500">
                <li><Link to="/" className="hover:text-purple-400">Home</Link></li>
                <li><Link to="/catalog" className="hover:text-purple-400">The Noir Collection</Link></li>
                <li><Link to="/contact" className="hover:text-purple-400">Concierge</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-8">Support</h3>
              <ul className="space-y-4 text-xs text-stone-500">
                <li>{config.contactEmail}</li>
                <li>{config.contactPhone}</li>
                <li className="text-stone-700">© {new Date().getFullYear()} AURA EXOTIXX LUXURY</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
}
