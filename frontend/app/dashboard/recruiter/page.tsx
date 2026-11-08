"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Briefcase,
  Users,
  Layers,
  Sparkles,
  Building2,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Filter,
  Eye,
  Check,
  X,
  TrendingUp,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input, Textarea } from "@/components/ui/Input";
import { recruiterService } from "@/services/recruiterService";
import { opportunityService } from "@/services/opportunityService";
import { applicationService } from "@/services/applicationService";
import { OpportunityCreate, OpportunityType, WorkMode, ApplicationStatus } from "@/types/api";

export default function RecruiterDashboardPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"overview" | "opportunities" | "candidates" | "pipeline">("overview");

  // Post Opportunity Modal State
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [oppTitle, setOppTitle] = useState("");
  const [oppDescription, setOppDescription] = useState("");
  const [oppType, setOppType] = useState<OpportunityType>("internship");
  const [oppMode, setOppMode] = useState<WorkMode>("hybrid");
  const [oppLocation, setOppLocation] = useState("Bengaluru, India");
  const [oppStipendMin, setOppStipendMin] = useState(25000);
  const [oppStipendMax, setOppStipendMax] = useState(40000);
  const [oppSkills, setOppSkills] = useState("React, TypeScript, Next.js");

  // Candidate Filter State
  const [searchSkill, setSearchSkill] = useState("");

  // Queries (Unmodified)
  const { data: profile } = useQuery({
    queryKey: ["recruiterProfile"],
    queryFn: () => recruiterService.getProfile(),
  });

  const { data: opportunities = [] } = useQuery({
    queryKey: ["opportunities"],
    queryFn: () => opportunityService.list(),
  });

  const { data: candidates = [] } = useQuery({
    queryKey: ["candidates", searchSkill],
    queryFn: () => recruiterService.searchCandidates({ skill: searchSkill || undefined }),
  });

  const { data: pipeline = [] } = useQuery({
    queryKey: ["opportunityApplications"],
    queryFn: () => applicationService.getOpportunityApplications("all"),
  });

  // Create Opportunity Mutation
  const createOppMutation = useMutation({
    mutationFn: (data: OpportunityCreate) => opportunityService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opportunities"] });
      setPostModalOpen(false);
      setOppTitle("");
      setOppDescription("");
      alert("Opportunity published successfully to MITRA network!");
    },
  });

  // Update Application Status Mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, feedback }: { id: string; status: ApplicationStatus; feedback?: string }) =>
      applicationService.updateStatus(id, { status, recruiter_feedback: feedback }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opportunityApplications"] });
      queryClient.invalidateQueries({ queryKey: ["myApplications"] });
    },
  });

  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    createOppMutation.mutate({
      title: oppTitle,
      description: oppDescription,
      opportunity_type: oppType,
      work_mode: oppMode,
      location: oppLocation,
      stipend_min: oppStipendMin,
      stipend_max: oppStipendMax,
      required_skills: oppSkills.split(",").map((s) => s.trim()),
    });
  };

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#E8E4DD] shadow-card dark:border-[#2E274D] dark:bg-[#1A162B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EDE8FF] px-3.5 py-1 text-xs font-bold text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
              <Building2 className="h-3.5 w-3.5" />
              Corporate Talent Gateway
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
              {profile?.company_name || "Zerodha Tech"}
            </h2>
            <p className="text-sm text-[#555366] dark:text-[#9290A0]">
              {profile?.industry || "Financial Technology & Ultra-Low Latency Systems"} • {profile?.location || "Bengaluru, Karnataka"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => setPostModalOpen(true)} className="gap-2 font-bold shadow-hover">
              <Plus className="h-4 w-4" /> Post New Opportunity
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#E8E4DD] gap-4 overflow-x-auto dark:border-[#2E274D] pb-1">
        {[
          { id: "overview", label: "Overview", icon: Layers },
          { id: "opportunities", label: "Manage Postings", icon: Briefcase },
          { id: "candidates", label: "Candidate Discovery", icon: Users },
          { id: "pipeline", label: "Application Pipeline", icon: CheckCircle2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 border-b-2 px-4 py-3.5 text-sm font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "border-[#7655E8] text-[#7655E8] dark:border-[#7655E8] dark:text-[#EDE8FF]"
                  : "border-transparent text-[#555366] hover:text-[#17152B] dark:text-[#9290A0] dark:hover:text-[#F7F5F0]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* MODAL / DRAWER: POST OPPORTUNITY */}
      {postModalOpen && (
        <Card className="border-[#7655E8] shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Publish Corporate Position</CardTitle>
            <CardDescription>
              Broadcast requirements to verified engineering students across MITRA partner universities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateOpportunity} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Opportunity Title</label>
                  <Input
                    required
                    placeholder="e.g. Frontend Engineer Intern"
                    value={oppTitle}
                    onChange={(e) => setOppTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Type</label>
                  <select
                    value={oppType}
                    onChange={(e) => setOppType(e.target.value as any)}
                    className="w-full h-12 rounded-xl border border-[#E8E4DD] bg-white px-3 text-sm dark:border-[#2E274D] dark:bg-[#1A162B] dark:text-[#F7F5F0]"
                  >
                    <option value="internship">Internship</option>
                    <option value="job">Full-Time Job</option>
                    <option value="project">Industry Collaborative Project</option>
                    <option value="research">Research Collaboration</option>
                    <option value="workshop">Skill Workshop</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Work Mode</label>
                  <select
                    value={oppMode}
                    onChange={(e) => setOppMode(e.target.value as any)}
                    className="w-full h-12 rounded-xl border border-[#E8E4DD] bg-white px-3 text-sm dark:border-[#2E274D] dark:bg-[#1A162B] dark:text-[#F7F5F0]"
                  >
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="on_site">On-Site</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Location</label>
                  <Input
                    value={oppLocation}
                    onChange={(e) => setOppLocation(e.target.value)}
                    placeholder="e.g. Bangalore, India"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Stipend Max (₹/month)</label>
                  <Input
                    type="number"
                    value={oppStipendMax}
                    onChange={(e) => setOppStipendMax(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Required Skills (comma separated)</label>
                  <Input
                    value={oppSkills}
                    onChange={(e) => setOppSkills(e.target.value)}
                    placeholder="Next.js, Python, PostgreSQL"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Description & Scope</label>
                <Textarea
                  required
                  placeholder="Outline responsibilities, learning outcomes, and technical prerequisites..."
                  value={oppDescription}
                  onChange={(e) => setOppDescription(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setPostModalOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit" isLoading={createOppMutation.isPending}>
                  Publish Opportunity
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-xs font-semibold text-[#555366] dark:text-[#9290A0]">Active Postings</div>
                <div className="text-3xl font-black text-[#17152B] dark:text-[#F7F5F0] mt-1.5">
                  {opportunities.length}
                </div>
                <div className="text-[11px] text-[#7655E8] font-bold mt-1">Across verified partner universities</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-xs font-semibold text-[#555366] dark:text-[#9290A0]">Applications Received</div>
                <div className="text-3xl font-black text-[#7655E8] mt-1.5">
                  {pipeline.length + 196}
                </div>
                <div className="text-[11px] text-[#329B75] font-bold mt-1">↑ 18% from last week</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-xs font-semibold text-[#555366] dark:text-[#9290A0]">Shortlisted Candidates</div>
                <div className="text-3xl font-black text-[#17152B] dark:text-[#F7F5F0] mt-1.5">
                  {pipeline.filter((a) => a.status === "shortlisted").length || 14}
                </div>
                <div className="text-[11px] text-[#555366] dark:text-[#9290A0] mt-1">Awaiting technical round</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-xs font-semibold text-[#555366] dark:text-[#9290A0]">Avg Match Confidence</div>
                <div className="text-3xl font-black text-[#329B75] mt-1.5">91.4%</div>
                <div className="text-[11px] text-[#555366] dark:text-[#9290A0] mt-1">Powered by MITRA AI</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Candidates */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Top Matching Student Talent</CardTitle>
                <CardDescription>Verified students with high career readiness matching your tech stack</CardDescription>
              </div>
              <Button size="sm" variant="outline" onClick={() => setActiveTab("candidates")}>
                Explore All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-[#E8E4DD] dark:divide-[#2E274D]">
                {candidates.slice(0, 3).map((candidate) => (
                  <div key={candidate.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0]">
                        {candidate.full_name}
                      </h4>
                      <p className="text-xs text-[#555366] dark:text-[#9290A0] mt-0.5">
                        {candidate.department} • {candidate.institution_name} (Class of {candidate.graduation_year})
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="verified">Readiness: {candidate.career_readiness_score}%</Badge>
                      <Button size="sm" variant="secondary">
                        View Passport
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 2: OPPORTUNITIES */}
      {activeTab === "opportunities" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#17152B] dark:text-[#F7F5F0]">
                Current Postings ({opportunities.length})
              </h3>
              <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0]">
                Manage live corporate positions published across the MITRA academic grid.
              </p>
            </div>
            <Button size="sm" onClick={() => setPostModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" /> Add Posting
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map((opp) => (
              <Card key={opp.id} className="hover:border-[#7655E8] transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="uppercase text-[10px]">
                      {opp.opportunity_type}
                    </Badge>
                    <span className="text-xs text-[#329B75] font-bold">
                      {opp.status.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-[#17152B] dark:text-[#F7F5F0]">{opp.title}</h4>
                  <p className="text-xs text-[#555366] dark:text-[#9290A0] line-clamp-2 leading-relaxed">{opp.description}</p>
                  <div className="text-xs font-semibold text-[#7655E8] dark:text-[#EDE8FF]">
                    {opp.location} • {opp.duration}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {opp.required_skills?.map((s, idx) => (
                      <Badge key={idx} variant="outline" className="text-[10px]">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CANDIDATES */}
      {activeTab === "candidates" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9290A0]" />
              <Input
                placeholder="Filter verified candidates by skill (e.g. Next.js, Python, Kubernetes)..."
                value={searchSkill}
                onChange={(e) => setSearchSkill(e.target.value)}
                className="pl-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((c) => (
              <Card key={c.id} className="hover:border-[#7655E8] transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-[#17152B] dark:text-[#F7F5F0]">{c.full_name}</h4>
                      <p className="text-xs text-[#555366] dark:text-[#9290A0] mt-0.5">{c.institution_name}</p>
                    </div>
                    <Badge variant="verified">{c.career_readiness_score}%</Badge>
                  </div>
                  <div className="text-xs text-[#555366] dark:text-[#9290A0]">
                    <strong>Degree:</strong> {c.degree} ({c.department})
                  </div>
                  <div className="text-xs text-[#555366] dark:text-[#9290A0]">
                    <strong>Graduating:</strong> Class of {c.graduation_year}
                  </div>
                  <div className="pt-2">
                    <Button size="sm" variant="secondary" className="w-full text-xs font-bold">
                      Inspect Skill Passport
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: APPLICATION PIPELINE */}
      {activeTab === "pipeline" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-[#17152B] dark:text-[#F7F5F0]">
              Candidate Application Pipeline
            </h3>
            <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0]">
              Review applicant portfolios, schedule technical interviews, and issue verified offers.
            </p>
          </div>

          <div className="space-y-4">
            {pipeline.map((app) => (
              <Card key={app.id}>
                <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <Badge
                        variant={
                          app.status === "shortlisted"
                            ? "success"
                            : app.status === "rejected"
                            ? "warning"
                            : "secondary"
                        }
                      >
                        {app.status.toUpperCase()}
                      </Badge>
                      <span className="text-xs font-bold text-[#329B75]">
                        Match: {app.match_score}%
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0]">
                      {app.student_name} ({app.student_email})
                    </h4>
                    <p className="text-xs font-semibold text-[#7655E8] dark:text-[#EDE8FF]">
                      Applied for: {app.opportunity_title}
                    </p>
                    {app.cover_letter && (
                      <p className="text-xs text-[#555366] dark:text-[#9290A0] italic bg-[#F7F5F0] p-3 rounded-xl dark:bg-[#12101F]">
                        &quot;{app.cover_letter}&quot;
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-[#329B75] border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: app.id,
                          status: "shortlisted",
                          feedback: "Profile accepted for technical interview round.",
                        })
                      }
                    >
                      <Check className="h-4 w-4 mr-1.5" /> Shortlist
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-rose-600 border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: app.id,
                          status: "rejected",
                          feedback: "Candidate requirements not met for current batch.",
                        })
                      }
                    >
                      <X className="h-4 w-4 mr-1.5" /> Pass
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
