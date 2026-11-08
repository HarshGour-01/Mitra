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
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { DemoShowcaseDrawer } from "@/components/ui/DemoShowcaseDrawer";
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
      <div className="min-h-screen flex flex-col bg-[#F7F5F0] dark:bg-[#12101F]">
        <Navbar />
        <main className="flex-1 py-16 px-4 max-w-4xl mx-auto w-full space-y-8">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-72 w-full rounded-3xl" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!opp) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F7F5F0] dark:bg-[#12101F]">
        <Navbar />
        <main className="flex-1 py-20 text-center max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-[#17152B] dark:text-[#F7F5F0]">Opportunity not found</h2>
          <Link href="/opportunities">
            <Button>Back to Listings</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#17152B] dark:bg-[#12101F] dark:text-[#F7F5F0]">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-10">
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#555366] hover:text-[#7655E8] dark:text-[#9290A0] dark:hover:text-[#EDE8FF] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all opportunities
        </Link>

        {/* Opportunity Header Banner */}
        <div className="rounded-3xl border border-[#E8E4DD] bg-white p-8 sm:p-10 shadow-card dark:border-[#2E274D] dark:bg-[#1A162B] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="default" className="uppercase text-xs font-bold">
                  {opp.opportunity_type}
                </Badge>
                <Badge variant="secondary" className="text-xs uppercase">
                  {opp.work_mode}
                </Badge>
                <span className="text-xs text-[#329B75] font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified Academic Corridor
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#17152B] dark:text-[#F7F5F0] leading-tight">
                {opp.title}
              </h1>
              <p className="text-base font-bold text-[#7655E8] dark:text-[#EDE8FF]">
                {opp.company_name}
              </p>
              <div className="flex flex-wrap items-center gap-5 text-xs text-[#555366] dark:text-[#9290A0] pt-2">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#7655E8]" /> {opp.location}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[#7655E8]" /> {opp.duration}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-[#7655E8]" /> Deadline: {opp.application_deadline || "Open until filled"}</span>
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <div className="text-xs text-[#555366] dark:text-[#9290A0]">Compensation</div>
              <div className="text-3xl font-black text-[#17152B] dark:text-[#F7F5F0] mt-1">
                {formatCurrency(opp.stipend_max)}/mo
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E8E4DD] dark:border-[#2E274D]">
            {opp.required_skills?.map((s, idx) => (
              <Badge key={idx} variant="verified">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        {/* Details & Application Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Role Overview & Objectives</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[#17152B] dark:text-[#F7F5F0] leading-relaxed space-y-6">
                <p>{opp.description}</p>
                {opp.responsibilities && (
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#555366] dark:text-[#9290A0] mb-2">
                      Key Responsibilities
                    </h4>
                    <p className="leading-relaxed">{opp.responsibilities}</p>
                  </div>
                )}
                {opp.eligibility && (
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#555366] dark:text-[#9290A0] mb-2">
                      Eligibility & Candidate Profile
                    </h4>
                    <p className="leading-relaxed">{opp.eligibility}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Application Action Card */}
          <div>
            <Card className="sticky top-28 border-[#7655E8]/40 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Submit Application</CardTitle>
                <CardDescription>Direct submission with verified Skill Passport</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {applySuccess ? (
                  <div className="rounded-2xl bg-emerald-50 p-6 text-center text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 space-y-3">
                    <CheckCircle2 className="mx-auto h-10 w-10 text-[#329B75]" />
                    <h4 className="font-bold text-base">Application Transmitted!</h4>
                    <p className="text-xs leading-relaxed">
                      Your verified profile has been transmitted to {opp.company_name}.
                    </p>
                    <Link href="/dashboard/student#applications" className="block pt-2">
                      <Button size="sm" variant="outline" className="w-full text-xs">
                        View in Application Center
                      </Button>
                    </Link>
                  </div>
                ) : isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="text-xs text-[#555366] dark:text-[#9290A0]">
                      Applying as: <strong className="text-[#17152B] dark:text-[#F7F5F0]">{user?.full_name}</strong>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">
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
                      className="w-full font-bold shadow-hover"
                      onClick={() => applyMutation.mutate()}
                      isLoading={applyMutation.isPending}
                    >
                      Confirm & Submit Application
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 text-center py-4">
                    <p className="text-xs text-[#555366] dark:text-[#9290A0]">
                      Please sign in with your MITRA student account to apply.
                    </p>
                    <Link href="/login" className="block">
                      <Button className="w-full font-bold">Sign In to Apply</Button>
                    </Link>
                  </div>
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
