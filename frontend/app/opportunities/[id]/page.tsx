"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  Calendar,
  Sparkles,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { opportunityService } from "@/services/opportunityService";
import { applicationService } from "@/services/applicationService";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency } from "@/lib/utils";

export default function OpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useAuth();
  const id = params?.id as string;

  const [coverLetter, setCoverLetter] = useState("");
  const [applySuccess, setApplySuccess] = useState(false);

  const { data: opp, isLoading } = useQuery({
    queryKey: ["opportunity", id],
    queryFn: () => opportunityService.getById(id),
    enabled: !!id,
  });

  const applyMutation = useMutation({
    mutationFn: () =>
      applicationService.submit({
        opportunity_id: id,
        cover_letter: coverLetter,
      }),
    onSuccess: () => {
      setApplySuccess(true);
      queryClient.invalidateQueries({ queryKey: ["myApplications"] });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
        <Navbar />
        <main className="flex-1 py-12 px-4 max-w-4xl mx-auto w-full space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!opp) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
        <Navbar />
        <main className="flex-1 py-16 text-center max-w-md mx-auto space-y-4">
          <h2 className="text-xl font-bold">Opportunity not found</h2>
          <Link href="/opportunities">
            <Button>Back to Listings</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
      <Navbar />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#806D76] hover:text-[#C94F7C] dark:text-[#C3ADB8] dark:hover:text-[#F09ABB]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all opportunities
        </Link>

        {/* Opportunity Header Banner */}
        <div className="rounded-3xl border border-[#F1DCE5] bg-white p-6 sm:p-8 shadow-card dark:border-[#493440] dark:bg-[#2B202A] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="uppercase text-xs font-bold">
                  {opp.opportunity_type}
                </Badge>
                <Badge variant="outline" className="text-xs uppercase">
                  {opp.work_mode}
                </Badge>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  ● Verified Academic Opportunity
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#30232A] dark:text-[#FFF3F7]">
                {opp.title}
              </h1>
              <p className="text-sm font-semibold text-[#C94F7C] dark:text-[#F09ABB]">
                {opp.company_name}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#806D76] dark:text-[#C3ADB8] pt-1">
                <span>📍 {opp.location}</span>
                <span>⏱ {opp.duration}</span>
                <span>📅 Deadline: {opp.application_deadline || "Open until filled"}</span>
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <div className="text-xs text-[#806D76] dark:text-[#C3ADB8]">Compensation</div>
              <div className="text-2xl font-black text-[#30232A] dark:text-[#FFF3F7]">
                {formatCurrency(opp.stipend_max)}/mo
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#F1DCE5] dark:border-[#493440]">
            {opp.required_skills?.map((s, idx) => (
              <Badge key={idx} variant="verified">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        {/* Details & Application Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Role Overview & Objectives</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[#30232A] dark:text-[#FFF3F7] leading-relaxed space-y-4">
                <p>{opp.description}</p>
                {opp.responsibilities && (
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#806D76] dark:text-[#C3ADB8] mb-2">
                      Key Responsibilities
                    </h4>
                    <p>{opp.responsibilities}</p>
                  </div>
                )}
                {opp.eligibility && (
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#806D76] dark:text-[#C3ADB8] mb-2">
                      Eligibility & Candidate Profile
                    </h4>
                    <p>{opp.eligibility}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Application Action Card */}
          <div>
            <Card className="sticky top-24 border-[#E879A5]/60 shadow-lg">
              <CardHeader>
                <CardTitle className="text-base">Submit Application</CardTitle>
                <CardDescription>Direct submission with verified Skill Passport</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {applySuccess ? (
                  <div className="rounded-2xl bg-emerald-50 p-6 text-center text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 space-y-2">
                    <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
                    <h4 className="font-bold text-sm">Application Sent!</h4>
                    <p className="text-xs">
                      Your verified profile has been transmitted to {opp.company_name}.
                    </p>
                    <Link href="/dashboard/student#applications">
                      <Button size="sm" variant="outline" className="mt-2 text-xs">
                        View in Application Center
                      </Button>
                    </Link>
                  </div>
                ) : isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
                      Applying as: <strong>{user?.full_name}</strong> ({user?.email})
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1">
                        Cover Note / Personal Statement (Optional)
                      </label>
                      <Textarea
                        rows={4}
                        placeholder="Explain your relevant project experience or enthusiasm for this opportunity..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                      />
                    </div>
                    <Button
                      className="w-full font-bold"
                      onClick={() => applyMutation.mutate()}
                      isLoading={applyMutation.isPending}
                    >
                      Confirm & Submit Application
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 text-center py-4">
                    <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
                      Please sign in with your MITRA student account to apply.
                    </p>
                    <Link href="/login">
                      <Button className="w-full">Sign In to Apply</Button>
                    </Link>
                  </div>
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
