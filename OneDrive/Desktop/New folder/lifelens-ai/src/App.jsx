// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
// import { LayoutDashboard, BookOpen, MessageSquare, Smile, BrainCircuit, Sparkles, Swords, Network, Flame, User } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Graph from './pages/Graph';
// import Planner from './pages/Planner';
// import Debate from './pages/Debate';
// import HotSeat from './pages/HotSeat';
// import Feynman from './pages/Feynman';
// import Chat from './pages/Chat';
// import Mood from './pages/Mood';
// import Flow from './pages/Flow';

// // Dynamic Profile Component
// ...

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, MessageSquare, Smile, BrainCircuit, Sparkles, Swords, Network, Flame, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Graph from './pages/Graph';
import Planner from './pages/Planner';
import Debate from './pages/Debate';
import HotSeat from './pages/HotSeat';
import Feynman from './pages/Feynman';
import Chat from './pages/Chat';
import Mood from './pages/Mood';
import Flow from './pages/Flow';

// Dynamic Profile Page Placeholder
const ProfilePlaceholder = () => {
  const userName = localStorage.getItem('userName') || 'Scholar';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-[80vh] flex items-center justify-center pointer-events-auto"
    >
      <div className="glass-panel p-16 rounded-[3rem] text-center relative overflow-hidden max-w-2xl w-full border-t border-cosmic-cyan/30">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-cosmic-neon/20 rounded-full filter blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-cosmic-cyan/20 rounded-full filter blur-[100px] pointer-events-none"></div>
        
        <div className="w-32 h-32 rounded-full mx-auto mb-8 p-1 bg-gradient-to-br from-cosmic-cyan via-cosmic-neon to-cosmic-indigo relative z-10 shadow-[0_0_40px_rgba(0,240,255,0.4)]">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-cosmic-900 bg-cosmic-800">
             <img src="/src/assets/avatar_ai.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        
        <h2 className="text-5xl font-editorial font-bold text-white mb-3 relative z-10 drop-shadow-lg">{userName}</h2>
        <p className="text-cosmic-cyan font-bold tracking-[0.2em] uppercase text-sm mb-10 relative z-10">Neural Architect</p>
        
        <div className="grid grid-cols-2 gap-6 text-left relative z-10">
          <div className="glass-card p-6 transform transition-all duration-300 hover:scale-105">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Focus States Achieved</div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-cosmic-cyan to-blue-400 font-bold text-3xl">42</div>
          </div>
          <div className="glass-card p-6 transform transition-all duration-300 hover:scale-105">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Neural Link Integrity</div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-cosmic-neon to-purple-400 font-bold text-3xl">98%</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const isFullScreen = location.pathname === '/' || location.pathname === '/flow';
  if (isFullScreen) return null;

  // Dynamic user data
  const userName = localStorage.getItem('userName') || 'Scholar';

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/graph', name: 'Neural Web', icon: <Network size={20} /> },
    { path: '/planner', name: 'Study Planner', icon: <BookOpen size={20} /> },
    { path: '/debate', name: 'Debate Arena', icon: <Swords size={20} /> },
    { path: '/hotseat', name: 'Hot Seat', icon: <Flame size={20} /> },
    { path: '/feynman', name: 'Feynman Simulator', icon: <BrainCircuit size={20} /> },
    { path: '/chat', name: 'AI Tutor', icon: <MessageSquare size={20} /> },
    { path: '/mood', name: 'State Engine', icon: <Smile size={20} /> },
  ];

  return (
    <div className="w-32 hover:w-[280px] transition-all duration-500 ease-out h-screen fixed left-0 top-0 py-6 pl-6 z-[100] flex flex-col group">
      
      <div className="glass-card bg-cosmic-900/40 border-[0.5px] border-white/10 flex flex-col h-full overflow-hidden relative backdrop-blur-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] pointer-events-auto">
        
        {/* Subtle inner glow top border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cosmic-cyan to-transparent opacity-50"></div>

        {/* Logo */}
        <div className="flex items-center gap-4 mb-8 px-5 mt-6 whitespace-nowrap">
          <div className="min-w-[48px] h-[48px] rounded-2xl bg-gradient-to-br from-cosmic-cyan to-cosmic-indigo flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.5)] shrink-0 animate-pulse-glow">
            <Sparkles className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-editorial font-bold text-white tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            LifeLens<span className="text-cosmic-cyan">.</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 relative z-10 w-full overflow-y-auto custom-scrollbar flex-1 pb-4 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center gap-4 px-3 py-4 rounded-[1.2rem] font-semibold transition-all duration-300 overflow-hidden group/navitem ${
                  isActive 
                    ? 'text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-gradient-to-r from-cosmic-indigo/40 to-transparent rounded-[1.2rem]"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-cosmic-cyan rounded-r-full shadow-[0_0_15px_rgba(0,240,255,0.8)]"
                  />
                )}
                
                {/* Hover Background */}
                {!isActive && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/navitem:opacity-100 transition-opacity duration-300 rounded-[1.2rem]"></div>
                )}

                <div className={`relative z-10 min-w-[40px] h-[40px] rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isActive ? 'bg-cosmic-indigo/80 shadow-[0_0_15px_rgba(92,56,255,0.5)] text-white' : 'bg-transparent text-slate-400 group-hover/navitem:text-cosmic-cyan group-hover/navitem:scale-110'}`}>
                  {item.icon}
                </div>
                <span className="relative z-10 whitespace-nowrap tracking-wide text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Profile Section at the Bottom */}
        <div className="mt-auto p-4 relative">
          <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <Link to="/profile" className="flex items-center gap-4 p-2 rounded-2xl transition-all duration-300 hover:bg-white/5 group/profile mt-2">
             <div className="min-w-[48px] h-[48px] rounded-full p-[2px] bg-gradient-to-br from-cosmic-cyan to-cosmic-neon shrink-0 shadow-[0_0_15px_rgba(224,44,255,0.4)] group-hover/profile:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all duration-300 group-hover/profile:scale-105">
                <div className="w-full h-full rounded-full overflow-hidden bg-cosmic-800">
                   <img src="/src/assets/avatar_ai.png" alt="Profile" className="w-full h-full object-cover" />
                </div>
             </div>
             <div className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                <p className="text-[15px] font-bold text-white tracking-wide truncate">{userName}</p>
                <p className="text-xs text-cosmic-cyan font-semibold tracking-wider uppercase mt-0.5">Edit Profile</p>
             </div>
          </Link>
        </div>

      </div>
    </div>
  );
};

