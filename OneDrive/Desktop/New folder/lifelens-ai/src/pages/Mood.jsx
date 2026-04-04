import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, X, Target, Wind } from 'lucide-react';
import { analyzeMoodTheme } from '../lib/gemini';
import PageWrapper from '../components/PageWrapper';

export default function Mood() {
  const [moodText, setMoodText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [zenData, setZenData] = useState(null); 
  const [bgImageUrl, setBgImageUrl] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!moodText.trim()) return;
    setIsLoading(true);
    
    const data = await analyzeMoodTheme(moodText);
    if (data) {
      setBgImageUrl(`https://source.unsplash.com/random/1920x1080/?${data.imageKeyword}`);
      setZenData(data);
    }
    setIsLoading(false);
  };

  const exitZenMode = () => {
    setZenData(null);
    setMoodText('');
    setBgImageUrl('');
  };

  // 1. INITIAL SETUP SCREEN (Matches the Obsidian Glass Dashboard)
  if (!zenData) {
    return (
      <PageWrapper className="min-h-[85vh] flex flex-col items-center justify-center p-10">
        <div className="glass-panel p-12 rounded-[3rem] text-center max-w-2xl w-full relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full filter blur-[80px] pointer-events-none"></div>
          
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-xl backdrop-blur-md">
            <Wind className="text-purple-400" size={36} />
          </div>
          <h2 className="text-4xl font-editorial font-bold text-white tracking-tight mb-4 relative z-10">State Engine</h2>
          <p className="text-slate-400 text-lg mb-10 font-medium relative z-10">Be completely honest about your mental state. The system will generate a custom interactive environment to regulate you.</p>
          
          <form onSubmit={handleAnalyze} className="relative z-10 group">
            <textarea
              value={moodText}
              onChange={(e) => setMoodText(e.target.value)}
              placeholder="e.g., I am so angry at this bug I want to break my keyboard..."
              disabled={isLoading}
              className="w-full bg-slate-900/50 text-white px-8 py-6 rounded-3xl border border-white/10 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-medium text-lg placeholder-slate-600 h-40 resize-none shadow-inner"
            />
            <button 
              type="submit"
              disabled={isLoading || !moodText.trim()}
              className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50 flex items-center gap-2 border border-purple-400"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
              {isLoading ? 'Calibrating...' : 'Initialize'}
            </button>
          </form>
        </div>
      </PageWrapper>
    );
  }

  // 2. THE CINEMATIC IMMERSIVE ENVIRONMENT
  return (
    <PageWrapper className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black">
      <div className="noise-overlay"></div>
      
      {/* Dynamic Cinematic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[2000ms] scale-105"
        style={{ backgroundImage: `url(${bgImageUrl})` }}
      ></div>
      
      {/* Color Overlay */}
      <div className="absolute inset-0 transition-all duration-[2000ms]" style={{ backgroundColor: zenData.overlayColor }}></div>

      <button onClick={exitZenMode} className={`absolute top-10 right-10 z-[60] mix-blend-difference text-white hover:opacity-70 transition-opacity flex items-center gap-3 uppercase tracking-widest text-xs font-bold`}>
          Return <X size={16} />
      </button>

      <div className={`absolute top-1/4 w-full text-center z-40 pointer-events-none px-6 ${zenData.textColor}`}>
        <h2 className="font-editorial text-5xl md:text-8xl tracking-tighter opacity-90 drop-shadow-2xl">
          {zenData.heading}
        </h2>
      </div>

      <div className="relative z-50 w-full h-full">
        {zenData.activity === 'smash' && <SmashGame />}
        {zenData.activity === 'breathe' && <BreatheGame />}
        {zenData.activity === 'pop' && <PopGame />}
        {zenData.activity === 'ripple' && <RippleGame />}
        {zenData.activity === 'burn' && <BurnGame />}
      </div>
    </PageWrapper>
  );
}

// 1. SMASH ENGINE 
const SmashGame = () => {
  const [targets, setTargets] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTargets(prev => prev.length > 5 ? prev : [...prev, { id: Date.now(), x: Math.random() * 80 + 10, y: Math.random() * 70 + 15 }]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      {targets.map(t => (
        <div 
          key={t.id} onClick={() => setTargets(prev => prev.filter(target => target.id !== t.id))}
          className="absolute w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center rounded-full cursor-crosshair hover:bg-white/20 active:scale-150 active:opacity-0 transition-all duration-300 shadow-2xl"
          style={{ left: `${t.x}%`, top: `${t.y}%` }}
        >
          <Target size={32} className="text-white mix-blend-overlay" />
        </div>
      ))}
    </div>
  );
};

