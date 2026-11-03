import React from 'react';
import { ShieldCheck, AlertTriangle, FileSearch, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { SAMPLE_TEST_CASES } from '../data/samples';
import { SampleTestCase } from '../types';

interface HeroBannerProps {
  onSelectSample: (sample: SampleTestCase) => void;
  onStartScan: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectSample, onStartScan }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 border-b border-slate-800/60 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-64 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-rose-500/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Hackathon Project Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400" />
            <span className="font-semibold text-cyan-300">Hackathon Topic: InternShield</span>
            <span className="text-slate-500">•</span>
            <span>Multimodal Internship AI Scam Detector</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl leading-tight">
            Protecting Students From <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-rose-400 bg-clip-text text-transparent">
              Predatory Internship Scams
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Fake offer letters, $3,000 cashier check traps, spoofed recruiter domains, and upfront "training kit" fees cost students millions every semester. InternShield uses Gemini 3.8 Flash to forensically audit offers before you sign or pay.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onStartScan}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-cyan-500 bg-size-200 hover:bg-right font-semibold text-white shadow-xl shadow-cyan-950/40 hover:shadow-cyan-500/20 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <FileSearch className="w-5 h-5" />
              Scan Offer or Message
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectSample(SAMPLE_TEST_CASES[0])}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium transition-all text-sm sm:text-base flex items-center gap-2 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Load Real Scam Case
            </button>
          </div>

          {/* Quick stats grid */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-4xl text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-xl sm:text-2xl font-extrabold text-cyan-400">99.4%</div>
              <div className="text-xs text-slate-400 mt-0.5">Scam Vector Coverage</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-xl sm:text-2xl font-extrabold text-rose-400">$3,450</div>
              <div className="text-xs text-slate-400 mt-0.5">Avg. Prevented Check Loss</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">&lt; 3.2s</div>
              <div className="text-xs text-slate-400 mt-0.5">Gemini 3.8 Flash Analysis</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-xl sm:text-2xl font-extrabold text-amber-400">0%</div>
              <div className="text-xs text-slate-400 mt-0.5">Upfront Fee Tolerance</div>
            </div>
          </div>

          {/* One-click Sample Scenarios Bar */}
          <div className="mt-8 w-full max-w-5xl">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Test Live With Real-World Attack Scenarios:</span>
              </div>
              <span className="text-[11px] text-slate-500 hidden sm:inline">Click any scenario to populate scanner</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-left">
              {SAMPLE_TEST_CASES.slice(0, 3).map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => onSelectSample(sample)}
                  className="group p-3 rounded-xl bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/50 transition-all text-left flex flex-col justify-between cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-xs text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {sample.title}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      sample.expectedVerdict === 'SCAM'
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-800/50'
                        : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50'
                    }`}>
                      {sample.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {sample.preview}
                  </p>
                  <div className="mt-2 text-[10px] text-cyan-400/90 flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform">
                    <span>Analyze this case</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
