
import React, { useState } from 'react';
import { Lock, Mail, ChevronRight, X, Shield, Globe } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
}

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.705c-.181-.54-.285-1.116-.285-1.705s.104-1.165.285-1.705V4.963H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.037l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.479 0 2.454 2.04 0 4.963l3.007 2.332C3.711 5.164 5.695 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onLogin(email);
  };

  const handleGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (googleEmail) {
      onLogin(googleEmail);
      setShowGoogleModal(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 -left-20 w-64 md:w-96 h-64 md:h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 -right-20 w-64 md:w-96 h-64 md:h-96 bg-green-600/5 rounded-full blur-[120px]"></div>

      <div className="max-w-md w-full glass-card p-8 md:p-12 rounded-[2rem] relative z-10 border-white/5 shadow-2xl animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 rounded-full bg-stone-900 mb-6 border border-white/5">
            <Shield className="text-purple-500" size={24} />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-white tracking-[0.2em] mb-2 uppercase">AURA EXOTIXX</h1>
          <p className="text-stone-500 text-[10px] uppercase tracking-[0.4em] font-medium">The Signature Noir Vault</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-600">Access Identity</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-700" size={16} />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full bg-stone-900/40 border border-white/5 p-4 pl-12 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all rounded-xl placeholder:text-stone-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-600">Secure Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-700" size={16} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-900/40 border border-white/5 p-4 pl-12 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all rounded-xl placeholder:text-stone-800"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-white text-black py-5 rounded-xl text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-purple-600 hover:text-white transition-all flex items-center justify-center space-x-2 shadow-xl active:scale-95"
          >
            <span>Decrypt Access</span>
            <ChevronRight size={14} />
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[9px] uppercase tracking-[0.3em]">
            <span className="px-6 bg-[#0a0a0a] text-stone-700">Protocol Selection</span>
          </div>
        </div>

        <button 
          onClick={() => setShowGoogleModal(true)}
          className="w-full bg-stone-900 border border-white/10 text-white py-4 rounded-xl text-[10px] tracking-[0.3em] uppercase font-bold hover:border-white/30 transition-all flex items-center justify-center space-x-3 active:scale-95"
        >
          <GoogleIcon />
          <span>Google Sync</span>
        </button>
      </div>

      {/* Google Login Simulation Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center px-4 md:px-0">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowGoogleModal(false)} />
          <div className="relative w-full max-w-sm glass-card p-10 rounded-[2.5rem] border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-8 duration-500">
            <button onClick={() => setShowGoogleModal(false)} className="absolute top-6 right-6 text-stone-600 hover:text-white transition-colors">
              <X size={24} strokeWidth={1} />
            </button>
            <div className="text-center mb-8">
              <div className="bg-white p-4 inline-block rounded-2xl mb-6">
                <GoogleIcon />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Google Sync</h2>
              <p className="text-stone-500 text-xs">Verify your identity to proceed</p>
            </div>
            <form onSubmit={handleGoogleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-stone-600 font-bold">Email Address</label>
                <input 
                  autoFocus
                  required
                  type="email"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full bg-stone-950 border border-white/5 p-4 text-sm text-white focus:outline-none focus:border-purple-500 rounded-xl"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-4 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-blue-700 transition-all active:scale-95"
              >
                Sign In
              </button>
            </form>
            <div className="mt-8 flex items-center justify-center space-x-2 opacity-30">
               <Globe size={12} className="text-stone-500" />
               <span className="text-[9px] uppercase tracking-widest font-bold">Encrypted via Google Protocol</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
