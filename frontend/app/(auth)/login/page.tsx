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
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#E879A5] to-[#C94F7C] text-white shadow-md shadow-pink-500/20">
              <Sparkles className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#30232A] dark:text-[#FFF3F7]">
              Sign in to MITRA
            </h1>
            <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
              Your Future, Your Mitra • Academia–Industry Collaboration
            </p>
          </div>

          <Card className="shadow-lg border-[#F1DCE5] dark:border-[#493440]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-base">Account Credentials</CardTitle>
              <CardDescription>Enter your registered institutional or corporate email</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-2 dark:bg-red-950/30 dark:text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold block mb-1">Email</label>
                  <Input
                    required
                    type="email"
                    placeholder="student@mitra.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold">Password</label>
                    <Link
                      href="/forgot-password"
                      className="text-[11px] text-[#C94F7C] hover:underline dark:text-[#F09ABB]"
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
                  className="w-full font-bold"
                  isLoading={loading}
                >
                  Sign In to MITRA
                </Button>
              </form>

              {/* Hackathon Evaluation Fast-Track */}
              <div className="mt-6 pt-5 border-t border-[#F1DCE5] dark:border-[#493440] space-y-3">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#806D76] dark:text-[#C3ADB8]">
                  <UserCheck className="h-3.5 w-3.5 text-[#E879A5]" /> Evaluator Quick-Launch Persona:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-[11px] py-1.5"
                    onClick={() => handleSimulate("student")}
                  >
                    Student Persona
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-[11px] py-1.5"
                    onClick={() => handleSimulate("recruiter")}
                  >
                    Recruiter Persona
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[11px] py-1.5"
                    onClick={() => handleSimulate("institution_admin")}
                  >
                    University Admin
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[11px] py-1.5"
                    onClick={() => handleSimulate("mentor")}
                  >
                    Mentor Persona
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-xs text-[#806D76] dark:text-[#C3ADB8]">
            Don't have an account yet?{" "}
            <Link href="/register" className="font-bold text-[#C94F7C] hover:underline dark:text-[#F09ABB]">
              Create MITRA Account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
