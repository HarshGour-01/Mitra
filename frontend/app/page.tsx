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
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
          {/* Subtle Pink Ambient Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#E879A5]/20 to-[#F8DCE8]/30 blur-3xl rounded-full -z-10 pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F1DCE5] bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#C94F7C] shadow-sm backdrop-blur-md dark:border-[#493440] dark:bg-[#2B202A]/80 dark:text-[#F09ABB]">
                <Sparkles className="h-3.5 w-3.5 text-[#E879A5]" />
                <span>Next-Gen Academia–Industry Collaboration Platform</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#30232A] dark:text-[#FFF3F7] leading-[1.15]">
                Where Talent Meets{" "}
                <span className="bg-gradient-to-r from-[#C94F7C] via-[#E879A5] to-[#C94F7C] bg-clip-text text-transparent">
                  Opportunity.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#806D76] dark:text-[#C3ADB8] max-w-2xl mx-auto leading-relaxed">
                MITRA is the AI-orchestrated bridge unifying ambitious students, accredited universities, top recruiters, and expert mentors. Verify your skills, discover genuine corporate internships, and accelerate real-world innovation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                <Link href="/register">
                  <Button size="lg" className="font-bold text-base shadow-hover">
                    Get Started Free <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/opportunities">
                  <Button size="lg" variant="outline" className="text-base">
                    Explore Opportunities
                  </Button>
                </Link>
              </div>

              <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#806D76] dark:text-[#C3ADB8]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#E879A5]" /> Verified Skill Passports
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#E879A5]" /> Real Corporate Postings
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-[#E879A5]" /> Zero Fabricated Matches
                </span>
              </div>
            </div>

            {/* INTERACTIVE STUDENT-INDUSTRY VISUALIZER CARD */}
            <div className="mt-14 max-w-5xl mx-auto">
              <div className="rounded-3xl border border-[#F1DCE5] bg-white/70 p-4 sm:p-6 shadow-2xl backdrop-blur-xl dark:border-[#493440] dark:bg-[#2B202A]/70">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Left: Student Node */}
                  <div className="rounded-2xl border border-[#F1DCE5] bg-[#FFF8FA] p-5 dark:border-[#493440] dark:bg-[#171217] space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="verified">Student</Badge>
                      <span className="text-[10px] text-emerald-600 font-bold">88.5% Ready</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#30232A] dark:text-[#FFF3F7]">
                      Harsh Gour (B.Tech CS)
                    </h4>
                    <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
                      IIT/NIT Partner Institute
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <span className="rounded bg-[#FFF0F5] px-2 py-0.5 text-[10px] font-semibold text-[#C94F7C] dark:bg-[#2B202A] dark:text-[#F09ABB]">
                        Next.js
                      </span>
                      <span className="rounded bg-[#FFF0F5] px-2 py-0.5 text-[10px] font-semibold text-[#C94F7C] dark:bg-[#2B202A] dark:text-[#F09ABB]">
                        FastAPI
                      </span>
                      <span className="rounded bg-[#FFF0F5] px-2 py-0.5 text-[10px] font-semibold text-[#C94F7C] dark:bg-[#2B202A] dark:text-[#F09ABB]">
                        PostgreSQL
                      </span>
                    </div>
                  </div>

                  {/* Center: MITRA AI Engine */}
                  <div className="text-center space-y-3 py-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#E879A5] to-[#C94F7C] text-white shadow-lg shadow-pink-500/30 animate-pulse_slow">
                      <BrainCircuit className="h-7 w-7" />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C94F7C] dark:text-[#F09ABB]">
                      MITRA Match Engine
                    </div>
                    <div className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      94.5% Skill Alignment
                    </div>
                  </div>

                  {/* Right: Recruiter / Industry Node */}
                  <div className="rounded-2xl border border-[#F1DCE5] bg-[#FFF8FA] p-5 dark:border-[#493440] dark:bg-[#171217] space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Company</Badge>
                      <span className="text-[10px] text-[#C94F7C] dark:text-[#F09ABB] font-bold">₹60,000/mo</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#30232A] dark:text-[#FFF3F7]">
                      Zerodha Tech
                    </h4>
                    <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
                      Full-Stack Web Architect Intern
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <span className="rounded bg-[#FFF0F5] px-2 py-0.5 text-[10px] font-semibold text-[#C94F7C] dark:bg-[#2B202A] dark:text-[#F09ABB]">
                        React 19
                      </span>
                      <span className="rounded bg-[#FFF0F5] px-2 py-0.5 text-[10px] font-semibold text-[#C94F7C] dark:bg-[#2B202A] dark:text-[#F09ABB]">
                        TypeScript
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THREE PILLARS (Students, Universities, Industry) */}
        <section className="py-20 border-t border-[#F1DCE5] bg-[#FFF0F5]/40 dark:border-[#493440] dark:bg-[#171217]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
              <Badge variant="secondary">Ecosystem Value</Badge>
              <h2 className="text-3xl font-extrabold text-[#30232A] dark:text-[#FFF3F7]">
                Designed for Every Academic Stakeholder
              </h2>
              <p className="text-sm text-[#806D76] dark:text-[#C3ADB8]">
                MITRA breaks down the friction between academic curriculum and high-velocity corporate engineering demands.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1: Students */}
              <Card className="hover:border-[#E879A5] transition-all">
                <CardContent className="p-7 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0F5] text-[#C94F7C] dark:bg-[#211922] dark:text-[#F09ABB]">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#30232A] dark:text-[#FFF3F7]">
                    For Ambitious Students
                  </h3>
                  <ul className="text-xs space-y-2.5 text-[#806D76] dark:text-[#C3ADB8]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#E879A5] shrink-0" />
                      Cryptographically verified Skill Passport
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#E879A5] shrink-0" />
                      Algorithmic ATS resume analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#E879A5] shrink-0" />
                      Personalized AI career roadmaps
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#E879A5] shrink-0" />
                      Direct applications without middleman clutter
                    </li>
                  </ul>
                  <Link href="/students" className="block pt-2">
                    <span className="text-xs font-bold text-[#C94F7C] hover:underline dark:text-[#F09ABB] inline-flex items-center gap-1">
                      Explore Student Benefits <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </CardContent>
              </Card>

              {/* Pillar 2: Industry & Companies */}
              <Card className="hover:border-[#E879A5] transition-all">
                <CardContent className="p-7 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0F5] text-[#C94F7C] dark:bg-[#211922] dark:text-[#F09ABB]">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#30232A] dark:text-[#FFF3F7]">
                    For Corporate Recruiters
                  </h3>
                  <ul className="text-xs space-y-2.5 text-[#806D76] dark:text-[#C3ADB8]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#E879A5] shrink-0" />
                      Filtered access to verified undergraduate talent
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#E879A5] shrink-0" />
                      Automated candidate match explanations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#E879A5] shrink-0" />
                      Sponsor joint capstone projects & hackathons
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#E879A5] shrink-0" />
                      Streamlined candidate pipeline management
                    </li>
                  </ul>
                  <Link href="/companies" className="block pt-2">
                    <span className="text-xs font-bold text-[#C94F7C] hover:underline dark:text-[#F09ABB] inline-flex items-center gap-1">
                      Recruitment Solutions <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </CardContent>
              </Card>

              {/* Pillar 3: Institutions */}
              <Card className="hover:border-[#E879A5] transition-all">
                <CardContent className="p-7 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0F5] text-[#C94F7C] dark:bg-[#211922] dark:text-[#F09ABB]">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#30232A] dark:text-[#FFF3F7]">
                    For Universities & Colleges
                  </h3>
                  <ul className="text-xs space-y-2.5 text-[#806D76] dark:text-[#C3ADB8]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#E879A5] shrink-0" />
                      Real-time departmental placement telemetry
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#E879A5] shrink-0" />
                      Accreditation-ready skill distribution reports
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#E879A5] shrink-0" />
                      Formal corporate MoU tracking & management
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#E879A5] shrink-0" />
                      Faculty research linkage clearinghouse
                    </li>
                  </ul>
                  <Link href="/institutions" className="block pt-2">
                    <span className="text-xs font-bold text-[#C94F7C] hover:underline dark:text-[#F09ABB] inline-flex items-center gap-1">
                      Institutional Network <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-20 border-t border-[#F1DCE5] dark:border-[#493440]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
              <Badge variant="outline">Transparent Architecture</Badge>
              <h2 className="text-3xl font-extrabold text-[#30232A] dark:text-[#FFF3F7]">
                How MITRA Works in 4 Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Institutional Sign-Up", desc: "Students and colleges register with verified academic credentials and departmental enrollment." },
                { step: "02", title: "Skill Passport Engine", desc: "Upload projects, participate in benchmark evaluations, and generate verified competency badges." },
                { step: "03", title: "AI Matching & Gap Audit", desc: "MITRA algorithms compare candidate profiles with corporate postings and compute readiness scores." },
                { step: "04", title: "Direct Opportunity Offer", desc: "Apply directly, receive recruiter interview updates, and secure internships with transparent stipends." },
              ].map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-[#F1DCE5] bg-white p-6 dark:border-[#493440] dark:bg-[#2B202A] space-y-2">
                  <div className="text-2xl font-black text-[#E879A5] dark:text-[#F09ABB]">
                    {item.step}
                  </div>
                  <h4 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">{item.title}</h4>
                  <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="py-20 border-t border-[#F1DCE5] bg-gradient-to-r from-[#FFF0F5] to-white dark:border-[#493440] dark:from-[#211922] dark:to-[#171217]">
          <div className="mx-auto max-w-4xl px-4 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#30232A] dark:text-[#FFF3F7]">
              Ready to Accelerate Your Career with MITRA?
            </h2>
            <p className="text-sm text-[#806D76] dark:text-[#C3ADB8] max-w-xl mx-auto">
              Join thousands of students and faculty collaborating with leading Indian tech companies today.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/register">
                <Button size="lg" className="font-bold">
                  Create Your Free Account
                </Button>
              </Link>
              <Link href="/opportunities">
                <Button size="lg" variant="outline">
                  Browse Listings
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
