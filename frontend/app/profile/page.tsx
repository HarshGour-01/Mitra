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
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#30232A] dark:text-[#FFF3F7]">
          Account & Academic Profile
        </h1>
        <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] mt-1">
          Manage your verified academic identity and contact links visible to partner institutions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#E879A5] to-[#C94F7C] text-2xl font-bold text-white shadow-md">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <CardTitle className="text-lg">{displayName}</CardTitle>
                <CardDescription>{user?.email || "student@mitra.edu"}</CardDescription>
                <Badge variant="verified" className="mt-1.5 uppercase text-[10px]">
                  Role: {role.replace("_", " ")}
                </Badge>
              </div>
            </div>
            {savedSuccess && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Profile Updated
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold block mb-1">Full Legal Name</label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">Email Address (Read-only)</label>
              <Input
                disabled
                value={user?.email || "student@mitra.edu"}
                className="bg-gray-50 text-gray-500 cursor-not-allowed dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">Academic Department</label>
              <Input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">Primary Career Objective</label>
              <Input
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">GitHub Portfolio Link</label>
              <Input
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">LinkedIn Profile</label>
              <Input
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#F1DCE5] dark:border-[#493440]">
            <Button
              className="gap-2"
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
