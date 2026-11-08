"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DemoShowcaseDrawer } from "@/components/ui/DemoShowcaseDrawer";
import { supabase } from "@/lib/supabase/client";
import { UserRole } from "@/types/api";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authErr } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
          },
        },
      });

      if (authErr) {
        throw new Error(authErr.message);
      }

      setRegistered(true);
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#17152B] dark:bg-[#12101F] dark:text-[#F7F5F0]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7655E8] to-[#29234B] text-white shadow-md shadow-[#7655E8]/20">
              <Sparkles className="h-6 w-6 text-[#E8C98A]" />
            </div>
            <h1 className="text-3xl font-black text-[#17152B] dark:text-[#F7F5F0]">
              Join the MITRA Network
            </h1>
            <p className="text-xs text-[#555366] dark:text-[#9290A0]">
              Where Academic Potential Meets Industry Opportunity
            </p>
          </div>

          <Card className="shadow-xl border-[#E8E4DD] dark:border-[#2E274D]">
            <CardHeader className="space-y-1.5 p-7">
              <CardTitle className="text-lg">Create MITRA Account</CardTitle>
              <CardDescription>Select your ecosystem role and provide credentials</CardDescription>
            </CardHeader>
            <CardContent className="p-7 pt-0">
              {registered ? (
                <div className="text-center py-8 space-y-4">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#329B75]" />
                  <h3 className="text-lg font-bold text-[#17152B] dark:text-[#F7F5F0]">
                    Account Created Successfully!
                  </h3>
                  <p className="text-xs text-[#555366] dark:text-[#9290A0] leading-relaxed">
                    We have sent a verification confirmation to <strong>{email}</strong>.
                  </p>
                  <Link href="/login" className="block pt-2">
                    <Button className="w-full font-bold">Proceed to Sign In</Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-5">
                  {error && (
                    <div className="p-3.5 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2.5 dark:bg-rose-950/40 dark:text-rose-300">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Your Ecosystem Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full h-12 rounded-xl border border-[#E8E4DD] bg-white px-3 text-xs font-bold text-[#17152B] focus:border-[#7655E8] focus:outline-none dark:border-[#2E274D] dark:bg-[#1A162B] dark:text-[#F7F5F0]"
                    >
                      <option value="student">Student / Innovator</option>
                      <option value="recruiter">Corporate Recruiter / Company</option>
                      <option value="institution_admin">College / University Admin</option>
                      <option value="faculty">Faculty Member / Supervisor</option>
                      <option value="mentor">Industry Mentor</option>
                      <option value="researcher">Academic Researcher</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Full Name</label>
                    <Input
                      required
                      placeholder="e.g. Harsh Gour"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Email</label>
                    <Input
                      required
                      type="email"
                      placeholder="student@mitra.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Password (min 8 chars)</label>
                    <Input
                      required
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-bold shadow-hover mt-2"
                    isLoading={loading}
                  >
                    Register Account
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="text-center text-xs text-[#555366] dark:text-[#9290A0]">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#7655E8] hover:underline dark:text-[#EDE8FF]">
              Sign In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <DemoShowcaseDrawer />
    </div>
  );
}
