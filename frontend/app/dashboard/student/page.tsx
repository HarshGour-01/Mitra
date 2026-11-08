"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  FileText,
  GraduationCap,
  Sparkles,
  UploadCloud,
  Users,
  Calendar,
  AlertCircle,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { ComingSoonCard } from "@/components/ui/ComingSoon";
import { studentService } from "@/services/studentService";
import { opportunityService } from "@/services/opportunityService";
import { applicationService } from "@/services/applicationService";
import { aiService } from "@/services/aiService";
import { formatCurrency } from "@/lib/utils";

export default function StudentDashboardPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"overview" | "passport" | "resume" | "ai-intel" | "applications">("overview");

  // New Skill Modal State
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("Technical");
  const [newSkillLevel, setNewSkillLevel] = useState(4);

  // Resume Upload State
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeAnalyzing, setResumeAnalyzing] = useState(false);
  const [resumeResult, setResumeResult] = useState<any>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);

  // TanStack Queries (Logic preserved exactly)
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["studentProfile"],
    queryFn: () => studentService.getProfile(),
  });

  const { data: skills = [], isLoading: skillsLoading } = useQuery({
    queryKey: ["studentSkills"],
    queryFn: () => studentService.getSkills(),
  });

  const { data: opportunities = [] } = useQuery({
    queryKey: ["opportunities"],
    queryFn: () => opportunityService.list(),
  });

  const { data: myApplications = [] } = useQuery({
    queryKey: ["myApplications"],
    queryFn: () => applicationService.getMyApplications(),
  });

  const { data: aiIntelligence } = useQuery({
    queryKey: ["skillGapAnalysis"],
    queryFn: () => aiService.getSkillGapAnalysis(),
  });

  // Add Skill Mutation
  const addSkillMutation = useMutation({
    mutationFn: (data: { skill_name: string; category: string; proficiency_level: number }) =>
      studentService.addSkill(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentSkills"] });
      setSkillModalOpen(false);
      setNewSkillName("");
    },
  });

  // Handle Resume Upload
  const handleResumeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) return;
    setResumeAnalyzing(true);
    setResumeError(null);
    try {
      const formData = new FormData();
      formData.append("file", resumeFile);
      const res = await studentService.analyzeResume(formData);
      setResumeResult(res);
    } catch (err: any) {
      setResumeError(err?.message || "Failed to analyze resume. Please verify backend is running.");
    } finally {
      setResumeAnalyzing(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Welcome Banner — Spacious & Modern */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-8 sm:p-10 border border-[#E8E4DD] shadow-card dark:border-[#2E274D] dark:bg-[#1A162B]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EDE8FF] px-3.5 py-1 text-xs font-bold text-[#7655E8] dark:bg-[#241E3D] dark:text-[#EDE8FF]">
              <Sparkles className="h-3.5 w-3.5" />
              Verified Student Innovation Workspace
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
              Welcome back, {profile?.full_name || "Harsh"}! 👋
            </h2>
            <p className="text-sm text-[#555366] dark:text-[#9290A0]">
              {profile?.degree || "B.Tech Computer Science & Engineering"} • {profile?.institution_name || "National Institute of Technology Karnataka"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <div className="rounded-2xl border border-[#E8E4DD] bg-[#F7F5F0] p-4 px-6 dark:border-[#2E274D] dark:bg-[#12101F] shadow-xs text-center min-w-[140px]">
              <div className="text-xs font-semibold text-[#555366] dark:text-[#9290A0]">Career Readiness</div>
              <div className="text-3xl font-black text-[#7655E8] dark:text-[#EDE8FF] mt-1">
                {profile?.career_readiness_score || 88.5}%
              </div>
            </div>
            <div className="rounded-2xl border border-[#E8E4DD] bg-[#F7F5F0] p-4 px-6 dark:border-[#2E274D] dark:bg-[#12101F] shadow-xs text-center min-w-[140px]">
              <div className="text-xs font-semibold text-[#555366] dark:text-[#9290A0]">Verified Skills</div>
              <div className="text-3xl font-black text-[#17152B] dark:text-[#F7F5F0] mt-1">
                {skills.filter((s) => s.is_verified).length || 4}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacious Navigation Tabs */}
      <div className="flex border-b border-[#E8E4DD] gap-4 overflow-x-auto dark:border-[#2E274D] pb-1">
        {[
          { id: "overview", label: "Overview", icon: BookOpen },
          { id: "passport", label: "Skill Passport", icon: Award },
          { id: "resume", label: "Resume Intelligence", icon: FileText },
          { id: "ai-intel", label: "AI Career Intel", icon: Sparkles },
          { id: "applications", label: "My Applications", icon: Briefcase },
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

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main 2-column: Recommended Opportunities */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#17152B] dark:text-[#F7F5F0]">
                  Top Recommended Opportunities
                </h3>
                <p className="text-xs text-[#555366] dark:text-[#9290A0]">
                  Computed against your verified Skill Passport competencies.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("applications")}
                className="text-xs font-bold text-[#7655E8] hover:underline dark:text-[#EDE8FF]"
              >
                View all ({opportunities.length})
              </button>
            </div>

            <div className="space-y-4">
              {opportunities.slice(0, 3).map((opp) => (
                <Card key={opp.id} className="hover:border-[#7655E8] transition-all hover:shadow-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="uppercase tracking-wider text-[10px]">
                            {opp.opportunity_type}
                          </Badge>
                          <Badge variant="secondary" className="text-[10px]">
                            {opp.work_mode}
                          </Badge>
                        </div>
                        <h4 className="text-lg font-bold text-[#17152B] dark:text-[#F7F5F0]">
                          {opp.title}
                        </h4>
                        <p className="text-xs font-semibold text-[#7655E8] dark:text-[#EDE8FF]">
                          {opp.company_name} • {opp.location}
                        </p>
                        <p className="text-xs text-[#555366] dark:text-[#9290A0] line-clamp-2 leading-relaxed">
                          {opp.description}
                        </p>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <div className="text-base font-black text-[#17152B] dark:text-[#F7F5F0]">
                          {formatCurrency(opp.stipend_max)}/mo
                        </div>
                        <div className="text-xs text-[#555366] dark:text-[#9290A0] mt-0.5">
                          {opp.duration}
                        </div>
                        <Button
                          size="sm"
                          className="mt-4 w-full sm:w-auto"
                          onClick={() => {
                            applicationService.submit({ opportunity_id: opp.id }).then(() => {
                              alert(`Application submitted to ${opp.company_name}!`);
                              queryClient.invalidateQueries({ queryKey: ["myApplications"] });
                            });
                          }}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Upcoming Academic Workshops */}
            <div className="pt-4 space-y-4">
              <h3 className="text-lg font-bold text-[#17152B] dark:text-[#F7F5F0]">
                Upcoming Academic Workshops
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Card className="hover:border-[#7655E8] transition-colors">
                  <CardHeader className="p-5">
                    <div className="flex items-center gap-2 text-xs text-[#7655E8] dark:text-[#EDE8FF] font-bold">
                      <Calendar className="h-4 w-4" /> Nov 14, 2026
                    </div>
                    <CardTitle className="text-sm mt-1">Next.js 16 & Server Actions Deep Dive</CardTitle>
                    <CardDescription className="text-xs">
                      Hosted by IIT Bombay & Industry Partners
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:border-[#7655E8] transition-colors">
                  <CardHeader className="p-5">
                    <div className="flex items-center gap-2 text-xs text-[#7655E8] dark:text-[#EDE8FF] font-bold">
                      <Calendar className="h-4 w-4" /> Nov 22, 2026
                    </div>
                    <CardTitle className="text-sm mt-1">High-Throughput Vector Search & RAG</CardTitle>
                    <CardDescription className="text-xs">
                      Industry workshop with Intel AI Labs
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Snapshot & AI Summary */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Profile Completeness</CardTitle>
                <CardDescription>Increase your visibility to corporate recruiters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="w-full bg-[#EDE8FF] h-3 rounded-full overflow-hidden dark:bg-[#241E3D]">
                  <div
                    className="bg-[#7655E8] h-full rounded-full transition-all duration-500"
                    style={{ width: `${profile?.profile_completion || 88}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-bold text-[#555366] dark:text-[#9290A0]">
                  <span>Status: Excellent</span>
                  <span className="text-[#7655E8] dark:text-[#EDE8FF]">{profile?.profile_completion || 88}%</span>
                </div>
                <ul className="text-xs space-y-2.5 text-[#555366] dark:text-[#9290A0]">
                  <li className="flex items-center gap-2 text-[#329B75] dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="h-4 w-4 shrink-0" /> Academic credentials linked
                  </li>
                  <li className="flex items-center gap-2 text-[#329B75] dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="h-4 w-4 shrink-0" /> 4 Verified Skills
                  </li>
                  <li className="flex items-center gap-2 text-[#329B75] dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="h-4 w-4 shrink-0" /> GitHub repository connected
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-[#7655E8]/30 bg-gradient-to-b from-[#EDE8FF]/40 to-white dark:from-[#241E3D]/50 dark:to-[#1A162B]">
              <CardHeader>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#7655E8] dark:text-[#EDE8FF]">
                  <Sparkles className="h-4 w-4" />
                  AI Match Suggestion
                </div>
                <CardTitle className="text-base">Target: Full-Stack AI Engineer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-[#555366] dark:text-[#9290A0] leading-relaxed">
                  Your Next.js and Python proficiencies match 88.5% of verified corporate requirements.
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full text-xs font-bold"
                  onClick={() => setActiveTab("ai-intel")}
                >
                  View Gap Analysis Roadmap
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: SKILL PASSPORT */}
      {activeTab === "passport" && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-[#17152B] dark:text-[#F7F5F0]">
                Verified Skill Passport
              </h3>
              <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] mt-1">
                Cryptographically verifiable skill badges validated by academic supervisors and benchmark evaluations.
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => setSkillModalOpen(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" /> Add Skill
            </Button>
          </div>

          {/* Modal / Form for Adding Skill */}
          {skillModalOpen && (
            <Card className="border-[#7655E8] bg-[#F7F5F0] dark:bg-[#12101F]">
              <CardHeader>
                <CardTitle className="text-base">Add New Skill to Passport</CardTitle>
                <CardDescription>Enter skill name and self-assessed proficiency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Skill Name</label>
                    <Input
                      placeholder="e.g. Docker, GraphQL, Kubernetes"
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Category</label>
                    <select
                      value={newSkillCategory}
                      onChange={(e) => setNewSkillCategory(e.target.value)}
                      className="w-full h-12 rounded-xl border border-[#E8E4DD] bg-white px-3 text-sm dark:border-[#2E274D] dark:bg-[#1A162B] dark:text-[#F7F5F0]"
                    >
                      <option value="Frontend Architecture">Frontend Architecture</option>
                      <option value="Backend Systems">Backend Systems</option>
                      <option value="Database & Cloud">Database & Cloud</option>
                      <option value="AI & Machine Learning">AI & Machine Learning</option>
                      <option value="Soft Skills">Soft Skills</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Proficiency (1-5)</label>
                    <select
                      value={newSkillLevel}
                      onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                      className="w-full h-12 rounded-xl border border-[#E8E4DD] bg-white px-3 text-sm dark:border-[#2E274D] dark:bg-[#1A162B] dark:text-[#F7F5F0]"
                    >
                      <option value={1}>1 - Beginner</option>
                      <option value={2}>2 - Elementary</option>
                      <option value={3}>3 - Intermediate</option>
                      <option value={4}>4 - Advanced</option>
                      <option value={5}>5 - Expert</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSkillModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    disabled={!newSkillName.trim()}
                    onClick={() =>
                      addSkillMutation.mutate({
                        skill_name: newSkillName,
                        category: newSkillCategory,
                        proficiency_level: newSkillLevel,
                      })
                    }
                  >
                    Save to Passport
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Skill Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <Card key={skill.id} className="relative overflow-hidden hover:border-[#7655E8] transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant={skill.is_verified ? "verified" : "secondary"}>
                        {skill.category}
                      </Badge>
                      <h4 className="text-lg font-bold text-[#17152B] dark:text-[#F7F5F0] mt-2.5">
                        {skill.name}
                      </h4>
                    </div>
                    {skill.is_verified && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-[#329B75] dark:bg-emerald-950 dark:text-emerald-400">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-[#555366] dark:text-[#9290A0]">
                      <span>Proficiency Level</span>
                      <span className="font-bold text-[#7655E8] dark:text-[#EDE8FF]">
                        Level {skill.proficiency_level} / 5
                      </span>
                    </div>
                    <div className="w-full bg-[#EDE8FF] h-2.5 rounded-full overflow-hidden dark:bg-[#241E3D]">
                      <div
                        className="bg-[#7655E8] h-full rounded-full transition-all duration-300"
                        style={{ width: `${(skill.proficiency_level / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-[#555366] dark:text-[#9290A0] pt-3 border-t border-[#E8E4DD] dark:border-[#2E274D]">
                    Evidence: {skill.source}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RESUME CENTER */}
      {activeTab === "resume" && (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#17152B] dark:text-[#F7F5F0]">
              AI Resume Intelligence Center
            </h3>
            <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] mt-1">
              Upload your latest resume to parse technical competencies, extract missing skills, and run algorithmic ATS benchmarking.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upload Document</CardTitle>
              <CardDescription>Supported formats: PDF, DOCX, TXT (Max 5MB)</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResumeUpload} className="space-y-6">
                <div className="border-2 border-dashed border-[#E8E4DD] rounded-2xl p-10 text-center hover:border-[#7655E8] transition-colors dark:border-[#2E274D] bg-[#F7F5F0]/60 dark:bg-[#12101F]/40">
                  <UploadCloud className="mx-auto h-12 w-12 text-[#7655E8] mb-3" />
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    className="block mx-auto text-xs text-[#555366] dark:text-[#9290A0] file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#EDE8FF] file:text-[#7655E8] hover:file:bg-[#DDD5FF] transition-colors cursor-pointer"
                  />
                  {resumeFile && (
                    <p className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] mt-4">
                      Selected: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                    </p>
                  )}
                </div>

                {resumeError && (
                  <div className="p-4 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2.5 dark:bg-rose-950/40 dark:text-rose-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {resumeError}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!resumeFile || resumeAnalyzing}
                  isLoading={resumeAnalyzing}
                >
                  Analyze with MITRA AI
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Analysis Report */}
          {resumeResult && (
            <Card className="border-[#7655E8]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Resume Analysis Audit</CardTitle>
                  <CardDescription>Generated by MITRA NLP Engine</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-[#7655E8] dark:text-[#EDE8FF]">
                    {resumeResult.score}/100
                  </div>
                  <div className="text-[11px] text-[#555366] dark:text-[#9290A0]">ATS Match Score</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#17152B] dark:text-[#F7F5F0] mb-3">
                    Key Strengths Identified
                  </h5>
                  <ul className="text-xs space-y-2 text-[#329B75] dark:text-emerald-400 font-medium">
                    {resumeResult.strengths?.map((s: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#17152B] dark:text-[#F7F5F0] mb-3">
                    Recommended Improvements
                  </h5>
                  <ul className="text-xs space-y-2 text-amber-800 dark:text-amber-400 font-medium">
                    {resumeResult.improvements?.map((s: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#17152B] dark:text-[#F7F5F0] mb-3">
                    Extracted Core Competencies
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {resumeResult.extracted_skills?.map((sk: string, idx: number) => (
                      <Badge key={idx} variant="secondary">
                        {sk}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* TAB 4: AI CAREER INTELLIGENCE */}
      {activeTab === "ai-intel" && (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-[#17152B] dark:text-[#F7F5F0]">
              AI Career Intelligence & Roadmap
            </h3>
            <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] mt-1">
              Automated skill-gap audit comparing your verified competencies against current industry job descriptions.
            </p>
          </div>

          {aiIntelligence ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge variant="outline" className="text-xs">
                        {aiIntelligence.target_role}
                      </Badge>
                      <CardTitle className="text-xl mt-2.5">Overall Match: {aiIntelligence.overall_match_percentage}%</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                      <h5 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-3">
                        Demonstrated Skills ({aiIntelligence.matched_skills.length})
                      </h5>
                      <ul className="text-xs space-y-2 text-emerald-900 dark:text-emerald-200 font-medium">
                        {aiIntelligence.matched_skills.map((s, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#329B75] shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-rose-200/80 bg-rose-50/50 p-6 dark:border-rose-900/40 dark:bg-rose-950/20">
                      <h5 className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider mb-3">
                        Identified Skill Gaps ({aiIntelligence.missing_skills.length})
                      </h5>
                      <ul className="text-xs space-y-2 text-rose-900 dark:text-rose-200 font-medium">
                        {aiIntelligence.missing_skills.map((s, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-base font-bold text-[#17152B] dark:text-[#F7F5F0] mb-4">
                      Personalized Accelerated Learning Roadmap
                    </h5>
                    <div className="space-y-4">
                      {aiIntelligence.personalized_roadmap?.map((step) => (
                        <div
                          key={step.phase}
                          className="flex items-start gap-4 p-5 rounded-2xl border border-[#E8E4DD] bg-[#F7F5F0] dark:border-[#2E274D] dark:bg-[#12101F]"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#7655E8] text-xs font-bold text-white shadow-xs">
                            {step.phase}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h6 className="text-sm font-bold text-[#17152B] dark:text-[#F7F5F0]">{step.title}</h6>
                              <span className="text-xs font-semibold text-[#555366] dark:text-[#9290A0]">{step.duration}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {step.modules.map((m, mIdx) => (
                                <Badge key={mIdx} variant="secondary">
                                  {m}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Skeleton className="h-64 w-full" />
          )}
        </div>
      )}

      {/* TAB 5: MY APPLICATIONS */}
      {activeTab === "applications" && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#17152B] dark:text-[#F7F5F0]">
                Application Tracking Center
              </h3>
              <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] mt-1">
                Real-time interview pipeline status and direct feedback from corporate recruiters.
              </p>
            </div>
            <Badge variant="outline">{myApplications.length} Submissions</Badge>
          </div>

          <div className="space-y-4">
            {myApplications.map((app) => (
              <Card key={app.id} className="hover:border-[#7655E8] transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <Badge
                          variant={
                            app.status === "shortlisted"
                              ? "success"
                              : app.status === "applied"
                              ? "default"
                              : "secondary"
                          }
                          className="capitalize"
                        >
                          {app.status.replace("_", " ")}
                        </Badge>
                        <span className="text-xs font-bold text-[#329B75]">
                          Match: {app.match_score}%
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-[#17152B] dark:text-[#F7F5F0]">
                        {app.opportunity_title}
                      </h4>
                      <p className="text-xs font-semibold text-[#7655E8] dark:text-[#EDE8FF]">
                        {app.company_name}
                      </p>
                      {app.recruiter_feedback && (
                        <p className="text-xs text-[#17152B] bg-[#EDE8FF]/50 p-3 rounded-xl dark:bg-[#241E3D] dark:text-[#F7F5F0] mt-3">
                          <strong>Recruiter Feedback:</strong> {app.recruiter_feedback}
                        </p>
                      )}
                    </div>

                    <div className="text-xs text-[#555366] dark:text-[#9290A0] sm:text-right shrink-0">
                      <div>Applied on {new Date(app.applied_at).toLocaleDateString()}</div>
                      <div className="mt-2 text-[11px] font-mono text-[#7655E8] dark:text-[#EDE8FF]">
                        Ref: {app.id}
                      </div>
                    </div>
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
