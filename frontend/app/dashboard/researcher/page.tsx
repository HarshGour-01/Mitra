"use client";

import React from "react";
import { Microscope, BookOpen, Layers, Briefcase, Plus, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ComingSoonCard } from "@/components/ui/ComingSoon";

export default function ResearcherDashboardPage() {
  const researchProjects = [
    { title: "Low-Precision Quantization for Multimodal Agents", funding: "₹28.5 Lakhs (DST + MoU)", partners: "Microsoft Research India", status: "Active" },
    { title: "Autonomous Campus Edge Mesh Networks", funding: "₹18.0 Lakhs (Industry MoU)", partners: "TCS Labs", status: "Data Collection" },
  ];

  return (
    <div className="space-y-10">
      {/* Banner */}
      <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#E8E4DD] shadow-card dark:border-[#2E274D] dark:bg-[#1A162B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EDE8FF] px-3.5 py-1 text-xs font-bold text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
              <Microscope className="h-3.5 w-3.5" />
              Academic Research Scientist Portal
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
              Dr. Ananya Sen
            </h2>
            <p className="text-sm text-[#555366] dark:text-[#9290A0]">
              Principal Investigator • Quantum & Edge AI Laboratory • IIT Bombay
            </p>
          </div>

          <Button size="sm" className="gap-2 font-bold shadow-hover">
            <Plus className="h-4 w-4" /> Post Research Opening
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Active Research Projects & Industry Grants</CardTitle>
          <CardDescription>Collaborative initiatives with corporate sponsor co-funding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-[#E8E4DD] dark:divide-[#2E274D]">
            {researchProjects.map((proj, idx) => (
              <div key={idx} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0]">{proj.title}</h4>
                  <p className="text-xs font-semibold text-[#7655E8] dark:text-[#EDE8FF]">Industry Partner: {proj.partners}</p>
                  <p className="text-[11px] text-[#555366] dark:text-[#9290A0] mt-0.5">Grant Value: {proj.funding}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="success">{proj.status}</Badge>
                  <Button size="sm" variant="outline">Manage Research Fellows</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ComingSoonCard
        title="Automated Intellectual Property (IP) & Patent Filing"
        description="Streamlined patent disclosure workflows for university-industry inventions developed under MITRA joint project charters."
        expectedRelease="Research Hub Phase 2"
      />
    </div>
  );
}
