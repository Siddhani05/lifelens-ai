import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Mail, Lock, Loader2, User } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    
    setIsLoading(true);
    
    // Save the user's name to local storage so the Dashboard can read it
    localStorage.setItem('userName', name);

    // Fake a fast, 1-second database authentication for the judges
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cosmic-900 relative overflow-hidden animate-fade-in-up">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-900/90 via-cosmic-900/60 to-cosmic-900/90 z-10"></div>
        <img src="/src/assets/cosmic_hero_bg.png" alt="Cosmic Neural Network" className="w-full h-full object-cover animate-[float_15s_ease-in-out_infinite] scale-110 opacity-50" />
        <div className="absolute inset-0 bg-cosmic-neon/10 mix-blend-overlay z-20 pointer-events-none"></div>
      </div>
      
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-cosmic-indigo/30 rounded-full filter blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-cosmic-cyan/20 rounded-full filter blur-[150px] pointer-events-none z-0"></div>

      {/* CENTERED AUTH CARD */}
      <div className="w-full max-w-[440px] relative z-20 px-6 sm:px-0">
        <div className="w-full glass-card bg-cosmic-900/40 p-8 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur-[40px] relative overflow-hidden">
          
          {/* Subtle inner glow top border */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cosmic-cyan to-transparent opacity-50"></div>

          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-cosmic-cyan to-cosmic-indigo rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.4)] mb-4 animate-pulse-glow">
              <Sparkles className="text-white" size={32} />
            </div>
            
            <h1 className="text-4xl font-editorial font-bold text-white tracking-tight mb-2 text-center drop-shadow-md">
              LifeLens<span className="text-cosmic-cyan">.</span>
            </h1>
            
            <p className="text-slate-400 font-medium text-sm text-center tracking-wide font-outfit">
              Initialize cognitive workspace
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cosmic-cyan transition-colors" size={20} />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name" 
                className="w-full bg-cosmic-800/60 text-white placeholder-slate-500 pl-12 pr-5 py-4 rounded-2xl border border-white/5 focus:outline-none focus:border-cosmic-cyan focus:bg-cosmic-800 focus:ring-1 focus:ring-cosmic-cyan transition-all font-medium backdrop-blur-md shadow-inner text-sm"
              />
            </div>

            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cosmic-cyan transition-colors" size={20} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Transmission Address" 
                className="w-full bg-cosmic-800/60 text-white placeholder-slate-500 pl-12 pr-5 py-4 rounded-2xl border border-white/5 focus:outline-none focus:border-cosmic-cyan focus:bg-cosmic-800 focus:ring-1 focus:ring-cosmic-cyan transition-all font-medium backdrop-blur-md shadow-inner text-sm"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cosmic-cyan transition-colors" size={20} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-cosmic-800/60 text-white placeholder-slate-500 pl-12 pr-5 py-4 rounded-2xl border border-white/5 focus:outline-none focus:border-cosmic-cyan focus:bg-cosmic-800 focus:ring-1 focus:ring-cosmic-cyan transition-all font-medium tracking-widest backdrop-blur-md shadow-inner text-sm"
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading || !name || !email || !password}
              className="w-full bg-gradient-to-r from-cosmic-cyan to-cosmic-indigo text-white px-6 py-4 rounded-2xl font-bold text-base transition-all hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3 group disabled:opacity-70 mt-4 border border-white/20"
            >
              {isLoading ? <Loader2 size={24} className="animate-spin text-white" /> : 'Initialize Sequence'} 
              {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}