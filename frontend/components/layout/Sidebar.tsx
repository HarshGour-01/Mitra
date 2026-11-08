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
        "relative flex flex-col border-r border-[#F1DCE5] bg-white transition-all duration-300 dark:border-[#493440] dark:bg-[#211922] min-h-screen",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-18 items-center justify-between px-4 border-b border-[#F1DCE5] dark:border-[#493440]">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#E879A5] to-[#C94F7C] text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-[#C94F7C] dark:text-[#F09ABB]">
                MITRA
              </span>
              <span className="block text-[10px] uppercase font-semibold tracking-wider text-[#806D76] dark:text-[#C3ADB8]">
                {role.replace("_", " ")}
              </span>
            </div>
          </Link>
        )}

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg border border-[#F1DCE5] text-[#806D76] hover:bg-[#FFF0F5] dark:border-[#493440] dark:text-[#C3ADB8] dark:hover:bg-[#2B202A]"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Role Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {currentNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-[#FFF0F5] text-[#C94F7C] font-semibold dark:bg-[#2B202A] dark:text-[#F09ABB]"
                  : "text-[#30232A]/80 hover:bg-[#FFF8FA] hover:text-[#C94F7C] dark:text-[#FFF3F7]/80 dark:hover:bg-[#2B202A]/50 dark:hover:text-[#F09ABB]"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-[#C94F7C] dark:text-[#F09ABB]" : "text-[#806D76] dark:text-[#C3ADB8]")} />
              {!collapsed && (
                <div className="flex flex-1 items-center justify-between overflow-hidden">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-2 rounded-md bg-[#F8DCE8] px-1.5 py-0.5 text-[10px] font-semibold text-[#C94F7C] dark:bg-[#493440] dark:text-[#F09ABB]">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Demo Role Switcher (Convenient for evaluators) */}
      {!collapsed && (
        <div className="px-3 py-2 border-t border-[#F1DCE5] dark:border-[#493440]">
          <label className="text-[10px] uppercase font-bold text-[#806D76] dark:text-[#C3ADB8] block mb-1">
            Simulate Persona:
          </label>
          <select
            value={role}
            onChange={(e) => signInWithDemoRole(e.target.value as UserRole)}
            className="w-full text-xs rounded-lg border border-[#F1DCE5] bg-[#FFF8FA] p-1.5 text-[#30232A] dark:border-[#493440] dark:bg-[#171217] dark:text-[#FFF3F7]"
          >
            <option value="student">Student</option>
            <option value="recruiter">Recruiter / Industry</option>
            <option value="institution_admin">Institution Admin</option>
            <option value="faculty">Faculty Member</option>
            <option value="mentor">Industry Mentor</option>
            <option value="researcher">Researcher</option>
            <option value="admin">Platform Admin</option>
          </select>
        </div>
      )}

      {/* User Profile Footer */}
      <div className="border-t border-[#F1DCE5] p-3 dark:border-[#493440]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#E879A5] to-[#C94F7C] text-xs font-bold text-white">
            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "U"}
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-xs font-semibold text-[#30232A] dark:text-[#FFF3F7]">
                {user?.full_name || "MITRA User"}
              </p>
              <p className="truncate text-[11px] text-[#806D76] dark:text-[#C3ADB8]">
                {user?.email || "user@mitra.edu"}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={signOut}
            title="Sign Out"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#806D76] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
