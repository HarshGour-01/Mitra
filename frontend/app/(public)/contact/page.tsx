"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Mail, MapPin, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
      <Navbar />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <Badge variant="secondary">Get In Touch</Badge>
          <h1 className="text-3xl font-extrabold text-[#30232A] dark:text-[#FFF3F7]">
            Contact the MITRA Team
          </h1>
          <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
            For university partnerships, institutional verification inquiries, or recruiter onboarding assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 text-xs text-[#806D76] dark:text-[#C3ADB8]">
            <div>
              <h4 className="font-bold text-[#30232A] dark:text-[#FFF3F7] text-sm">Headquarters</h4>
              <p className="mt-1">MITRA National Academic Operations</p>
              <p>Karnataka Innovation Hub, Bengaluru, India</p>
            </div>
            <div>
              <h4 className="font-bold text-[#30232A] dark:text-[#FFF3F7] text-sm">Inquiries</h4>
              <p className="mt-1">partnerships@mitra.edu</p>
              <p>support@mitra.edu</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                {submitted ? (
                  <div className="text-center py-6 space-y-2 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
                    <h4 className="font-bold text-sm">Message Transmitted!</h4>
                    <p className="text-xs">Our institutional relations team will contact you within 24 hours.</p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold block mb-1">Your Name</label>
                        <Input required placeholder="Harsh Gour" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold block mb-1">Email</label>
                        <Input required type="email" placeholder="name@institution.edu" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1">Subject</label>
                      <Input required placeholder="University MoU / Campus Drive Onboarding" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1">Message</label>
                      <Textarea required placeholder="Describe your inquiry or partnership proposal..." rows={4} />
                    </div>
                    <Button type="submit" className="w-full font-bold">
                      Send Inquiry
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
