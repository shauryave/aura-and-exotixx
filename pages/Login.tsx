
import React, { useState } from 'react';
import { Lock, Mail, ChevronRight } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
}

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.705c-.181-.54-.285-1.116-.285-1.705s.104-1.165.285-1.705V4.963H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.037l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.479 0 2.454 2.04 0 4.963l3.007 2.332C3.711 5.164 5.695 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email);
    }
  };

  const handleGoogleLogin = () => {
    // In a real app, this would trigger Firebase or OAuth
    // Simulating the email prompt for this demo environment
    const simulatedEmail = prompt("Enter your Google Email:", "shauryave1717@gmail.com");
    if (simulatedEmail) {
      onLogin(simulatedEmail);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-green-600/10 rounded-full blur-[120px]"></div>

      <div className="max-w-md w-full glass-card p-10 rounded-2xl relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-white tracking-widest mb-2">AURA EXOTIXX</h1>
          <p className="text-stone-400 text-xs uppercase tracking-[0.3em]">Exclusive Luxury Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600" size={18} />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="shauryave1717@gmail.com"
                className="w-full bg-stone-900/50 border border-stone-800 p-3 pl-10 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors rounded-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-900/50 border border-stone-800 p-3 pl-10 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors rounded-sm"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-4 rounded-sm text-xs tracking-widest uppercase font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center space-x-2"
          >
            <span>Enter The Aura</span>
            <ChevronRight size={16} />
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-800"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
            <span className="px-4 bg-[#0a0a0a] text-stone-600">Or continue with</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black py-4 rounded-sm text-xs tracking-widest uppercase font-bold hover:bg-stone-100 transition-all flex items-center justify-center space-x-3 shadow-lg"
        >
          <GoogleIcon />
          <span>Google Login</span>
        </button>

        <p className="mt-8 text-center text-[10px] uppercase tracking-widest text-stone-700">
          Admin: shauryave1717@gmail.com
        </p>
      </div>
    </div>
  );
}
