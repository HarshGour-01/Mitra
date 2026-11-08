import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Sparkles, Target, Compass, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
      <Navbar />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="secondary">About The Initiative</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#30232A] dark:text-[#FFF3F7]">
            Empowering the Indian Academic Ecosystem
          </h1>
          <p className="text-sm text-[#806D76] dark:text-[#C3ADB8]">
            MITRA was envisioned to address the national gap between classroom curriculum and industry-standard technical competencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <Target className="h-8 w-8 text-[#E879A5]" />
              <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">Our Mission</h3>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">
                To provide every engineering and science student in India with a verified, merit-based Skill Passport recognized by top tech employers.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-3">
              <Compass className="h-8 w-8 text-[#E879A5]" />
              <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">Industry Linkage</h3>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">
                Connecting corporate recruiters directly to student repositories, capstone projects, and evaluated hackathon contributions.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-3">
              <Award className="h-8 w-8 text-[#E879A5]" />
              <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">Institutional Quality</h3>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">
                Equipping college directors and department heads with transparent placement intelligence and curriculum feedback loops.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
