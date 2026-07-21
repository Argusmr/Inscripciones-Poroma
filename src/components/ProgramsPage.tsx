import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ComputerIcon, CookingIcon } from './SVGIllustrations';
import { PROGRAMS } from '../config';
import { ProgramId } from '../types';
import { WhatsAppHelp } from './WhatsAppHelp';

interface ProgramsPageProps {
  onSelectProgramToEnroll: (programId: ProgramId) => void;
  onBackToHome: () => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onSelectProgramToEnroll,
  onBackToHome,
}) => {
  return (
    <div className="w-full min-h-screen bg-[#FFF8E7] px-4 pt-4 pb-16 max-w-[430px] mx-auto flex flex-col justify-between select-none">
      <div className="space-y-4">
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between border-b-2 border-[#198C4A]/30 pb-3">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#123D2C] font-black text-base rounded-2xl border-2 border-[#198C4A] hover:bg-[#198C4A]/10 active:scale-95 transition-all cursor-pointer shadow-sm min-h-[48px]"
          >
            <ArrowLeft className="w-5 h-5 stroke-[3]" />
            <span>Volver</span>
          </button>

          <span className="text-[#198C4A] font-black text-base sm:text-lg uppercase tracking-wide">
            CEA Micaela Bastidas
          </span>
        </div>

        {/* Main Title Question */}
        <div className="text-center space-y-1 my-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#123D2C] uppercase tracking-tight">
            ¿Qué quieres aprender?
          </h1>
          <p className="text-base sm:text-lg text-[#198C4A] font-bold">
            Toca la carrera que te interesa:
          </p>
        </div>

        {/* Cards Single Column */}
        <div className="flex flex-col gap-4">
          {PROGRAMS.map((program) => {
            const isComputacion = program.id === 'computacion';
            return (
              <div
                key={program.id}
                className="bg-white rounded-2xl p-5 border-3 border-[#198C4A] shadow-md flex flex-col items-center space-y-3 hover:border-[#FF7A00] transition-all"
              >
                {/* Illustration */}
                <div className="py-1">
                  {isComputacion ? (
                    <ComputerIcon size={110} />
                  ) : (
                    <CookingIcon size={110} />
                  )}
                </div>

                {/* Info Text */}
                <div className="text-center space-y-1 w-full">
                  <h2 className="text-2xl font-black text-[#123D2C] uppercase">
                    {program.shortTitle}
                  </h2>
                  <p className="text-lg font-extrabold text-[#198C4A]">
                    {program.officialName}
                  </p>
                  <p className="text-sm font-bold text-[#123D2C] bg-[#FFF8E7] py-1 px-3 rounded-lg inline-block border border-[#198C4A]/30">
                    📍 {program.location}
                  </p>
                  <p className="text-sm text-gray-700 font-medium pt-1">
                    {program.description}
                  </p>
                </div>

                {/* Direct Action Button */}
                <button
                  type="button"
                  onClick={() => onSelectProgramToEnroll(program.id)}
                  className="w-full btn-large bg-[#FF7A00] text-white rounded-2xl font-black text-lg border-2 border-white hover:bg-[#E66E00] active:scale-98 transition-all shadow-md uppercase tracking-wider cursor-pointer min-h-[54px]"
                >
                  QUIERO ESTUDIAR AQUÍ
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* WhatsApp Help at bottom */}
      <WhatsAppHelp />
    </div>
  );
};

