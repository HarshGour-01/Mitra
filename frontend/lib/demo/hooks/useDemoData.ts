// "use client"
// Hook utilities to access demo store data for UI components.

import { useDemo } from '@/lib/demo/DemoProvider';
import type { DemoStore, Persona } from '@/lib/demo/types';

/**
 * Generic hook to retrieve a slice of the demo store.
 * @param selector Function that receives the full store and returns the desired part.
 */
export function useDemoSlice<T>(selector: (store: DemoStore) => T): T {
  const { store } = useDemo();
  return selector(store);
}

/** Specific hooks for common entities */
export const useDemoStudents = () =>
  useDemoSlice((s) => Object.values(s.students));

export const useDemoRecruiters = () =>
  useDemoSlice((s) => Object.values(s.recruiters));

export const useDemoInstitutions = () =>
  useDemoSlice((s) => Object.values(s.institutions));

export const useDemoOpportunities = () =>
  useDemoSlice((s) => Object.values(s.opportunities));

export const useDemoApplications = () =>
  useDemoSlice((s) => Object.values(s.applications));

export const useDemoMentors = () =>
  useDemoSlice((s) => Object.values(s.mentors));

export const useDemoResearchers = () =>
  useDemoSlice((s) => Object.values(s.researchers));

export const useDemoProblems = () =>
  useDemoSlice((s) => Object.values(s.problemStatements));

export const useDemoPersona = () => {
  const { persona, setPersona } = useDemo();
  return { persona, setPersona } as {
    persona: Persona;
    setPersona: (p: Persona) => void;
  };
};
