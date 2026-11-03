/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { Scanner } from './components/Scanner';
import { AnalysisReport } from './components/AnalysisReport';
import { DomainRadar } from './components/DomainRadar';
import { ScamPatterns } from './components/ScamPatterns';
import { ScamQuiz } from './components/ScamQuiz';
import { AdvisorChat } from './components/AdvisorChat';
import { ChromeExtensionMock } from './components/ChromeExtensionMock';
import { Footer } from './components/Footer';
import { SAMPLE_TEST_CASES } from './data/samples';
import { ScamAnalysisResult, SampleTestCase } from './types';
import { ShieldAlert, ShieldCheck, AlertTriangle, ArrowRight, Zap, Bell, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'radar' | 'patterns' | 'quiz' | 'advisor' | 'extension'>('scanner');
  const [analysisResult, setAnalysisResult] = useState<ScamAnalysisResult | null>(null);
  const [selectedSample, setSelectedSample] = useState<SampleTestCase | null>(null);

  const scannerRef = useRef<HTMLDivElement>(null);

  const handleSelectSample = (sample: SampleTestCase) => {
    setSelectedSample(sample);
    setAnalysisResult(null);
    setActiveTab('scanner');
    setTimeout(() => {
      scannerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAnalysisComplete = (result: ScamAnalysisResult) => {
    setAnalysisResult(result);
    setTimeout(() => {
      scannerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNewScan = () => {
    setAnalysisResult(null);
    setSelectedSample(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 flex flex-col font-sans">
      {/* Top Banner Alert / Ticker */}
      <div className="bg-gradient-to-r from-rose-900/40 via-indigo-900/40 to-cyan-900/40 border-b border-slate-800/80 px-4 py-2 text-center text-[11px] sm:text-xs text-slate-300 flex items-center justify-center gap-2">
        <Bell className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
        <span>
          <strong>Campus Threat Alert:</strong> Surge in Telegram fake check equipment schemes and ₹4,500 "onboarding kit" scams targeting 2026 summer applicants.
        </span>
        <button
          onClick={() => setActiveTab('patterns')}
          className="underline text-cyan-400 hover:text-cyan-300 ml-1 font-semibold cursor-pointer hidden sm:inline"
        >
          View Threat Intelligence
        </button>
      </div>

      {/* Main Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Banner (visible on main scanner tab) */}
      {activeTab === 'scanner' && (
        <HeroBanner
          onSelectSample={handleSelectSample}
          onStartScan={() => {
            scannerRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* Content Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'scanner' && (
          <div ref={scannerRef} className="space-y-8">
            {analysisResult ? (
              <AnalysisReport
                result={analysisResult}
                onNewScan={handleNewScan}
              />
            ) : (
              <div>
                <Scanner
                  onAnalysisComplete={handleAnalysisComplete}
                  selectedSample={selectedSample}
                  onClearSample={() => setSelectedSample(null)}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'radar' && (
          <div className="space-y-6">
            <DomainRadar />
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-6">
            <ScamPatterns
              onLoadSampleById={(id) => {
                const found = SAMPLE_TEST_CASES.find(s => s.id === id);
                if (found) handleSelectSample(found);
              }}
            />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <ScamQuiz />
          </div>
        )}

        {activeTab === 'advisor' && (
          <div className="space-y-6">
            <AdvisorChat />
          </div>
        )}

        {activeTab === 'extension' && (
          <div className="space-y-6">
            <ChromeExtensionMock
              onOpenScannerWithScam={() => {
                handleSelectSample(SAMPLE_TEST_CASES[0]);
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
