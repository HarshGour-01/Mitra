import { apiClient } from "@/lib/api/client";
import {
  ApplicationResponse,
  ApplicationCreate,
  ApplicationStatusUpdate,
  MessageResponse,
} from "@/types/api";

export const applicationService = {
  async getMyApplications(): Promise<ApplicationResponse[]> {
    return apiClient<ApplicationResponse[]>("/api/v1/applications/my");
  },

  async submit(data: ApplicationCreate): Promise<ApplicationResponse> {
    return apiClient<ApplicationResponse>("/api/v1/applications", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getOpportunityApplications(opportunityId: string): Promise<ApplicationResponse[]> {
    return apiClient<ApplicationResponse[]>(`/api/v1/applications/opportunity/${opportunityId}`);
  },

  async updateStatus(applicationId: string, data: ApplicationStatusUpdate): Promise<MessageResponse> {
    return apiClient<MessageResponse>(`/api/v1/applications/${applicationId}/status`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};
