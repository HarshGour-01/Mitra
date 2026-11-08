import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
      <Navbar />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#30232A] dark:text-[#FFF3F7]">Terms & Conditions</h1>
          <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] mt-1">Effective: November 2026</p>
        </div>
        <Card>
          <CardContent className="p-8 text-xs text-[#806D76] dark:text-[#C3ADB8] space-y-4 leading-relaxed">
            <h3 className="text-sm font-bold text-[#30232A] dark:text-[#FFF3F7]">1. Institutional Accuracy</h3>
            <p>
              Users agree to submit truthful academic qualifications, project code repositories, and employment representations. Fraudulent representation results in immediate domain termination.
            </p>
            <h3 className="text-sm font-bold text-[#30232A] dark:text-[#FFF3F7]">2. Corporate Compensation Transparency</h3>
            <p>
              All opportunities listed under 'Internship' or 'Job' must disclose genuine stipend ranges. Unpaid commercial development disguised as internships is strictly prohibited on MITRA.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
