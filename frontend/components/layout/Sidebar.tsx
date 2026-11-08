"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  User,
  Award,
  FileText,
  BrainCircuit,
  Briefcase,
  Layers,
  Users,
  Calendar,
  Building2,
  GraduationCap,
  BookOpen,
  Microscope,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
  Bell,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/api";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: any;
  badge?: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const { user, role, signOut, signInWithDemoRole } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Role-specific navigations
  const studentNav: NavItem[] = [
    { label: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
    { label: "Skill Passport", href: "/dashboard/student#passport", icon: Award, badge: "Verified" },
    { label: "Resume Center", href: "/dashboard/student#resume", icon: FileText },
    { label: "AI Career Intel", href: "/dashboard/student#ai-intel", icon: BrainCircuit, badge: "AI" },
    { label: "Opportunities", href: "/opportunities", icon: Briefcase },
    { label: "Applications", href: "/dashboard/student#applications", icon: Layers },
    { label: "Mentorship", href: "/dashboard/student#mentorship", icon: Users },
    { label: "Workshops & Events", href: "/dashboard/student#events", icon: Calendar },
    { label: "My Profile", href: "/profile", icon: User },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const recruiterNav: NavItem[] = [
    { label: "Overview", href: "/dashboard/recruiter", icon: LayoutDashboard },
    { label: "Manage Postings", href: "/dashboard/recruiter#opportunities", icon: Briefcase },
    { label: "Candidate Search", href: "/dashboard/recruiter#candidates", icon: Users, badge: "AI Match" },
    { label: "Applications Pipeline", href: "/dashboard/recruiter#pipeline", icon: Layers },
    { label: "Company Profile", href: "/profile", icon: Building2 },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const institutionNav: NavItem[] = [
    { label: "Institution Hub", href: "/dashboard/institution", icon: Building2 },
    { label: "Departments", href: "/dashboard/institution#departments", icon: Layers },
    { label: "Student Roster", href: "/dashboard/institution#students", icon: GraduationCap },
    { label: "Placement Metrics", href: "/dashboard/institution#placements", icon: Award },
    { label: "Industry Partners", href: "/dashboard/institution#partners", icon: Briefcase },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const facultyNav: NavItem[] = [
    { label: "Faculty Hub", href: "/dashboard/faculty", icon: GraduationCap },
    { label: "Assigned Students", href: "/dashboard/faculty#students", icon: Users },
    { label: "Project Supervision", href: "/dashboard/faculty#projects", icon: BookOpen },
    { label: "Research Linkage", href: "/dashboard/faculty#research", icon: Microscope },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const mentorNav: NavItem[] = [
    { label: "Mentor Workspace", href: "/dashboard/mentor", icon: Users },
    { label: "Mentorship Requests", href: "/dashboard/mentor#requests", icon: Layers },
    { label: "Active Sessions", href: "/dashboard/mentor#sessions", icon: Calendar },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const researcherNav: NavItem[] = [
    { label: "Research Lab", href: "/dashboard/researcher", icon: Microscope },
    { label: "Active Grants & Projects", href: "/dashboard/researcher#projects", icon: Layers },
    { label: "Industry Collaboration", href: "/dashboard/researcher#collab", icon: Briefcase },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const adminNav: NavItem[] = [
    { label: "Platform Admin", href: "/dashboard/admin", icon: ShieldCheck },
    { label: "User Directory", href: "/dashboard/admin#users", icon: Users },
    { label: "Verifications", href: "/dashboard/admin#verification", icon: Award },
    { label: "Audit Logs", href: "/dashboard/admin#logs", icon: FileText },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const navMap: Record<UserRole, NavItem[]> = {
    student: studentNav,
    recruiter: recruiterNav,
    institution_admin: institutionNav,
    faculty: facultyNav,
    mentor: mentorNav,
    researcher: researcherNav,
    admin: adminNav,
  };

  const currentNav = navMap[role] || studentNav;

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-[#E8E4DD] bg-white transition-all duration-300 dark:border-[#2E274D] dark:bg-[#1A162B] min-h-screen",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-20 items-center justify-between px-4 border-b border-[#E8E4DD] dark:border-[#2E274D]">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7655E8] to-[#29234B] text-white shadow-md shadow-[#7655E8]/20">
              <Sparkles className="h-4 w-4 text-[#E8C98A]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
                  MITRA
                </span>
                <span className="rounded bg-[#EDE8FF] px-1.5 py-0.5 text-[9px] font-bold text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                  PRO
                </span>
              </div>
              <span className="block text-[10px] uppercase font-bold tracking-wider text-[#555366] dark:text-[#9290A0]">
                {role.replace("_", " ")}
              </span>
            </div>
          </Link>
        )}

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl border border-[#E8E4DD] text-[#555366] hover:bg-[#EDE8FF] hover:text-[#7655E8] dark:border-[#2E274D] dark:text-[#9290A0] dark:hover:bg-[#241E3D] transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Role Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-1.5">
        {currentNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150",
                isActive
                  ? "bg-[#EDE8FF] text-[#7655E8] shadow-xs dark:bg-[#241E3D] dark:text-[#EDE8FF]"
                  : "text-[#555366] hover:bg-[#F7F5F0] hover:text-[#17152B] dark:text-[#9290A0] dark:hover:bg-[#241E3D]/50 dark:hover:text-[#F7F5F0]"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                  isActive ? "text-[#7655E8] dark:text-[#EDE8FF]" : "text-[#555366] dark:text-[#9290A0]"
                )}
              />
              {!collapsed && (
                <div className="flex flex-1 items-center justify-between overflow-hidden">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-2 rounded-md bg-white border border-[#E8E4DD] px-1.5 py-0.5 text-[10px] font-bold text-[#7655E8] dark:bg-[#12101F] dark:border-[#2E274D] dark:text-[#EDE8FF]">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Evaluator Persona Switcher (Clean, Spacious) */}
      {!collapsed && (
        <div className="px-3 py-3 border-t border-[#E8E4DD] bg-[#F7F5F0]/60 dark:border-[#2E274D] dark:bg-[#12101F]/40">
          <label className="text-[10px] uppercase font-bold text-[#555366] dark:text-[#9290A0] block mb-1.5">
            Switch Perspective:
          </label>
          <select
            value={role}
            onChange={(e) => signInWithDemoRole(e.target.value as UserRole)}
            className="w-full text-xs font-semibold rounded-xl border border-[#E8E4DD] bg-white p-2 text-[#17152B] focus:border-[#7655E8] focus:outline-none dark:border-[#2E274D] dark:bg-[#1A162B] dark:text-[#F7F5F0]"
          >
            <option value="student">Student Portal</option>
            <option value="recruiter">Recruiter / Industry</option>
            <option value="institution_admin">University Admin</option>
            <option value="faculty">Faculty Supervisor</option>
            <option value="mentor">Industry Mentor</option>
            <option value="researcher">Academic Researcher</option>
            <option value="admin">Platform Governance</option>
          </select>
        </div>
      )}

      {/* User Profile Footer */}
      <div className="border-t border-[#E8E4DD] p-3.5 dark:border-[#2E274D]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#7655E8] to-[#29234B] text-xs font-bold text-white shadow-sm">
            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "U"}
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-xs font-bold text-[#17152B] dark:text-[#F7F5F0]">
                {user?.full_name || "MITRA Member"}
              </p>
              <p className="truncate text-[11px] text-[#555366] dark:text-[#9290A0]">
                {user?.email || "user@mitra.edu"}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={signOut}
            title="Sign Out"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-[#555366] hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
