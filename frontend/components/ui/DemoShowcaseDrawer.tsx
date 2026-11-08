"use client";

import React, { useState } from "react";
import {
  Sparkles,
  X,
  GraduationCap,
  Building2,
  Briefcase,
  Layers,
  Microscope,
  FileCode,
  Bell,
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  DEMO_BANNER_LABEL,
  DEMO_STUDENTS,
  DEMO_RECRUITERS,
  DEMO_INSTITUTIONS,
  DEMO_OPPORTUNITIES,
  DEMO_APPLICATIONS,
  DEMO_RESEARCH_PROJECTS,
  DEMO_PROBLEM_STATEMENTS,
  DEMO_NOTIFICATIONS,
} from "@/lib/demoData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function DemoShowcaseDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "students" | "recruiters" | "institutions" | "opportunities" | "applications" | "research" | "problems" | "notifications"
  >("students");

  return (
    <>
      {/* Floating Presentation Trigger Pill */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 rounded-full border border-[#7655E8]/30 bg-[#17152B] px-4 py-2.5 text-xs font-semibold text-white shadow-xl shadow-[#17152B]/20 backdrop-blur-md transition-all hover:border-[#E8C98A] hover:bg-[#29234B] hover:scale-105 active:scale-95"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#E8C98A] animate-pulse" />
          <Sparkles className="h-3.5 w-3.5 text-[#E8C98A]" />
          <span>Demo Data Showcase</span>
          <span className="rounded-full bg-[#7655E8]/40 px-2 py-0.5 text-[10px] text-[#EDE8FF]">
            Hackathon
          </span>
        </button>
      </div>

      {/* Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17152B]/60 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative flex flex-col h-[90vh] max-h-[850px] w-full max-w-5xl rounded-3xl border border-[#EDE8FF] bg-[#F7F5F0] shadow-2xl overflow-hidden dark:border-[#2E274D] dark:bg-[#12101F]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E8E4DD] bg-white px-6 py-4.5 dark:border-[#2E274D] dark:bg-[#1A162B]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#29234B] dark:text-[#EDE8FF]">
                  <Sparkles className="h-5 w-5 text-[#7655E8]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0]">
                      MITRA Evaluator Showcase Layer
                    </h3>
                    <span className="rounded-full border border-[#E8C98A] bg-[#E8C98A]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#A07525] dark:text-[#E8C98A]">
                      DEMO DATA ONLY
                    </span>
                  </div>
                  <p className="text-xs text-[#555366] dark:text-[#9290A0]">
                    Strictly isolated local presentation fixtures. Completely zero backend/Supabase mutation.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8E4DD] text-[#555366] hover:bg-[#EDE8FF] hover:text-[#17152B] dark:border-[#2E274D] dark:text-[#9290A0] dark:hover:bg-[#29234B] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Disclaimer Strip */}
            <div className="flex items-center gap-2 border-b border-[#E8E4DD] bg-[#EDE8FF]/60 px-6 py-2 text-xs text-[#29234B] dark:border-[#2E274D] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
              <ShieldCheck className="h-4 w-4 text-[#7655E8] shrink-0" />
              <span className="font-medium truncate">
                {DEMO_BANNER_LABEL} — 6 records curated for each platform persona.
              </span>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#E8E4DD] bg-white px-6 overflow-x-auto gap-2 dark:border-[#2E274D] dark:bg-[#1A162B]">
              {[
                { id: "students", label: "Students (6)", icon: GraduationCap },
                { id: "recruiters", label: "Recruiters (6)", icon: Building2 },
                { id: "institutions", label: "Institutions (6)", icon: Award },
                { id: "opportunities", label: "Opportunities (6)", icon: Briefcase },
                { id: "applications", label: "Applications (6)", icon: Layers },
                { id: "research", label: "Research (6)", icon: Microscope },
                { id: "problems", label: "Problem Stmts (6)", icon: FileCode },
                { id: "notifications", label: "Notifications (6)", icon: Bell },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 border-b-2 py-3 px-3 text-xs font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? "border-[#7655E8] text-[#7655E8] dark:border-[#7655E8] dark:text-[#EDE8FF]"
                        : "border-transparent text-[#555366] hover:text-[#17152B] dark:text-[#9290A0] dark:hover:text-[#F7F5F0]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* STUDENTS TAB */}
              {activeTab === "students" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DEMO_STUDENTS.map((st) => (
                    <div
                      key={st.id}
                      className="rounded-2xl border border-[#E8E4DD] bg-white p-5 shadow-card dark:border-[#2E274D] dark:bg-[#1A162B] space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#7655E8] to-[#29234B] text-sm font-bold text-white shadow-sm">
                            {st.avatarInitial}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#17152B] dark:text-[#F7F5F0]">
                              {st.name}
                            </h4>
                            <p className="text-xs text-[#555366] dark:text-[#9290A0]">
                              {st.degree}
                            </p>
                          </div>
                        </div>
                        <Badge variant="verified">{st.badge}</Badge>
                      </div>

                      <p className="text-xs text-[#555366] dark:text-[#9290A0] flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-[#7655E8]" />
                        {st.institution} • Class of {st.graduationYear}
                      </p>

                      <div className="rounded-xl bg-[#EDE8FF]/50 p-2.5 dark:bg-[#241E3D] flex items-center justify-between">
                        <span className="text-xs font-medium text-[#29234B] dark:text-[#EDE8FF]">
                          Career Readiness Score
                        </span>
                        <span className="text-sm font-black text-[#7655E8]">
                          {st.readinessScore}%
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {st.verifiedSkills.map((sk) => (
                          <span
                            key={sk}
                            className="rounded-lg border border-[#EDE8FF] bg-[#F7F5F0] px-2 py-0.5 text-[10px] font-semibold text-[#29234B] dark:border-[#2E274D] dark:bg-[#12101F] dark:text-[#EDE8FF]"
                          >
                            ✓ {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* RECRUITERS TAB */}
              {activeTab === "recruiters" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DEMO_RECRUITERS.map((rec) => (
                    <div
                      key={rec.id}
                      className="rounded-2xl border border-[#E8E4DD] bg-white p-5 shadow-card dark:border-[#2E274D] dark:bg-[#1A162B] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#17152B] text-white font-bold text-sm">
                            {rec.logoInitial}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#17152B] dark:text-[#F7F5F0]">
                              {rec.companyName}
                            </h4>
                            <p className="text-xs text-[#555366] dark:text-[#9290A0]">
                              {rec.headquarters}
                            </p>
                          </div>
                        </div>
                        <Badge variant="gold">{rec.partnerTier}</Badge>
                      </div>

                      <p className="text-xs text-[#555366] dark:text-[#9290A0]">
                        {rec.industry}
                      </p>

                      <div className="flex items-center justify-between border-t border-[#E8E4DD] pt-3 dark:border-[#2E274D] text-xs">
                        <span className="text-[#555366] dark:text-[#9290A0]">
                          Live Hiring Positions:
                        </span>
                        <span className="font-bold text-[#7655E8]">
                          {rec.activeOpenings} Verified Corridors
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* INSTITUTIONS TAB */}
              {activeTab === "institutions" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DEMO_INSTITUTIONS.map((inst) => (
                    <div
                      key={inst.id}
                      className="rounded-2xl border border-[#E8E4DD] bg-white p-5 shadow-card dark:border-[#2E274D] dark:bg-[#1A162B] space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-[#17152B] dark:text-[#F7F5F0]">
                            {inst.name}
                          </h4>
                          <p className="text-xs text-[#555366] dark:text-[#9290A0]">
                            {inst.type}
                          </p>
                        </div>
                        <Badge variant="secondary">NIRF #{inst.nirfRank}</Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                        <div className="rounded-xl bg-[#F7F5F0] p-2 dark:bg-[#12101F]">
                          <div className="text-[10px] text-[#555366] dark:text-[#9290A0]">Enrolled</div>
                          <div className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0]">
                            {inst.studentsEnrolled}
                          </div>
                        </div>
                        <div className="rounded-xl bg-[#F7F5F0] p-2 dark:bg-[#12101F]">
                          <div className="text-[10px] text-[#555366] dark:text-[#9290A0]">Industry MoUs</div>
                          <div className="text-xs font-bold text-[#7655E8]">
                            {inst.activeMoUs}
                          </div>
                        </div>
                        <div className="rounded-xl bg-[#F7F5F0] p-2 dark:bg-[#12101F]">
                          <div className="text-[10px] text-[#555366] dark:text-[#9290A0]">Placement</div>
                          <div className="text-xs font-bold text-[#329B75]">
                            {inst.placementRate}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* OPPORTUNITIES TAB */}
              {activeTab === "opportunities" && (
                <div className="space-y-3">
                  {DEMO_OPPORTUNITIES.map((opp) => (
                    <div
                      key={opp.id}
                      className="rounded-2xl border border-[#E8E4DD] bg-white p-5 shadow-card dark:border-[#2E274D] dark:bg-[#1A162B] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Badge variant="default">{opp.type}</Badge>
                          <Badge variant="secondary">{opp.mode}</Badge>
                          <span className="text-xs font-semibold text-[#329B75]">
                            ★ {opp.matchScore}% Match
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0]">
                          {opp.title}
                        </h4>
                        <p className="text-xs font-medium text-[#7655E8]">
                          {opp.company} • {opp.location}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {opp.skills.map((sk) => (
                            <span
                              key={sk}
                              className="rounded-md bg-[#EDE8FF] px-2 py-0.5 text-[10px] font-semibold text-[#29234B] dark:bg-[#241E3D] dark:text-[#EDE8FF]"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <div className="text-base font-extrabold text-[#17152B] dark:text-[#F7F5F0]">
                          {opp.stipend}
                        </div>
                        <div className="text-xs text-[#555366] dark:text-[#9290A0]">
                          Duration: {opp.duration}
                        </div>
                        <div className="mt-2 text-[11px] font-semibold text-[#329B75] flex items-center justify-end gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Verified MoU
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* APPLICATIONS TAB */}
              {activeTab === "applications" && (
                <div className="rounded-2xl border border-[#E8E4DD] bg-white overflow-hidden shadow-card dark:border-[#2E274D] dark:bg-[#1A162B]">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-[#E8E4DD] bg-[#F7F5F0] text-[#555366] dark:border-[#2E274D] dark:bg-[#12101F] dark:text-[#9290A0]">
                      <tr>
                        <th className="p-3.5 font-semibold">Applicant</th>
                        <th className="p-3.5 font-semibold">Opportunity</th>
                        <th className="p-3.5 font-semibold">Company</th>
                        <th className="p-3.5 font-semibold">Applied</th>
                        <th className="p-3.5 font-semibold">Status</th>
                        <th className="p-3.5 font-semibold text-right">Stipend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E4DD] dark:divide-[#2E274D]">
                      {DEMO_APPLICATIONS.map((app) => (
                        <tr key={app.id} className="hover:bg-[#F7F5F0]/50 dark:hover:bg-[#12101F]/50">
                          <td className="p-3.5 font-bold text-[#17152B] dark:text-[#F7F5F0]">
                            {app.applicant}
                          </td>
                          <td className="p-3.5 font-medium text-[#7655E8]">
                            {app.role}
                          </td>
                          <td className="p-3.5 text-[#555366] dark:text-[#9290A0]">
                            {app.company}
                          </td>
                          <td className="p-3.5 text-[#555366] dark:text-[#9290A0]">
                            {app.appliedDate}
                          </td>
                          <td className="p-3.5">
                            <Badge
                              variant={
                                app.status === "Shortlisted" || app.status === "Offer Extended"
                                  ? "success"
                                  : app.status === "Interview Scheduled"
                                  ? "gold"
                                  : "default"
                              }
                            >
                              {app.status}
                            </Badge>
                          </td>
                          <td className="p-3.5 font-bold text-right text-[#17152B] dark:text-[#F7F5F0]">
                            {app.stipend}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* RESEARCH TAB */}
              {activeTab === "research" && (
                <div className="space-y-3">
                  {DEMO_RESEARCH_PROJECTS.map((rp) => (
                    <div
                      key={rp.id}
                      className="rounded-2xl border border-[#E8E4DD] bg-white p-5 shadow-card dark:border-[#2E274D] dark:bg-[#1A162B] space-y-2"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="text-sm font-bold text-[#17152B] dark:text-[#F7F5F0]">
                          {rp.title}
                        </h4>
                        <Badge variant="verified">{rp.stage}</Badge>
                      </div>
                      <p className="text-xs text-[#555366] dark:text-[#9290A0]">
                        <strong className="text-[#17152B] dark:text-[#F7F5F0]">PI:</strong> {rp.principalInvestigator} ({rp.institution})
                      </p>
                      <p className="text-xs text-[#7655E8]">
                        <strong>Industry Partner:</strong> {rp.industrySponsor}
                      </p>
                      <div className="pt-2 text-xs font-semibold text-[#17152B] dark:text-[#F7F5F0]">
                        Funding Grant Value: <span className="text-[#329B75]">{rp.grantValue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* PROBLEMS TAB */}
              {activeTab === "problems" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DEMO_PROBLEM_STATEMENTS.map((prob) => (
                    <div
                      key={prob.id}
                      className="rounded-2xl border border-[#E8E4DD] bg-white p-5 shadow-card dark:border-[#2E274D] dark:bg-[#1A162B] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <Badge variant="gold">{prob.domain}</Badge>
                        <span className="text-xs font-semibold text-[#555366] dark:text-[#9290A0]">
                          Due: {prob.deadline}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#17152B] dark:text-[#F7F5F0]">
                        {prob.title}
                      </h4>
                      <p className="text-xs text-[#7655E8] font-medium">
                        Sponsored by {prob.sponsor} • {prob.difficulty}
                      </p>
                      <div className="rounded-xl bg-[#EDE8FF]/50 p-2.5 dark:bg-[#241E3D] text-xs font-bold text-[#29234B] dark:text-[#EDE8FF]">
                        Award: {prob.stipendOrPrize}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === "notifications" && (
                <div className="space-y-2.5">
                  {DEMO_NOTIFICATIONS.map((notif) => (
                    <div
                      key={notif.id}
                      className={`rounded-2xl border p-4.5 transition-colors ${
                        notif.unread
                          ? "border-[#7655E8]/30 bg-[#EDE8FF]/40 dark:border-[#7655E8]/40 dark:bg-[#241E3D]/50"
                          : "border-[#E8E4DD] bg-white dark:border-[#2E274D] dark:bg-[#1A162B]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-[#17152B] dark:text-[#F7F5F0]">
                              {notif.title}
                            </h4>
                            {notif.unread && (
                              <span className="h-2 w-2 rounded-full bg-[#7655E8]" />
                            )}
                          </div>
                          <p className="text-xs text-[#555366] dark:text-[#9290A0] mt-1">
                            {notif.detail}
                          </p>
                        </div>
                        <span className="text-[11px] text-[#9290A0] shrink-0">
                          {notif.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-[#E8E4DD] bg-white px-6 py-3.5 dark:border-[#2E274D] dark:bg-[#1A162B] text-xs text-[#555366] dark:text-[#9290A0]">
              <span>MITRA SIH / National Hackathon Showcase Mode</span>
              <Button size="sm" variant="default" onClick={() => setIsOpen(false)}>
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
