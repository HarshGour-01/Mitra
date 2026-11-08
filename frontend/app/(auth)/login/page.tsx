"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, AlertCircle, ShieldCheck, UserCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DemoShowcaseDrawer } from "@/components/ui/DemoShowcaseDrawer";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/api";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithDemoRole } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authErr) {
        throw new Error(authErr.message);
      }

      const role = data.user?.user_metadata?.role || "student";
      router.push(`/dashboard/${role}`);
    } catch (err: any) {
      setError(err?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleSimulate = async (role: UserRole) => {
    await signInWithDemoRole(role);
    router.push(`/dashboard/${role}`);
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
              Sign in to MITRA
            </h1>
            <p className="text-xs text-[#555366] dark:text-[#9290A0]">
              Your Future, Your Mitra • Academia–Industry Collaboration Platform
            </p>
          </div>

          <Card className="shadow-xl border-[#E8E4DD] dark:border-[#2E274D]">
            <CardHeader className="space-y-1.5 p-7">
              <CardTitle className="text-lg">Account Credentials</CardTitle>
              <CardDescription>Enter your registered institutional or corporate email</CardDescription>
            </CardHeader>
            <CardContent className="p-7 pt-0 space-y-5">
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2.5 dark:bg-rose-950/40 dark:text-rose-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

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
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0]">Password</label>
                    <Link
                      href="/forgot-password"
                      className="text-[11px] font-semibold text-[#7655E8] hover:underline dark:text-[#EDE8FF]"
                    >
                      Forgot Password?
                    </Link>
                  </div>
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
                  Sign In to MITRA
                </Button>
              </form>

              {/* Hackathon Evaluation Fast-Track */}
              <div className="mt-6 pt-6 border-t border-[#E8E4DD] dark:border-[#2E274D] space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#555366] dark:text-[#9290A0]">
                  <UserCheck className="h-4 w-4 text-[#7655E8]" /> Evaluator Quick-Launch Persona:
                </div>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-[11px] font-bold py-2"
                    onClick={() => handleSimulate("student")}
                  >
                    Student Persona
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-[11px] font-bold py-2"
                    onClick={() => handleSimulate("recruiter")}
                  >
                    Recruiter Persona
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[11px] font-semibold py-2"
                    onClick={() => handleSimulate("institution_admin")}
                  >
                    University Admin
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[11px] font-semibold py-2"
                    onClick={() => handleSimulate("mentor")}
                  >
                    Mentor Persona
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-xs text-[#555366] dark:text-[#9290A0]">
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="font-bold text-[#7655E8] hover:underline dark:text-[#EDE8FF]">
              Create Free MITRA Account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <DemoShowcaseDrawer />
    </div>
  );
}
