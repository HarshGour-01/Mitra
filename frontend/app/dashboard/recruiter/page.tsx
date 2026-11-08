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

  // Queries
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
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FFF0F5] to-white p-6 sm:p-8 border border-[#F1DCE5] shadow-card dark:from-[#211922] dark:to-[#2B202A] dark:border-[#493440]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F8DCE8] px-3 py-1 text-xs font-semibold text-[#C94F7C] dark:bg-[#493440] dark:text-[#F09ABB] mb-3">
              <Building2 className="h-3.5 w-3.5" />
              Corporate Partner Portal
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#30232A] dark:text-[#FFF3F7]">
              {profile?.company_name || "Nexus AI Technologies"}
            </h2>
            <p className="mt-1 text-sm text-[#806D76] dark:text-[#C3ADB8]">
              {profile?.industry || "Enterprise Artificial Intelligence"} • {profile?.location || "Bengaluru, Karnataka"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => setPostModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" /> Post New Opportunity
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#F1DCE5] gap-2 overflow-x-auto dark:border-[#493440]">
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
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? "border-[#E879A5] text-[#C94F7C] dark:border-[#F09ABB] dark:text-[#F09ABB]"
                  : "border-transparent text-[#806D76] hover:text-[#30232A] dark:text-[#C3ADB8] dark:hover:text-[#FFF3F7]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* MODAL: POST OPPORTUNITY */}
      {postModalOpen && (
        <Card className="border-[#E879A5] shadow-xl">
          <CardHeader>
            <CardTitle className="text-base">Publish Job / Internship / Research Project</CardTitle>
            <CardDescription>
              Broadcast requirements to verified students across MITRA member universities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateOpportunity} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold block mb-1">Opportunity Title</label>
                  <Input
                    required
                    placeholder="e.g. Frontend Engineer Intern"
                    value={oppTitle}
                    onChange={(e) => setOppTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Type</label>
                  <select
                    value={oppType}
                    onChange={(e) => setOppType(e.target.value as any)}
                    className="w-full h-11 rounded-xl border border-[#F1DCE5] bg-white px-3 text-sm dark:border-[#493440] dark:bg-[#2B202A]"
                  >
                    <option value="internship">Internship</option>
                    <option value="job">Full-Time Job</option>
                    <option value="project">Industry Collaborative Project</option>
                    <option value="research">Research Collaboration</option>
                    <option value="workshop">Skill Workshop</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Work Mode</label>
                  <select
                    value={oppMode}
                    onChange={(e) => setOppMode(e.target.value as any)}
                    className="w-full h-11 rounded-xl border border-[#F1DCE5] bg-white px-3 text-sm dark:border-[#493440] dark:bg-[#2B202A]"
                  >
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="on_site">On-Site</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Location</label>
                  <Input
                    value={oppLocation}
                    onChange={(e) => setOppLocation(e.target.value)}
                    placeholder="e.g. Bangalore, India"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Stipend Max (₹/month)</label>
                  <Input
                    type="number"
                    value={oppStipendMax}
                    onChange={(e) => setOppStipendMax(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Required Skills (comma separated)</label>
                  <Input
                    value={oppSkills}
                    onChange={(e) => setOppSkills(e.target.value)}
                    placeholder="Next.js, Python, PostgreSQL"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Description & Scope</label>
                <Textarea
                  required
                  placeholder="Outline responsibilities, learning outcomes, and prerequisites..."
                  value={oppDescription}
                  onChange={(e) => setOppDescription(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
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
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-5">
                <div className="text-xs font-medium text-[#806D76] dark:text-[#C3ADB8]">Active Postings</div>
                <div className="text-2xl font-black text-[#30232A] dark:text-[#FFF3F7] mt-1">
                  {opportunities.length}
                </div>
                <div className="text-[11px] text-[#C94F7C] dark:text-[#F09ABB] mt-1">Across 3 academic tiers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="text-xs font-medium text-[#806D76] dark:text-[#C3ADB8]">Applications Received</div>
                <div className="text-2xl font-black text-[#E879A5] dark:text-[#F09ABB] mt-1">
                  {pipeline.length + 196}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">↑ 18% from last week</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="text-xs font-medium text-[#806D76] dark:text-[#C3ADB8]">Shortlisted Candidates</div>
                <div className="text-2xl font-black text-[#C94F7C] dark:text-[#F09ABB] mt-1">
                  {pipeline.filter((a) => a.status === "shortlisted").length}
                </div>
                <div className="text-[11px] text-[#806D76] dark:text-[#C3ADB8] mt-1">Awaiting technical interview</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="text-xs font-medium text-[#806D76] dark:text-[#C3ADB8]">Avg Match Confidence</div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">91.4%</div>
                <div className="text-[11px] text-[#806D76] dark:text-[#C3ADB8] mt-1">Powered by MITRA AI</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Candidates */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Top Matching Student Talent</CardTitle>
                <CardDescription>Students with high career readiness scores matching your tech stack</CardDescription>
              </div>
              <Button size="sm" variant="outline" onClick={() => setActiveTab("candidates")}>
                Explore All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-[#F1DCE5] dark:divide-[#493440]">
                {candidates.slice(0, 3).map((candidate) => (
                  <div key={candidate.id} className="py-3.5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#30232A] dark:text-[#FFF3F7]">
                        {candidate.full_name}
                      </h4>
                      <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#30232A] dark:text-[#FFF3F7]">
              Current Postings ({opportunities.length})
            </h3>
            <Button size="sm" onClick={() => setPostModalOpen(true)}>
              <Plus className="h-4 w-4" /> Add Posting
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opportunities.map((opp) => (
              <Card key={opp.id}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="uppercase text-[10px]">
                      {opp.opportunity_type}
                    </Badge>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      {opp.status.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">{opp.title}</h4>
                  <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] line-clamp-2">{opp.description}</p>
                  <div className="text-xs font-medium text-[#C94F7C] dark:text-[#F09ABB]">
                    {opp.location} • {opp.duration}
                  </div>
                  <div className="flex flex-wrap gap-1">
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
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#806D76]" />
              <Input
                placeholder="Filter by skill, e.g. React, Python, Machine Learning..."
                value={searchSkill}
                onChange={(e) => setSearchSkill(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {candidates.map((c) => (
              <Card key={c.id}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">{c.full_name}</h4>
                      <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">{c.institution_name}</p>
                    </div>
                    <Badge variant="verified">{c.career_readiness_score}%</Badge>
                  </div>
                  <div className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
                    <strong>Degree:</strong> {c.degree} ({c.department})
                  </div>
                  <div className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
                    <strong>Graduating:</strong> {c.graduation_year}
                  </div>
                  <div className="pt-2">
                    <Button size="sm" variant="secondary" className="w-full text-xs">
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
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#30232A] dark:text-[#FFF3F7]">
            Candidate Application Pipeline
          </h3>

          <div className="space-y-3">
            {pipeline.map((app) => (
              <Card key={app.id}>
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
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
                      <span className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
                        Match: {app.match_score}%
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#30232A] dark:text-[#FFF3F7]">
                      {app.student_name} ({app.student_email})
                    </h4>
                    <p className="text-xs text-[#C94F7C] dark:text-[#F09ABB]">
                      Applied for: {app.opportunity_title}
                    </p>
                    {app.cover_letter && (
                      <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] italic">
                        "{app.cover_letter}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: app.id,
                          status: "shortlisted",
                          feedback: "Profile accepted for technical interview round.",
                        })
                      }
                    >
                      <Check className="h-4 w-4 mr-1" /> Shortlist
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-rose-600 border-rose-200 hover:bg-rose-50"
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: app.id,
                          status: "rejected",
                          feedback: "Candidate requirements not met for current batch.",
                        })
                      }
                    >
                      <X className="h-4 w-4 mr-1" /> Pass
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
