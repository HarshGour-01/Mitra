"use client";

import React from "react";
import { Building2, GraduationCap, Users, Award, TrendingUp, Download, Sparkles, CheckCircle2 } from "lucide-react";
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
    <div className="space-y-10">
      {/* Banner */}
      <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#E8E4DD] shadow-card dark:border-[#2E274D] dark:bg-[#1A162B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EDE8FF] px-3.5 py-1 text-xs font-bold text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
              <Building2 className="h-3.5 w-3.5" />
              University Executive Governance Portal
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
              National Institute of Technology Karnataka
            </h2>
            <p className="text-sm text-[#555366] dark:text-[#9290A0]">
              Surathkal • Institute of National Importance • NIRF Rank #12
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" className="gap-2 font-semibold">
              <Download className="h-4 w-4" /> Export Placement Audit
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-xs font-semibold text-[#555366] dark:text-[#9290A0]">Enrolled Students</div>
            <div className="text-3xl font-black text-[#17152B] dark:text-[#F7F5F0] mt-1.5">4,850</div>
            <div className="text-[11px] text-[#329B75] font-bold mt-1">98% Skill Passport Adoption</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-xs font-semibold text-[#555366] dark:text-[#9290A0]">Active Corporate MoUs</div>
            <div className="text-3xl font-black text-[#7655E8] mt-1.5">42</div>
            <div className="text-[11px] text-[#555366] dark:text-[#9290A0] mt-1">Zerodha, Microsoft, TCS Labs, Intel</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-xs font-semibold text-[#555366] dark:text-[#9290A0]">Placement Conversion</div>
            <div className="text-3xl font-black text-[#329B75] mt-1.5">92.4%</div>
            <div className="text-[11px] text-[#329B75] font-bold mt-1">↑ 6.2% vs previous academic year</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-xs font-semibold text-[#555366] dark:text-[#9290A0]">Faculty Mentors</div>
            <div className="text-3xl font-black text-[#17152B] dark:text-[#F7F5F0] mt-1.5">320</div>
            <div className="text-[11px] text-[#555366] dark:text-[#9290A0] mt-1">Guiding 184 active projects</div>
          </CardContent>
        </Card>
      </div>

      {/* Department Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Departmental Skill & Placement Analytics</CardTitle>
          <CardDescription>Live metrics calculated from students with verified skill passports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#E8E4DD] bg-[#F7F5F0] text-[#555366] dark:border-[#2E274D] dark:bg-[#12101F] dark:text-[#9290A0]">
                <tr>
                  <th className="p-4 font-bold">Department</th>
                  <th className="p-4 font-bold">Active Students</th>
                  <th className="p-4 font-bold">Placement Rate</th>
                  <th className="p-4 font-bold">Avg Internship Stipend</th>
                  <th className="p-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4DD] dark:divide-[#2E274D]">
                {departments.map((dept, idx) => (
                  <tr key={idx} className="hover:bg-[#F7F5F0]/60 dark:hover:bg-[#12101F]/60 transition-colors">
                    <td className="p-4 font-bold text-[#17152B] dark:text-[#F7F5F0]">{dept.name}</td>
                    <td className="p-4 text-[#555366] dark:text-[#9290A0] font-medium">{dept.students}</td>
                    <td className="p-4 font-bold text-[#329B75]">{dept.placed}</td>
                    <td className="p-4 font-semibold text-[#17152B] dark:text-[#F7F5F0]">{dept.avgStipend}</td>
                    <td className="p-4 text-right">
                      <Button size="sm" variant="ghost" className="font-semibold text-[#7655E8]">Inspect Roster</Button>
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
