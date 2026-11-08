"use client";

import React from "react";
import { Microscope, BookOpen, Layers, Briefcase, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ComingSoonCard } from "@/components/ui/ComingSoon";

export default function ResearcherDashboardPage() {
  const researchProjects = [
    { title: "Low-Precision Quantization for Multimodal Agents", funding: "₹24 Lakhs (DST)", partners: "Microsoft Research India", status: "Active" },
    { title: "Autonomous Campus Edge Mesh Networks", funding: "₹18 Lakhs (Industry MoU)", partners: "TCS Labs", status: "Data Collection" },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FFF0F5] to-white p-6 sm:p-8 border border-[#F1DCE5] shadow-card dark:from-[#211922] dark:to-[#2B202A] dark:border-[#493440]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F8DCE8] px-3 py-1 text-xs font-semibold text-[#C94F7C] dark:bg-[#493440] dark:text-[#F09ABB] mb-3">
              <Microscope className="h-3.5 w-3.5" />
              Academic Research Scientist Portal
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#30232A] dark:text-[#FFF3F7]">
              Dr. Ananya Sen
            </h2>
            <p className="mt-1 text-sm text-[#806D76] dark:text-[#C3ADB8]">
              Principal Investigator • Quantum & Edge AI Laboratory
            </p>
          </div>

          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Post Research Opening
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Active Research Projects & Industry Grants</CardTitle>
          <CardDescription>Collaborative initiatives with corporate sponsor participation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-[#F1DCE5] dark:divide-[#493440]">
            {researchProjects.map((proj, idx) => (
              <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-[#30232A] dark:text-[#FFF3F7]">{proj.title}</h4>
                  <p className="text-xs text-[#C94F7C] dark:text-[#F09ABB]">Industry Partner: {proj.partners}</p>
                  <p className="text-[11px] text-[#806D76] dark:text-[#C3ADB8] mt-0.5">Grant Value: {proj.funding}</p>
                </div>
                <div className="flex items-center gap-2">
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
