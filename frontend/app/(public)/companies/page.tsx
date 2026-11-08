import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Briefcase, Users, BrainCircuit, ShieldCheck, ArrowRight } from "lucide-react";

export default function CompaniesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
      <Navbar />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="secondary">For Corporate Recruiters</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#30232A] dark:text-[#FFF3F7]">
            Hire Top 1% Verified Engineering Talent Faster
          </h1>
          <p className="text-sm text-[#806D76] dark:text-[#C3ADB8]">
            Filter candidates across thousands of Indian universities based on actual code commits and evaluated micro-assessments, not inflated claims.
          </p>
          <div className="pt-2">
            <Link href="/register">
              <Button size="lg">Start Hiring on MITRA <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <BrainCircuit className="h-7 w-7 text-[#E879A5]" />
              <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">AI Match Scoring</h3>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">
                Review automated match explanations and missing skill breakdowns before spending precious engineering hours on initial phone screens.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-3">
              <ShieldCheck className="h-7 w-7 text-[#E879A5]" />
              <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">Anti-Fraud Verification</h3>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">
                Every candidate is tied to verified university identity tokens, preventing proxy testing and duplicate submissions.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
