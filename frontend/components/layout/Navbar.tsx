"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, ArrowRight, UserCircle2, LogIn, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Opportunities", href: "/opportunities" },
    { label: "For Students", href: "/students" },
    { label: "For Institutions", href: "/institutions" },
    { label: "For Companies", href: "/companies" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E4DD]/80 bg-[#F7F5F0]/90 backdrop-blur-md transition-colors dark:border-[#2E274D]/80 dark:bg-[#12101F]/90">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7655E8] to-[#29234B] text-white shadow-md shadow-[#7655E8]/20 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5 text-[#E8C98A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
                MITRA
              </span>
              <span className="rounded-full border border-[#E8C98A] bg-[#E8C98A]/20 px-2 py-0.5 text-[10px] font-bold text-[#A07525] dark:text-[#E8C98A]">
                SIH &apos;26
              </span>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-medium text-[#555366] dark:text-[#9290A0]">
              Academia–Industry Cloud
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-[#7655E8] dark:hover:text-[#EDE8FF]",
                pathname === link.href
                  ? "text-[#7655E8] font-bold dark:text-[#EDE8FF]"
                  : "text-[#555366] dark:text-[#9290A0]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isAuthenticated ? (
            <div className="flex items-center gap-2.5">
              <Link href={`/dashboard/${user?.role || "student"}`}>
                <Button size="sm" variant="default" className="font-semibold">
                  Dashboard
                </Button>
              </Link>
              <Button size="sm" variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2.5">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="font-semibold">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="default" size="sm" className="gap-1.5 font-bold shadow-md shadow-[#7655E8]/20">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-xl text-[#17152B] hover:bg-[#EDE8FF] dark:text-[#F7F5F0] dark:hover:bg-[#241E3D] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E4DD] bg-[#F7F5F0] px-4 pt-4 pb-6 space-y-3 dark:border-[#2E274D] dark:bg-[#12101F]">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                  pathname === link.href
                    ? "bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]"
                    : "text-[#555366] hover:bg-white dark:text-[#9290A0] dark:hover:bg-[#1A162B]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-[#E8E4DD] pt-4 dark:border-[#2E274D] flex flex-col gap-2">
            {!isAuthenticated ? (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full">
                    Get Started Free
                  </Button>
                </Link>
              </>
            ) : (
              <Link href={`/dashboard/${user?.role || "student"}`} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
