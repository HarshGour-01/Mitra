import { apiClient } from "@/lib/api/client";
import { RecruiterProfileResponse, StudentProfileResponse } from "@/types/api";

export interface CandidateSearchParams {
  skill?: string;
  graduation_year?: number;
  min_readiness?: number;
}

export const recruiterService = {
  async getProfile(): Promise<RecruiterProfileResponse> {
    return apiClient<RecruiterProfileResponse>("/api/v1/recruiters/profile");
  },

  async searchCandidates(params?: CandidateSearchParams): Promise<StudentProfileResponse[]> {
    return apiClient<StudentProfileResponse[]>("/api/v1/recruiters/candidates", {
      params: params as Record<string, string | number | boolean | undefined>,
    });
  },
};
