import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { DemoShowcaseDrawer } from "@/components/ui/DemoShowcaseDrawer";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#17152B] dark:bg-[#12101F] dark:text-[#F7F5F0]">
      <Navbar />
      <main className="flex-1 py-18 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#17152B] dark:text-[#F7F5F0]">Privacy Policy & Data Sovereign Protocol</h1>
          <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] mt-1.5">Last Updated: Smart India Hackathon 2026 Audit Edition</p>
        </div>
        <Card>
          <CardContent className="p-8 sm:p-10 text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] space-y-6 leading-relaxed">
            <div>
              <h3 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0] mb-1.5">1. Institutional Data Governance</h3>
              <p>
                MITRA respects the privacy of students, faculty mentors, and corporate partners. Verified educational credentials and Skill Passport data remain under the strict ownership of the individual student.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0] mb-1.5">2. Role-Based Data Isolation (RLS)</h3>
              <p>
                Corporate recruiters may only inspect student resumes and contact credentials when the student has explicitly submitted an application or enabled public talent directory discovery.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0] mb-1.5">3. Cryptographic Verification & Sovereign Identity</h3>
              <p>
                Academic badges are verified using university domain cryptographic signatures and cannot be modified or forged without institutional clearance.
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
