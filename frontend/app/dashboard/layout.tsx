"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { DemoShowcaseDrawer } from "@/components/ui/DemoShowcaseDrawer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F7F5F0] text-[#17152B] dark:bg-[#12101F] dark:text-[#F7F5F0]">
      {/* Role-Specific Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden min-w-0">
        <DashboardNavbar />
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-10">
          {children}
        </main>
      </div>

      {/* Isolated Evaluator Demo Showcase Trigger */}
      <DemoShowcaseDrawer />
    </div>
  );
}
