import React from 'react';
import { Check } from 'lucide-react';
import { HandPointerIcon } from './SVGIllustrations';

interface VisualChoiceCardProps {
  id: string;
  isSelected: boolean;
  onSelect: () => void;
  title: string; // Large simple word e.g. "COMPUTACIÓN" or "SÍ"
  subtitle?: string; // Official name or details e.g. "Sistemas Informáticos"
  location?: string; // e.g. "Centro Poblado de Poroma"
  illustration: React.ReactNode;
  showPointerHand?: boolean;
  className?: string;
}

export const VisualChoiceCard: React.FC<VisualChoiceCardProps> = ({
  isSelected,
  onSelect,
  title,
  subtitle,
  location,
  illustration,
  showPointerHand = false,
  className = '',
}) => {
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`relative w-full rounded-3xl p-5 sm:p-6 cursor-pointer border-4 transition-all duration-200 select-none shadow-md text-left flex flex-col items-center justify-between min-h-[220px] sm:min-h-[260px] ${
        isSelected
          ? 'bg-[#FFFFFF] border-[#FF7A00] ring-4 ring-[#FF7A00]/30 shadow-2xl scale-[1.02]'
          : 'bg-[#FFFFFF] border-[#198C4A]/30 hover:border-[#198C4A] hover:bg-[#FFFDF6] active:scale-98'
      } ${className}`}
    >
      {/* Top selection badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {showPointerHand && !isSelected && (
          <HandPointerIcon className="text-[#FF7A00]" />
        )}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
            isSelected
              ? 'bg-[#FF7A00] border-[#FF7A00] text-white scale-110'
              : 'bg-gray-100 border-gray-300 text-transparent'
          }`}
        >
          <Check className="w-7 h-7 stroke-[3.5]" />
        </div>
      </div>

      {/* Main Illustration */}
      <div className="my-2 flex items-center justify-center transform transition-transform group-hover:scale-105">
        {illustration}
      </div>

      {/* Text Info */}
      <div className="w-full text-center mt-2">
        <h3 className="text-2xl sm:text-3xl font-black text-[#123D2C] tracking-wide uppercase">
          {title}
        </h3>

        {subtitle && (
          <p className="text-lg sm:text-xl font-bold text-[#198C4A] mt-1">
            {subtitle}
          </p>
        )}

        {location && (
          <div className="mt-2 inline-block bg-[#198C4A]/10 px-4 py-1.5 rounded-full border border-[#198C4A]/30 text-base sm:text-lg font-semibold text-[#123D2C]">
            📍 {location}
          </div>
        )}
      </div>

      {/* Selected Indicator Banner */}
      {isSelected && (
        <div className="w-full mt-4 bg-[#FF7A00] text-white py-2 px-4 rounded-xl text-center font-black text-lg sm:text-xl tracking-wider uppercase animate-fade-in">
          ✓ ELEGIDO
        </div>
      )}
    </div>
  );
};
