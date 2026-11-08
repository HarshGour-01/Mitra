"use client";

import React from "react";
import { GraduationCap, Users, BookOpen, Microscope, Award, CheckCircle2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ComingSoonCard } from "@/components/ui/ComingSoon";

export default function FacultyDashboardPage() {
  const students = [
    { name: "Harsh Gour", project: "MITRA Full-Stack Enterprise Platform", status: "Milestone 4 Verified", readiness: "92.4%" },
    { name: "Ananya Sharma", project: "Low-Latency Vector Indexing & RAG", status: "Benchmark Review", readiness: "94.8%" },
    { name: "Kavya Nair", project: "IoT Campus Telemetry & Mesh", status: "Hardware Testing", readiness: "87.0%" },
  ];

  return (
    <div className="space-y-10">
      {/* Banner */}
      <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#E8E4DD] shadow-card dark:border-[#2E274D] dark:bg-[#1A162B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EDE8FF] px-3.5 py-1 text-xs font-bold text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
              <GraduationCap className="h-3.5 w-3.5" />
              Faculty Academic Supervisor Workspace
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
              Dr. Arvind Menon
            </h2>
            <p className="text-sm text-[#555366] dark:text-[#9290A0]">
              Associate Professor • Department of Computer Science & Engineering • NIT Karnataka
            </p>
          </div>
        </div>
      </div>

      {/* Supervised Student Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Assigned Capstone & Hackathon Projects</CardTitle>
          <CardDescription>Direct supervision of student teams and industry linkage milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-[#E8E4DD] dark:divide-[#2E274D]">
            {students.map((st, idx) => (
              <div key={idx} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0]">{st.name}</h4>
                  <p className="text-xs font-semibold text-[#7655E8] dark:text-[#EDE8FF] mt-0.5">{st.project}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="verified">Readiness: {st.readiness}</Badge>
                  <span className="text-xs text-[#555366] dark:text-[#9290A0]">{st.status}</span>
                  <Button size="sm" variant="outline">Endorse Skill</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ComingSoonCard
        title="Joint Industry Research Grant Management"
        description="Submit university grant proposals and track corporate co-funding agreements directly via MITRA Research Clearinghouse."
        expectedRelease="Faculty Portal Phase 2"
      />
    </div>
  );
}
