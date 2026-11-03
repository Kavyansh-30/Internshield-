import React, { useState } from 'react';
import { SCAM_QUIZ_QUESTIONS } from '../data/samples';
import { Zap, CheckCircle2, XCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ScamQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = SCAM_QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = currentQ.options[index].isCorrect;
    if (isCorrect) {
      setScore(prev => prev + 1);
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNext = () => {
    if (currentIdx < SCAM_QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-800/80 text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Scam Defense IQ Challenge
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Test your instinct against real-world social engineering tactics.
            </p>
          </div>
        </div>

        {!isFinished && (
          <div className="text-xs font-mono font-bold text-slate-400">
            Question {currentIdx + 1} of {SCAM_QUIZ_QUESTIONS.length}
          </div>
        )}
      </div>

      {!isFinished ? (
        <div className="space-y-5 animate-fadeIn">
          {/* Category Tag & Scenario */}
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800/50">
              {currentQ.category}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white mt-2 leading-snug">
              {currentQ.scenario}
            </h4>
            <p className="text-xs text-slate-400 mt-1 italic">
              Context: {currentQ.details}
            </p>
          </div>

          {/* Options List */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200';
              if (isAnswered) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border mt-0.5 ${
                    isAnswered && opt.isCorrect
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                      : isAnswered && isSelected && !opt.isCorrect
                      ? 'bg-rose-500 border-rose-400 text-white'
                      : 'border-slate-700 text-slate-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div className="flex-1">
                    <span className="text-xs sm:text-sm font-medium block">
                      {opt.text}
                    </span>

                    {/* Show explanation when answered */}
                    {isAnswered && (isSelected || opt.isCorrect) && (
                      <p className={`text-xs mt-2 p-2.5 rounded-lg border leading-relaxed ${
                        opt.isCorrect
                          ? 'bg-emerald-950/90 border-emerald-800 text-emerald-200'
                          : 'bg-rose-950/90 border-rose-800 text-rose-200'
                      }`}>
                        <strong>{opt.isCorrect ? 'Why this is right:' : 'Danger:'}</strong> {opt.explanation}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          {isAnswered && (
            <div className="pt-3 flex justify-end">
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-cyan-950/40"
              >
                <span>{currentIdx < SCAM_QUIZ_QUESTIONS.length - 1 ? 'Next Scenario' : 'View Final Score'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="text-center py-6 animate-fadeIn">
          <div className="inline-flex p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4">
            <Award className="w-12 h-12" />
          </div>

          <h4 className="text-2xl font-bold text-white">
            Quiz Completed!
          </h4>

          <div className="text-4xl font-black font-mono my-3 text-cyan-400">
            {score} / {SCAM_QUIZ_QUESTIONS.length}
          </div>

          <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
            {score === SCAM_QUIZ_QUESTIONS.length
              ? 'Outstanding! You have elite scam awareness and are fully equipped to protect yourself and peers from predatory recruiters.'
              : score >= 2
              ? 'Good instincts, but a few subtle check and domain tricks slipped through. Review the Scam Archetypes section to stay safe!'
              : 'Be extra careful! Fake internships are actively looking for eager students. Always use the InternShield scanner before signing or paying.'}
          </p>

          <button
            onClick={handleRestart}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Challenge</span>
          </button>
        </div>
      )}
    </div>
  );
};
