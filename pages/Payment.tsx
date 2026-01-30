
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Truck, CheckCircle2, ChevronLeft, ShieldCheck } from 'lucide-react';
import { CartItem, SiteConfig } from '../types';

interface PaymentProps {
  cart: CartItem[];
  config: SiteConfig;
  onOrderComplete: () => void;
}

export default function Payment({ cart, config, onOrderComplete }: PaymentProps) {
  const [method, setMethod] = useState<'upi' | 'card' | 'cash'>('upi');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      onOrderComplete();
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-stone-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold"
          >
            <ChevronLeft size={16} className="mr-2" /> Back
          </button>

          <section className="glass-card p-8 rounded-xl space-y-8">
            <h1 className="text-3xl font-serif text-white">Payment Method</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => setMethod('upi')}
                className={`p-6 border rounded-lg flex flex-col items-center space-y-4 transition-all ${method === 'upi' ? 'border-purple-500 bg-purple-500/10' : 'border-stone-800 bg-stone-900/40'}`}
              >
                <Wallet className={method === 'upi' ? 'text-purple-400' : 'text-stone-600'} size={32} />
                <span className="text-xs uppercase tracking-widest font-bold">UPI Transfer</span>
              </button>
              
              <button 
                onClick={() => setMethod('card')}
                className={`p-6 border rounded-lg flex flex-col items-center space-y-4 transition-all ${method === 'card' ? 'border-purple-500 bg-purple-500/10' : 'border-stone-800 bg-stone-900/40'}`}
              >
                <CreditCard className={method === 'card' ? 'text-purple-400' : 'text-stone-600'} size={32} />
                <span className="text-xs uppercase tracking-widest font-bold">Card Payment</span>
              </button>
              
              <button 
                onClick={() => setMethod('cash')}
                className={`p-6 border rounded-lg flex flex-col items-center space-y-4 transition-all ${method === 'cash' ? 'border-purple-500 bg-purple-500/10' : 'border-stone-800 bg-stone-900/40'}`}
              >
                <Truck className={method === 'cash' ? 'text-purple-400' : 'text-stone-600'} size={32} />
                <span className="text-xs uppercase tracking-widest font-bold">Cash On Delivery</span>
              </button>
            </div>

            {method === 'upi' && (
              <div className="bg-stone-900/60 p-8 rounded-lg text-center border border-stone-800/50">
                <div className="mb-6 inline-block p-4 bg-white rounded-lg">
                  <div className="w-40 h-40 bg-stone-100 flex items-center justify-center text-black font-bold border-4 border-black">
                    QR CODE
                  </div>
                </div>
                <p className="text-stone-400 text-sm mb-2">Send payment to UPI ID:</p>
                <p className="text-green-400 font-mono text-xl font-bold tracking-wider">{config.upiId}</p>
                <div className="mt-6 text-[10px] text-stone-600 uppercase tracking-[0.2em]">Please share screenshot on WhatsApp after payment</div>
              </div>
            )}

            {method === 'card' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Card Number</label>
                  <input className="w-full bg-stone-900 border border-stone-800 p-3 rounded text-white focus:outline-none focus:border-purple-500" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Expiry Date</label>
                    <input className="w-full bg-stone-900 border border-stone-800 p-3 rounded text-white focus:outline-none focus:border-purple-500" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">CVV</label>
                    <input className="w-full bg-stone-900 border border-stone-800 p-3 rounded text-white focus:outline-none focus:border-purple-500" placeholder="123" />
                  </div>
                </div>
              </div>
            )}

            {method === 'cash' && (
              <div className="p-8 bg-green-500/5 border border-green-500/20 rounded-lg text-center space-y-4">
                <CheckCircle2 className="mx-auto text-green-400" size={48} />
                <p className="text-stone-300 text-sm">Pay securely in cash at your doorstep.</p>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest">A $5 processing fee applies for COD</p>
              </div>
            )}
          </section>

          <div className="flex items-center space-x-2 text-stone-600">
            <ShieldCheck size={16} />
            <span className="text-[10px] uppercase tracking-widest font-bold">Bank-grade SSL Encrypted Payment Secure</span>
          </div>
        </div>

        <div className="space-y-8">
          <section className="glass-card p-8 rounded-xl">
            <h2 className="text-xl font-serif text-white mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between text-sm">
                  <span className="text-stone-400">{item.name} <span className="text-[10px] ml-1">({item.selectedSize})</span> x{item.quantity}</span>
                  <span className="text-white font-medium">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-800 pt-6 space-y-2">
              <div className="flex justify-between text-stone-400 text-xs">
                <span>Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-sm uppercase tracking-widest font-bold text-white">Grand Total</span>
                <span className="text-2xl font-serif text-green-400 font-bold">${total}</span>
              </div>
            </div>

            <button 
              disabled={loading}
              onClick={handlePay}
              className={`w-full mt-8 bg-purple-600 text-white py-5 rounded-sm text-xs tracking-[0.3em] uppercase font-bold hover:bg-purple-700 transition-all flex items-center justify-center space-x-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Place Order</span>
                  <CheckCircle2 size={16} />
                </>
              )}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