// 2. BREATHE ENGINE
const BreatheGame = () => {
  const [phase, setPhase] = useState('Inhale');
  const [scale, setScale] = useState(1);
  useEffect(() => {
    let timeout;
    if (phase === 'Inhale') { setScale(2.5); timeout = setTimeout(() => setPhase('Hold'), 4000); } 
    else if (phase === 'Hold') { timeout = setTimeout(() => setPhase('Exhale'), 4000); } 
    else if (phase === 'Exhale') { setScale(1); timeout = setTimeout(() => setPhase('Inhale'), 6000); }
    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <div className="absolute inset-0 flex items-center justify-center mt-20">
      <div 
        className="w-40 h-40 rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl flex items-center justify-center transition-all ease-in-out shadow-[0_0_80px_rgba(255,255,255,0.05)]"
        style={{ transform: `scale(${scale})`, transitionDuration: phase === 'Inhale' ? '4s' : phase === 'Exhale' ? '6s' : '4s' }}
      >
        <span className="text-white/80 font-bold tracking-[0.3em] uppercase text-xs mix-blend-difference" style={{ transform: `scale(${1/scale})`, transitionDuration: '0s' }}>
          {phase}
        </span>
      </div>
    </div>
  );
};

// 3. POP ENGINE 
const PopGame = () => {
  const [bubbles, setBubbles] = useState([]);
  useEffect(() => {
    setBubbles(Array.from({ length: 25 }).map((_, i) => ({ id: i, size: Math.random() * 80 + 40, left: Math.random() * 100, delay: Math.random() * 15, duration: Math.random() * 20 + 15 })));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`@keyframes float { 0% { transform: translateY(100vh); opacity:0; } 20% { opacity:1; } 80% { opacity:1; } 100% { transform: translateY(-20vh); opacity:0; } }`}</style>
      {bubbles.map(b => (
        <div
          key={b.id} onClick={() => setBubbles(prev => prev.filter(bubble => bubble.id !== b.id))}
          className="absolute bottom-0 bg-white/5 backdrop-blur-md border border-white/20 rounded-full cursor-pointer hover:bg-white/20 hover:scale-110 active:scale-0 transition-all duration-300 shadow-2xl"
          style={{ width: `${b.size}px`, height: `${b.size}px`, left: `${b.left}%`, animation: `float ${b.duration}s linear ${b.delay}s infinite` }}
        />
      ))}
    </div>
  );
};

// 4. RIPPLE ENGINE 
const RippleGame = () => {
  const [ripples, setRipples] = useState([]);
  const addRipple = (e) => {
    const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 3000);
  };

  return (
    <div className="absolute inset-0 cursor-crosshair overflow-hidden" onClick={addRipple}>
      <style>{`@keyframes ripple { 0% { transform: translate(-50%, -50%) scale(0); opacity: 1; border-width: 2px; } 100% { transform: translate(-50%, -50%) scale(4); opacity: 0; border-width: 0px; } }`}</style>
      <div className="absolute bottom-10 left-0 w-full text-center text-white/60 font-bold tracking-[0.3em] uppercase text-xs pointer-events-none drop-shadow-md">Touch the surface</div>
      {ripples.map(r => (
        <div key={r.id} className="absolute w-64 h-64 rounded-full border-white/60 pointer-events-none" style={{ left: r.x, top: r.y, animation: 'ripple 3s cubic-bezier(0.1, 0.8, 0.3, 1) forwards' }} />
      ))}
    </div>
  );
};

// 5. BURN ENGINE
const BurnGame = () => {
  const [text, setText] = useState('');
  const [burning, setBurning] = useState(false);

  const handleBurn = () => {
    setBurning(true);
    setTimeout(() => {
      setText('');
      setBurning(false);
    }, 4000);
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-50 mt-10">
      <div className={`transition-all duration-[3000ms] ${burning ? 'blur-[40px] opacity-0 scale-150 translate-y-[-200px]' : 'opacity-100'} flex flex-col items-center justify-center relative`}>
        {burning && (
          <div className="absolute inset-0 bg-orange-500/20 mix-blend-color-dodge rounded-3xl animate-pulse filter blur-xl"></div>
        )}
        <textarea 
          className="bg-white/5 backdrop-blur-md text-white border border-white/20 p-8 rounded-[2rem] w-[500px] max-w-[90vw] h-48 focus:outline-none focus:border-white/40 placeholder-white/40 resize-none font-medium text-xl shadow-2xl relative z-10"
          placeholder="Type whatever is weighing you down or frustrating you right now..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={burning}
        />
        <div className="mt-8 relative z-10">
          <button 
            onClick={handleBurn}
            disabled={!text.trim() || burning}
            className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 text-white font-bold py-4 px-10 rounded-full shadow-[0_0_40px_rgba(249,115,22,0.4)] uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_100%)] transition-opacity"></div>
            Incinerate
          </button>
        </div>
      </div>
      
      {burning && (
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-400 animate-pulse text-3xl font-bold font-editorial tracking-widest drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]">
            Releasing...
         </div>
      )}
    </div>
  );
};