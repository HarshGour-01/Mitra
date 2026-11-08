"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, Mail, GraduationCap, Github, Linkedin, Save, CheckCircle2, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/hooks/useAuth";
import { studentService } from "@/services/studentService";
import { authService } from "@/services/authService";

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const { user, role } = useAuth();

  const [displayName, setDisplayName] = useState(user?.full_name || "Harsh Gour");
  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [careerGoal, setCareerGoal] = useState("Full-Stack AI Software Architect");
  const [githubUrl, setGithubUrl] = useState("https://github.com/harsh-dev");
  const [linkedinUrl, setLinkedinUrl] = useState("https://linkedin.com/in/harsh");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const saveProfileMutation = useMutation({
    mutationFn: async () => {
      await authService.updateProfile({ display_name: displayName });
      if (role === "student") {
        await studentService.updateProfile({
          department,
          career_goal: careerGoal,
          github_url: githubUrl,
          linkedin_url: linkedinUrl,
        });
      }
    },
    onSuccess: () => {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      queryClient.invalidateQueries({ queryKey: ["studentProfile"] });
    },
  });

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
          Account & Academic Profile
        </h1>
        <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] mt-1">
          Manage your verified academic identity, degree information, and public portfolios.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7655E8] to-[#29234B] text-2xl font-bold text-white shadow-md shadow-[#7655E8]/20">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-1">
                <CardTitle className="text-xl">{displayName}</CardTitle>
                <CardDescription>{user?.email || "student@mitra.edu"}</CardDescription>
                <Badge variant="verified" className="uppercase text-[10px] font-bold">
                  Role: {role.replace("_", " ")}
                </Badge>
              </div>
            </div>
            {savedSuccess && (
              <span className="text-xs text-[#329B75] font-bold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="h-4 w-4" /> Profile Updated
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-8 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Full Legal Name</label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Email Address (Read-only)</label>
              <Input
                disabled
                value={user?.email || "student@mitra.edu"}
                className="bg-[#F7F5F0] text-[#9290A0] cursor-not-allowed dark:bg-[#12101F]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Academic Department</label>
              <Input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">Primary Career Objective</label>
              <Input
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">GitHub Portfolio Link</label>
              <Input
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0] block mb-1.5">LinkedIn Profile</label>
              <Input
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#E8E4DD] dark:border-[#2E274D]">
            <Button
              className="gap-2 font-bold shadow-hover"
              onClick={() => saveProfileMutation.mutate()}
              isLoading={saveProfileMutation.isPending}
            >
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
