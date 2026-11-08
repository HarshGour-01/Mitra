"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { UserRole, UserProfileResponse } from "@/types/api";
import { authService } from "@/services/authService";

interface AuthContextType {
  user: UserProfileResponse | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithDemoRole: (role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfileResponse | null>(null);
  const [role, setRole] = useState<UserRole>("student");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check initial local storage or supabase session
    const initAuth = async () => {
      try {
        const localDemo = localStorage.getItem("mitra_demo_user");
        if (localDemo) {
          const parsed = JSON.parse(localDemo);
          setUser(parsed);
          setRole(parsed.role);
          setIsLoading(false);
          return;
        }

        const { data } = await supabase.auth.getSession();
        if (data.session) {
          try {
            const profile = await authService.getMyProfile();
            setUser(profile);
            setRole(profile.role);
          } catch {
            // Backend offline fallback with Supabase session metadata
            const meta = data.session.user.user_metadata || {};
            const fallbackProfile: UserProfileResponse = {
              id: data.session.user.id,
              email: data.session.user.email || "user@mitra.edu",
              full_name: meta.full_name || meta.display_name || "Academic Member",
              role: (meta.role as UserRole) || "student",
              created_at: data.session.user.created_at,
            };
            setUser(fallbackProfile);
            setRole(fallbackProfile.role);
          }
        }
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        try {
          const profile = await authService.getMyProfile();
          setUser(profile);
          setRole(profile.role);
        } catch {
          const meta = session.user.user_metadata || {};
          setUser({
            id: session.user.id,
            email: session.user.email || "user@mitra.edu",
            full_name: meta.full_name || "Member",
            role: (meta.role as UserRole) || "student",
            created_at: session.user.created_at,
          });
        }
      } else {
        const localDemo = localStorage.getItem("mitra_demo_user");
        if (!localDemo) {
          setUser(null);
          setRole("student");
        }
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithDemoRole = async (demoRole: UserRole) => {
    setIsLoading(true);
    const demoProfile: UserProfileResponse = {
      id: `demo-${demoRole}-001`,
      email: `${demoRole}@mitra.edu`,
      full_name:
        demoRole === "student"
          ? "Harsh Gour (Student)"
          : demoRole === "recruiter"
          ? "Dr. Rajesh Sharma (Lead Recruiter)"
          : demoRole === "institution_admin"
          ? "Prof. Sunita Rao (Director)"
          : demoRole === "faculty"
          ? "Dr. Arvind Menon (Associate Professor)"
          : demoRole === "mentor"
          ? "Vikram Aditya (Principal Architect & Mentor)"
          : demoRole === "researcher"
          ? "Dr. Ananya Sen (Senior Research Scientist)"
          : "System Administrator",
      role: demoRole,
      created_at: new Date().toISOString(),
    };

    localStorage.setItem("mitra_demo_user", JSON.stringify(demoProfile));
    setUser(demoProfile);
    setRole(demoRole);
    setIsLoading(false);
  };

  const signOut = async () => {
    localStorage.removeItem("mitra_demo_user");
    await supabase.auth.signOut();
    setUser(null);
    setRole("student");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        isLoading,
        signInWithDemoRole,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
