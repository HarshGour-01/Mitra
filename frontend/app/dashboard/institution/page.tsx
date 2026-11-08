"use client";

import React from "react";
import { Building2, GraduationCap, Users, Award, TrendingUp, Download, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ComingSoonCard } from "@/components/ui/ComingSoon";

export default function InstitutionDashboardPage() {
  const departments = [
    { name: "Computer Science & Engineering", students: 480, placed: "94.2%", avgStipend: "₹38,000/mo" },
    { name: "Information Technology", students: 360, placed: "91.8%", avgStipend: "₹34,000/mo" },
    { name: "Electronics & Communication", students: 410, placed: "86.5%", avgStipend: "₹28,000/mo" },
    { name: "Data Science & AI", students: 190, placed: "97.4%", avgStipend: "₹45,000/mo" },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FFF0F5] to-white p-6 sm:p-8 border border-[#F1DCE5] shadow-card dark:from-[#211922] dark:to-[#2B202A] dark:border-[#493440]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F8DCE8] px-3 py-1 text-xs font-semibold text-[#C94F7C] dark:bg-[#493440] dark:text-[#F09ABB] mb-3">
              <Building2 className="h-3.5 w-3.5" />
              University Administration Portal
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#30232A] dark:text-[#FFF3F7]">
              National Institute of Technology Karnataka
            </h2>
            <p className="mt-1 text-sm text-[#806D76] dark:text-[#C3ADB8]">
              Verified Partner Institution • NIRF Rank #12
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Export Placement Audit
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-medium text-[#806D76] dark:text-[#C3ADB8]">Enrolled Students</div>
            <div className="text-2xl font-black text-[#30232A] dark:text-[#FFF3F7] mt-1">4,850</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">98% Skill Passport Adoption</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-medium text-[#806D76] dark:text-[#C3ADB8]">Active Corporate MoUs</div>
            <div className="text-2xl font-black text-[#E879A5] dark:text-[#F09ABB] mt-1">42</div>
            <div className="text-[11px] text-[#806D76] dark:text-[#C3ADB8] mt-1">Intel, TCS, Microsoft, Zerodha</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-medium text-[#806D76] dark:text-[#C3ADB8]">Placement Conversion</div>
            <div className="text-2xl font-black text-[#C94F7C] dark:text-[#F09ABB] mt-1">92.4%</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">↑ 6.2% vs previous academic year</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-medium text-[#806D76] dark:text-[#C3ADB8]">Faculty Mentors</div>
            <div className="text-2xl font-black text-[#30232A] dark:text-[#FFF3F7] mt-1">320</div>
            <div className="text-[11px] text-[#806D76] dark:text-[#C3ADB8] mt-1">Guiding 184 active projects</div>
          </CardContent>
        </Card>
      </div>

      {/* Department Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Departmental Skill & Placement Analytics</CardTitle>
          <CardDescription>Live metrics calculated from students with verified skill passports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#F1DCE5] text-[#806D76] dark:border-[#493440] dark:text-[#C3ADB8]">
                <tr>
                  <th className="py-3 font-semibold">Department</th>
                  <th className="py-3 font-semibold">Active Students</th>
                  <th className="py-3 font-semibold">Placement Rate</th>
                  <th className="py-3 font-semibold">Avg Internship Stipend</th>
                  <th className="py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1DCE5] dark:divide-[#493440]">
                {departments.map((dept, idx) => (
                  <tr key={idx} className="hover:bg-[#FFF0F5]/40 dark:hover:bg-[#211922]/50">
                    <td className="py-3.5 font-bold text-[#30232A] dark:text-[#FFF3F7]">{dept.name}</td>
                    <td className="py-3.5 text-[#806D76] dark:text-[#C3ADB8]">{dept.students}</td>
                    <td className="py-3.5 font-semibold text-emerald-600 dark:text-emerald-400">{dept.placed}</td>
                    <td className="py-3.5 text-[#30232A] dark:text-[#FFF3F7]">{dept.avgStipend}</td>
                    <td className="py-3.5">
                      <Button size="sm" variant="ghost">Inspect Roster</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Coming Soon: National AI Accreditation Connector */}
      <ComingSoonCard
        title="AICTE / NBA Automated Accreditation Telemetry"
        description="Direct one-click export of student skill distributions, industry internship outcomes, and faculty research linkages formatted for national accreditation audits."
        expectedRelease="Phase 2 Release"
      />
    </div>
  );
}
