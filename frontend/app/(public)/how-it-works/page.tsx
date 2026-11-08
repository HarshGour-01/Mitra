import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Award, BrainCircuit, CheckCircle2, FileText, Send, UserCheck } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    { num: "1", title: "Institutional Identity Onboarding", desc: "Universities configure their institutional domain. Students verify with college credentials, establishing trust from day one.", icon: UserCheck },
    { num: "2", title: "Skill Passport Synthesis", desc: "Students link GitHub repositories, hackathon certificates, and take MITRA peer-reviewed micro-assessments to build verified skill badges.", icon: Award },
    { num: "3", title: "AI-Powered Gap Analysis", desc: "MITRA algorithms compare candidate competencies against live corporate internship postings and generate targeted learning roadmaps.", icon: BrainCircuit },
    { num: "4", title: "Direct Corporate Placement", desc: "Recruiters filter verified talent and send direct interview invites with zero placement consultancy fees.", icon: Send },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
      <Navbar />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="secondary">Platform Mechanics</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#30232A] dark:text-[#FFF3F7]">
            How MITRA Bridges the Academic Gap
          </h1>
          <p className="text-sm text-[#806D76] dark:text-[#C3ADB8]">
            An objective, data-backed pathway from university enrollment to high-impact career placement.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <Card key={st.num} className="border-[#F1DCE5] hover:border-[#E879A5] transition-all">
                <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F5] text-[#C94F7C] dark:bg-[#211922] dark:text-[#F09ABB] text-lg font-black">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#E879A5]">Step 0{st.num}</div>
                    <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">{st.title}</h3>
                    <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">{st.desc}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
