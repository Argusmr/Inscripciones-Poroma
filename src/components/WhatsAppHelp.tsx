import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../config';

interface WhatsAppHelpProps {
  carreraContext?: string;
  codigoContext?: string;
  className?: string;
}

export const WhatsAppHelp: React.FC<WhatsAppHelpProps> = ({
  carreraContext,
  codigoContext,
  className = '',
}) => {
  let message = 'Hola, necesito ayuda para preinscribirme en el CEA Micaela Bastidas.';

  if (codigoContext) {
    message += ` Mi código de preinscripción es: ${codigoContext}.`;
  } else if (carreraContext) {
    message += ` Me interesa la carrera: ${carreraContext}.`;
  }

  const encodedUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div className={`w-full pt-3 pb-2 text-center ${className}`}>
      <a
        href={encodedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#25D366] text-white font-black text-lg sm:text-xl rounded-2xl shadow-md hover:bg-[#20ba5a] active:scale-98 border-2 border-white transition-all cursor-pointer uppercase tracking-wider min-h-[56px]"
        aria-label="Pedir ayuda por WhatsApp al +591 67641695"
      >
        <MessageCircle className="w-7 h-7 fill-current stroke-none flex-shrink-0" />
        <span>¿NECESITAS AYUDA? ESCRÍBENOS</span>
      </a>
    </div>
  );
};

