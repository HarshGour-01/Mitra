import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { DemoShowcaseDrawer } from "@/components/ui/DemoShowcaseDrawer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#17152B] dark:bg-[#12101F] dark:text-[#F7F5F0]">
      <Navbar />
      <main className="flex-1 py-18 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#17152B] dark:text-[#F7F5F0]">Terms & Ecosystem Conditions</h1>
          <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] mt-1.5">Effective: Smart India Hackathon 2026 Edition</p>
        </div>
        <Card>
          <CardContent className="p-8 sm:p-10 text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] space-y-6 leading-relaxed">
            <div>
              <h3 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0] mb-1.5">1. Institutional Accuracy Guarantee</h3>
              <p>
                Users agree to submit truthful academic qualifications, project code repositories, and employment representations. Fraudulent representation results in immediate domain termination.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0] mb-1.5">2. Corporate Compensation Transparency</h3>
              <p>
                All opportunities listed under &apos;Internship&apos; or &apos;Job&apos; must disclose genuine stipend ranges. Unpaid commercial development disguised as internships is strictly prohibited on MITRA.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0] mb-1.5">3. Intellectual Property Protection</h3>
              <p>
                Student capstone projects and research codebases remain the property of their respective student creators and university advisors unless explicitly agreed under formal industry MoU agreements.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
      <DemoShowcaseDrawer />
    </div>
  );
}
