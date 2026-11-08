// "use client"
import React from 'react';
import { useDemo } from '@/lib/demo/DemoProvider';
import type { Persona } from '@/lib/demo/types';

/**
 * Simple UI to switch demo persona and reset demo store.
 * It should be placed in a visible area (e.g., header) when demo mode is active.
 */
export function PersonaSwitcher() {
  const { persona, setPersona, resetDemo, isDemoMode } = useDemo();

  const personas: Persona[] = ['student', 'recruiter', 'mentor', 'researcher', 'institution'];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const p = e.target.value as Persona;
    setPersona(p);
  };

  if (!isDemoMode) {
    return null; // hide when not in demo mode
  }

  return (
    <div className="flex items-center gap-4 p-2 bg-amber-100 dark:bg-amber-900 rounded-md mb-4">
      <label className="font-medium text-amber-800 dark:text-amber-200" htmlFor="persona-select">
        Demo Persona:
      </label>
      <select
        id="persona-select"
        value={persona}
        onChange={handleChange}
        className="rounded border border-amber-300 bg-white dark:bg-gray-800 px-2 py-1"
      >
        {personas.map((p) => (
          <option key={p} value={p}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </option>
        ))}
      </select>
      <button
        onClick={resetDemo}
        className="ml-auto rounded bg-amber-500 px-3 py-1 text-sm font-medium text-white hover:bg-amber-600"
      >
        Reset Demo
      </button>
    </div>
  );
}
