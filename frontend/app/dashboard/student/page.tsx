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

  // TanStack Queries
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
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFF0F5] via-[#FFF8FA] to-white p-6 sm:p-8 border border-[#F1DCE5] shadow-card dark:from-[#211922] dark:via-[#171217] dark:to-[#2B202A] dark:border-[#493440]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F8DCE8] px-3 py-1 text-xs font-semibold text-[#C94F7C] dark:bg-[#493440] dark:text-[#F09ABB] mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Student Innovation Portal
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#30232A] dark:text-[#FFF3F7]">
              Welcome back, {profile?.full_name || "Harsh"}! 👋
            </h2>
            <p className="mt-1 text-sm text-[#806D76] dark:text-[#C3ADB8]">
              {profile?.degree || "B.Tech Computer Science"} • {profile?.institution_name || "MITRA Partner University"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="rounded-2xl border border-[#F1DCE5] bg-white/80 p-3.5 px-5 backdrop-blur-sm dark:border-[#493440] dark:bg-[#2B202A]/80 shadow-sm text-center">
              <div className="text-xs font-medium text-[#806D76] dark:text-[#C3ADB8]">Career Readiness</div>
              <div className="text-2xl font-black text-[#C94F7C] dark:text-[#F09ABB]">
                {profile?.career_readiness_score || 88.5}%
              </div>
            </div>
            <div className="rounded-2xl border border-[#F1DCE5] bg-white/80 p-3.5 px-5 backdrop-blur-sm dark:border-[#493440] dark:bg-[#2B202A]/80 shadow-sm text-center">
              <div className="text-xs font-medium text-[#806D76] dark:text-[#C3ADB8]">Verified Skills</div>
              <div className="text-2xl font-black text-[#E879A5] dark:text-[#F09ABB]">
                {skills.filter((s) => s.is_verified).length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#F1DCE5] gap-2 overflow-x-auto dark:border-[#493440]">
        {[
          { id: "overview", label: "Overview", icon: BookOpen },
          { id: "passport", label: "Skill Passport", icon: Award },
          { id: "resume", label: "Resume Center", icon: FileText },
          { id: "ai-intel", label: "AI Career Intelligence", icon: Sparkles },
          { id: "applications", label: "My Applications", icon: Briefcase },
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

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main 2-column: Recommended Opportunities */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#30232A] dark:text-[#FFF3F7]">
                Top Recommended Opportunities
              </h3>
              <button
                onClick={() => setActiveTab("applications")}
                className="text-xs font-semibold text-[#C94F7C] hover:underline dark:text-[#F09ABB]"
              >
                View all ({opportunities.length})
              </button>
            </div>

            <div className="space-y-4">
              {opportunities.slice(0, 3).map((opp) => (
                <Card key={opp.id} className="hover:border-[#E879A5] transition-all">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="uppercase tracking-wider text-[10px]">
                            {opp.opportunity_type}
                          </Badge>
                          <span className="text-xs text-[#806D76] dark:text-[#C3ADB8]">{opp.work_mode}</span>
                        </div>
                        <h4 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">{opp.title}</h4>
                        <p className="text-xs font-medium text-[#C94F7C] dark:text-[#F09ABB]">
                          {opp.company_name} • {opp.location}
                        </p>
                        <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] line-clamp-2">
                          {opp.description}
                        </p>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <div className="text-xs font-semibold text-[#30232A] dark:text-[#FFF3F7]">
                          {formatCurrency(opp.stipend_max)}/mo
                        </div>
                        <div className="text-[11px] text-[#806D76] dark:text-[#C3ADB8] mt-0.5">
                          {opp.duration}
                        </div>
                        <Button
                          size="sm"
                          className="mt-3 w-full sm:w-auto"
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

            {/* Upcoming Workshops & Hackathons */}
            <div className="pt-4">
              <h3 className="text-lg font-bold text-[#30232A] dark:text-[#FFF3F7] mb-4">
                Upcoming Academic Workshops
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2 text-xs text-[#C94F7C] dark:text-[#F09ABB] font-semibold">
                      <Calendar className="h-4 w-4" /> Nov 14, 2026
                    </div>
                    <CardTitle className="text-sm mt-1">Next.js 16 & Server Actions Deep Dive</CardTitle>
                    <CardDescription className="text-xs">
                      Hosted by IIT Bombay & Vercel Developer Relations
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2 text-xs text-[#C94F7C] dark:text-[#F09ABB] font-semibold">
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

          {/* Right Sidebar: Profile Snapshot & AI Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Profile Completeness</CardTitle>
                <CardDescription>Increase your visibility to recruiters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="w-full bg-[#FFF0F5] h-3 rounded-full overflow-hidden dark:bg-[#211922]">
                  <div
                    className="bg-[#E879A5] h-full rounded-full transition-all duration-500"
                    style={{ width: `${profile?.profile_completion || 85}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-semibold text-[#806D76] dark:text-[#C3ADB8]">
                  <span>Status: Excellent</span>
                  <span>{profile?.profile_completion || 85}%</span>
                </div>
                <ul className="text-xs space-y-2 text-[#806D76] dark:text-[#C3ADB8]">
                  <li className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" /> Academic credentials linked
                  </li>
                  <li className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" /> 4 Verified Skills
                  </li>
                  <li className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" /> GitHub repository connected
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-[#E879A5]/50 bg-gradient-to-b from-[#FFF8FA] to-white dark:from-[#211922] dark:to-[#2B202A]">
              <CardHeader>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C94F7C] dark:text-[#F09ABB]">
                  <Sparkles className="h-4 w-4" />
                  AI Match Suggestion
                </div>
                <CardTitle className="text-sm">Target: Senior Full-Stack AI Engineer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
                  Your frontend and Python scores match 84.5% of high-growth tech positions.
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full text-xs"
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
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#30232A] dark:text-[#FFF3F7]">
                Verified Skill Passport
              </h3>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
                Cryptographically verifiable skill badges validated by academic benchmarks and partner evaluations.
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => setSkillModalOpen(true)}
              className="gap-1.5"
            >
              <Plus className="h-4 w-4" /> Add Skill
            </Button>
          </div>

          {/* Modal / Form for Adding Skill */}
          {skillModalOpen && (
            <Card className="border-[#E879A5] bg-[#FFF8FA] dark:bg-[#211922]">
              <CardHeader>
                <CardTitle className="text-sm">Add New Skill to Passport</CardTitle>
                <CardDescription>Enter skill name and self-assessed proficiency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold block mb-1">Skill Name</label>
                    <Input
                      placeholder="e.g. Docker, GraphQL, Kubernetes"
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold block mb-1">Category</label>
                    <select
                      value={newSkillCategory}
                      onChange={(e) => setNewSkillCategory(e.target.value)}
                      className="w-full h-11 rounded-xl border border-[#F1DCE5] bg-white px-3 text-sm dark:border-[#493440] dark:bg-[#2B202A]"
                    >
                      <option value="Frontend Architecture">Frontend Architecture</option>
                      <option value="Backend Systems">Backend Systems</option>
                      <option value="Database & Cloud">Database & Cloud</option>
                      <option value="AI & Machine Learning">AI & Machine Learning</option>
                      <option value="Soft Skills">Soft Skills</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold block mb-1">Proficiency (1-5)</label>
                    <select
                      value={newSkillLevel}
                      onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                      className="w-full h-11 rounded-xl border border-[#F1DCE5] bg-white px-3 text-sm dark:border-[#493440] dark:bg-[#2B202A]"
                    >
                      <option value={1}>1 - Beginner</option>
                      <option value={2}>2 - Elementary</option>
                      <option value={3}>3 - Intermediate</option>
                      <option value={4}>4 - Advanced</option>
                      <option value={5}>5 - Expert</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((skill) => (
              <Card key={skill.id} className="relative overflow-hidden">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant={skill.is_verified ? "verified" : "secondary"}>
                        {skill.category}
                      </Badge>
                      <h4 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7] mt-2">
                        {skill.name}
                      </h4>
                    </div>
                    {skill.is_verified && (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-[#806D76] dark:text-[#C3ADB8]">
                      <span>Proficiency Level</span>
                      <span className="font-semibold text-[#C94F7C] dark:text-[#F09ABB]">
                        Level {skill.proficiency_level} / 5
                      </span>
                    </div>
                    <div className="w-full bg-[#FFF0F5] h-2 rounded-full overflow-hidden dark:bg-[#211922]">
                      <div
                        className="bg-[#E879A5] h-full rounded-full"
                        style={{ width: `${(skill.proficiency_level / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-[#806D76] dark:text-[#C3ADB8] pt-2 border-t border-[#F1DCE5] dark:border-[#493440]">
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
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-[#30232A] dark:text-[#FFF3F7]">
              AI Resume Intelligence Center
            </h3>
            <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
              Upload your latest resume to parse technical competencies, extract missing skills, and run algorithmic ATS benchmarking.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upload Document</CardTitle>
              <CardDescription>Supported formats: PDF, DOCX, TXT (Max 5MB)</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResumeUpload} className="space-y-4">
                <div className="border-2 border-dashed border-[#F1DCE5] rounded-2xl p-8 text-center hover:border-[#E879A5] transition-colors dark:border-[#493440]">
                  <UploadCloud className="mx-auto h-10 w-10 text-[#E879A5] mb-2" />
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    className="block mx-auto text-xs text-[#806D76] dark:text-[#C3ADB8] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#FFF0F5] file:text-[#C94F7C] hover:file:bg-[#F8DCE8]"
                  />
                  {resumeFile && (
                    <p className="text-xs font-semibold text-[#30232A] dark:text-[#FFF3F7] mt-3">
                      Selected: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                    </p>
                  )}
                </div>

                {resumeError && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-2 dark:bg-red-950/30 dark:text-red-400">
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
            <Card className="border-[#E879A5]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Resume Analysis Audit</CardTitle>
                  <CardDescription>Generated by MITRA NLP Engine</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#C94F7C] dark:text-[#F09ABB]">
                    {resumeResult.score}/100
                  </div>
                  <div className="text-[10px] text-[#806D76] dark:text-[#C3ADB8]">ATS Match Score</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#30232A] dark:text-[#FFF3F7] mb-2">
                    Key Strengths Identified
                  </h5>
                  <ul className="text-xs space-y-1.5 text-emerald-700 dark:text-emerald-400">
                    {resumeResult.strengths?.map((s: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#30232A] dark:text-[#FFF3F7] mb-2">
                    Recommended Improvements
                  </h5>
                  <ul className="text-xs space-y-1.5 text-amber-700 dark:text-amber-400">
                    {resumeResult.improvements?.map((s: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#30232A] dark:text-[#FFF3F7] mb-2">
                    Extracted Core Competencies
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
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
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-[#30232A] dark:text-[#FFF3F7]">
              AI Career Intelligence & Roadmap
            </h3>
            <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
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
                      <CardTitle className="text-lg mt-2">Overall Match: {aiIntelligence.overall_match_percentage}%</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                      <h5 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-2">
                        Demonstrated Skills ({aiIntelligence.matched_skills.length})
                      </h5>
                      <ul className="text-xs space-y-1.5 text-emerald-900 dark:text-emerald-200">
                        {aiIntelligence.matched_skills.map((s, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-4 dark:border-rose-900/40 dark:bg-rose-950/20">
                      <h5 className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider mb-2">
                        Identified Skill Gaps ({aiIntelligence.missing_skills.length})
                      </h5>
                      <ul className="text-xs space-y-1.5 text-rose-900 dark:text-rose-200">
                        {aiIntelligence.missing_skills.map((s, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <AlertCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-bold text-[#30232A] dark:text-[#FFF3F7] mb-3">
                      Personalized Accelerated Learning Roadmap
                    </h5>
                    <div className="space-y-3">
                      {aiIntelligence.personalized_roadmap?.map((step) => (
                        <div
                          key={step.phase}
                          className="flex items-start gap-4 p-4 rounded-2xl border border-[#F1DCE5] bg-[#FFF8FA] dark:border-[#493440] dark:bg-[#211922]"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#E879A5] text-xs font-bold text-white">
                            {step.phase}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h6 className="text-sm font-bold text-[#30232A] dark:text-[#FFF3F7]">{step.title}</h6>
                              <span className="text-xs text-[#806D76] dark:text-[#C3ADB8]">{step.duration}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-2">
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
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#30232A] dark:text-[#FFF3F7]">
                Application Tracking Center
              </h3>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
                Real-time interview pipeline status and feedback from recruiters.
              </p>
            </div>
            <Badge variant="outline">{myApplications.length} Submissions</Badge>
          </div>

          <div className="space-y-4">
            {myApplications.map((app) => (
              <Card key={app.id}>
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
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
                        <span className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
                          Match: {app.match_score}%
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#30232A] dark:text-[#FFF3F7]">
                        {app.opportunity_title}
                      </h4>
                      <p className="text-xs font-medium text-[#C94F7C] dark:text-[#F09ABB]">
                        {app.company_name}
                      </p>
                      {app.recruiter_feedback && (
                        <p className="text-xs text-[#30232A] bg-[#FFF0F5] p-2.5 rounded-xl dark:bg-[#211922] dark:text-[#FFF3F7] mt-2">
                          <strong>Feedback:</strong> {app.recruiter_feedback}
                        </p>
                      )}
                    </div>

                    <div className="text-xs text-[#806D76] dark:text-[#C3ADB8] sm:text-right shrink-0">
                      <div>Applied on {new Date(app.applied_at).toLocaleDateString()}</div>
                      <div className="mt-2 text-[11px] text-[#C94F7C] dark:text-[#F09ABB]">
                        Application ID: {app.id}
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
