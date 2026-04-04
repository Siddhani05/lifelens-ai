import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler } from 'chart.js';
import { getDb, addTaskToDb, completeTaskInDb } from '../lib/storage';
import { CheckCircle, Circle, Target, Play, Activity, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler);

// Staggered variants for Bento boxes
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  const userName = localStorage.getItem('userName') || 'Scholar';
  const [db, setDb] = useState(null);
  const [newTask, setNewTask] = useState('');

  useEffect(() => { setDb(getDb()); }, []);

  if (!db) return null;

  const totalTasks = db.quickTasks?.length || 0;
  const completedTasks = db.quickTasks?.filter(t => t.done).length || 0;
  const remainingTasks = totalTasks - completedTasks;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setDb(addTaskToDb(newTask)); 
    setNewTask('');
  };

  const handleComplete = (taskId) => { setDb(completeTaskInDb(taskId)); };

  // Premium Cosmic Chart Styling
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Focus Score',
      data: db.productivity || [0, 0, 0, 0, 0, 0, 0],
      borderColor: '#00F0FF', // cosmic-cyan
      backgroundColor: 'rgba(0, 240, 255, 0.1)', 
      borderWidth: 4,
      pointBackgroundColor: '#0B0B1A',
      pointBorderColor: '#E02CFF', // neon
      pointBorderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 8,
      tension: 0.4, 
      fill: true,
    }]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { padding: 12, cornerRadius: 10, titleFont: { size: 14 } } },
    scales: {
      y: { display: false, min: 0, max: 120 }, 
      x: { grid: { display: false }, ticks: { color: '#64748b', font: { family: 'Outfit', size: 13, weight: '600' } } }
    }
  };

  const doughnutData = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: totalTasks === 0 ? [0, 1] : [completedTasks, remainingTasks],
      backgroundColor: totalTasks === 0 ? ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)'] : ['#00F0FF', '#15152F'], 
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  return (
    <PageWrapper>
      <motion.div 
        className="max-w-7xl mx-auto space-y-8 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        
        {/* 1. HERO BANNER */}
        <motion.header variants={itemVariants} className="relative flex flex-col md:flex-row md:justify-between items-center md:items-end gap-10 p-10 md:p-14 glass-card overflow-hidden group border-t border-t-cosmic-cyan/30">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-cosmic-indigo/40 rounded-full filter blur-[100px] pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cosmic-neon/30 rounded-full filter blur-[100px] pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
          
          <div className="relative z-10 text-center md:text-left w-full md:w-auto">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
               <div className="px-3 py-1 bg-white/10 rounded-full border border-white/20 text-xs font-bold tracking-widest text-cosmic-cyan uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cosmic-neon rounded-full animate-pulse"></span> System Active
               </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-editorial font-bold text-white tracking-tight drop-shadow-lg">
              Welcome back, <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cosmic-cyan to-cosmic-neon">{userName}.</span>
            </h2>
            <p className="text-slate-300 mt-4 text-xl font-medium tracking-wide">Your sanctuary for deep, focused work.</p>
          </div>
          
          <Link 
            to="/flow" 
            className="relative z-10 inline-flex items-center justify-center px-10 py-5 font-bold text-white text-lg transition-all duration-300 bg-cosmic-indigo hover:bg-cosmic-indigo/80 rounded-full shadow-[0_0_30px_rgba(92,56,255,0.4)] hover:shadow-[0_0_40px_rgba(92,56,255,0.6)] transform hover:-translate-y-1 active:translate-y-0 border border-cosmic-cyan/30"
          >
            <span className="relative flex items-center gap-3">
              <Play size={22} fill="currentColor" /> Enter Flow State
            </span>
          </Link>
        </motion.header>

        {/* 2. BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="lg:col-span-2 glass-card p-10 group relative overflow-hidden transition-all duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cosmic-cyan/5 rounded-full filter blur-[80px] pointer-events-none group-hover:bg-cosmic-cyan/10 transition-colors duration-500"></div>
            <div className="flex justify-between items-center mb-8 relative z-10">
              <h3 className="text-2xl font-editorial font-bold text-white tracking-tight flex items-center gap-4">
                <div className="p-3 bg-cosmic-indigo/30 border border-cosmic-indigo/50 rounded-2xl shadow-[0_0_15px_rgba(92,56,255,0.3)]">
                  <Activity size={24} className="text-cosmic-cyan" />
                </div>
                Neural Trajectory
              </h3>
              <span className="px-5 py-2 glass-panel text-cosmic-cyan font-bold uppercase tracking-wider rounded-full flex items-center gap-2 text-xs hover:bg-white/10 transition-colors">
                Live Feed
              </span>
            </div>
            <div className="h-72 w-full relative z-10">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="glass-card p-10 flex flex-col justify-center items-center relative overflow-hidden group transition-all duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-gradient-to-b from-cosmic-neon/5 to-transparent pointer-events-none group-hover:from-cosmic-neon/10 transition-colors duration-500"></div>
            <h3 className="text-2xl font-editorial font-bold text-white tracking-tight w-full text-left mb-8 flex items-center gap-4 relative z-10">
               <div className="p-3 bg-cosmic-neon/30 border border-cosmic-neon/50 rounded-2xl shadow-[0_0_15px_rgba(224,44,255,0.3)]">
                 <Target size={24} className="text-cosmic-neon" />
               </div>
              Mastery Matrix
            </h3>
            <div className="h-56 w-56 relative group/chart mb-8 z-10">
              <Doughnut data={doughnutData} options={{ cutout: '75%', animation: { animateScale: true }, plugins: { tooltip: { enabled: false } } }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2 transition-transform duration-300 group-hover/chart:scale-110">
                 <span className="text-5xl font-editorial font-bold text-white px-2 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">{progressPercentage}%</span>
              </div>
            </div>
            <div className="glass-panel px-6 py-3 rounded-full w-full text-center relative z-10 group-hover:bg-white/10 transition-colors">
              <p className="text-sm text-slate-300 font-bold uppercase tracking-widest">
                <span className="text-cosmic-cyan text-lg">{completedTasks}</span> / {totalTasks} CONQUERED
              </p>
            </div>
          </motion.div>
        </div>

        {/* 3. BOTTOM ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT: Inputs */}
          <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="glass-card p-10 relative overflow-hidden transition-all duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cosmic-cyan/10 rounded-full filter blur-[80px] pointer-events-none"></div>
            <h3 className="text-2xl font-editorial font-bold text-white mb-8 flex items-center gap-4 tracking-tight relative z-10">
              <div className="p-3 bg-cosmic-cyan/20 border border-cosmic-cyan/40 rounded-2xl shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Zap className="text-cosmic-cyan" size={24}/>
              </div>
              Target Objectives
            </h3>
            
            <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-4 mb-10 relative z-10">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What are we conquering today?"
                className="flex-1 bg-cosmic-900/60 text-white placeholder-slate-500 px-8 py-5 rounded-[1.5rem] border border-white/10 focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan transition-all font-medium text-lg backdrop-blur-md"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!newTask.trim()}
                className="bg-gradient-to-r from-cosmic-cyan to-cosmic-indigo hover:from-cosmic-cyan hover:to-cosmic-cyan text-white px-8 py-5 rounded-[1.5rem] font-bold text-lg transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center disabled:opacity-50 group border border-white/20"
              >
                <ArrowRight size={24} className="group-hover:translate-x-1 duration-300 transition-transform" />
              </motion.button>
            </form>

            <div className="space-y-4 relative z-10 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
              <AnimatePresence>
                {db.quickTasks?.map((task) => (
                  <motion.div 
                    key={task.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <div 
                      onClick={() => handleComplete(task.id)}
                      className={`group flex items-center gap-5 p-5 rounded-[1.2rem] transition-all duration-300 cursor-pointer border ${
                        task.done 
                          ? 'bg-cosmic-900/40 border-white/5 opacity-60' 
                          : 'bg-white/5 border-white/10 hover:border-cosmic-cyan hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)]'
                      }`}
                    >
                      {task.done ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <CheckCircle size={26} className="text-cosmic-cyan shrink-0 drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                        </motion.div>
                      ) : (
                        <Circle size={26} className="text-slate-500 group-hover:text-cosmic-cyan shrink-0 transition-colors" />
                      )}
                      <span className={`text-[16px] font-medium transition-all duration-300 ${
                        task.done ? 'line-through text-slate-500' : 'text-slate-200 group-hover:text-white'
                      }`}>
                        {task.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT: Timeline */}
          <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="glass-card p-10 relative overflow-hidden transition-all duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
            <div className="absolute right-0 top-0 w-64 h-64 bg-cosmic-neon/10 rounded-full filter blur-[80px] pointer-events-none"></div>
            <h3 className="text-2xl font-editorial font-bold text-white mb-10 flex items-center gap-4 tracking-tight relative z-10">
               <div className="p-3 bg-cosmic-neon/20 border border-cosmic-neon/40 rounded-2xl shadow-[0_0_15px_rgba(224,44,255,0.3)]">
                 <Sparkles className="text-cosmic-neon" size={24}/>
               </div>
              Neural Log Feed
            </h3>
            
            <div className="relative border-l-2 border-white/10 ml-8 space-y-10 pb-4 z-10">
              <AnimatePresence>
                {(db.activityLog || []).slice(0, 4).map((log, index) => (
                  <motion.div 
                    key={log.id} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-12 group"
                  >
                    <span className={`absolute -left-[25px] top-1 h-12 w-12 rounded-full flex items-center justify-center border-4 border-cosmic-800 transition-transform duration-300 group-hover:scale-110 shadow-lg ${
                      log.type === 'success' ? 'bg-gradient-to-br from-cosmic-cyan to-cosmic-indigo text-white shadow-[0_0_15px_rgba(0,240,255,0.5)]' : 'bg-cosmic-900 border-white/10 text-slate-400'
                    }`}>
                      {log.type === 'success' ? <Zap size={18} fill="currentColor" /> : <Target size={18} />}
                    </span>
                    
                    <div className="glass-panel rounded-[1.5rem] p-6 transition-all duration-300 group-hover:border-cosmic-cyan/50 group-hover:shadow-[0_10px_30px_rgba(0,240,255,0.1)] group-hover:-translate-y-1 hover:bg-white/10">
                      <div className="flex justify-between items-center mb-3">
                        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                          log.type === 'success' ? 'bg-cosmic-cyan/10 border-cosmic-cyan/30 text-cosmic-cyan' : 'bg-white/5 border-white/10 text-slate-400'
                        }`}>
                          {log.type}
                        </span>
                        <span className="text-xs font-bold text-slate-500">{log.time}</span>
                      </div>
                      <p className="text-slate-300 font-medium text-[15px] leading-relaxed">{log.description}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </PageWrapper>
  );
}
