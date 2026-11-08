import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Building2, TrendingUp, ShieldCheck, Award } from "lucide-react";

export default function InstitutionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
      <Navbar />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="secondary">For Universities & Colleges</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#30232A] dark:text-[#FFF3F7]">
            Empower Your Placement Cells with Real-Time Telemetry
          </h1>
          <p className="text-sm text-[#806D76] dark:text-[#C3ADB8]">
            Transform academic outcomes with automated skill distribution maps, active MoU tracking, and audited NIRF/NBA placement analytics.
          </p>
          <div className="pt-2">
            <Link href="/register">
              <Button size="lg">Register Your Institution</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <TrendingUp className="h-7 w-7 text-[#E879A5]" />
              <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">Accreditation-Ready Data</h3>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">
                Export comprehensive student placement reports and faculty research linkages formatted to satisfy AICTE, NBA, and NAAC requirements.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-3">
              <Building2 className="h-7 w-7 text-[#E879A5]" />
              <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">Corporate MoU Management</h3>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">
                Track joint industry collaborative projects, track milestones, and ensure corporate partners fulfill hiring commitments.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
