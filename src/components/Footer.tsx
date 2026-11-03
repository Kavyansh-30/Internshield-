import React from 'react';
import { ShieldCheck, Heart, ExternalLink, Award, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 py-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white">
                Intern<span className="text-cyan-400">Shield</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hackathon project built to protect university students, fresh graduates, and career changers from predatory employment scams and financial loss.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-cyan-300 font-mono">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Powered by Gemini 3.8 Flash</span>
            </div>
          </div>

          {/* Core Defense Pillars */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Core Capabilities
            </h5>
            <ul className="space-y-1.5">
              <li>• Multimodal Offer Letter Forensic Audit</li>
              <li>• Recruiter Lookalike Domain Radar</li>
              <li>• Fake Check & Overpayment Scheme Detection</li>
              <li>• Telegram & WhatsApp Interview Trap Warnings</li>
              <li>• Counter-Inquiry Letter Generator</li>
            </ul>
          </div>

          {/* Official Hotlines */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Emergency Reporting Hotlines
            </h5>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://reportfraud.ftc.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <span>Federal Trade Commission (FTC)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ic3.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <span>FBI Internet Crime Complaint (IC3)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.bbb.org/scamtracker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <span>BBB Scam Tracker</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Hackathon Submission Credentials */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Hackathon Topic</span>
            </h5>
            <p className="text-slate-400 text-xs leading-relaxed">
              <strong>InternShield - Internship AI Scam Detector</strong>
            </p>
            <p className="text-[11px] text-slate-500 mt-2">
              Built with zero client-side key leaks, server-authoritative analysis, heuristic failovers, and rigorous student privacy protections.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © 2026 InternShield. Free open public resource for student safety.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with precision for the hackathon</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
