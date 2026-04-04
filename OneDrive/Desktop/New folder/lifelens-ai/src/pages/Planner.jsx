import React, { useState } from 'react';
import { BookOpen, Calendar, Loader2, Sparkles, Target } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { generateStudyPlan } from '../lib/gemini'; 

export default function Planner() {
  const [topic, setTopic] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic || !timeframe) return;
    
    setIsLoading(true);
    setError(null);
    setPlan(null);
    try {
      const result = await generateStudyPlan(topic, timeframe);
      if (result) {
        setPlan(result);
      } else {
        setError("Failed to generate plan. Please check your API key and network connection.");
      }
    } catch (err) {
      console.error("Failed to generate plan:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper className="max-w-5xl mx-auto pb-10">
      
      {/* Dark Mode Header */}
      <header className="mb-10">
        <h2 className="text-4xl font-editorial font-bold text-white tracking-tight">Smart Study Planner</h2>
        <p className="text-slate-400 mt-2 text-lg font-medium">Let AI map out exactly what you need to do to ace your exams.</p>
      </header>

      {/* Obsidian Glass Form Container */}
      <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
        
        {/* Decorative background glow inside the card */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full filter blur-[80px] pointer-events-none"></div>

        <form onSubmit={handleGenerate} className="relative z-10 flex flex-col md:flex-row gap-6 items-end">
          
          <div className="flex-1 w-full space-y-3">
            <label className="text-sm font-bold text-slate-300 flex items-center gap-2 tracking-wider uppercase">
              <BookOpen size={16} className="text-indigo-400" /> What are you studying?
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Database Management, Java"
              className="w-full bg-slate-900/50 text-white px-6 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium placeholder-slate-600"
            />
          </div>

          <div className="flex-1 w-full space-y-3">
            <label className="text-sm font-bold text-slate-300 flex items-center gap-2 tracking-wider uppercase">
              <Calendar size={16} className="text-purple-400" /> When is the exam?
            </label>
            <input
              type="text"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              placeholder="e.g., Next Friday"
              className="w-full bg-slate-900/50 text-white px-6 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-medium placeholder-slate-600"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading || !topic.trim() || !timeframe.trim()}
            className="w-full md:w-auto h-[58px] px-8 rounded-2xl font-bold text-white transition-all bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
            {isLoading ? 'Mapping...' : 'Generate Plan'}
          </button>
        </form>
      </div>

      {error && (
        <div className="mt-8 glass-panel rounded-[2.5rem] p-10 animate-fade-in-up border border-red-500/30 text-center">
          <p className="text-red-400 font-medium mb-4">{error}</p>
          <p className="text-slate-400 text-sm">
            Note: If you just added your API key to the .env file, you MUST restart your development server (npm run dev) for it to take effect.
          </p>
        </div>
      )}

      {plan && (
        <div className="mt-8 glass-panel rounded-[2.5rem] p-10 animate-fade-in-up border border-indigo-500/30">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
              <Target size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Your Master Plan</h3>
              <p className="text-slate-400 text-sm">Customized strategy for {topic}</p>
            </div>
          </div>
       <div className="space-y-6">
         {Array.isArray(plan) ? plan.map((item, index) => (
           <div key={index} className="relative group">
             {/* Timeline Connector */}
             {index !== plan.length - 1 && (
               <div className="absolute left-[27px] top-[50px] bottom-[-30px] w-0.5 bg-gradient-to-b from-indigo-500/50 to-transparent"></div>
             )}
             
             <div className="flex gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold group-hover:border-indigo-500 group-hover:scale-105 transition-all">
                  {index + 1}
                </div>
                
                <div className="flex-1 pb-8">
                  <div className="bg-slate-900/30 rounded-3xl p-6 border border-white/5 group-hover:border-white/10 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <h4 className="text-xl font-bold text-white">{item.day}</h4>
                      <span className="px-4 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-bold border border-indigo-500/20">
                        {item.focus}
                      </span>
                    </div>
                    
                    <ul className="space-y-3">
                      {item.tasks.map((task, tidx) => (
                        <li key={tidx} className="flex items-start gap-3 text-slate-400">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></div>
                          <span className="text-lg">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
             </div>
           </div>
         )) : (
           <div className="text-slate-400 italic">Something went wrong. Please try again.</div>
         )}
       </div>
        </div>
      )}
    </PageWrapper>
  );
}