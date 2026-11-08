"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Bell, Sparkles, User, Settings, LogOut, CheckCircle } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";

export function DashboardNavbar({ title = "Dashboard" }: { title?: string }) {
  const { user, signOut } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: "Application Shortlisted", desc: "Zerodha Tech shortlisted your Web Architect profile.", time: "2h ago", unread: true },
    { id: 2, title: "Skill Verified", desc: "MITRA verified 'Next.js & React 19' (Level 5).", time: "1d ago", unread: false },
    { id: 3, title: "New Matching Opportunity", desc: "Microsoft Research posted AI Systems Intern.", time: "2d ago", unread: false },
  ];

  return (
    <header className="sticky top-0 z-40 flex h-18 w-full items-center justify-between border-b border-[#F1DCE5] bg-white/80 px-6 backdrop-blur-md dark:border-[#493440] dark:bg-[#171217]/80">
      {/* Title & Breadcrumbs */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#30232A] dark:text-[#FFF3F7]">{title}</h1>
        <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
          MITRA Portal • Academic–Industry Collaborative Cloud
        </p>
      </div>

      {/* Global Search & Actions */}
      <div className="flex items-center gap-3.5">
        {/* Global Search */}
        <div className="relative hidden md:block w-64 lg:w-80">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#806D76] dark:text-[#C3ADB8]" />
          <input
            type="search"
            placeholder="Search internships, skills, mentors..."
            className="h-10 w-full rounded-xl border border-[#F1DCE5] bg-[#FFF8FA] pl-10 pr-4 text-xs text-[#30232A] transition-all placeholder:text-[#806D76]/60 focus:border-[#E879A5] focus:outline-none dark:border-[#493440] dark:bg-[#211922] dark:text-[#FFF3F7]"
          />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Icon & Drawer */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#F1DCE5] bg-white text-[#806D76] hover:bg-[#FFF0F5] dark:border-[#493440] dark:bg-[#2B202A] dark:text-[#C3ADB8] dark:hover:bg-[#211922]"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#E879A5] ring-2 ring-white dark:ring-[#2B202A]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-[#F1DCE5] bg-white p-4 shadow-xl dark:border-[#493440] dark:bg-[#2B202A] z-50">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1DCE5] dark:border-[#493440]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#30232A] dark:text-[#FFF3F7]">
                  Notifications
                </h4>
                <span className="text-[10px] text-[#C94F7C] dark:text-[#F09ABB] cursor-pointer">
                  Mark all read
                </span>
              </div>
              <div className="mt-3 space-y-2.5 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl text-xs transition-colors ${
                      n.unread ? "bg-[#FFF0F5] dark:bg-[#211922]" : "bg-transparent"
                    }`}
                  >
                    <div className="font-semibold text-[#30232A] dark:text-[#FFF3F7]">{n.title}</div>
                    <div className="text-[#806D76] dark:text-[#C3ADB8] mt-0.5">{n.desc}</div>
                    <div className="text-[10px] text-[#E879A5] mt-1">{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-xl border border-[#F1DCE5] bg-white p-1.5 shadow-sm hover:border-[#E879A5] dark:border-[#493440] dark:bg-[#2B202A]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-[#E879A5] to-[#C94F7C] text-xs font-bold text-white">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="hidden md:inline-block text-xs font-semibold text-[#30232A] dark:text-[#FFF3F7] max-w-[100px] truncate">
              {user?.full_name?.split(" ")[0] || "Account"}
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#F1DCE5] bg-white p-2 shadow-xl dark:border-[#493440] dark:bg-[#2B202A] z-50">
              <Link
                href="/profile"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#30232A] hover:bg-[#FFF0F5] dark:text-[#FFF3F7] dark:hover:bg-[#211922]"
              >
                <User className="h-3.5 w-3.5 text-[#E879A5]" />
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#30232A] hover:bg-[#FFF0F5] dark:text-[#FFF3F7] dark:hover:bg-[#211922]"
              >
                <Settings className="h-3.5 w-3.5 text-[#E879A5]" />
                Settings
              </Link>
              <div className="my-1 border-t border-[#F1DCE5] dark:border-[#493440]" />
              <button
                type="button"
                onClick={() => {
                  setShowUserMenu(false);
                  signOut();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
