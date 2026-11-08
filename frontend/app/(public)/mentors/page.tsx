import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Users, Heart, Award, ArrowRight } from "lucide-react";

export default function MentorsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
      <Navbar />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="secondary">For Mentors & Faculty</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#30232A] dark:text-[#FFF3F7]">
            Shape the Next Generation of Indian Engineers
          </h1>
          <p className="text-sm text-[#806D76] dark:text-[#C3ADB8]">
            Give back to the developer ecosystem by hosting 1:1 architectural reviews, reviewing student projects, and discovering budding researchers.
          </p>
          <div className="pt-2">
            <Link href="/register">
              <Button size="lg">Join Mentor Network <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <Users className="h-7 w-7 text-[#E879A5]" />
              <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">Direct High-Impact Guidance</h3>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">
                Connect with motivated undergraduates working on actual AI and web infrastructure problems.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-3">
              <Award className="h-7 w-7 text-[#E879A5]" />
              <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">National Recognition</h3>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] leading-relaxed">
                Receive certified academic contributor credits recognized by university boards and corporate CSR initiatives.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
