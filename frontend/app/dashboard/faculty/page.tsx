"use client";

import React from "react";
import { GraduationCap, Users, BookOpen, Microscope, Award, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ComingSoonCard } from "@/components/ui/ComingSoon";

export default function FacultyDashboardPage() {
  const students = [
    { name: "Harsh Gour", project: "MITRA Full-Stack Platform", status: "Milestone 4 Verified", readiness: "88.5%" },
    { name: "Ananya Sharma", project: "Low-Latency Vector Indexing", status: "Benchmark Review", readiness: "91.0%" },
    { name: "Kavya Nair", project: "IoT Campus Telemetry", status: "Hardware Testing", readiness: "84.0%" },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FFF0F5] to-white p-6 sm:p-8 border border-[#F1DCE5] shadow-card dark:from-[#211922] dark:to-[#2B202A] dark:border-[#493440]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F8DCE8] px-3 py-1 text-xs font-semibold text-[#C94F7C] dark:bg-[#493440] dark:text-[#F09ABB] mb-3">
              <GraduationCap className="h-3.5 w-3.5" />
              Faculty Academic Supervisor
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#30232A] dark:text-[#FFF3F7]">
              Dr. Arvind Menon
            </h2>
            <p className="mt-1 text-sm text-[#806D76] dark:text-[#C3ADB8]">
              Associate Professor • Department of Computer Science & Engineering
            </p>
          </div>
        </div>
      </div>

      {/* Supervised Student Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Assigned Capstone & Hackathon Projects</CardTitle>
          <CardDescription>Direct supervision of student teams and industry linkage milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-[#F1DCE5] dark:divide-[#493440]">
            {students.map((st, idx) => (
              <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-[#30232A] dark:text-[#FFF3F7]">{st.name}</h4>
                  <p className="text-xs text-[#C94F7C] dark:text-[#F09ABB] font-medium">{st.project}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="verified">Readiness: {st.readiness}</Badge>
                  <span className="text-xs text-[#806D76] dark:text-[#C3ADB8]">{st.status}</span>
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
