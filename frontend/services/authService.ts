import { apiClient } from "@/lib/api/client";
import { supabase } from "@/lib/supabase/client";
import { UserProfileResponse, RoleProfileUpdate, MessageResponse } from "@/types/api";

export const authService = {
  async getMyProfile(): Promise<UserProfileResponse> {
    return apiClient<UserProfileResponse>("/api/v1/auth/me");
  },

  async updateProfile(data: RoleProfileUpdate): Promise<MessageResponse> {
    return apiClient<MessageResponse>("/api/v1/auth/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  },
};
