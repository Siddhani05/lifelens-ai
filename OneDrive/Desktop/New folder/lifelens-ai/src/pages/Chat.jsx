import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Bot } from 'lucide-react';
import { askGemini } from '../lib/gemini';
import PageWrapper from '../components/PageWrapper';

export default function Chat() {
  const [messages, setMessages] = useState([{ role: 'ai', text: "System Online. I am LifeLens Neural Assistant. What concepts are we mastering today?" }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await askGemini(userMessage);
    
    setMessages((prev) => [...prev, { role: 'ai', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <PageWrapper className="max-w-5xl mx-auto h-[85vh] flex flex-col glass-card overflow-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cosmic-indigo/20 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cosmic-cyan/10 rounded-full filter blur-[100px] pointer-events-none"></div>

      {/* Premium Header */}
      <div className="bg-cosmic-900/60 backdrop-blur-[30px] border-b border-cosmic-cyan/20 p-6 flex items-center gap-4 relative z-10 shrink-0">
        <div className="p-3 bg-cosmic-cyan/10 rounded-xl border border-cosmic-cyan/30 shadow-[0_0_15px_rgba(0,240,255,0.2)] animate-pulse-glow">
          <Bot className="text-cosmic-cyan" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-editorial font-bold text-white tracking-wide">AI Tutor Copilot</h2>
          <p className="text-xs font-bold text-cosmic-neon uppercase tracking-widest flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-cosmic-cyan animate-pulse shadow-[0_0_10px_rgba(0,240,255,0.8)]"></span>
            Neural Link Established
          </p>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 custom-scrollbar relative z-10">
        {messages.map((msg, index) => (
           <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`} style={{ animationDuration: '0.3s' }}>
            <div className={`max-w-[85%] md:max-w-[75%] p-5 text-[15px] md:text-base leading-relaxed font-medium shadow-2xl relative ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-cosmic-indigo/80 to-cosmic-900 text-white rounded-[1.5rem] rounded-tr-sm border border-cosmic-cyan/50 shadow-[0_0_20px_rgba(0,240,255,0.2)]' 
                : 'glass-panel text-slate-200 border border-white/10 rounded-[1.5rem] rounded-tl-sm'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
             <div className="glass-panel border-white/10 p-5 rounded-[1.5rem] rounded-tl-sm flex gap-2 shadow-sm items-center h-[56px]">
                <div className="w-2.5 h-2.5 bg-cosmic-cyan rounded-full animate-bounce shadow-[0_0_10px_rgba(0,240,255,0.8)]"></div>
                <div className="w-2.5 h-2.5 bg-cosmic-indigo rounded-full animate-bounce shadow-[0_0_10px_rgba(92,56,255,0.8)]" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2.5 h-2.5 bg-cosmic-neon rounded-full animate-bounce shadow-[0_0_10px_rgba(224,44,255,0.8)]" style={{ animationDelay: '300ms' }}></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="p-6 bg-cosmic-900/60 backdrop-blur-[30px] border-t border-cosmic-cyan/20 flex gap-4 relative z-10 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Transmit your query..."
          className="flex-1 bg-cosmic-800/50 text-white placeholder-slate-500 px-6 py-5 rounded-[1.5rem] border border-white/10 focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan transition-all font-medium backdrop-blur-md shadow-inner"
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-br from-cosmic-cyan to-cosmic-indigo hover:from-cosmic-cyan hover:to-cosmic-cyan text-white px-8 rounded-[1.5rem] transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] disabled:opacity-50 flex items-center justify-center border border-white/20 group"
        >
          <Send size={24} className={!isLoading && input.trim() ? "translate-x-1 transition-transform" : ""} />
        </button>
      </form>
    </PageWrapper>
  );
}