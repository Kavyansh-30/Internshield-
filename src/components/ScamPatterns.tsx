import React, { useState } from 'react';
import { COMMON_SCAM_PATTERNS } from '../data/samples';
import { AlertTriangle, ShieldAlert, CheckCircle, HelpCircle, Shield, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface ScamPatternsProps {
  onLoadSampleById?: (id: string) => void;
}

export const ScamPatterns: React.FC<ScamPatternsProps> = ({ onLoadSampleById }) => {
  const [selectedPattern, setSelectedPattern] = useState(COMMON_SCAM_PATTERNS[0].id);

  const active = COMMON_SCAM_PATTERNS.find(p => p.id === selectedPattern) || COMMON_SCAM_PATTERNS[0];

  return (
    <div className="space-y-6">
      {/* Overview header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Scam Archetypes & Threat Intelligence
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Analysis of the 4 most prevalent criminal strategies targeting college students and job seekers worldwide.
            </p>
          </div>
        </div>

        {/* Pattern Selector Tabs */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {COMMON_SCAM_PATTERNS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPattern(p.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedPattern === p.id
                  ? 'bg-rose-950/40 border-rose-600/80 shadow-md shadow-rose-950/30'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                  {p.frequency.split(' ')[0]} Priority
                </span>
                <strong className={`text-xs sm:text-sm font-semibold block leading-tight ${
                  selectedPattern === p.id ? 'text-white' : 'text-slate-300'
                }`}>
                  {p.title}
                </strong>
              </div>
              <span className="text-[10px] text-slate-500 mt-2 font-mono">
                {p.victimImpact.split('+')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Active Pattern Deep-Dive Card */}
        <div className="mt-6 p-5 sm:p-6 rounded-xl bg-slate-950 border border-slate-800/90">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-rose-400 font-semibold uppercase tracking-wider">
                Threat Breakdown
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                {active.title}
              </h4>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                Frequency: <strong>{active.frequency}</strong>
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                How The Trap Works (Mechanics)
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800/80">
                {active.mechanics}
              </p>

              <div className="mt-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
                  Dead Giveaway / Tell-Tale Sign
                </h5>
                <p className="text-xs text-rose-200 bg-rose-950/30 p-2.5 rounded-lg border border-rose-900/50">
                  "{active.tellTaleSign}"
                </p>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                InternShield Safe Handling Protocol
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800/80">
                {active.safeHandling}
              </p>

              <div className="mt-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  Estimated Financial & Career Damage
                </h5>
                <p className="text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80 font-mono">
                  {active.victimImpact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison: Real vs Scam Internship */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl">
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          <span>The Golden Standard: Legitimate vs Predatory Internships</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Legitimate Column */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/60">
            <div className="flex items-center gap-2 mb-3 text-emerald-300 font-bold text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Legitimate Employer Protocol</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Hardware Shipped Directly:</strong> Company provides a managed laptop via corporate IT (Apple/Dell/Jamf) at zero cost.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Authenticated Email:</strong> All correspondence originates from official domain (e.g. <code>@company.com</code>).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Rigorous Video Interviews:</strong> Multiple structured rounds with engineering/management over Google Meet or Zoom.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Standard ATS Portals:</strong> Offers and background checks handled via Workday, Greenhouse, Lever, or Checkr.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Zero Money Flow to Employer:</strong> You NEVER pay for training, onboarding kits, or equipment deposits.</span>
              </li>
            </ul>
          </div>

          {/* Scam Column */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/60">
            <div className="flex items-center gap-2 mb-3 text-rose-300 font-bold text-sm">
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>Predatory Scam Red Flags</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>Cashier's Check Trap:</strong> Asks you to deposit a check and wire money to their "vendor" for equipment.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>Free/Lookalike Emails:</strong> Uses <code>@gmail.com</code> or <code>company-careers-portal.live</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>Telegram/Text Screening:</strong> Quick 15-minute text questionnaire without camera or technical evaluation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>Premature PII Demands:</strong> Demands SSN, driver's license scans, or banking details before formal contract.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✗</span>
                <span><strong>"Refundable" Training Fee:</strong> Demands upfront payment for certificate, cloud VM, or onboarding kit.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
