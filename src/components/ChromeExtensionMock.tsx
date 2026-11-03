import React, { useState } from 'react';
import { Terminal, ShieldAlert, ShieldCheck, ExternalLink, ArrowRight, Check, AlertTriangle, Eye, Shield } from 'lucide-react';

export const ChromeExtensionMock: React.FC<{ onOpenScannerWithScam: () => void }> = ({ onOpenScannerWithScam }) => {
  const [selectedJob, setSelectedJob] = useState<'scam' | 'legit'>('scam');
  const [extensionExpanded, setExtensionExpanded] = useState(true);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-800/80 text-purple-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Browser Extension Live Simulation
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-700">
                Chrome / Edge / Firefox
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              See how InternShield injects real-time safety telemetry directly into LinkedIn, Handshake, and Indeed.
            </p>
          </div>
        </div>

        {/* Toggle between simulated jobs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedJob('scam')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedJob === 'scam'
                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Suspicious Job Posting
          </button>
          <button
            onClick={() => setSelectedJob('legit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedJob === 'legit'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Legitimate Job Posting
          </button>
        </div>
      </div>

      {/* Simulated Browser Window */}
      <div className="rounded-xl border border-slate-700 bg-slate-950 overflow-hidden shadow-2xl">
        {/* Browser Top Bar */}
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-[11px] text-slate-400 font-mono truncate flex items-center gap-2">
              <span className="text-emerald-400">🔒</span>
              <span>
                {selectedJob === 'scam'
                  ? 'https://www.linkedin.com/jobs/view/94028471-remote-data-entry-intern'
                  : 'https://www.linkedin.com/jobs/view/83910283-software-engineer-intern-stripe'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* InternShield Extension Icon in browser toolbar */}
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-[11px] text-cyan-300 border border-slate-700 font-mono">
              <Shield className="w-3 h-3 text-cyan-400" />
              <span>Shield Active</span>
            </div>
          </div>
        </div>

        {/* Browser Webpage Content */}
        <div className="p-6 relative min-h-[380px] bg-slate-900/60">
          {selectedJob === 'scam' ? (
            /* Scam Posting Content */
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white">
                    Remote Software Operations Intern (Immediate Start)
                  </h4>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <span>Apex Global Innovations</span>
                    <span>•</span>
                    <span>San Francisco, CA (Remote)</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">$45.00/hr</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold">
                  Easy Apply
                </button>
              </div>

              <div className="mt-5 space-y-3 text-xs text-slate-300 leading-relaxed max-w-2xl">
                <p>
                  We are hiring 15 college interns for our Fall / Winter remote cohort. No prior software experience needed; full training provided.
                </p>
                <p className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-400">
                  Requirements: Must have valid checking account. Selected applicants will receive an equipment check to purchase our certified MacBook package from our tech distributor. Immediate interview via Telegram: @ApexHROnboarding.
                </p>
              </div>
            </div>
          ) : (
            /* Legitimate Posting Content */
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white">
                    Software Engineering Intern - Payments Infrastructure
                  </h4>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <span className="font-semibold text-white">Stripe</span>
                    <span>•</span>
                    <span>Seattle, WA or Remote</span>
                    <span>•</span>
                    <span className="text-slate-400">$62.50/hr</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold">
                  Apply on Company Site
                </button>
              </div>

              <div className="mt-5 space-y-3 text-xs text-slate-300 leading-relaxed max-w-2xl">
                <p>
                  Stripe is looking for curious, pragmatic engineers for our 12-week summer internship program. You will write production code that powers millions of global transactions.
                </p>
                <p className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                  Official recruitment handled exclusively through stripe.com/jobs and our university partners. Hardware and relocation stipends provided directly by Stripe.
                </p>
              </div>
            </div>
          )}

          {/* InternShield Floating Injected Browser Overlay Widget */}
          <div className="absolute right-4 bottom-4 w-80 sm:w-88 rounded-xl bg-slate-950 border border-slate-800 shadow-2xl p-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2.5">
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white">InternShield Page Inspector</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                selectedJob === 'scam'
                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                {selectedJob === 'scam' ? 'THREAT DETECTED' : 'SAFE EMPLOYER'}
              </span>
            </div>

            {selectedJob === 'scam' ? (
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-300">
                  <div className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>94% Scam Probability</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Job mentions "equipment check" and directs candidates off-platform to Telegram.
                  </p>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1">
                  <div>🚨 <strong>Vector:</strong> Fake Check / Advance Equipment Fraud</div>
                  <div>🚨 <strong>Contact:</strong> Unofficial Telegram Handle</div>
                </div>

                <button
                  onClick={onOpenScannerWithScam}
                  className="w-full mt-2 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <span>Open Deep Forensic Scan</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-900/60 text-emerald-300">
                  <div className="font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Corporate ATS</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Official domain matching Stripe, Inc. Zero upfront payment or check demands found.
                  </p>
                </div>

                <div className="text-[11px] text-slate-400">
                  Verified domain: <span className="font-mono text-white">stripe.com</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
