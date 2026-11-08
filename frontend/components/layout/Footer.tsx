import React from "react";
import Link from "next/link";
import { Sparkles, Heart, ShieldCheck, Mail, Globe, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#F1DCE5] bg-[#FFF0F5]/50 py-14 dark:border-[#493440] dark:bg-[#171217]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#E879A5] to-[#C94F7C] text-white shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#C94F7C] dark:text-[#F09ABB]">
                MITRA
              </span>
            </div>
            <p className="text-sm font-medium text-[#C94F7C] dark:text-[#F09ABB]">
              Your Future, Your Mitra.
            </p>
            <p className="max-w-sm text-sm text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">
              An AI-powered Academia–Industry Collaboration Platform connecting ambitious students, accredited universities, leading recruiters, and experienced research mentors across India.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#806D76] dark:text-[#C3ADB8]">
              <ShieldCheck className="h-4 w-4 text-[#E879A5]" />
              National Hackathon Production Architecture
            </div>
          </div>

          {/* Platform Columns */}
          <div>
            <h4 className="text-sm font-semibold text-[#30232A] dark:text-[#FFF3F7] tracking-wider uppercase">
              Platform
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/opportunities" className="text-[#806D76] hover:text-[#C94F7C] dark:text-[#C3ADB8] dark:hover:text-[#F09ABB]">
                  Opportunities Directory
                </Link>
              </li>
              <li>
                <Link href="/students" className="text-[#806D76] hover:text-[#C94F7C] dark:text-[#C3ADB8] dark:hover:text-[#F09ABB]">
                  Skill Passport
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-[#806D76] hover:text-[#C94F7C] dark:text-[#C3ADB8] dark:hover:text-[#F09ABB]">
                  AI Career Intelligence
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-[#806D76] hover:text-[#C94F7C] dark:text-[#C3ADB8] dark:hover:text-[#F09ABB]">
                  Recruiter Matching
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#30232A] dark:text-[#FFF3F7] tracking-wider uppercase">
              Stakeholders
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/students" className="text-[#806D76] hover:text-[#C94F7C] dark:text-[#C3ADB8] dark:hover:text-[#F09ABB]">
                  For Students
                </Link>
              </li>
              <li>
                <Link href="/institutions" className="text-[#806D76] hover:text-[#C94F7C] dark:text-[#C3ADB8] dark:hover:text-[#F09ABB]">
                  For Universities
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-[#806D76] hover:text-[#C94F7C] dark:text-[#C3ADB8] dark:hover:text-[#F09ABB]">
                  For Companies
                </Link>
              </li>
              <li>
                <Link href="/mentors" className="text-[#806D76] hover:text-[#C94F7C] dark:text-[#C3ADB8] dark:hover:text-[#F09ABB]">
                  For Mentors & Faculty
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#30232A] dark:text-[#FFF3F7] tracking-wider uppercase">
              Legal & Trust
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="text-[#806D76] hover:text-[#C94F7C] dark:text-[#C3ADB8] dark:hover:text-[#F09ABB]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#806D76] hover:text-[#C94F7C] dark:text-[#C3ADB8] dark:hover:text-[#F09ABB]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#806D76] hover:text-[#C94F7C] dark:text-[#C3ADB8] dark:hover:text-[#F09ABB]">
                  Support & Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#F1DCE5] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#806D76] dark:border-[#493440] dark:text-[#C3ADB8] gap-4">
          <p>© {new Date().getFullYear()} MITRA Platform. Built for Indian Academia–Industry Innovation.</p>
          <div className="flex items-center gap-1">
            Designed with <Heart className="h-3.5 w-3.5 text-[#E879A5] fill-current" /> for educational excellence.
          </div>
        </div>
      </div>
    </footer>
  );
}
