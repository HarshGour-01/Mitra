"use client";

import React from "react";
import { ShieldCheck, Users, Building2, CheckCircle2, AlertTriangle, FileText, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ComingSoonCard } from "@/components/ui/ComingSoon";

export default function AdminDashboardPage() {
  const pendingVerifications = [
    { entity: "Nexus AI Technologies", type: "Corporate Recruiter", regNo: "CIN: U72200KA2024PTC189211", status: "Pending Tax/GST Verification" },
    { entity: "K.L. Autonomous Institute of Tech", type: "University / College", regNo: "AISHE: C-14920", status: "Accreditation Review" },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FFF0F5] to-white p-6 sm:p-8 border border-[#F1DCE5] shadow-card dark:from-[#211922] dark:to-[#2B202A] dark:border-[#493440]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F8DCE8] px-3 py-1 text-xs font-semibold text-[#C94F7C] dark:bg-[#493440] dark:text-[#F09ABB] mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              Platform Superadmin Operations
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#30232A] dark:text-[#FFF3F7]">
              MITRA Governance Center
            </h2>
            <p className="mt-1 text-sm text-[#806D76] dark:text-[#C3ADB8]">
              National Ecosystem Moderation & Institutional Verification Queue
            </p>
          </div>
        </div>
      </div>

      {/* Verification Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Institutional & Corporate Verification Queue</CardTitle>
          <CardDescription>Verify institutional legitimacy before enabling opportunity publishing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-[#F1DCE5] dark:divide-[#493440]">
            {pendingVerifications.map((item, idx) => (
              <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-[#30232A] dark:text-[#FFF3F7]">{item.entity}</h4>
                  <p className="text-xs text-[#C94F7C] dark:text-[#F09ABB] font-medium">{item.type} • {item.regNo}</p>
                  <p className="text-[11px] text-[#806D76] dark:text-[#C3ADB8] mt-0.5">{item.status}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="default">Approve & Grant Keys</Button>
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
