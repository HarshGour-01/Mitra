import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { DemoShowcaseDrawer } from "@/components/ui/DemoShowcaseDrawer";
import { Sparkles, Target, Compass, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#17152B] dark:bg-[#12101F] dark:text-[#F7F5F0]">
      <Navbar />
      <main className="flex-1 py-18 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-bold">About The Initiative</Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
            Empowering India&apos;s Academic & Industrial Potential
          </h1>
          <p className="text-base text-[#555366] dark:text-[#9290A0] leading-relaxed">
            MITRA was envisioned to eliminate the structural friction between university curricula and enterprise technical competencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:border-[#7655E8] transition-all">
            <CardContent className="p-8 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[#17152B] dark:text-[#F7F5F0]">Our Mission</h3>
              <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] leading-relaxed">
                To equip every engineering and technical student across India with a verifiable, cryptographic Skill Passport recognized by elite technology employers.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:border-[#7655E8] transition-all">
            <CardContent className="p-8 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                <Compass className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[#17152B] dark:text-[#F7F5F0]">Industry Linkage</h3>
              <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] leading-relaxed">
                Connecting corporate recruiters directly to student repositories, capstone projects, and evaluated hackathon contributions with zero broker fee friction.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:border-[#7655E8] transition-all">
            <CardContent className="p-8 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[#17152B] dark:text-[#F7F5F0]">Institutional Quality</h3>
              <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] leading-relaxed">
                Equipping college directors and placement chairs with live placement telemetry, corporate MoU audits, and curriculum gap analytics.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <DemoShowcaseDrawer />
    </div>
  );
}
