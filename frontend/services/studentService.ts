import { apiClient } from "@/lib/api/client";
import {
  StudentProfileResponse,
  StudentProfileUpdate,
  StudentSkillItem,
  StudentSkillAdd,
  ResumeAnalysisResponse,
  MessageResponse,
} from "@/types/api";

export const studentService = {
  async getProfile(): Promise<StudentProfileResponse> {
    return apiClient<StudentProfileResponse>("/api/v1/students/profile");
  },

  async updateProfile(data: StudentProfileUpdate): Promise<MessageResponse> {
    return apiClient<MessageResponse>("/api/v1/students/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async getSkills(): Promise<StudentSkillItem[]> {
    return apiClient<StudentSkillItem[]>("/api/v1/students/skills");
  },

  async addSkill(data: StudentSkillAdd): Promise<MessageResponse> {
    return apiClient<MessageResponse>("/api/v1/students/skills", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async analyzeResume(formData: FormData): Promise<ResumeAnalysisResponse> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
    const res = await fetch(`${API_BASE_URL}/api/v1/students/resume/analyze`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      throw new Error("Resume analysis failed on server");
    }
    return res.json();
  },
};
