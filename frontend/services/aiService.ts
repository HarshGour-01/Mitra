import { apiClient } from "@/lib/api/client";
import { SkillGapAnalysis } from "@/types/api";

export const aiService = {
  async getSkillGapAnalysis(targetRole: string = "Senior Full-Stack AI Engineer"): Promise<SkillGapAnalysis> {
    return apiClient<SkillGapAnalysis>("/api/v1/ai/skill-gap-analysis", {
      params: { target_role: targetRole },
    });
  },
};
