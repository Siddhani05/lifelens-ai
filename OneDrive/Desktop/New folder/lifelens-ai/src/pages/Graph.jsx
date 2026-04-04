import React, { useState, useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { getDb } from '../lib/storage';
import { Network, ZoomIn, ZoomOut, Target } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

export default function Graph() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef(null);
  const fgRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({ width: containerRef.current.clientWidth, height: containerRef.current.clientHeight });
    }

    const db = getDb();
    const tasks = db.quickTasks || [];

    // The Central "Brain" Node
    const nodes = [
      { id: 'Core', name: 'Neurolink Core', val: 30, color: '#5C38FF', borderColor: '#00F0FF' } // cosmic-indigo and cosmic-cyan
    ];
    const links = [];

    tasks.forEach(task => {
      nodes.push({
        id: task.id,
        name: task.text,
        val: 12,
        // Completed: Glowing Cyan. Pending: Muted Slate.
        color: task.done ? '#00F0FF' : 'rgba(255,255,255,0.05)',
        borderColor: task.done ? '#E02CFF' : 'rgba(255,255,255,0.2)'
      });
      
      links.push({
        source: 'Core',
        target: task.id,
        color: task.done ? 'rgba(0, 240, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)'
      });
    });

    setGraphData({ nodes, links });
  }, []);

  // Premium Cosmic Node Rendering
  const paintNode = (node, ctx, globalScale) => {
    const label = node.name;
    const fontSize = 14 / globalScale;
    ctx.font = `600 ${fontSize}px "Outfit", sans-serif`;
    
    // Draw glowing orb base
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI, false);
    ctx.fillStyle = node.color;
    
    // Add Glow Effect
    ctx.shadowColor = node.borderColor || node.color;
    ctx.shadowBlur = 15;
    ctx.fill();
    
    // Draw Sharp Border
    ctx.lineWidth = 2 / globalScale;
    ctx.strokeStyle = node.borderColor || node.color;
    ctx.stroke();

    // Reset shadow for text
    ctx.shadowBlur = 0;

    // Draw White Text Label
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#f8fafc'; 
    
    // Add a tiny dark shadow behind the text for readability
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 4;
    ctx.fillText(label, node.x, node.y + node.val + 6);
    
    // Reset shadow
    ctx.shadowBlur = 0;
  };

  return (
    <PageWrapper className="max-w-7xl mx-auto space-y-6 pb-10 h-[calc(100vh-80px)] flex flex-col">
      
      {/* Premium Header */}
      <header className="glass-card p-8 shrink-0 relative overflow-hidden group">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-cosmic-cyan/10 rounded-full filter blur-[80px] pointer-events-none group-hover:bg-cosmic-cyan/20 transition-all duration-700"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-editorial font-bold text-white tracking-tight flex items-center gap-4 mb-2">
              <div className="p-3 bg-cosmic-cyan/10 rounded-2xl border border-cosmic-cyan/30 shadow-[0_0_20px_rgba(0,240,255,0.3)] animate-pulse-glow">
                <Network className="text-cosmic-cyan" size={28}/>
              </div>
              Neural Web
            </h2>
            <p className="text-slate-400 mt-2 text-lg font-medium ml-[4.5rem]">An interactive constellation of your expanding intelligence.</p>
          </div>
          
          <div className="flex gap-3 ml-[4.5rem] md:ml-0">
            <button onClick={() => fgRef.current?.zoom(fgRef.current.zoom() * 1.2, 400)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-cosmic-cyan border border-white/10 transition-all shadow-lg hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:-translate-y-1">
              <ZoomIn size={20} />
            </button>
            <button onClick={() => fgRef.current?.zoom(fgRef.current.zoom() / 1.2, 400)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-cosmic-cyan border border-white/10 transition-all shadow-lg hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:-translate-y-1">
              <ZoomOut size={20} />
            </button>
            <button onClick={() => fgRef.current?.zoomToFit(400)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-cosmic-cyan border border-white/10 transition-all shadow-lg hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:-translate-y-1">
              <Target size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* The Interactive Canvas Container */}
      <div 
        ref={containerRef} 
        className="flex-1 glass-card overflow-hidden relative cursor-grab active:cursor-grabbing"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-900/40 to-transparent pointer-events-none z-0"></div>
        {graphData.nodes.length > 1 ? (
          <ForceGraph2D
            ref={fgRef}
            width={dimensions.width}
            height={dimensions.height}
            graphData={graphData}
            nodeCanvasObject={paintNode}
            linkColor={link => link.color}
            linkWidth={3} 
            d3VelocityDecay={0.1} 
            cooldownTicks={100}
            onEngineStop={() => fgRef.current?.zoomToFit(400, 50)}
            backgroundColor="rgba(0,0,0,0)" // Transparent background
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 z-10">
            <Network size={80} className="mb-6 opacity-20" />
            <p className="font-editorial text-3xl font-bold text-white mb-2">The Constellation is empty.</p>
            <p className="text-lg font-medium">Return to the Dashboard and log Target Objectives to build your network.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}