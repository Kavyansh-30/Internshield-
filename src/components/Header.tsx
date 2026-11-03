import React from 'react';
import { ShieldAlert, ShieldCheck, Zap, Sparkles, BookOpen, Search, HelpCircle, Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: 'scanner' | 'radar' | 'patterns' | 'quiz' | 'advisor' | 'extension';
  setActiveTab: (tab: 'scanner' | 'radar' | 'patterns' | 'quiz' | 'advisor' | 'extension') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('scanner')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-500 to-rose-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-cyan-500/30 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Intern<span className="text-cyan-400">Shield</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                  AI Forensic v3.8
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Autonomous Defense Against Fake Internships & Fee Extortion
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('scanner')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'scanner'
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              AI Scanner
            </button>
            <button
              onClick={() => setActiveTab('radar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'radar'
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Domain Radar
            </button>
            <button
              onClick={() => setActiveTab('patterns')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'patterns'
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Scam Database
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Defense IQ Quiz
            </button>
            <button
              onClick={() => setActiveTab('advisor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'advisor'
                  ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              Safety Counselor
            </button>
            <button
              onClick={() => setActiveTab('extension')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'extension'
                  ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              Chrome Plugin
            </button>
          </nav>

          {/* Live System Indicator */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real-Time Defense Active</span>
            </div>
            <button
              onClick={() => setActiveTab('scanner')}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md shadow-indigo-900/30 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Scan Offer Now
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-900 scrollbar-none">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-2.5 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'scanner' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
            }`}
          >
            Scanner
          </button>
          <button
            onClick={() => setActiveTab('radar')}
            className={`px-2.5 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'radar' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
            }`}
          >
            Domain Radar
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={`px-2.5 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'patterns' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
            }`}
          >
            Scam Database
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-2.5 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'quiz' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400'
            }`}
          >
            Defense Quiz
          </button>
          <button
            onClick={() => setActiveTab('advisor')}
            className={`px-2.5 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'advisor' ? 'bg-indigo-500/20 text-indigo-300 font-bold' : 'text-slate-400'
            }`}
          >
            Safety Advisor
          </button>
          <button
            onClick={() => setActiveTab('extension')}
            className={`px-2.5 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'extension' ? 'bg-purple-500/20 text-purple-300 font-bold' : 'text-slate-400'
            }`}
          >
            Plugin Demo
          </button>
        </div>
      </div>
    </header>
  );
};
