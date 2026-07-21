import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if user already dismissed
    if (localStorage.getItem('cea_pwa_dismissed') === 'true') {
      setIsDismissed(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('cea_pwa_dismissed', 'true');
  };

  if (!deferredPrompt || isDismissed) return null;

  return (
    <div className="bg-[#FFD43B] text-[#123D2C] p-3 sm:p-4 border-b-2 border-[#FF7A00] flex items-center justify-between gap-3 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#FF7A00] text-white flex items-center justify-center flex-shrink-0">
          <Download className="w-6 h-6 stroke-[3]" />
        </div>
        <div>
          <p className="font-extrabold text-base sm:text-lg leading-tight">
            Guardar esta aplicación en mi celular
          </p>
          <p className="text-sm sm:text-base opacity-90 font-medium">
            Para usarla fácilmente sin internet
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleInstallClick}
          className="px-4 py-2 bg-[#198C4A] text-white font-extrabold text-base rounded-xl border border-white hover:bg-[#123D2C] active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          GUARDAR
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="p-2 text-[#123D2C] hover:bg-black/10 rounded-full cursor-pointer"
          aria-label="Cerrar aviso de instalación"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
