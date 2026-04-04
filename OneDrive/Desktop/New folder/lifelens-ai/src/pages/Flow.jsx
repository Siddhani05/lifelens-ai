import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, ArrowLeft, Wind, Brain, Coffee } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

export default function Flow() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); 

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(5 * 60); 
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
      }
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const bgColors = mode === 'work' 
    ? 'from-indigo-950 via-slate-900 to-slate-950' 
    : 'from-emerald-950 via-teal-950 to-slate-950';
    
  const accentColor = mode === 'work' ? 'text-indigo-400' : 'text-emerald-400';
  const glowColor = mode === 'work' ? 'bg-indigo-500' : 'bg-emerald-500';

  return (
    <PageWrapper className={`min-h-screen w-full flex flex-col relative overflow-hidden transition-colors duration-[2000ms] bg-gradient-to-br ${bgColors}`}>
      
      <div className="noise-overlay opacity-20"></div>

      {/* CUSTOM CSS FOR THE BREATHING ANIMATION */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }
        .animate-breathe {
          animation: breathe 8s ease-in-out infinite;
        }
      `}</style>

      {/* The Breathing Background Orbs */}
      <div className={`absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full mix-blend-screen filter blur-[120px] animate-breathe pointer-events-none ${glowColor}`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full mix-blend-screen filter blur-[120px] animate-breathe pointer-events-none ${glowColor}`} style={{ animationDelay: '-4s' }}></div>

      {/* Navigation */}
      <div className="relative z-10 p-8 flex justify-between items-center w-full max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors glass-panel px-6 py-3 rounded-full uppercase tracking-widest text-xs font-bold border border-white/10 hover:bg-white/10"
        >
          <ArrowLeft size={16} /> Exit Flow
        </button>
        <div className="flex items-center gap-2 text-slate-400 font-bold tracking-widest uppercase text-xs glass-panel px-6 py-3 rounded-full border border-white/5">
          <Wind size={16} /> {mode === 'work' ? 'Deep Work' : 'Restoration'}
        </div>
      </div>

      {/* Main Timer UI */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-10">
        
        {/* Mode Switcher */}
        <div className="flex gap-4 mb-16 glass-panel p-2 rounded-full border border-white/10">
          <button 
            onClick={() => switchMode('work')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all duration-300 tracking-wider text-sm uppercase ${mode === 'work' ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'text-slate-400 hover:text-white'}`}
          >
            <Brain size={18}/> Focus
          </button>
          <button 
            onClick={() => switchMode('break')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all duration-300 tracking-wider text-sm uppercase ${mode === 'break' ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'text-slate-400 hover:text-white'}`}
          >
            <Coffee size={18}/> Break
          </button>
        </div>

        {/* The Massive Timer */}
        <div className="text-[10rem] sm:text-[14rem] font-editorial font-black text-white leading-none tracking-tighter tabular-nums drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
          {formatTime(timeLeft)}
        </div>
        <div className={`text-xl font-bold tracking-[0.3em] uppercase mt-6 ${accentColor} animate-pulse drop-shadow-md`}>
          {mode === 'work' ? 'Sustain Focus' : 'Regulate Nervous System'}
        </div>

        {/* Controls */}
        <div className="flex gap-6 mt-20">
          <button 
            onClick={resetTimer}
            className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-105 border border-white/10 hover:bg-white/10"
          >
            <RotateCcw size={24} />
          </button>
          <button 
            onClick={toggleTimer}
            className={`w-24 h-24 rounded-[2rem] flex items-center justify-center text-white transition-all hover:scale-105 shadow-2xl ${
              isActive 
                ? 'bg-rose-500 hover:bg-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.4)] border border-rose-400' 
                : 'bg-white text-slate-950 hover:bg-slate-200 shadow-[0_0_30px_rgba(255,255,255,0.3)]'
            }`}
          >
            {isActive ? <Pause size={36} className="text-white" /> : <Play size={40} className="ml-2 text-slate-900" />}
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}