import { ProgramInfo, AudioKey } from './types';

// Deadline configuration: 10 de Agosto de 2026, 23:59:59 Bolivia Time (UTC-4)
export const DEADLINE_DATE_STRING = '2026-08-10T23:59:59-04:00';

export const WHATSAPP_NUMBER = '59167641695';
export const WHATSAPP_DISPLAY = '+591 67641695';

export const PROGRAMS: ProgramInfo[] = [
  {
    id: 'computacion',
    shortTitle: 'COMPUTACIÓN',
    officialName: 'Sistemas Informáticos',
    location: 'Centro Poblado de Poroma',
    fullDatabaseName: 'Sistemas Informáticos - Centro Poblado de Poroma',
    description: 'Aprende a usar la computadora, internet y herramientas digitales para el trabajo.',
  },
  {
    id: 'cocina',
    shortTitle: 'COCINA',
    officialName: 'Gastronomía',
    location: 'San Juan de Horcas',
    fullDatabaseName: 'Gastronomía - San Juan de Horcas',
    description: 'Aprende técnicas de cocina, repostería y preparación de platos tradicionales y modernos.',
  },
];

export const AUDIO_FILES: Record<AudioKey, string> = {
  'bienvenida': '/audio/bienvenida.mp3',
  'elegir-carrera': '/audio/elegir-carrera.mp3',
  'edad': '/audio/edad.mp3',
  'carnet': '/audio/carnet.mp3',
  'datos': '/audio/datos.mp3',
  'final': '/audio/final.mp3',
};

export const AUDIO_TEXTS: Record<AudioKey, string> = {
  'bienvenida': 'Hola. No te preocupes, yo te ayudo paso a paso.',
  'elegir-carrera': 'Elige lo que quieres aprender.',
  'edad': '¿Tienes quince años o más?',
  'carnet': '¿Tienes carnet de identidad?',
  'datos': 'Escribe tus datos. Ya falta poco.',
  'final': 'Tu preinscripción fue enviada.',
};

export const BRAND_COLORS = {
  greenPrimary: '#198C4A',
  greenDark: '#123D2C',
  orangeAction: '#FF7A00',
  yellowBright: '#FFD43B',
  turquoise: '#00A6A6',
  creamBg: '#FFF8E7',
};
