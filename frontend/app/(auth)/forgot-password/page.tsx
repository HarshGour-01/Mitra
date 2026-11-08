"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
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
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-md space-y-6">
          <Card className="shadow-lg border-[#F1DCE5] dark:border-[#493440]">
            <CardHeader>
              <CardTitle className="text-base">Reset Your Password</CardTitle>
              <CardDescription>
                We'll send a secure password reset link to your registered email address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-4 space-y-3">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                  <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
                    Check your inbox at <strong>{email}</strong> for instructions to reset your password.
                  </p>
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="mt-2">
                      Return to Sign In
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold block mb-1">Registered Email</label>
                    <Input
                      required
                      type="email"
                      placeholder="student@mitra.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full font-bold" isLoading={loading}>
                    Send Reset Link
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs text-[#806D76] hover:text-[#C94F7C] dark:text-[#C3ADB8] dark:hover:text-[#F09ABB]"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Sign In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
