export type ProgramId = 'computacion' | 'cocina';

export interface ProgramInfo {
  id: ProgramId;
  shortTitle: string;       // "COMPUTACIÓN" or "COCINA"
  officialName: string;     // "Sistemas Informáticos" or "Gastronomía"
  location: string;         // "Centro Poblado de Poroma" or "San Juan de Horcas"
  fullDatabaseName: string; // "Sistemas Informáticos - Centro Poblado de Poroma"
  description: string;
}

export interface RegistrationDraft {
  carreraElegida: string;   // Full database name
  carreraId?: ProgramId;
  tiene15OMas: boolean | null;
  tieneCarnet: boolean | null;
  nombreCompleto: string;
  numeroCelular: string;
  comunidad: string;
  codigoPreinscripcion: string;
  creadoEn: string;
  syncState: 'pending' | 'synced' | 'failed';
}

export type StepNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; 
// 0: Bienvenida
// 1: Carrera
// 2: Edad
// 3: Carnet
// 4: Nombre
// 5: Celular
// 6: Comunidad
// 7: Resumen / Confirmación
// 8: Resultado final

export type AudioKey =
  | 'bienvenida'
  | 'elegir-carrera'
  | 'edad'
  | 'carnet'
  | 'datos'
  | 'final';
