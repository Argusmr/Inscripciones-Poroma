import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { getPendingSubmissions, removePendingSubmission } from '../utils/indexedDB';
import { submitRegistration } from '../lib/supabase';
import { RegistrationDraft } from '../types';

export const OfflineStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingItems, setPendingItems] = useState<RegistrationDraft[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const checkPending = () => {
    setPendingItems(getPendingSubmissions());
  };

  useEffect(() => {
    checkPending();

    const handleOnline = () => {
      setIsOnline(true);
      attemptAutoSync();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const attemptAutoSync = async () => {
    const pending = getPendingSubmissions();
    if (pending.length === 0) return;

    setIsSyncing(true);
    setSyncMessage('Enviando registros guardados...');

    for (const item of pending) {
      const res = await submitRegistration(item);
      if (res.success || res.status === 'DUPLICATE') {
        removePendingSubmission(item.codigoPreinscripcion);
      }
    }

    setIsSyncing(false);
    checkPending();
    setSyncMessage('¡Registros sincronizados!');
    setTimeout(() => setSyncMessage(null), 4000);
  };

  if (pendingItems.length === 0 && isOnline && !syncMessage) {
    return null;
  }

  return (
    <div className="w-full bg-[#FFF3C4] border-b-2 border-[#FF7A00] p-3 text-[#123D2C]">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {!isOnline ? (
            <div className="w-10 h-10 rounded-full bg-[#FF7A00] text-white flex items-center justify-center flex-shrink-0">
              <WifiOff className="w-6 h-6" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#198C4A] text-white flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          )}

          <div>
            {!isOnline ? (
              <p className="font-extrabold text-base sm:text-lg">
                ESTADO: SIN SEÑAL
              </p>
            ) : (
              <p className="font-extrabold text-base sm:text-lg text-[#198C4A]">
                CONEXIÓN RESTABLECIDA
              </p>
            )}

            {pendingItems.length > 0 && (
              <p className="text-sm sm:text-base font-bold text-[#C62828] mt-0.5">
                Tu información quedó guardada en este teléfono. La enviaremos cuando vuelva la señal.
                <span className="ml-2 bg-[#FF7A00] text-white px-2 py-0.5 rounded-full text-xs uppercase font-black">
                  PENDIENTE DE ENVÍO ({pendingItems.length})
                </span>
              </p>
            )}

            {syncMessage && (
              <p className="text-sm sm:text-base font-bold text-[#198C4A]">
                {syncMessage}
              </p>
            )}
          </div>
        </div>

        {pendingItems.length > 0 && isOnline && (
          <button
            type="button"
            onClick={attemptAutoSync}
            disabled={isSyncing}
            className="px-5 py-2.5 bg-[#FF7A00] text-white font-extrabold text-base rounded-xl border-2 border-white hover:bg-[#E66E00] active:scale-95 transition-all cursor-pointer shadow-sm flex items-center gap-2 flex-shrink-0"
          >
            <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'ENVIANDO...' : 'ENVIAR AHORA'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
