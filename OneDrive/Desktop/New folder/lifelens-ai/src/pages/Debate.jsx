import React, { useState } from 'react';
import { Swords, Send, ShieldAlert, Loader2, Trophy } from 'lucide-react';
import { sparWithAI } from '../lib/gemini';
import PageWrapper from '../components/PageWrapper';

export default function Debate() {
  const [topic, setTopic] = useState('');
  const [isTopicSet, setIsTopicSet] = useState(false);
  const [argument, setArgument] = useState('');
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [userAdvantage, setUserAdvantage] = useState(50);

  const handleStart = (e) => {
    e.preventDefault();
    if (topic.trim()) setIsTopicSet(true);
  };

  const handleSubmitArgument = async (e) => {
    e.preventDefault();
    if (!argument.trim()) return;

    const currentArg = argument;
    setArgument(''); 
    setIsLoading(true);

    setHistory(prev => [...prev, { role: 'user', text: currentArg }]);

    const response = await sparWithAI(topic, currentArg);
    
    if (response) {
      setHistory(prev => [...prev, { role: 'ai', text: response.rebuttal }]);
      setUserAdvantage(prev => {
        const newScore = prev + response.logicScore;
        return Math.min(Math.max(newScore, 0), 100);
      });
    }
    
    setIsLoading(false);
  };

  return (
    <PageWrapper className="max-w-5xl mx-auto space-y-8 pb-10">
      <header className="glass-panel p-8 rounded-[2rem] relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-500/20 rounded-full filter blur-[80px] pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-editorial font-bold text-white tracking-tight flex items-center gap-4 mb-2">
            <div className="p-3 bg-rose-500/20 rounded-2xl border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.3)]"><Swords className="text-rose-400" size={28}/></div>
            Devil's Advocate
          </h2>
          <p className="text-slate-400 text-lg font-medium ml-16">Test your logic against an AI trained to find your flaws.</p>
        </div>
      </header>

      {!isTopicSet ? (
        <div className="glass-panel rounded-[2rem] p-12 text-center max-w-2xl mx-auto mt-12 relative overflow-hidden">
          <ShieldAlert size={56} className="mx-auto text-rose-500/50 mb-6 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]" />
          <h3 className="text-3xl font-editorial font-bold text-white mb-3">Set the Arena</h3>
          <p className="text-slate-400 mb-8 font-medium">What opinion or concept are you defending today?</p>
          <form onSubmit={handleStart} className="flex flex-col md:flex-row gap-4 relative z-10">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Object-Oriented Programming is outdated..."
              className="flex-1 bg-slate-900/50 text-white placeholder-slate-500 px-6 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-medium"
            />
            <button type="submit" className="bg-rose-500 hover:bg-rose-400 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(244,63,94,0.4)] border border-rose-400 whitespace-nowrap">
              Enter Arena
            </button>
          </form>
        </div>
      ) : (
        <div className="glass-panel rounded-[2rem] p-8 flex flex-col h-[700px] relative overflow-hidden">
          
          {/* THE TUG OF WAR BAR */}
          <div className="mb-8 relative z-10">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-3">
              <span className="text-slate-400">AI Advantage</span>
              <span className="text-rose-400">Your Advantage</span>
            </div>
            <div className="h-6 w-full bg-slate-900/80 rounded-full overflow-hidden flex relative shadow-inner border border-white/5">
              <div 
                className="h-full bg-slate-700 transition-all duration-1000 ease-out"
                style={{ width: `${100 - userAdvantage}%` }}
              ></div>
              <div 
                className="h-full bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(244,63,94,0.6)]"
                style={{ width: `${userAdvantage}%` }}
              ></div>
              {/* Center Marker */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/20 z-10"></div>
            </div>
            {userAdvantage >= 80 && <p className="text-center text-rose-400 font-bold mt-3 animate-pulse text-sm tracking-wide">You are dominating the argument!</p>}
            {userAdvantage <= 20 && <p className="text-center text-slate-400 font-bold mt-3 animate-pulse text-sm tracking-wide">Your logic is falling apart. Regroup!</p>}
          </div>

          {/* CHAT ARENA */}
          <div className="flex-1 overflow-y-auto space-y-6 p-6 mb-6 bg-slate-950/40 rounded-3xl border border-white/5 custom-scrollbar">
            {history.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <Trophy size={48} className="mb-4 opacity-30" />
                <p className="font-editorial text-2xl text-white/80 mb-2">Topic: "{topic}"</p>
                <p className="font-medium">Make your opening statement below.</p>
              </div>
            )}
            
            {history.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-5 rounded-3xl text-sm md:text-base leading-relaxed font-medium shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-rose-500 to-orange-500 text-white rounded-tr-sm border border-rose-400/50' 
                    : 'bg-white/10 backdrop-blur-md text-slate-200 border border-white/10 rounded-tl-sm'
                }`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl rounded-tl-sm border border-white/10 flex items-center gap-3 text-slate-400 font-medium text-sm">
                  <Loader2 size={18} className="animate-spin text-rose-400" /> AI is dismantling your logic...
                </div>
              </div>
            )}
          </div>

          {/* INPUT AREA */}
          <form onSubmit={handleSubmitArgument} className="flex gap-3 relative z-10">
            <input
              type="text"
              value={argument}
              onChange={(e) => setArgument(e.target.value)}
              placeholder="State your argument..."
              className="flex-1 bg-slate-900/60 text-white placeholder-slate-500 px-6 py-5 rounded-2xl border border-white/10 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-medium text-lg shadow-inner"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading || !argument.trim()}
              className="bg-rose-500 hover:bg-rose-400 text-white px-8 rounded-2xl font-bold transition-all shadow-[0_0_15px_rgba(244,63,94,0.4)] disabled:opacity-50 flex items-center justify-center border border-rose-400"
            >
              <Send size={22} className={!isLoading && argument.trim() ? "translate-x-0.5" : ""} />
            </button>
          </form>

        </div>
      )}
    </PageWrapper>
  );
}