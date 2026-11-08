"use client";

import React from 'react';
import { useDemo } from '@/lib/demo/DemoProvider';
import { DEMO_BANNER_LABEL } from '@/lib/demoData';

export const DemoBanner: React.FC = () => {
  const { isDemoMode } = useDemo();
  if (!isDemoMode) return null;
  return (
    <div className="w-full bg-amber-500/10 border-b border-amber-500/20 text-amber-800 dark:text-amber-200 py-1.5 px-4 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-2">
      <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
      <span>{DEMO_BANNER_LABEL}</span>
    </div>
  );
};
