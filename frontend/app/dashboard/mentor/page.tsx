"use client";

import React from "react";
import { Users, Calendar, Award, Sparkles, Check, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ComingSoonCard } from "@/components/ui/ComingSoon";

export default function MentorDashboardPage() {
  const requests = [
    { student: "Harsh Gour", topic: "Next.js 16 Production Systems Architecture", date: "Nov 12, 5:00 PM IST", status: "Confirmed" },
    { student: "Rohan V.", topic: "Distributed Microservices & FastAPI", date: "Nov 15, 6:30 PM IST", status: "Pending Acceptance" },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FFF0F5] to-white p-6 sm:p-8 border border-[#F1DCE5] shadow-card dark:from-[#211922] dark:to-[#2B202A] dark:border-[#493440]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F8DCE8] px-3 py-1 text-xs font-semibold text-[#C94F7C] dark:bg-[#493440] dark:text-[#F09ABB] mb-3">
              <Users className="h-3.5 w-3.5" />
              Industry Mentor Workspace
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#30232A] dark:text-[#FFF3F7]">
              Vikram Aditya
            </h2>
            <p className="mt-1 text-sm text-[#806D76] dark:text-[#C3ADB8]">
              Principal Cloud Architect @ HyperScale Labs • 12 Yrs Industry Experience
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upcoming 1:1 Student Mentorship Sessions</CardTitle>
          <CardDescription>Office hours and architectural code review bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-[#F1DCE5] dark:divide-[#493440]">
            {requests.map((req, idx) => (
              <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-[#30232A] dark:text-[#FFF3F7]">{req.student}</h4>
                  <p className="text-xs text-[#C94F7C] dark:text-[#F09ABB]">{req.topic}</p>
                  <p className="text-[11px] text-[#806D76] dark:text-[#C3ADB8] mt-0.5">{req.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={req.status === "Confirmed" ? "success" : "warning"}>
                    {req.status}
                  </Badge>
                  <Button size="sm" variant="secondary">Launch Video Room</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ComingSoonCard
        title="Live Interactive Pair-Programming Sandboxes"
        description="Collaborative WebRTC code-sharing workspaces to review student pull requests directly within the mentorship session."
        expectedRelease="Mentor Hub Phase 2"
      />
    </div>
  );
}
