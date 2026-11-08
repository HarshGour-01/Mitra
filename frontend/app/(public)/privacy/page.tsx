import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
      <Navbar />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#30232A] dark:text-[#FFF3F7]">Privacy Policy</h1>
          <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] mt-1">Last Updated: November 2026</p>
        </div>
        <Card>
          <CardContent className="p-8 text-xs text-[#806D76] dark:text-[#C3ADB8] space-y-4 leading-relaxed">
            <h3 className="text-sm font-bold text-[#30232A] dark:text-[#FFF3F7]">1. Data Governance</h3>
            <p>
              MITRA respects the privacy of students, faculty, and corporate partners. Verified educational credentials and Skill Passport data remain under the strict ownership of the individual student.
            </p>
            <h3 className="text-sm font-bold text-[#30232A] dark:text-[#FFF3F7]">2. Role-Based Data Isolation</h3>
            <p>
              Corporate recruiters may only inspect student resumes and contact credentials when the student has explicitly submitted an application or enabled public talent directory discovery.
            </p>
            <h3 className="text-sm font-bold text-[#30232A] dark:text-[#FFF3F7]">3. Cryptographic Verification</h3>
            <p>
              Academic badges are verified using university domain cryptographic signatures and cannot be modified without institutional clearance.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
