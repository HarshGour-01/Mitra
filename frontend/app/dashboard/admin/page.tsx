"use client";

import React from "react";
import { ShieldCheck, Users, Building2, CheckCircle2, AlertTriangle, FileText, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ComingSoonCard } from "@/components/ui/ComingSoon";

export default function AdminDashboardPage() {
  const pendingVerifications = [
    { entity: "Zerodha Tech (Campus Entity)", type: "Corporate Partner", regNo: "CIN: U72200KA2024PTC189211", status: "Pending Tax/GST Verification" },
    { entity: "K.L. Autonomous Institute of Tech", type: "University / College", regNo: "AISHE: C-14920", status: "Accreditation Review" },
  ];

  return (
    <div className="space-y-10">
      {/* Banner */}
      <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#E8E4DD] shadow-card dark:border-[#2E274D] dark:bg-[#1A162B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EDE8FF] px-3.5 py-1 text-xs font-bold text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Platform Superadmin Governance
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
              MITRA National Governance Center
            </h2>
            <p className="text-sm text-[#555366] dark:text-[#9290A0]">
              Smart India Hackathon Ecosystem Moderation & Institutional Verification Queue
            </p>
          </div>
        </div>
      </div>

      {/* Verification Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Institutional & Corporate Verification Queue</CardTitle>
          <CardDescription>Verify institutional legitimacy before enabling opportunity publishing across student portals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-[#E8E4DD] dark:divide-[#2E274D]">
            {pendingVerifications.map((item, idx) => (
              <div key={idx} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0]">{item.entity}</h4>
                  <p className="text-xs font-semibold text-[#7655E8] dark:text-[#EDE8FF] mt-0.5">{item.type} • {item.regNo}</p>
                  <p className="text-[11px] text-[#555366] dark:text-[#9290A0] mt-1">{item.status}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Button size="sm" variant="default" className="font-semibold">Approve & Grant Keys</Button>
                  <Button size="sm" variant="outline">Request KYC Docs</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ComingSoonCard
        title="Comprehensive SIEM Audit & Compliance Log Stream"
        description="Immutable real-time audit streaming for all institutional role transitions and student data exports."
        expectedRelease="Admin Governance Phase 2"
      />
    </div>
  );
}
