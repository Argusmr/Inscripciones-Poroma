import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { RegistrationDraft } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nrnlhwfisunbibgkviip.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_gCzZki3HqQVL87tedJQFOA_RNO1Tfw1';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

export interface SubmitResult {
  success: boolean;
  status: 'SENT' | 'PENDING_OFFLINE' | 'DUPLICATE' | 'CONFIG_ERROR' | 'NETWORK_ERROR';
  message: string;
}

/**
 * Inserts pre-registration into Supabase 'preinscripciones' table.
 * Crucial: RLS only allows anon INSERT and blocks SELECT, so we do NOT chain .select().
 */
export async function submitRegistration(draft: RegistrationDraft): Promise<SubmitResult> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      success: false,
      status: 'CONFIG_ERROR',
      message: 'No pudimos guardar tu preinscripción. Intenta nuevamente',
    };
  }

  // Check network online
  if (!navigator.onLine) {
    return {
      success: false,
      status: 'PENDING_OFFLINE',
      message: 'Sin conexión a internet. Guardado en el teléfono.',
    };
  }

  try {
    const payload = {
      nombre_completo: draft.nombreCompleto.trim(),
      numero_celular: draft.numeroCelular.trim(),
      comunidad: draft.comunidad.trim(),
      carrera_elegida: draft.carreraElegida,
      tiene_15_o_mas: draft.tiene15OMas === true,
      tiene_carnet: draft.tieneCarnet === true,
      codigo_preinscripcion: draft.codigoPreinscripcion,
    };

    // Insert without calling .select() because public anon cannot read rows
    const { error } = await supabase.from('preinscripciones').insert([payload]);

    if (error) {
      console.error('Supabase insert error details:', error);
      return {
        success: false,
        status: 'NETWORK_ERROR',
        message: 'No pudimos guardar tu preinscripción. Intenta nuevamente',
      };
    }

    return {
      success: true,
      status: 'SENT',
      message: '¡Listo! Tu preinscripción fue enviada.',
    };
  } catch (err) {
    console.error('Unexpected submit error:', err);
    return {
      success: false,
      status: 'NETWORK_ERROR',
      message: 'No pudimos guardar tu preinscripción. Intenta nuevamente',
    };
  }
}

