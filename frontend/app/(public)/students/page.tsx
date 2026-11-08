import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { DemoShowcaseDrawer } from "@/components/ui/DemoShowcaseDrawer";
import { Award, BrainCircuit, Briefcase, FileCheck, Users, ArrowRight } from "lucide-react";

export default function StudentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#17152B] dark:bg-[#12101F] dark:text-[#F7F5F0]">
      <Navbar />
      <main className="flex-1 py-18 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-bold">For Ambitious Students</Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
            Launch Your Career on Real Demonstrated Merit
          </h1>
          <p className="text-base text-[#555366] dark:text-[#9290A0] leading-relaxed">
            Stop sending hundreds of generic resumes into ATS black holes. Showcase your cryptographically verified Skill Passport and let leading corporate recruiters reach out directly to you.
          </p>
          <div className="pt-4">
            <Link href="/register">
              <Button size="lg" className="font-bold shadow-hover px-8">
                Create Free Student Passport <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="hover:border-[#7655E8] transition-all">
            <CardContent className="p-8 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#17152B] dark:text-[#F7F5F0]">Verifiable Skill Badges</h3>
              <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] leading-relaxed">
                Certify your mastery in Next.js, Python, PostgreSQL, and AI engineering with transparent proof attached to real repositories and hackathon builds.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:border-[#7655E8] transition-all">
            <CardContent className="p-8 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                <BrainCircuit className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#17152B] dark:text-[#F7F5F0]">AI Skill-Gap Intelligence</h3>
              <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] leading-relaxed">
                Know precisely which modules you need to learn before applying to companies like Zerodha, Intel, or Microsoft Research.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:border-[#7655E8] transition-all">
            <CardContent className="p-8 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                <Briefcase className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#17152B] dark:text-[#F7F5F0]">Paid Industry Internships</h3>
              <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] leading-relaxed">
                Access internships with clear, transparent stipends and potential pre-placement offers (PPOs) without recruiter spam.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:border-[#7655E8] transition-all">
            <CardContent className="p-8 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#17152B] dark:text-[#F7F5F0]">Direct Mentorship Corridors</h3>
              <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] leading-relaxed">
                Book 1:1 office hours with verified industry principals for portfolio code reviews, system design mock interviews, and career navigation.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <DemoShowcaseDrawer />
    </div>
  );
}
