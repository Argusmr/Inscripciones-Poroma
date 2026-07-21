import React, { useState, useEffect } from 'react';
import { getCountdownInfo } from '../utils/countdown';
import { WhatsAppHelp } from './WhatsAppHelp';
import { WHATSAPP_NUMBER } from '../config';

interface HomePageProps {
  onStartEnrollment: () => void;
  onViewPrograms: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartEnrollment,
  onViewPrograms,
}) => {
  const [countdown, setCountdown] = useState(getCountdownInfo());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdownInfo());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleExpiredAction = () => {
    const message = encodeURIComponent('Hola, quisiera consultar si aún hay cupos disponibles en el CEA Micaela Bastidas.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <main className="w-full min-h-screen flex flex-col justify-between items-center px-4 pt-4 pb-16 text-center select-none bg-[#FFF8E7] max-w-[430px] mx-auto">
      {/* Container with exact requested content */}
      <div className="w-full flex-1 flex flex-col items-center justify-center space-y-4 my-auto">
        
        {/* 1. ESCUDO OFICIAL GRANDE */}
        <div className="w-full px-2 py-1 flex items-center justify-center">
          <img
            src="/escudo-final-2026.png"
            alt="Escudo Oficial del Centro de Educación Alternativa CEA Micaela Bastidas"
            className="w-full h-auto max-h-[210px] object-contain drop-shadow-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/escudo-final-2026.png';
            }}
          />
        </div>

        {/* 2. Frase de Portada */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#123D2C] leading-tight uppercase tracking-tight">
            ¡INSCRÍBETE YA!
          </h1>
          <p className="text-lg sm:text-xl font-extrabold text-[#FF7A00] uppercase tracking-wide">
            POROMA TE ESPERA
          </p>
        </div>

        {/* 3. CUENTA REGRESIVA HASTA EL 10 DE AGOSTO DE 2026 */}
        <div className="w-full bg-white rounded-2xl p-3.5 border-3 border-[#198C4A] shadow-md space-y-1.5">
          <p className="text-base sm:text-lg font-extrabold text-[#198C4A] uppercase tracking-wide">
            Inscripciones hasta el 10 de agosto
          </p>

          <div className="bg-[#FFD43B] py-1.5 px-3 rounded-xl border border-[#FF7A00] inline-block w-full">
            <span className="text-sm sm:text-base font-bold text-[#123D2C] tracking-wide block">
              {countdown.message}
            </span>
          </div>
        </div>

        {/* 4 & 5. BOTONES DE ACCIÓN PRINCIPALES */}
        <div className="w-full space-y-3 pt-1">
          {!countdown.isExpired ? (
            <button
              type="button"
              onClick={onStartEnrollment}
              className="w-full btn-large bg-[#FF7A00] text-white rounded-2xl font-black text-xl sm:text-2xl border-2 border-white hover:bg-[#E66E00] active:scale-98 transition-all shadow-lg tracking-wider uppercase cursor-pointer min-h-[58px]"
            >
              INSCRIBIRME AHORA
            </button>
          ) : (
            <button
              type="button"
              onClick={handleExpiredAction}
              className="w-full btn-large bg-[#FF7A00] text-white rounded-2xl font-black text-lg sm:text-xl border-2 border-white hover:bg-[#E66E00] active:scale-98 transition-all shadow-lg tracking-wider uppercase cursor-pointer min-h-[58px]"
            >
              CONSULTAR SI AÚN HAY CUPOS
            </button>
          )}

          <button
            type="button"
            onClick={onViewPrograms}
            className="w-full btn-large bg-[#00A6A6] text-white rounded-2xl font-black text-lg sm:text-xl border-2 border-white hover:bg-[#008C8C] active:scale-98 transition-all shadow-md tracking-wider uppercase cursor-pointer min-h-[56px]"
          >
            VER QUÉ PUEDO ESTUDIAR
          </button>
        </div>
      </div>

      {/* BOTÓN DE AYUDA (Espacio propio al final, no flotante) */}
      <WhatsAppHelp />
    </main>
  );
};

