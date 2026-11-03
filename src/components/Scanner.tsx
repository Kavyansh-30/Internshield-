import React, { useState, useRef } from 'react';
import { 
  FileText, 
  MessageSquare, 
  Briefcase, 
  Upload, 
  X, 
  Sparkles, 
  AlertCircle, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw, 
  Info,
  ChevronDown,
  Layers
} from 'lucide-react';
import { SAMPLE_TEST_CASES } from '../data/samples';
import { SampleTestCase, ScamAnalysisResult } from '../types';

interface ScannerProps {
  onAnalysisComplete: (result: ScamAnalysisResult) => void;
  selectedSample?: SampleTestCase | null;
  onClearSample?: () => void;
}

export const Scanner: React.FC<ScannerProps> = ({ 
  onAnalysisComplete, 
  selectedSample,
  onClearSample 
}) => {
  const [activeMode, setActiveMode] = useState<'offer_letter' | 'recruiter_message' | 'job_posting'>('offer_letter');
  const [content, setContent] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [compensation, setCompensation] = useState('');
  const [platform, setPlatform] = useState('Email');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // When a sample test case is passed from parent or hero banner
  React.useEffect(() => {
    if (selectedSample) {
      setContent(selectedSample.fullContent);
      setCompanyName(selectedSample.company);
      setSenderEmail(selectedSample.senderEmail);
      setPlatform(selectedSample.platform);
      setJobTitle('Software Engineering Intern');
      setImagePreview(null);
      setErrorMessage(null);
    }
  }, [selectedSample]);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size exceeds 5MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Run the analysis
  const handleAnalyze = async () => {
    if (!content.trim() && !imagePreview) {
      setErrorMessage('Please paste the offer letter/message text or upload a screenshot.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setScanStep('Initializing Gemini 3.8 Flash forensic sandbox...');

    try {
      // Animated step ticker for visual engagement
      const steps = [
        'Tokenizing text & extracting entities...',
        'Cross-referencing domain against threat databases...',
        'Auditing payment & check reversal vectors...',
        'Synthesizing final risk matrix & verdict...'
      ];

      let stepIdx = 0;
      const interval = setInterval(() => {
        if (stepIdx < steps.length) {
          setScanStep(steps[stepIdx]);
          stepIdx++;
        }
      }, 700);

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activeMode,
          content,
          senderEmail,
          companyName,
          jobTitle,
          compensation,
          platform,
          imageData: imagePreview,
        }),
      });

      clearInterval(interval);

      if (!res.ok) {
        throw new Error('Analysis service returned an error. Please check your connection.');
      }

      const data: ScamAnalysisResult = await res.json();
      onAnalysisComplete(data);
    } catch (err: any) {
      console.error('Scan error:', err);
      setErrorMessage(err.message || 'Failed to complete analysis. Please try again.');
    } finally {
      setIsLoading(false);
      setScanStep('');
    }
  };

  const handleClear = () => {
    setContent('');
    setCompanyName('');
    setSenderEmail('');
    setJobTitle('');
    setCompensation('');
    setPlatform('Email');
    setImagePreview(null);
    setErrorMessage(null);
    if (onClearSample) onClearSample();
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-4 sm:p-7 relative overflow-hidden">
      {/* Decorative top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500" />

      {/* Header and sample selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Multimodal Scam Scanner
            </h2>
            <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded-full font-mono">
              Live AI
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Analyze offer letters, emails, recruiter DMs, or job descriptions with zero data retention.
          </p>
        </div>

        {/* Quick Sample Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium whitespace-nowrap">Load Preset:</label>
          <select
            onChange={(e) => {
              const found = SAMPLE_TEST_CASES.find(s => s.id === e.target.value);
              if (found) {
                setContent(found.fullContent);
                setCompanyName(found.company);
                setSenderEmail(found.senderEmail);
                setPlatform(found.platform);
                setJobTitle('Software Engineering Intern');
              }
            }}
            value={SAMPLE_TEST_CASES.find(s => s.company === companyName)?.id || ''}
            className="text-xs bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="">Select a real test scenario...</option>
            {SAMPLE_TEST_CASES.map(s => (
              <option key={s.id} value={s.id}>
                [{s.expectedVerdict}] {s.company} - {s.scamType}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Input Mode Tabs */}
      <div className="flex border-b border-slate-800 mb-5 gap-2">
        <button
          onClick={() => setActiveMode('offer_letter')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeMode === 'offer_letter'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Offer Letter / Document</span>
        </button>
        <button
          onClick={() => setActiveMode('recruiter_message')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeMode === 'recruiter_message'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Recruiter Email / Chat DM</span>
        </button>
        <button
          onClick={() => setActiveMode('job_posting')}
          className={`pb-3 px-3 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeMode === 'job_posting'
              ? 'border-cyan-400 text-cyan-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job Posting Description</span>
        </button>
      </div>

      {/* Metadata Form Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Claimed Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Google, Stripe, Apex Corp"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Sender Email / Contact ID
          </label>
          <input
            type="text"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            placeholder="e.g. hr@company.com or @gmail.com"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Contact Platform
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          >
            <option value="Email">Email (Gmail, Outlook, Custom)</option>
            <option value="Telegram">Telegram Messenger</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="LinkedIn InMail">LinkedIn InMail / DM</option>
            <option value="Handshake">Handshake Campus Portal</option>
            <option value="Discord">Discord Channel / DM</option>
            <option value="SMS / Text">SMS / Text Message</option>
            <option value="Other">Other Job Board</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Offered Pay / Stipend (Optional)
          </label>
          <input
            type="text"
            value={compensation}
            onChange={(e) => setCompensation(e.target.value)}
            placeholder="e.g. $45/hr or ₹25,000/mo"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>
      </div>

      {/* Main Text Content Input */}
      <div className="relative mb-4">
        <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center justify-between">
          <span>
            {activeMode === 'offer_letter' && 'Paste Offer Letter or Contract Terms:'}
            {activeMode === 'recruiter_message' && 'Paste Recruiter Email Thread or Chat Transcript:'}
            {activeMode === 'job_posting' && 'Paste Job Description / Requirements:'}
          </span>
          <span className="text-[10px] text-slate-500 font-normal">
            {content.length} characters
          </span>
        </label>
        <textarea
          rows={7}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            activeMode === 'offer_letter'
              ? 'Paste the full text of the internship offer letter, contract, or appointment PDF text here...'
              : activeMode === 'recruiter_message'
              ? 'Paste the recruiter\'s email body, Telegram interview questionnaire, or WhatsApp messages here...'
              : 'Paste the job requirements, company overview, and compensation details...'
          }
          className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono transition-all leading-relaxed"
        />
      </div>

      {/* Multimodal Upload & Attachment Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 mb-5">
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="file-upload"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span>Upload Screenshot / Document Image</span>
          </button>
          <span className="text-[11px] text-slate-500 hidden md:inline">
            PNG, JPG up to 5MB (Analyzed via Gemini Vision)
          </span>
        </div>

        {/* Image preview badge */}
        {imagePreview && (
          <div className="flex items-center gap-2 bg-slate-900 border border-cyan-800/60 rounded-lg px-2.5 py-1">
            <img 
              src={imagePreview} 
              alt="Uploaded Document" 
              className="w-6 h-6 object-cover rounded" 
            />
            <span className="text-xs text-cyan-300 font-mono">Document screenshot attached</span>
            <button
              onClick={removeImage}
              className="text-slate-400 hover:text-rose-400 transition-colors ml-1"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Error display */}
      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-rose-950/50 border border-rose-800/70 text-rose-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Loading Progress State */}
      {isLoading && (
        <div className="mb-5 p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/50">
          <div className="flex items-center justify-between text-xs text-cyan-300 mb-2 font-mono">
            <span className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              {scanStep || 'Auditing with Gemini 3.8 Flash...'}
            </span>
            <span className="text-[11px] text-cyan-400/80 animate-pulse">Deep Cyber Forensic Scan</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-rose-400 animate-[progress_1.5s_ease-in-out_infinite]" 
                 style={{ width: '85%' }} />
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
          <span>Detects advance-fee traps, fake check laundering, domain squatting & shadow labor.</span>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Clear Form
          </button>
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-rose-500 hover:opacity-95 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>{isLoading ? 'Scanning Offer...' : 'Execute AI Scam Audit'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
