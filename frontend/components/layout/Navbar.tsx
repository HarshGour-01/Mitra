"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, ArrowRight, UserCircle2, LogIn } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b border-[#F1DCE5]/80 bg-[#FFF8FA]/90 backdrop-blur-md transition-colors dark:border-[#493440]/80 dark:bg-[#171217]/90">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#E879A5] to-[#C94F7C] text-white shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#C94F7C] to-[#E879A5] bg-clip-text text-transparent dark:from-[#F09ABB] dark:to-[#FFF3F7]">
              MITRA
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-medium text-[#806D76] dark:text-[#C3ADB8]">
              Academia–Industry
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
                "text-sm font-medium transition-colors hover:text-[#C94F7C] dark:hover:text-[#F09ABB]",
                pathname === link.href
                  ? "text-[#C94F7C] font-semibold dark:text-[#F09ABB]"
                  : "text-[#30232A]/80 dark:text-[#FFF3F7]/80"
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
            <div className="flex items-center gap-2">
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
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="default" size="sm" className="gap-1.5 font-semibold">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-xl text-[#30232A] hover:bg-[#FFF0F5] dark:text-[#FFF3F7] dark:hover:bg-[#211922]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#F1DCE5] bg-[#FFF8FA] px-4 pt-2 pb-6 space-y-3 dark:border-[#493440] dark:bg-[#171217]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-[#30232A] hover:bg-[#FFF0F5] dark:text-[#FFF3F7] dark:hover:bg-[#211922]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#F1DCE5] dark:border-[#493440] flex flex-col gap-2">
            {!isAuthenticated ? (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full">
                    Get Started
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
