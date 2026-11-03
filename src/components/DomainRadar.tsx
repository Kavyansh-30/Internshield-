import React, { useState } from 'react';
import { Search, Globe, AlertTriangle, CheckCircle, ShieldCheck, ArrowRight, ShieldAlert, AlertOctagon } from 'lucide-react';

export const DomainRadar: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [companyVal, setCompanyVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    domain: string;
    riskScore: number;
    isFreeWebmail: boolean;
    isSuspicious: boolean;
    warnings: string[];
    recommendation: string;
  } | null>(null);

  const presets = [
    { label: 'meta-careers-portal.live', company: 'Meta' },
    { label: 'careers@google-hiring-portal.site', company: 'Google' },
    { label: 'recruiter.dave@gmail.com', company: 'Apple' },
    { label: 'university-recruiting@stripe.com', company: 'Stripe' },
  ];

  const handleInspect = async (queryDomain?: string, queryCompany?: string) => {
    const targetDomain = queryDomain || inputVal;
    const targetCompany = queryCompany || companyVal;

    if (!targetDomain.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/quick-domain-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domainOrEmail: targetDomain,
          companyName: targetCompany,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/80 text-cyan-400">
          <Globe className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Recruiter Domain & Spoofing Radar
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Check recruiter email addresses and websites for typosquatting, high-risk TLDs, and free webmail impersonation.
          </p>
        </div>
      </div>

      {/* Input form */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Recruiter Email or Domain
          </label>
          <div className="relative">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. recruiter@amazon-hiring-team.info or @gmail.com"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Claimed Brand / Company
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={companyVal}
              onChange={(e) => setCompanyVal(e.target.value)}
              placeholder="e.g. Amazon, Google, Stripe"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
            <button
              onClick={() => handleInspect()}
              disabled={isLoading || !inputVal.trim()}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shrink-0 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>{isLoading ? 'Checking...' : 'Inspect'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fast preset pills */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-slate-400 font-medium">Quick Test:</span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInputVal(p.label);
              setCompanyVal(p.company);
              handleInspect(p.label, p.company);
            }}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer font-mono"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Inspection Results Box */}
      {result && (
        <div className="mt-6 p-5 rounded-xl bg-slate-950 border border-slate-800 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm sm:text-base font-bold text-white">
                  {result.domain}
                </span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                  result.riskScore >= 60
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : result.riskScore >= 35
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {result.riskScore >= 60 ? 'HIGH RISK PHISHING' : result.riskScore >= 35 ? 'SUSPICIOUS ORIGIN' : 'LEGITIMATE DOMAIN'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {result.recommendation}
              </p>
            </div>

            {/* Risk dial */}
            <div className="flex items-center gap-3 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 self-start sm:self-auto">
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">Threat Rating</div>
                <div className={`text-lg font-mono font-black ${
                  result.riskScore >= 60 ? 'text-rose-400' : result.riskScore >= 35 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {result.riskScore}%
                </div>
              </div>
              {result.riskScore >= 60 ? (
                <AlertOctagon className="w-6 h-6 text-rose-400" />
              ) : (
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              )}
            </div>
          </div>

          {/* Warnings list */}
          <div className="mt-4 space-y-2">
            {result.warnings.length === 0 ? (
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Domain complies with standard corporate naming protocols. No known typosquatting patterns found.</span>
              </div>
            ) : (
              result.warnings.map((w, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 text-xs text-rose-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{w}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
