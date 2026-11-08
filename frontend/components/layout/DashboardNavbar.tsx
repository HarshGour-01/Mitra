"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Bell, Sparkles, User, Settings, LogOut, CheckCircle, Shield } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";

export function DashboardNavbar({ title = "Dashboard" }: { title?: string }) {
  const { user, signOut } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: "Application Shortlisted", desc: "Zerodha Tech shortlisted your Next.js systems profile.", time: "12m ago", unread: true },
    { id: 2, title: "Skill Verified by Faculty", desc: "Dr. Arvind Menon verified 'Next.js & React 19' (Level 5).", time: "1h ago", unread: true },
    { id: 3, title: "New Matching Research Opportunity", desc: "Microsoft Research posted Multimodal AI Fellow.", time: "1d ago", unread: false },
  ];

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-[#E8E4DD] bg-white/90 px-6 sm:px-8 backdrop-blur-md dark:border-[#2E274D] dark:bg-[#12101F]/90">
      {/* Title & Breadcrumbs */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
            {title}
          </h1>
          <span className="hidden sm:inline-flex rounded-full bg-[#EDE8FF] px-2.5 py-0.5 text-[10px] font-bold text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
            Enterprise Cloud
          </span>
        </div>
        <p className="text-xs text-[#555366] dark:text-[#9290A0] mt-0.5">
          MITRA Collaboration Network • Verified Institutional Ledger
        </p>
      </div>

      {/* Global Search & Actions */}
      <div className="flex items-center gap-4">
        {/* Global Search */}
        <div className="relative hidden md:block w-72 lg:w-96">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9290A0]" />
          <input
            type="search"
            placeholder="Search internships, skills, verified students..."
            className="h-11 w-full rounded-xl border border-[#E8E4DD] bg-[#F7F5F0] pl-11 pr-4 text-xs font-medium text-[#17152B] transition-all placeholder:text-[#9290A0] focus:border-[#7655E8] focus:bg-white focus:outline-none dark:border-[#2E274D] dark:bg-[#1A162B] dark:text-[#F7F5F0] dark:focus:border-[#7655E8]"
          />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Icon & Drawer */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8E4DD] bg-white text-[#555366] hover:bg-[#EDE8FF] hover:text-[#7655E8] dark:border-[#2E274D] dark:bg-[#1A162B] dark:text-[#9290A0] dark:hover:bg-[#241E3D] transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#7655E8] ring-2 ring-white dark:ring-[#1A162B]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-84 rounded-2xl border border-[#E8E4DD] bg-white p-5 shadow-2xl dark:border-[#2E274D] dark:bg-[#1A162B] z-50">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DD] dark:border-[#2E274D]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#17152B] dark:text-[#F7F5F0]">
                  Live Activity Alerts
                </h4>
                <span className="text-[11px] font-semibold text-[#7655E8] dark:text-[#EDE8FF] cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="mt-3.5 space-y-2.5 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-xl text-xs transition-colors ${
                      n.unread
                        ? "bg-[#EDE8FF]/60 dark:bg-[#241E3D]/80"
                        : "bg-transparent hover:bg-[#F7F5F0] dark:hover:bg-[#12101F]"
                    }`}
                  >
                    <div className="font-bold text-[#17152B] dark:text-[#F7F5F0]">{n.title}</div>
                    <div className="text-[#555366] dark:text-[#9290A0] mt-1 leading-relaxed">{n.desc}</div>
                    <div className="text-[10px] font-semibold text-[#7655E8] dark:text-[#EDE8FF] mt-1.5">{n.time}</div>
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
            className="flex items-center gap-2.5 rounded-xl border border-[#E8E4DD] bg-white p-1.5 px-2.5 shadow-xs hover:border-[#7655E8] dark:border-[#2E274D] dark:bg-[#1A162B] transition-all"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[#7655E8] to-[#29234B] text-xs font-bold text-white shadow-xs">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="hidden md:inline-block text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] max-w-[120px] truncate">
              {user?.full_name?.split(" ")[0] || "Account"}
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-[#E8E4DD] bg-white p-2 shadow-2xl dark:border-[#2E274D] dark:bg-[#1A162B] z-50">
              <div className="px-3 py-2 border-b border-[#E8E4DD] dark:border-[#2E274D]">
                <p className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] truncate">
                  {user?.full_name || "MITRA User"}
                </p>
                <p className="text-[10px] text-[#555366] dark:text-[#9290A0] truncate">
                  {user?.email || "user@mitra.edu"}
                </p>
              </div>

              <div className="py-1">
                <Link
                  href="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#555366] hover:bg-[#EDE8FF] hover:text-[#7655E8] dark:text-[#9290A0] dark:hover:bg-[#241E3D] dark:hover:text-[#EDE8FF]"
                >
                  <User className="h-4 w-4" /> My Profile
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#555366] hover:bg-[#EDE8FF] hover:text-[#7655E8] dark:text-[#9290A0] dark:hover:bg-[#241E3D] dark:hover:text-[#EDE8FF]"
                >
                  <Settings className="h-4 w-4" /> Settings
                </Link>
              </div>

              <div className="border-t border-[#E8E4DD] pt-1 dark:border-[#2E274D]">
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    signOut();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
