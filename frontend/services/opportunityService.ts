import { apiClient } from "@/lib/api/client";
import { OpportunityResponse, OpportunityCreate, OpportunityType, WorkMode } from "@/types/api";

export interface OpportunityFilterParams {
  type?: OpportunityType;
  work_mode?: WorkMode;
  search?: string;
}

export const opportunityService = {
  async list(filters?: OpportunityFilterParams): Promise<OpportunityResponse[]> {
    return apiClient<OpportunityResponse[]>("/api/v1/opportunities", {
      params: filters as Record<string, string | number | boolean | undefined>,
    });
  },

  async getById(id: string): Promise<OpportunityResponse> {
    return apiClient<OpportunityResponse>(`/api/v1/opportunities/${id}`);
  },

  async create(data: OpportunityCreate): Promise<OpportunityResponse> {
    return apiClient<OpportunityResponse>("/api/v1/opportunities", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
