"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Award,
  Briefcase,
  GraduationCap,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  FileCheck,
  Globe2,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DemoShowcaseDrawer } from "@/components/ui/DemoShowcaseDrawer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#17152B] dark:bg-[#12101F] dark:text-[#F7F5F0] selection:bg-[#EDE8FF] selection:text-[#29234B]">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-36">
          {/* Subtle Royal Violet Ambient Background Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[400px] bg-gradient-to-tr from-[#7655E8]/15 via-[#EDE8FF]/30 to-[#E8C98A]/10 blur-3xl rounded-full -z-10 pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              {/* Top Announcement Pill */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#E8E4DD] bg-white px-4 py-2 text-xs font-semibold text-[#29234B] shadow-sm dark:border-[#2E274D] dark:bg-[#1A162B] dark:text-[#EDE8FF]">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D]">
                  <Sparkles className="h-3 w-3 text-[#7655E8]" />
                </div>
                <span>Next-Gen Academia–Industry Collaboration Platform</span>
                <span className="rounded-full bg-[#E8C98A]/30 px-2 py-0.5 text-[10px] font-bold text-[#9B7020] dark:text-[#E8C98A]">
                  SIH &apos;26
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0] leading-[1.12]">
                Where Academia Meets Industry.{" "}
                <span className="block mt-2 bg-gradient-to-r from-[#7655E8] via-[#29234B] to-[#7655E8] bg-clip-text text-transparent dark:from-[#9376F5] dark:via-[#EDE8FF] dark:to-[#9376F5]">
                  Where Potential Becomes Opportunity.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-[#555366] dark:text-[#9290A0] max-w-3xl mx-auto leading-relaxed">
                One intelligent ecosystem connecting students, institutions, mentors, and industries to transform skills into real-world opportunities.
              </p>

              {/* CTA Cluster */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto font-bold text-base px-8 py-4 shadow-hover">
                    Get Started Free <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/opportunities">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 py-4">
                    Explore Opportunities
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-[#555366] dark:text-[#9290A0]">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#7655E8]" /> Verified Skill Passports
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#329B75]" /> Real Corporate Postings
                </span>
                <span className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-[#E8C98A]" /> Cryptographic Endorsements
                </span>
              </div>
            </div>

            {/* INTERACTIVE STUDENT-INDUSTRY VISUALIZER CARD */}
            <div className="mt-20 max-w-5xl mx-auto">
              <div className="rounded-3xl border border-[#E8E4DD] bg-white/80 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl dark:border-[#2E274D] dark:bg-[#1A162B]/85">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {/* Left: Student Node */}
                  <div className="rounded-2xl border border-[#E8E4DD] bg-[#F7F5F0] p-6 dark:border-[#2E274D] dark:bg-[#12101F] space-y-3.5">
                    <div className="flex items-center justify-between">
                      <Badge variant="verified">Student</Badge>
                      <span className="text-xs text-[#329B75] font-bold">92.4% Ready</span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0]">
                        Harsh Gour
                      </h4>
                      <p className="text-xs text-[#555366] dark:text-[#9290A0]">
                        B.Tech Computer Science • NIT Karnataka
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="rounded-lg bg-[#EDE8FF] px-2.5 py-1 text-[11px] font-semibold text-[#29234B] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                        Next.js 15
                      </span>
                      <span className="rounded-lg bg-[#EDE8FF] px-2.5 py-1 text-[11px] font-semibold text-[#29234B] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                        FastAPI
                      </span>
                      <span className="rounded-lg bg-[#EDE8FF] px-2.5 py-1 text-[11px] font-semibold text-[#29234B] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                        PostgreSQL
                      </span>
                    </div>
                  </div>

                  {/* Center: MITRA AI Engine */}
                  <div className="text-center space-y-3.5 py-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7655E8] to-[#29234B] text-white shadow-xl shadow-[#7655E8]/30 animate-pulse_slow">
                      <BrainCircuit className="h-8 w-8 text-[#E8C98A]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#7655E8] dark:text-[#EDE8FF]">
                        MITRA Neural Match Engine
                      </div>
                      <div className="mt-1.5 inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-[#329B75] border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                        96.2% Competency Match
                      </div>
                    </div>
                  </div>

                  {/* Right: Recruiter / Industry Node */}
                  <div className="rounded-2xl border border-[#E8E4DD] bg-[#F7F5F0] p-6 dark:border-[#2E274D] dark:bg-[#12101F] space-y-3.5">
                    <div className="flex items-center justify-between">
                      <Badge variant="gold">Recruiter</Badge>
                      <span className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0]">₹60,000/mo</span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0]">
                        Zerodha Tech
                      </h4>
                      <p className="text-xs text-[#555366] dark:text-[#9290A0]">
                        Full-Stack Web Architect Intern • Bengaluru
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="rounded-lg bg-[#EDE8FF] px-2.5 py-1 text-[11px] font-semibold text-[#29234B] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                        React 19
                      </span>
                      <span className="rounded-lg bg-[#EDE8FF] px-2.5 py-1 text-[11px] font-semibold text-[#29234B] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                        TypeScript
                      </span>
                      <span className="rounded-lg bg-[#EDE8FF] px-2.5 py-1 text-[11px] font-semibold text-[#29234B] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                        WebSockets
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THREE PILLARS (Students, Universities, Industry) */}
        <section className="py-24 sm:py-32 border-t border-[#E8E4DD] bg-white dark:border-[#2E274D] dark:bg-[#0E0C18]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
              <Badge variant="secondary">Ecosystem Value</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17152B] dark:text-[#F7F5F0]">
                Designed for Every Academic Stakeholder
              </h2>
              <p className="text-sm sm:text-base text-[#555366] dark:text-[#9290A0] leading-relaxed">
                MITRA breaks down friction between university curricula and high-velocity corporate engineering demands.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {/* Pillar 1: Students */}
              <Card className="hover:border-[#7655E8] transition-all hover:shadow-hover">
                <CardContent className="p-8 sm:p-10 space-y-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                    <GraduationCap className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#17152B] dark:text-[#F7F5F0]">
                      For Ambitious Students
                    </h3>
                    <p className="text-xs text-[#555366] dark:text-[#9290A0] mt-1">
                      Turn real engineering capability into verified career outcomes.
                    </p>
                  </div>
                  <ul className="text-xs sm:text-sm space-y-3.5 text-[#555366] dark:text-[#9290A0]">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#7655E8] shrink-0 mt-0.5" />
                      <span>Cryptographically verified Skill Passport</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#7655E8] shrink-0 mt-0.5" />
                      <span>Algorithmic ATS resume analysis & scoring</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#7655E8] shrink-0 mt-0.5" />
                      <span>Personalized AI career roadmaps & gap audits</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#7655E8] shrink-0 mt-0.5" />
                      <span>Direct corporate applications without recruiter friction</span>
                    </li>
                  </ul>
                  <Link href="/students" className="block pt-2">
                    <span className="text-xs font-bold text-[#7655E8] hover:underline dark:text-[#EDE8FF] inline-flex items-center gap-1.5">
                      Explore Student Benefits <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </CardContent>
              </Card>

              {/* Pillar 2: Industry & Companies */}
              <Card className="hover:border-[#7655E8] transition-all hover:shadow-hover">
                <CardContent className="p-8 sm:p-10 space-y-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                    <Briefcase className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#17152B] dark:text-[#F7F5F0]">
                      For Corporate Recruiters
                    </h3>
                    <p className="text-xs text-[#555366] dark:text-[#9290A0] mt-1">
                      Cut campus hiring cycles by 80% with proven competency filters.
                    </p>
                  </div>
                  <ul className="text-xs sm:text-sm space-y-3.5 text-[#555366] dark:text-[#9290A0]">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#7655E8] shrink-0 mt-0.5" />
                      <span>Filtered access to verified undergraduate engineering talent</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#7655E8] shrink-0 mt-0.5" />
                      <span>Automated candidate match explanations & radar charts</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#7655E8] shrink-0 mt-0.5" />
                      <span>Sponsor joint capstone projects & national hackathons</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#7655E8] shrink-0 mt-0.5" />
                      <span>Streamlined candidate pipeline management with feedback</span>
                    </li>
                  </ul>
                  <Link href="/companies" className="block pt-2">
                    <span className="text-xs font-bold text-[#7655E8] hover:underline dark:text-[#EDE8FF] inline-flex items-center gap-1.5">
                      Recruitment Solutions <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </CardContent>
              </Card>

              {/* Pillar 3: Institutions */}
              <Card className="hover:border-[#7655E8] transition-all hover:shadow-hover">
                <CardContent className="p-8 sm:p-10 space-y-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                    <Building2 className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#17152B] dark:text-[#F7F5F0]">
                      For Universities & Colleges
                    </h3>
                    <p className="text-xs text-[#555366] dark:text-[#9290A0] mt-1">
                      Telemetry and corporate MoU tracking for NIRF & NBA compliance.
                    </p>
                  </div>
                  <ul className="text-xs sm:text-sm space-y-3.5 text-[#555366] dark:text-[#9290A0]">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#7655E8] shrink-0 mt-0.5" />
                      <span>Real-time departmental placement telemetry & audit</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#7655E8] shrink-0 mt-0.5" />
                      <span>Accreditation-ready skill distribution reports</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#7655E8] shrink-0 mt-0.5" />
                      <span>Formal corporate MoU tracking & internship validation</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#7655E8] shrink-0 mt-0.5" />
                      <span>Faculty research linkage and grant clearinghouse</span>
                    </li>
                  </ul>
                  <Link href="/institutions" className="block pt-2">
                    <span className="text-xs font-bold text-[#7655E8] hover:underline dark:text-[#EDE8FF] inline-flex items-center gap-1.5">
                      Institutional Network <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-24 sm:py-32 border-t border-[#E8E4DD] bg-[#F7F5F0] dark:border-[#2E274D] dark:bg-[#12101F]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
              <Badge variant="outline">Transparent Architecture</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17152B] dark:text-[#F7F5F0]">
                How MITRA Works in 4 Steps
              </h2>
              <p className="text-sm sm:text-base text-[#555366] dark:text-[#9290A0]">
                An objective, verifiable bridge from student enrollment to high-impact career placement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { step: "01", title: "Institutional Sign-Up", desc: "Universities configure institutional domains. Students verify with accredited college credentials, guaranteeing zero fabrication." },
                { step: "02", title: "Skill Passport Engine", desc: "Students link codebases, participate in proctored benchmarks, and generate cryptographically verified competency badges." },
                { step: "03", title: "AI Matching & Gap Audit", desc: "MITRA algorithms compare candidate profiles against live corporate job specs, computing career readiness and learning roadmaps." },
                { step: "04", title: "Direct Opportunity Offer", desc: "Apply directly, receive recruiter interview updates, and secure internships with transparent stipends and zero broker fees." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-[#E8E4DD] bg-white p-8 shadow-card dark:border-[#2E274D] dark:bg-[#1A162B] space-y-4 hover:border-[#7655E8] transition-all"
                >
                  <div className="text-3xl font-black text-[#7655E8] dark:text-[#EDE8FF]">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold text-[#17152B] dark:text-[#F7F5F0]">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="py-24 sm:py-32 border-t border-[#E8E4DD] bg-[#17152B] text-white dark:border-[#2E274D] dark:bg-[#0E0C18]">
          <div className="mx-auto max-w-4xl px-4 text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#29234B] px-4 py-1.5 text-xs font-semibold text-[#EDE8FF] border border-[#7655E8]/30">
              <Zap className="h-3.5 w-3.5 text-[#E8C98A]" />
              Accelerate Your Academic-Industry Potential
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Ready to Accelerate Your Career with MITRA?
            </h2>
            <p className="text-base sm:text-lg text-[#9290A0] max-w-2xl mx-auto leading-relaxed">
              Join thousands of students, faculty supervisors, and industry partners collaborating across India today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto font-bold text-base px-9 py-4 shadow-hover">
                  Create Your Free Account <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/opportunities">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-9 py-4 bg-transparent text-white border-[#2E274D] hover:bg-[#29234B]">
                  Browse Listings
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Demo Data Showcase Pill for evaluator presentations */}
      <DemoShowcaseDrawer />
    </div>
  );
}
