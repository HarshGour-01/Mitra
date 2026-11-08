"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { DemoShowcaseDrawer } from "@/components/ui/DemoShowcaseDrawer";
import { Mail, MapPin, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#17152B] dark:bg-[#12101F] dark:text-[#F7F5F0]">
      <Navbar />
      <main className="flex-1 py-18 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-bold">Get In Touch</Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
            Contact the MITRA Team
          </h1>
          <p className="text-base text-[#555366] dark:text-[#9290A0] leading-relaxed">
            For university partnerships, institutional verification inquiries, or recruiter onboarding assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-6 text-xs text-[#555366] dark:text-[#9290A0]">
            <div className="rounded-2xl border border-[#E8E4DD] bg-white p-6 dark:border-[#2E274D] dark:bg-[#1A162B] space-y-2">
              <h4 className="font-bold text-[#17152B] dark:text-[#F7F5F0] text-sm">Headquarters</h4>
              <p className="mt-1">MITRA National Academic Operations</p>
              <p>Karnataka Innovation Hub, Bengaluru, India</p>
            </div>
            <div className="rounded-2xl border border-[#E8E4DD] bg-white p-6 dark:border-[#2E274D] dark:bg-[#1A162B] space-y-2">
              <h4 className="font-bold text-[#17152B] dark:text-[#F7F5F0] text-sm">Official Inquiries</h4>
              <p className="mt-1">partnerships@mitra.edu</p>
              <p>support@mitra.edu</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-8">
                {submitted ? (
                  <div className="text-center py-10 space-y-3 text-[#329B75] dark:text-emerald-400">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-[#329B75]" />
                    <h4 className="font-bold text-lg">Message Transmitted!</h4>
                    <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0]">Our institutional relations team will contact you within 24 hours.</p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Your Name</label>
                        <Input required placeholder="Harsh Gour" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Email</label>
                        <Input required type="email" placeholder="name@institution.edu" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Subject</label>
                      <Input required placeholder="University MoU / Campus Drive Onboarding" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Message</label>
                      <Textarea required placeholder="Provide details regarding your institution or organization..." rows={4} />
                    </div>
                    <Button type="submit" className="font-bold px-8 shadow-hover">
                      Transmit Inquiry
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <DemoShowcaseDrawer />
    </div>
  );
}
