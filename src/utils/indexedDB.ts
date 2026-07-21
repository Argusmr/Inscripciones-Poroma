import { RegistrationDraft } from '../types';

const DRAFT_KEY = 'cea_registration_draft_v1';
const PENDING_QUEUE_KEY = 'cea_pending_submissions_v1';

// Save step form progress
export function saveDraftProgress(draft: Partial<RegistrationDraft>): void {
  try {
    const existing = getDraftProgress();
    const updated = { ...existing, ...draft };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving draft progress:', err);
  }
}

// Retrieve step form progress
export function getDraftProgress(): Partial<RegistrationDraft> {
  try {
    const data = localStorage.getItem(DRAFT_KEY);
    return data ? JSON.parse(data) : {};
  } catch (err) {
    console.error('Error reading draft progress:', err);
    return {};
  }
}

// Clear draft progress
export function clearDraftProgress(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (err) {
    console.error('Error clearing draft:', err);
  }
}

// Get pending offline queue items
export function getPendingSubmissions(): RegistrationDraft[] {
  try {
    const raw = localStorage.getItem(PENDING_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading pending queue:', err);
    return [];
  }
}

// Save a pending submission into offline queue
export function savePendingSubmission(record: RegistrationDraft): void {
  try {
    const current = getPendingSubmissions();
    // Prevent duplicate entries by code
    const filtered = current.filter(item => item.codigoPreinscripcion !== record.codigoPreinscripcion);
    filtered.push({ ...record, syncState: 'pending' });
    localStorage.setItem(PENDING_QUEUE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Error saving pending submission:', err);
  }
}

// Remove single record from queue upon successful sync
export function removePendingSubmission(code: string): void {
  try {
    const current = getPendingSubmissions();
    const updated = current.filter(item => item.codigoPreinscripcion !== code);
    localStorage.setItem(PENDING_QUEUE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error removing pending submission:', err);
  }
}
