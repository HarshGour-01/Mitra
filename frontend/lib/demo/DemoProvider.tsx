"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Persona, DemoStore } from '@/lib/demo/types';
import { loadDemoStore, saveDemoStore, resetDemoStore } from '@/lib/demo/storage';
import {
  DEMO_STUDENTS,
  DEMO_RECRUITERS,
  DEMO_INSTITUTIONS,
  DEMO_OPPORTUNITIES,
  DEMO_APPLICATIONS,
  DEMO_RESEARCH_PROJECTS,
  DEMO_PROBLEM_STATEMENTS,
  DEMO_NOTIFICATIONS,
  DEMO_MENTORS,
  DEMO_RESEARCHERS,
  DemoStudent,
  DemoRecruiter,
  DemoInstitution,
  DemoOpportunity,
  DemoApplication,
  DemoResearchProject,
  DemoIndustryProblemStatement,
  DemoNotification,
  DemoMentor,
  DemoResearcher,
} from '@/lib/demoData';

interface DemoContextProps {
  persona: Persona;
  setPersona: (p: Persona) => void;
  isDemoMode: boolean;
  resetDemo: () => void;
  store: DemoStore;
}

const DemoContext = createContext<DemoContextProps | undefined>(undefined);

export const useDemo = (): DemoContextProps => {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error('useDemo must be used within DemoProvider');
  }
  return ctx;
};

interface ProviderProps {
  children: ReactNode;
}

export const DemoProvider: React.FC<ProviderProps> = ({ children }) => {
  const isDemoMode = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
  const [persona, setPersona] = useState<Persona>('student');
  const [store, setStore] = useState<DemoStore>(() => {
    const loaded = loadDemoStore();
    if (loaded) return loaded;
    const initial: DemoStore = {
      version: 1,
      students: DEMO_STUDENTS.reduce<Record<string, DemoStudent>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {}),
      recruiters: DEMO_RECRUITERS.reduce<Record<string, DemoRecruiter>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {}),
      institutions: DEMO_INSTITUTIONS.reduce<Record<string, DemoInstitution>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {}),
      opportunities: DEMO_OPPORTUNITIES.reduce<Record<string, DemoOpportunity>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {}),
      applications: DEMO_APPLICATIONS.reduce<Record<string, DemoApplication>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {}),
      mentors: DEMO_MENTORS.reduce<Record<string, DemoMentor>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {}),
      researchers: DEMO_RESEARCHERS.reduce<Record<string, DemoResearcher>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {}),
      researchProjects: DEMO_RESEARCH_PROJECTS.reduce<Record<string, DemoResearchProject>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {}),
      problemStatements: DEMO_PROBLEM_STATEMENTS.reduce<Record<string, DemoIndustryProblemStatement>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {}),
      notifications: DEMO_NOTIFICATIONS.reduce<Record<string, DemoNotification>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {}),
      challenges: {},
      mentorshipRequests: {},
      activityLog: {},
    };
    return initial;
  });

  useEffect(() => {
    if (isDemoMode) {
      saveDemoStore(store);
    }
  }, [store, isDemoMode]);

  const resetDemo = () => {
    resetDemoStore();
    window.location.reload();
  };

  return (
    <DemoContext.Provider value={{ persona, setPersona, isDemoMode, resetDemo, store }}>
      {children}
    </DemoContext.Provider>
  );
};
