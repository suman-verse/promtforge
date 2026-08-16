'use client';

import React, { useState } from 'react';
import { ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';

interface CaptchaProps {
  onVerified: (isValid: boolean) => void;
  className?: string;
}

export function CaptchaVerification({ onVerified, className = '' }: CaptchaProps) {
  const [num1, setNum1] = useState(() => Math.floor(Math.random() * 8) + 2);
  const [num2, setNum2] = useState(() => Math.floor(Math.random() * 8) + 1);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const generateChallenge = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    setError(false);
    setIsVerified(false);
    onVerified(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserAnswer(val);

    if (parseInt(val, 10) === num1 + num2) {
      setIsVerified(true);
      setError(false);
      onVerified(true);
    } else {
      setIsVerified(false);
      if (val.length >= String(num1 + num2).length) {
        setError(true);
        onVerified(false);
      } else {
        setError(false);
      }
    }
  };

  return (
    <div className={`p-3.5 rounded-xl border border-theme bg-card transition-all ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-accent-light text-accent flex items-center justify-center flex-shrink-0">
            {isVerified ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <ShieldCheck className="w-4 h-4" />}
          </div>
          <div>
            <div className="text-xs font-semibold text-main flex items-center gap-1.5">
              <span>Human Security Check</span>
              {isVerified && (
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  VERIFIED
                </span>
              )}
            </div>
            <p className="text-[11px] text-muted">
              {isVerified
                ? 'Security verification complete.'
                : `Solve: What is ${num1} + ${num2}?`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isVerified ? (
            <>
              <input
                type="number"
                value={userAnswer}
                onChange={handleChange}
                placeholder="?"
                aria-label="Security answer"
                className={`w-14 px-2 py-1 text-center text-xs font-mono font-bold rounded-lg border bg-subtle text-main focus:outline-none transition-colors ${
                  error
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-theme focus:border-accent'
                }`}
              />
              <button
                type="button"
                onClick={generateChallenge}
                title="Refresh challenge"
                className="p-1 text-muted hover:text-main rounded-md hover:bg-subtle transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="text-emerald-500 text-xs font-bold flex items-center gap-1">
              <span>Ready</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
