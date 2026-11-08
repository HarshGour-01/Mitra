import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { DemoShowcaseDrawer } from "@/components/ui/DemoShowcaseDrawer";
import { Award, BrainCircuit, CheckCircle2, FileText, Send, UserCheck } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    { num: "1", title: "Institutional Identity Onboarding", desc: "Universities configure their institutional domain. Students verify with college credentials, establishing trust from day one.", icon: UserCheck },
    { num: "2", title: "Skill Passport Synthesis", desc: "Students link GitHub repositories, hackathon certificates, and take MITRA peer-reviewed micro-assessments to build verified skill badges.", icon: Award },
    { num: "3", title: "AI-Powered Gap Analysis", desc: "MITRA algorithms compare candidate competencies against live corporate internship postings and generate targeted learning roadmaps.", icon: BrainCircuit },
    { num: "4", title: "Direct Corporate Placement", desc: "Recruiters filter verified talent and send direct interview invites with zero placement consultancy fees.", icon: Send },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#17152B] dark:bg-[#12101F] dark:text-[#F7F5F0]">
      <Navbar />
      <main className="flex-1 py-18 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-bold">Platform Mechanics</Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
            How MITRA Bridges the Academic Gap
          </h1>
          <p className="text-base text-[#555366] dark:text-[#9290A0] leading-relaxed">
            An objective, data-backed pathway from university enrollment to high-impact career placement.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <Card key={st.num} className="hover:border-[#7655E8] transition-all">
                <CardContent className="p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#7655E8]">Step 0{st.num}</div>
                    <h3 className="text-xl font-bold text-[#17152B] dark:text-[#F7F5F0]">{st.title}</h3>
                    <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] leading-relaxed">{st.desc}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
      <Footer />
      <DemoShowcaseDrawer />
    </div>
  );
}
