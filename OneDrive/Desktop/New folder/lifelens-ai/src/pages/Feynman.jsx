import React, { useState } from 'react';
import { BrainCircuit, Send, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { evaluateFeynman } from '../lib/gemini';
import PageWrapper from '../components/PageWrapper';

export default function Feynman() {
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEvaluate = async (e) => {
    e.preventDefault();
    if (!topic || !explanation) return;

    setIsLoading(true);
    setResult(null);
    const evaluation = await evaluateFeynman(topic, explanation);
    setResult(evaluation);
    setIsLoading(false);
  };

  return (
    <PageWrapper className="max-w-7xl mx-auto space-y-8 pb-10">
      
      {/* PREMIUM HEADER */}
      <header className="glass-panel p-8 rounded-[2rem] relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/20 rounded-full filter blur-[80px] pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-editorial font-bold text-white tracking-tight flex items-center gap-4 mb-2">
            <div className="p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <BrainCircuit className="text-cyan-400" size={28} />
            </div>
            The Feynman Simulator
          </h2>
          <p className="text-slate-400 mt-2 text-lg font-medium ml-[4.5rem]">
            You don't understand it until you can explain it simply. Teach the AI to test your mastery.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: The Input Area */}
        <div className="glass-panel rounded-[2rem] p-8 flex flex-col h-[650px] relative overflow-hidden">
          <form onSubmit={handleEvaluate} className="flex flex-col h-full space-y-6 relative z-10">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                Topic to Master
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., How does a CPU cache work?"
                className="w-full bg-slate-900/50 text-white placeholder-slate-500 px-6 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium"
              />
            </div>
            
            <div className="space-y-3 flex-grow flex flex-col">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                Your Explanation
              </label>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Pretend you are explaining this to a 10-year-old. Write it out in your own words..."
                className="w-full bg-slate-900/50 text-white placeholder-slate-500 px-6 py-5 rounded-2xl border border-white/10 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium leading-relaxed resize-none flex-grow shadow-inner custom-scrollbar"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !topic || !explanation.trim()}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-3 disabled:opacity-50 border border-cyan-400 group"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="group-hover:translate-x-1 transition-transform" />}
              {isLoading ? 'Grading your explanation...' : 'Submit to Professor AI'}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: The AI Results */}
        <div className="h-[650px]">
          
          {/* EMPTY STATE */}
          {!result && !isLoading && (
            <div className="h-full glass-panel rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
              <BrainCircuit size={80} className="text-white/10 mb-6 drop-shadow-md" />
              <h3 className="text-2xl font-editorial font-bold text-slate-300 tracking-tight">Awaiting your lecture</h3>
              <p className="text-slate-500 mt-3 font-medium max-w-sm leading-relaxed">Submit your explanation on the left, and the AI will analyze your logic and find your blind spots.</p>
            </div>
          )}

          {/* LOADING STATE */}
          {isLoading && (
            <div className="h-full glass-panel rounded-[2rem] flex flex-col items-center justify-center p-10 relative overflow-hidden">
               <div className="absolute inset-0 bg-cyan-500/5 animate-pulse"></div>
               <Loader2 size={64} className="animate-spin text-cyan-500 mb-6 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" />
               <p className="text-xl font-editorial font-bold text-cyan-400 tracking-widest uppercase animate-pulse">Analyzing Structure...</p>
            </div>
          )}

          {/* RESULT STATE */}
          {result && (
            <div className="h-full glass-panel rounded-[2rem] p-8 overflow-y-auto custom-scrollbar animate-fade-in-up relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-[80px] pointer-events-none"></div>
              
              <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-8 relative z-10">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Mastery Score</h3>
                  <div className="text-6xl font-black text-cyan-400 tracking-tighter drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">{result.score}%</div>
                </div>
                {result.score >= 90 ? (
                  <CheckCircle size={56} className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                ) : (
                  <div className="w-16 h-16 rounded-2xl border-2 border-white/10 bg-white/5 flex items-center justify-center text-3xl font-black text-slate-300 shadow-inner">
                    {result.score >= 70 ? 'B' : 'C'}
                  </div>
                )}
              </div>

              <div className="space-y-8 relative z-10">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Professor's Notes</h4>
                  <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-inner">
                    <p className="text-slate-300 leading-relaxed font-medium">
                      {result.feedback}
                    </p>
                  </div>
                </div>

                {result.gaps && result.gaps.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <AlertTriangle size={16} /> Knowledge Gaps Detected
                    </h4>
                    <ul className="space-y-3">
                      {result.gaps.map((gap, idx) => (
                        <li key={idx} className="flex gap-4 bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl shadow-sm hover:bg-amber-500/20 transition-colors">
                          <span className="text-amber-500 font-bold mt-0.5">•</span>
                          <span className="text-amber-200/80 font-medium leading-relaxed">{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}