import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Award, BrainCircuit, Briefcase, FileCheck, Users, ArrowRight } from "lucide-react";

export default function StudentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
      <Navbar />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="secondary">For Students</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#30232A] dark:text-[#FFF3F7]">
            Launch Your Career on Real Demonstrated Merit
          </h1>
          <p className="text-sm text-[#806D76] dark:text-[#C3ADB8]">
            Stop sending hundreds of generic resumes. Showcase your verified Skill Passport and let leading corporate recruiters reach out directly to you.
          </p>
          <div className="pt-2">
            <Link href="/register">
              <Button size="lg">Create Free Student Passport <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <Award className="h-7 w-7 text-[#E879A5]" />
              <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">Verifiable Skill Badges</h3>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">
                Certify your mastery in Next.js, Python, PostgreSQL, and AI engineering with transparent proof attached to real repositories and hackathon builds.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-3">
              <BrainCircuit className="h-7 w-7 text-[#E879A5]" />
              <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">AI Skill-Gap Intelligence</h3>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">
                Know precisely which modules you need to learn before applying to companies like Zerodha, Intel, or Microsoft Research.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-3">
              <Briefcase className="h-7 w-7 text-[#E879A5]" />
              <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">Paid Industry Internships</h3>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">
                Access internships with clear, transparent stipends and potential pre-placement offers (PPOs) without recruiter spam.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-3">
              <Users className="h-7 w-7 text-[#E879A5]" />
              <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">1:1 Senior Engineering Mentorship</h3>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">
                Schedule architectural review sessions and mock technical interviews with seasoned industry staff engineers.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