// Animated Route Wrapper
const AnimatedRoutes = () => {
  const location = useLocation();
  const isFullScreen = location.pathname === '/' || location.pathname === '/flow';
  
  return (
    <main className={`relative z-10 transition-all duration-500 ease-out ${isFullScreen ? 'w-full' : 'ml-32 p-6 md:p-10 w-[calc(100%-8rem)]'}`}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/debate" element={<Debate />} /> 
          <Route path="/hotseat" element={<HotSeat />} />
          <Route path="/feynman" element={<Feynman />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/flow" element={<Flow />} />
          <Route path="/profile" element={<ProfilePlaceholder />} />
        </Routes>
      </AnimatePresence>
    </main>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isFullScreen = location.pathname === '/' || location.pathname === '/flow';

  return (
    <div className="flex min-h-screen bg-cosmic-900 relative overflow-hidden selection:bg-cosmic-cyan/30 selection:text-cosmic-cyan">
      
      {!isFullScreen && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Deep abstract bg layer */}
          <div className="absolute inset-0 opacity-20 object-cover w-full h-full" style={{ backgroundImage: 'url(/src/assets/abstract_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          {/* Animated meshes for vibrant cosmic pops */}
          <div className="absolute top-[-20%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-cosmic-indigo/30 mix-blend-screen filter blur-[150px] animate-aurora-1"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-cosmic-neon/20 mix-blend-screen filter blur-[150px] animate-aurora-2"></div>
          <div className="absolute top-[30%] left-[-20%] w-[40vw] h-[40vw] rounded-full bg-cosmic-cyan/20 mix-blend-screen filter blur-[150px] animate-aurora-3"></div>
        </div>
      )}

      <Sidebar />
      <AnimatedRoutes />
      
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}