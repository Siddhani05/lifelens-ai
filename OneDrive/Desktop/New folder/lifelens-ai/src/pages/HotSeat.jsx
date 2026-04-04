import React, { useState, useEffect } from 'react';
import { Flame, Clock, Terminal, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { getInterviewQuestion, evaluateInterviewAnswer } from '../lib/gemini';
import PageWrapper from '../components/PageWrapper';

export default function HotSeat() {
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState('setup'); 
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let timer;
    if (status === 'active' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (status === 'active' && timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  const startInterview = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setStatus('loading');
    const q = await getInterviewQuestion(topic);
    setQuestion(q);
    setAnswer('');
    setTimeLeft(60);
    setStatus('active');
  };

  const handleTimeUp = async () => {
    setStatus('evaluating');
    const evaluation = await evaluateInterviewAnswer(question, answer);
    setResult(evaluation);
    setStatus('result');
  };

  const submitEarly = () => handleTimeUp();
  const reset = () => { setStatus('setup'); setTopic(''); setResult(null); };

  if (status === 'setup' || status === 'loading') {
    return (
      <PageWrapper className="max-w-4xl mx-auto mt-10 space-y-8">
        <header className="glass-panel p-8 rounded-[2rem] text-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500/20 rounded-full filter blur-[80px] pointer-events-none"></div>
          
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-rose-500/20 border border-orange-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            <Flame className="text-orange-400" size={32} />
          </div>
          <h2 className="text-4xl font-editorial font-bold text-white tracking-tight relative z-10">The Hot Seat</h2>
          <p className="text-slate-400 mt-3 text-lg font-medium max-w-xl mx-auto relative z-10">
            60 seconds. One brutal technical question. Will you crack under pressure or prove your mastery?
          </p>
        </header>

        <div className="glass-panel rounded-[2rem] p-10 text-center relative z-10">
          <form onSubmit={startInterview} className="max-w-lg mx-auto space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-widest">Interview Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Data Structures, React.js, C++..."
                disabled={status === 'loading'}
                className="w-full bg-slate-900/50 text-white placeholder-slate-500 px-6 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium shadow-inner"
              />
            </div>
            <button 
              type="submit"
              disabled={!topic.trim() || status === 'loading'}
              className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <Flame size={20} />}
              {status === 'loading' ? 'Generating Question...' : 'Enter the Hot Seat'}
            </button>
          </form>
        </div>
      </PageWrapper>
    );
  }

  // THE HIGH PRESSURE TERMINAL UI
  return (
    <PageWrapper className="fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center p-6">
      <div className="noise-overlay opacity-10"></div>
      
      <div className="w-full max-w-4xl bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col h-[80vh] relative z-10">
        
        <div className="bg-[#020617] p-6 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3 text-slate-500 font-mono text-sm">
            <Terminal size={18} />
            <span>sys.interview.session_active</span>
          </div>
          
          {status === 'active' && (
            <div className={`flex items-center gap-2 text-3xl font-black font-mono tabular-nums drop-shadow-md ${timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
              <Clock size={28} />
              00:{timeLeft.toString().padStart(2, '0')}
            </div>
          )}
        </div>

        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
          {status === 'evaluating' ? (
             <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-6">
               <Loader2 size={64} className="animate-spin text-orange-500" />
               <p className="text-xl font-mono tracking-widest uppercase animate-pulse text-orange-400/80">Evaluating parameters...</p>
             </div>
          ) : status === 'result' ? (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center">
                {result.hired ? (
                  <CheckCircle size={80} className="mx-auto text-emerald-500 mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                ) : (
                  <XCircle size={80} className="mx-auto text-rose-500 mb-4 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
                )}
                <h2 className="text-4xl font-black text-white uppercase tracking-widest">
                  {result.hired ? 'Hired' : 'Rejected'}
                </h2>
                <p className="text-slate-400 font-mono mt-2">Technical Score: <span className="text-white font-bold">{result.score}/100</span></p>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-slate-500 font-bold mb-3 uppercase text-xs tracking-widest">Interviewer Feedback</h3>
                <p className="text-slate-300 leading-relaxed font-mono">{result.feedback}</p>
              </div>
              <button onClick={reset} className="mx-auto block bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-lg">
                End Session
              </button>
            </div>
          ) : (
            <div className="space-y-6 flex flex-col h-full">
              <div>
                <span className="text-orange-500 font-bold font-mono text-sm uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={14}/> Question Prompt
                </span>
                <h2 className="text-2xl font-bold text-slate-100 mt-4 leading-relaxed">{question}</h2>
              </div>
              <textarea
                autoFocus
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here. Don't freeze..."
                className="flex-1 w-full bg-[#020617]/50 text-emerald-400 font-mono p-6 rounded-2xl border border-slate-800 focus:outline-none focus:border-slate-600 resize-none leading-relaxed shadow-inner"
              />
              <button 
                onClick={submitEarly}
                className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-500 transition-colors ml-auto flex items-center gap-2 font-mono uppercase tracking-wider border border-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.3)]"
              >
                Submit Answer
              </button>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}