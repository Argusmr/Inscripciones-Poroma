import React from 'react';
import { Home, UserCheck, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../config';

interface BottomNavProps {
  currentView: 'home' | 'programs' | 'wizard';
  onNavigateHome: () => void;
  onNavigateEnrollment: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onNavigateHome,
  onNavigateEnrollment,
}) => {
  const handleHelpClick = () => {
    const text = encodeURIComponent('Hola CEA Micaela Bastidas, necesito ayuda con la preinscripción.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <nav 
      aria-label="Navegación principal"
      className="sticky bottom-0 left-0 right-0 w-full max-w-[430px] mx-auto bg-white border-t-2 border-[#198C4A] shadow-[0_-4px_16px_rgba(0,0,0,0.1)] z-50 flex items-center justify-between px-2 py-1.5 select-none"
    >
      {/* 1. INICIO */}
      <button
        type="button"
        onClick={onNavigateHome}
        className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
          currentView === 'home'
            ? 'bg-[#198C4A] text-white font-black shadow-sm'
            : 'text-[#123D2C] hover:bg-[#198C4A]/10 font-bold'
        }`}
        style={{ minHeight: '50px' }}
      >
        <Home className="w-5 h-5 stroke-[2.5]" />
        <span className="text-[11px] uppercase tracking-wide mt-0.5 font-extrabold">Inicio</span>
      </button>

      {/* 2. INSCRIPCIÓN */}
      <button
        type="button"
        onClick={onNavigateEnrollment}
        className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
          currentView === 'wizard' || currentView === 'programs'
            ? 'bg-[#FF7A00] text-white font-black shadow-sm'
            : 'text-[#123D2C] hover:bg-[#FF7A00]/10 font-bold'
        }`}
        style={{ minHeight: '50px' }}
      >
        <UserCheck className="w-5 h-5 stroke-[2.5]" />
        <span className="text-[11px] uppercase tracking-wide mt-0.5 font-extrabold">Inscripción</span>
      </button>

      {/* 3. AYUDA */}
      <button
        type="button"
        onClick={handleHelpClick}
        className="flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl text-[#123D2C] hover:bg-[#25D366]/10 font-bold transition-all cursor-pointer"
        style={{ minHeight: '50px' }}
      >
        <div className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
          <MessageCircle className="w-3.5 h-3.5 fill-current stroke-none" />
        </div>
        <span className="text-[11px] uppercase tracking-wide mt-0.5 font-extrabold text-[#123D2C]">Ayuda</span>
      </button>
    </nav>
  );
};
