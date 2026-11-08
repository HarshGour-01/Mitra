"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DemoShowcaseDrawer } from "@/components/ui/DemoShowcaseDrawer";
import { supabase } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.auth.resetPasswordForEmail(email);
      setSubmitted(true);
    } catch (err) {
      // Show confirmation regardless of user existence for privacy
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#17152B] dark:bg-[#12101F] dark:text-[#F7F5F0]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6">
        <div className="w-full max-w-md space-y-8">
          <Card className="shadow-xl border-[#E8E4DD] dark:border-[#2E274D]">
            <CardHeader className="p-7">
              <CardTitle className="text-xl">Reset Your Password</CardTitle>
              <CardDescription>
                We&apos;ll send a secure password reset link to your registered institutional or personal email address.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-7 pt-0">
              {submitted ? (
                <div className="text-center py-6 space-y-4">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#329B75]" />
                  <p className="text-xs text-[#555366] dark:text-[#9290A0] leading-relaxed">
                    Check your inbox at <strong>{email}</strong> for instructions to reset your password.
                  </p>
                  <Link href="/login" className="block pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Return to Sign In
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Registered Email</label>
                    <Input
                      required
                      type="email"
                      placeholder="student@mitra.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full font-bold shadow-hover" isLoading={loading}>
                    Send Reset Link
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#555366] hover:text-[#7655E8] dark:text-[#9290A0] dark:hover:text-[#EDE8FF] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Sign In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <DemoShowcaseDrawer />
    </div>
  );
}
