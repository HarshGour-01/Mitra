import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { DemoShowcaseDrawer } from "@/components/ui/DemoShowcaseDrawer";
import { Building2, TrendingUp, ShieldCheck, Award, ArrowRight } from "lucide-react";

export default function InstitutionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#17152B] dark:bg-[#12101F] dark:text-[#F7F5F0]">
      <Navbar />
      <main className="flex-1 py-18 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-bold">For Universities & Colleges</Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
            Empower Your Placement Cells with Real-Time Telemetry
          </h1>
          <p className="text-base text-[#555366] dark:text-[#9290A0] leading-relaxed">
            Transform academic outcomes with automated skill distribution maps, active MoU tracking, and audited NIRF/NBA placement analytics.
          </p>
          <div className="pt-4">
            <Link href="/register">
              <Button size="lg" className="font-bold shadow-hover px-8">
                Register Your Institution <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="hover:border-[#7655E8] transition-all">
            <CardContent className="p-8 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                <TrendingUp className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#17152B] dark:text-[#F7F5F0]">Accreditation-Ready Data</h3>
              <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] leading-relaxed">
                Export comprehensive student placement reports and faculty research linkages formatted to satisfy AICTE, NBA, and NAAC requirements.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:border-[#7655E8] transition-all">
            <CardContent className="p-8 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                <Building2 className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#17152B] dark:text-[#F7F5F0]">Corporate MoU Management</h3>
              <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] leading-relaxed">
                Track joint industry collaborative projects, track milestones, and ensure corporate partners fulfill hiring commitments.
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
