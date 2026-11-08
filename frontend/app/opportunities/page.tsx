"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Search, Briefcase, MapPin, Clock, ArrowRight, Filter, Building2, Sparkles, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { DemoShowcaseDrawer } from "@/components/ui/DemoShowcaseDrawer";
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
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#17152B] dark:bg-[#12101F] dark:text-[#F7F5F0]">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-bold">
            National Talent Gateway
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
            Verified Academia–Industry Opportunities
          </h1>
          <p className="text-base text-[#555366] dark:text-[#9290A0] leading-relaxed">
            Discover high-impact corporate internships, collaborative industry capstones, and funded research appointments vetted by accredited Indian institutions.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="rounded-2xl border border-[#E8E4DD] bg-white p-5 shadow-card dark:border-[#2E274D] dark:bg-[#1A162B] space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9290A0]" />
              <Input
                placeholder="Search by role, company, or tech stack (e.g. Next.js, Python, TypeScript)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="h-12 rounded-xl border border-[#E8E4DD] bg-[#F7F5F0] px-4 text-xs font-bold text-[#17152B] focus:border-[#7655E8] focus:outline-none dark:border-[#2E274D] dark:bg-[#12101F] dark:text-[#F7F5F0]"
              >
                <option value="all">All Types</option>
                <option value="internship">Internships</option>
                <option value="job">Full-Time Jobs</option>
                <option value="project">Industry Projects</option>
                <option value="research">Research Appointments</option>
              </select>

              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="h-12 rounded-xl border border-[#E8E4DD] bg-[#F7F5F0] px-4 text-xs font-bold text-[#17152B] focus:border-[#7655E8] focus:outline-none dark:border-[#2E274D] dark:bg-[#12101F] dark:text-[#F7F5F0]"
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
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
        ) : opportunities.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-[#E8E4DD] bg-white p-10 dark:border-[#2E274D] dark:bg-[#1A162B]">
            <Briefcase className="mx-auto h-12 w-12 text-[#7655E8] mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-[#17152B] dark:text-[#F7F5F0]">No Matching Opportunities</h3>
            <p className="text-xs text-[#555366] dark:text-[#9290A0] mt-1">Try resetting your keyword filters or work mode settings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {opportunities.map((opp) => (
              <Card key={opp.id} className="hover:border-[#7655E8] hover:shadow-hover transition-all">
                <CardContent className="p-7 space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="uppercase text-[10px] font-bold">
                          {opp.opportunity_type}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px]">
                          {opp.work_mode?.toUpperCase()}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-[#17152B] dark:text-[#F7F5F0] leading-snug">
                        {opp.title}
                      </h3>
                      <p className="text-xs font-bold text-[#7655E8] dark:text-[#EDE8FF]">
                        {opp.company_name}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base font-black text-[#17152B] dark:text-[#F7F5F0]">
                        {formatCurrency(opp.stipend_max)}/mo
                      </div>
                      <div className="text-xs text-[#555366] dark:text-[#9290A0] mt-0.5">
                        {opp.duration}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#555366] dark:text-[#9290A0] line-clamp-2 leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#E8E4DD] dark:border-[#2E274D]">
                    {opp.required_skills?.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-[10px]">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-[#555366] dark:text-[#9290A0] flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-[#7655E8]" /> {opp.location}
                    </span>
                    <Link href={`/opportunities/${opp.id}`}>
                      <Button size="sm" variant="default" className="text-xs gap-1.5 font-bold shadow-xs">
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
      <DemoShowcaseDrawer />
    </div>
  );
}
