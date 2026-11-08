import React from "react";
import Link from "next/link";
import { Sparkles, Heart, ShieldCheck, Mail, Globe, MapPin, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#E8E4DD] bg-[#17152B] text-[#F7F5F0] py-20 dark:border-[#2E274D] dark:bg-[#0E0C18]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7655E8] text-white shadow-md shadow-[#7655E8]/30">
                <Sparkles className="h-5 w-5 text-[#E8C98A]" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">
                  MITRA
                </span>
                <span className="block text-xs font-semibold text-[#E8C98A]">
                  Your Future, Your Mitra.
                </span>
              </div>
            </div>

            <p className="max-w-md text-sm text-[#9290A0] leading-relaxed">
              An intelligent ecosystem connecting students, universities, mentors, and leading industries across India to transform verified academic potential into real-world career opportunities.
            </p>

            <div className="flex items-center gap-2 rounded-xl bg-[#29234B]/70 p-3 text-xs text-[#EDE8FF] border border-[#7655E8]/20 max-w-md">
              <ShieldCheck className="h-4 w-4 text-[#E8C98A] shrink-0" />
              <span>National Smart India Hackathon Architecture • SIH 2026 Production Ready</span>
            </div>
          </div>

          {/* Platform Columns */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#E8C98A] tracking-wider uppercase">
              Platform
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/opportunities" className="text-[#9290A0] hover:text-[#EDE8FF] transition-colors">
                  Opportunities Directory
                </Link>
              </li>
              <li>
                <Link href="/students" className="text-[#9290A0] hover:text-[#EDE8FF] transition-colors">
                  Skill Passport Verification
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-[#9290A0] hover:text-[#EDE8FF] transition-colors">
                  AI Career Intelligence
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-[#9290A0] hover:text-[#EDE8FF] transition-colors">
                  Recruiter Matching Engine
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#E8C98A] tracking-wider uppercase">
              Stakeholders
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/students" className="text-[#9290A0] hover:text-[#EDE8FF] transition-colors">
                  For Students
                </Link>
              </li>
              <li>
                <Link href="/institutions" className="text-[#9290A0] hover:text-[#EDE8FF] transition-colors">
                  For Universities
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-[#9290A0] hover:text-[#EDE8FF] transition-colors">
                  For Corporate Recruiters
                </Link>
              </li>
              <li>
                <Link href="/mentors" className="text-[#9290A0] hover:text-[#EDE8FF] transition-colors">
                  For Research Mentors & Faculty
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#E8C98A] tracking-wider uppercase">
              Trust & Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-[#9290A0] hover:text-[#EDE8FF] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#9290A0] hover:text-[#EDE8FF] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#9290A0] hover:text-[#EDE8FF] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#9290A0] hover:text-[#EDE8FF] transition-colors">
                  About the Vision
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-[#29234B] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9290A0]">
          <p>© 2026 MITRA National Platform. Built for India’s Academic & Industrial Excellence.</p>
          <p className="flex items-center gap-1.5 text-[#EDE8FF]">
            <span>Where Potential Becomes Opportunity</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
