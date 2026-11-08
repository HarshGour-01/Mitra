import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { DemoShowcaseDrawer } from "@/components/ui/DemoShowcaseDrawer";
import { Users, Heart, Award, ArrowRight } from "lucide-react";

export default function MentorsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#17152B] dark:bg-[#12101F] dark:text-[#F7F5F0]">
      <Navbar />
      <main className="flex-1 py-18 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-bold">For Mentors & Faculty</Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
            Shape the Next Generation of Indian Engineers
          </h1>
          <p className="text-base text-[#555366] dark:text-[#9290A0] leading-relaxed">
            Give back to the developer ecosystem by hosting 1:1 architectural reviews, reviewing student projects, and discovering budding researchers.
          </p>
          <div className="pt-4">
            <Link href="/register">
              <Button size="lg" className="font-bold shadow-hover px-8">
                Join Mentor Network <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="hover:border-[#7655E8] transition-all">
            <CardContent className="p-8 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#17152B] dark:text-[#F7F5F0]">Direct High-Impact Guidance</h3>
              <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] leading-relaxed">
                Connect with motivated undergraduates working on actual AI and web infrastructure problems.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:border-[#7655E8] transition-all">
            <CardContent className="p-8 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE8FF] text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#17152B] dark:text-[#F7F5F0]">National Recognition</h3>
              <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] leading-relaxed">
                Receive certified academic contributor credits recognized by university boards and corporate CSR initiatives.
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
