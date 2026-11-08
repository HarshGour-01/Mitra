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
    <div className="space-y-10">
      {/* Banner */}
      <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#E8E4DD] shadow-card dark:border-[#2E274D] dark:bg-[#1A162B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EDE8FF] px-3.5 py-1 text-xs font-bold text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
              <Users className="h-3.5 w-3.5" />
              Industry Mentor Workspace
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
              Vikram Aditya
            </h2>
            <p className="text-sm text-[#555366] dark:text-[#9290A0]">
              Principal Cloud Architect @ HyperScale Labs • 12 Yrs Industry Experience
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Upcoming 1:1 Student Mentorship Sessions</CardTitle>
          <CardDescription>Office hours and architectural code review bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-[#E8E4DD] dark:divide-[#2E274D]">
            {requests.map((req, idx) => (
              <div key={idx} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0]">{req.student}</h4>
                  <p className="text-xs font-semibold text-[#7655E8] dark:text-[#EDE8FF]">{req.topic}</p>
                  <p className="text-[11px] text-[#555366] dark:text-[#9290A0] mt-0.5">{req.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={req.status === "Confirmed" ? "success" : "warning"}>
                    {req.status}
                  </Badge>
                  <Button size="sm" variant="secondary" className="font-semibold">Launch Video Room</Button>
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
