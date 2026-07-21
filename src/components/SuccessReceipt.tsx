import React from 'react';
import { Download, MessageCircle, Home, CheckCircle, Clock } from 'lucide-react';
import { RegistrationDraft } from '../types';
import { WHATSAPP_NUMBER } from '../config';
import { ComputerIcon, CookingIcon, IDCardIcon, PersonNameIcon, PhoneIcon, CommunityIcon } from './SVGIllustrations';

interface SuccessReceiptProps {
  draft: RegistrationDraft;
  isOnlineSaved: boolean;
  onReset: () => void;
}

export const SuccessReceipt: React.FC<SuccessReceiptProps> = ({
  draft,
  isOnlineSaved,
  onReset,
}) => {
  const isComputacion = draft.carreraElegida.includes('Sistemas');

  const handleDownloadReceipt = () => {
    // Generate clean canvas voucher image
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#FFF8E7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Green Header Bar
    ctx.fillStyle = '#198C4A';
    ctx.fillRect(0, 0, canvas.width, 140);

    // Title Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CEA "MICAELA BASTIDAS"', 400, 60);
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.fillText('COMPROBANTE DE PREINSCRIPCIÓN', 400, 105);

    // White Card Background
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = 15;
    ctx.fillRect(50, 170, 700, 720);
    ctx.shadowBlur = 0; // reset

    // Code Box
    ctx.fillStyle = '#FF7A00';
    ctx.fillRect(100, 210, 600, 90);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.fillText('CÓDIGO DE PREINSCRIPCIÓN', 400, 245);
    ctx.font = 'black 42px Arial, sans-serif';
    ctx.fillText(draft.codigoPreinscripcion, 400, 285);

    // Details List
    ctx.textAlign = 'left';
    ctx.fillStyle = '#123D2C';

    // Helper row function
    const drawRow = (y: number, label: string, value: string) => {
      ctx.font = 'bold 20px Arial, sans-serif';
      ctx.fillStyle = '#198C4A';
      ctx.fillText(label.toUpperCase(), 100, y);
      ctx.font = '26px Arial, sans-serif';
      ctx.fillStyle = '#123D2C';
      ctx.fillText(value, 100, y + 32);
      ctx.strokeStyle = '#E2E8F0';
      ctx.beginPath();
      ctx.moveTo(100, y + 48);
      ctx.lineTo(700, y + 48);
      ctx.stroke();
    };

    drawRow(340, 'Carrera Elegida', draft.carreraElegida);
    drawRow(440, 'Nombre Completo', draft.nombreCompleto);
    drawRow(540, 'Celular de Contacto', draft.numeroCelular);
    drawRow(640, 'Comunidad de Residencia', draft.comunidad);
    drawRow(740, 'Fecha de Preinscripción', new Date().toLocaleDateString('es-BO', { year: 'numeric', month: 'long', day: 'numeric' }));

    // Footer instruction
    ctx.fillStyle = '#123D2C';
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Presenta este comprobante con tu carnet de identidad.', 400, 840);
    ctx.fillText('Consultas por WhatsApp al +591 67641695', 400, 870);

    // Download PNG
    const link = document.createElement('a');
    link.download = `Comprobante_${draft.codigoPreinscripcion}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const whatsappMessage = encodeURIComponent(
    `Hola, guardé mi comprobante de preinscripción en el CEA Micaela Bastidas. Mi código es ${draft.codigoPreinscripcion}.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="w-full max-w-[430px] mx-auto p-4 pb-16 space-y-4 select-none">
      {/* Top Banner Status */}
      <div className={`p-5 rounded-2xl text-center border-3 shadow-md ${
        isOnlineSaved
          ? 'bg-[#198C4A] text-white border-[#123D2C]'
          : 'bg-[#FF7A00] text-white border-white'
      }`}>
        <div className="w-14 h-14 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-2">
          {isOnlineSaved ? (
            <CheckCircle className="w-10 h-10 text-white stroke-[2.5]" />
          ) : (
            <Clock className="w-10 h-10 text-white stroke-[2.5]" />
          )}
        </div>

        <h2 className="text-xl font-black uppercase tracking-tight">
          {isOnlineSaved
            ? '¡Listo! Tu preinscripción fue enviada.'
            : 'Guardado en este teléfono; falta enviarlo'}
        </h2>

        {!isOnlineSaved && (
          <p className="mt-2 text-sm font-bold bg-black/20 p-2.5 rounded-xl">
            Tu registro está seguro en este celular. Se enviará automáticamente cuando vuelvas a tener señal de internet.
          </p>
        )}
      </div>

      {/* Code Display Card */}
      <div className="bg-white p-5 rounded-2xl border-3 border-[#198C4A] shadow-md text-center space-y-2">
        <p className="text-lg font-bold text-[#123D2C]">
          Tu código es:
        </p>
        <div className="bg-[#FFD43B] text-[#123D2C] text-3xl font-black py-3 px-5 rounded-xl border-3 border-[#FF7A00] tracking-widest inline-block shadow-inner select-all">
          {draft.codigoPreinscripcion}
        </div>
        <p className="text-sm font-extrabold text-[#198C4A]">
          Guarda este código y acércate al CEA con tu carnet y una fotocopia.
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white p-4 rounded-2xl border border-[#198C4A]/30 shadow-sm space-y-3">
        <h3 className="text-lg font-extrabold text-[#123D2C] border-b border-[#198C4A]/20 pb-1.5">
          Resumen de tu preinscripción:
        </h3>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3 bg-[#FFF8E7] p-2.5 rounded-xl border border-[#198C4A]/20">
            {isComputacion ? <ComputerIcon size={40} /> : <CookingIcon size={40} />}
            <div>
              <p className="text-[10px] font-bold text-[#198C4A] uppercase">Carrera</p>
              <p className="text-sm font-extrabold text-[#123D2C]">{draft.carreraElegida}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#FFF8E7] p-2.5 rounded-xl border border-[#198C4A]/20">
            <PersonNameIcon size={40} />
            <div>
              <p className="text-[10px] font-bold text-[#198C4A] uppercase">Nombre</p>
              <p className="text-sm font-extrabold text-[#123D2C]">{draft.nombreCompleto}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#FFF8E7] p-2.5 rounded-xl border border-[#198C4A]/20">
            <PhoneIcon size={40} />
            <div>
              <p className="text-[10px] font-bold text-[#198C4A] uppercase">Celular</p>
              <p className="text-sm font-extrabold text-[#123D2C]">{draft.numeroCelular}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#FFF8E7] p-2.5 rounded-xl border border-[#198C4A]/20">
            <CommunityIcon size={40} />
            <div>
              <p className="text-[10px] font-bold text-[#198C4A] uppercase">Comunidad</p>
              <p className="text-sm font-extrabold text-[#123D2C]">{draft.comunidad}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-1">
        {/* GUARDAR COMPROBANTE */}
        <button
          type="button"
          onClick={handleDownloadReceipt}
          className="w-full btn-large bg-[#FF7A00] text-white rounded-2xl font-black text-lg border-2 border-white hover:bg-[#E66E00] active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[52px]"
        >
          <Download className="w-6 h-6 stroke-[3]" />
          <span>GUARDAR COMPROBANTE</span>
        </button>

        {/* PEDIR AYUDA POR WHATSAPP */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full btn-large bg-[#25D366] text-white rounded-2xl font-black text-lg border-2 border-white hover:bg-[#20ba5a] active:scale-98 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-center min-h-[52px]"
        >
          <MessageCircle className="w-6 h-6 fill-current stroke-none" />
          <span>AYUDA POR WHATSAPP</span>
        </a>

        {/* VOLVER AL INICIO */}
        <button
          type="button"
          onClick={onReset}
          className="w-full btn-large bg-[#198C4A] text-white rounded-2xl font-black text-lg border-2 border-white hover:bg-[#123D2C] active:scale-98 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer min-h-[52px]"
        >
          <Home className="w-6 h-6 stroke-[3]" />
          <span>VOLVER AL INICIO</span>
        </button>
      </div>
    </div>
  );

};
