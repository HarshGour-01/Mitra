import { DemoStore } from '@/lib/demo/types';

const STORAGE_KEY = 'mitra_demo_store';
const STORAGE_VERSION = 1;

/**
 * Load the demo store from localStorage. Returns undefined on SSR.
 */
export const loadDemoStore = (): DemoStore | undefined => {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as { version: number; store: DemoStore };
    if (parsed.version !== STORAGE_VERSION) {
      // version mismatch, fallback to default
      window.localStorage.removeItem(STORAGE_KEY);
      return undefined;
    }
    return parsed.store;
  } catch {
    return undefined;
  }
};

/**
 * Persist the demo store to localStorage.
 */
export const saveDemoStore = (store: DemoStore) => {
  if (typeof window === 'undefined') return;
  const payload = { version: STORAGE_VERSION, store };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

/**
 * Reset the demo store to initial fixture data.
 */
export const resetDemoStore = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
};
