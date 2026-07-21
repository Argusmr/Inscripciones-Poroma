import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { StepNumber } from '../types';

interface ProgressIndicatorProps {
  currentStep: StepNumber;
  totalSteps?: number; // default 6
  onBack?: () => void;
  showBack?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps = 6,
  onBack,
  showBack = true,
}) => {
  // Steps 1 to 6 are the form steps
  const stepNum = Math.min(Math.max(currentStep, 1), totalSteps);

  return (
    <div className="w-full bg-[#198C4A]/10 border-b-2 border-[#198C4A]/20 px-4 py-3 sm:px-6">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
        {/* Back Button */}
        {showBack && onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#123D2C] font-bold text-base sm:text-lg rounded-xl border-2 border-[#198C4A] hover:bg-[#198C4A]/10 active:scale-95 transition-all cursor-pointer shadow-sm"
            aria-label="Volver al paso anterior"
            style={{ minHeight: '52px' }}
          >
            <ArrowLeft className="w-6 h-6 stroke-[3]" />
            <span>Volver</span>
          </button>
        ) : (
          <div />
        )}

        {/* Step Badge and Dots */}
        <div className="flex flex-col items-end gap-1.5">
          <span className="font-extrabold text-[#123D2C] text-lg sm:text-xl">
            Paso {stepNum} de {totalSteps}
          </span>
          <div className="flex items-center gap-2" role="progressbar" aria-valuenow={stepNum} aria-valuemin={1} aria-valuemax={totalSteps}>
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => {
              const isActive = s === stepNum;
              const isCompleted = s < stepNum;
              return (
                <div
                  key={s}
                  className={`h-4.5 rounded-full transition-all ${
                    isActive
                      ? 'w-9 bg-[#FF7A00] ring-2 ring-[#FF7A00] ring-offset-1'
                      : isCompleted
                      ? 'w-4.5 bg-[#198C4A]'
                      : 'w-4.5 bg-[#CBD5E1]'
                  }`}
                  title={`Paso ${s}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
