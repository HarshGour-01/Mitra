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
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#E879A5] to-[#C94F7C] text-white shadow-md">
              <Sparkles className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#30232A] dark:text-[#FFF3F7]">
              Join the MITRA Network
            </h1>
            <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
              Where Academic Potential Meets Industry Opportunity
            </p>
          </div>

          <Card className="shadow-lg border-[#F1DCE5] dark:border-[#493440]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-base">Create MITRA Account</CardTitle>
              <CardDescription>Select your ecosystem role and provide credentials</CardDescription>
            </CardHeader>
            <CardContent>
              {registered ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                  <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">
                    Account Created Successfully!
                  </h3>
                  <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
                    We have sent a verification confirmation to <strong>{email}</strong>.
                  </p>
                  <Link href="/login">
                    <Button className="mt-4 w-full">Proceed to Sign In</Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-2 dark:bg-red-950/30 dark:text-red-400">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-semibold block mb-1">Your Ecosystem Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full h-11 rounded-xl border border-[#F1DCE5] bg-white px-3 text-xs font-semibold text-[#30232A] dark:border-[#493440] dark:bg-[#211922] dark:text-[#FFF3F7]"
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
                    <label className="text-xs font-semibold block mb-1">Full Name</label>
                    <Input
                      required
                      placeholder="e.g. Harsh Gour"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

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
                    <label className="text-xs font-semibold block mb-1">Password (min 8 chars)</label>
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
                    Register Account
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="text-center text-xs text-[#806D76] dark:text-[#C3ADB8]">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#C94F7C] hover:underline dark:text-[#F09ABB]">
              Sign In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
