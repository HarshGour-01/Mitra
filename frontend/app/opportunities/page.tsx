"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Search, Briefcase, MapPin, Clock, ArrowRight, Filter, Building2, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { opportunityService } from "@/services/opportunityService";
import { OpportunityType, WorkMode } from "@/types/api";
import { formatCurrency } from "@/lib/utils";

export default function OpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedMode, setSelectedMode] = useState<string>("all");

  const { data: opportunities = [], isLoading } = useQuery({
    queryKey: ["opportunities", selectedType, selectedMode, search],
    queryFn: () =>
      opportunityService.list({
        type: selectedType === "all" ? undefined : (selectedType as OpportunityType),
        work_mode: selectedMode === "all" ? undefined : (selectedMode as WorkMode),
        search: search || undefined,
      }),
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] dark:bg-[#171217]">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="secondary" className="px-3 py-1 text-xs">
            National Talent Gateway
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#30232A] dark:text-[#FFF3F7]">
            Verified Academia–Industry Opportunities
          </h1>
          <p className="text-sm text-[#806D76] dark:text-[#C3ADB8]">
            Discover high-impact internships, corporate collaborative projects, and funded research appointments verified by Indian academic institutions.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="rounded-2xl border border-[#F1DCE5] bg-white p-4 shadow-sm dark:border-[#493440] dark:bg-[#2B202A] space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#806D76]" />
              <Input
                placeholder="Search by role, company, or tech stack (e.g. Next.js, Python)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="h-11 rounded-xl border border-[#F1DCE5] bg-[#FFF8FA] px-3 text-xs font-semibold text-[#30232A] dark:border-[#493440] dark:bg-[#211922] dark:text-[#FFF3F7]"
              >
                <option value="all">All Types</option>
                <option value="internship">Internships</option>
                <option value="job">Jobs</option>
                <option value="project">Industry Projects</option>
                <option value="research">Research Appointments</option>
              </select>

              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="h-11 rounded-xl border border-[#F1DCE5] bg-[#FFF8FA] px-3 text-xs font-semibold text-[#30232A] dark:border-[#493440] dark:bg-[#211922] dark:text-[#FFF3F7]"
              >
                <option value="all">All Modes</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="on_site">On-Site</option>
              </select>
            </div>
          </div>
        </div>

        {/* Opportunity List */}
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-28 w-full rounded-2xl" />
            <Skeleton className="h-28 w-full rounded-2xl" />
            <Skeleton className="h-28 w-full rounded-2xl" />
          </div>
        ) : opportunities.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-[#F1DCE5] bg-white p-8 dark:border-[#493440] dark:bg-[#2B202A]">
            <Briefcase className="mx-auto h-12 w-12 text-[#E879A5] mb-3 opacity-60" />
            <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">No Matching Opportunities</h3>
            <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] mt-1">Try resetting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {opportunities.map((opp) => (
              <Card key={opp.id} className="hover:border-[#E879A5] hover:shadow-hover transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="uppercase text-[10px]">
                          {opp.opportunity_type}
                        </Badge>
                        <span className="text-xs text-[#806D76] dark:text-[#C3ADB8] font-medium">
                          {opp.work_mode?.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7] leading-snug">
                        {opp.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#C94F7C] dark:text-[#F09ABB]">
                        {opp.company_name}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-black text-[#30232A] dark:text-[#FFF3F7]">
                        {formatCurrency(opp.stipend_max)}/mo
                      </div>
                      <div className="text-[11px] text-[#806D76] dark:text-[#C3ADB8]">
                        {opp.duration}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] line-clamp-2 leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#F1DCE5] dark:border-[#493440]">
                    {opp.required_skills?.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-[10px]">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-[#806D76] dark:text-[#C3ADB8]">
                      📍 {opp.location}
                    </span>
                    <Link href={`/opportunities/${opp.id}`}>
                      <Button size="sm" variant="default" className="text-xs gap-1">
                        View Details <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
