"use client";

import React from "react";
import { Settings, Moon, Sun, Bell, Shield, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";

export default function SettingsPage() {
  const { signOut, user } = useAuth();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#30232A] dark:text-[#FFF3F7]">
          Platform Preferences & Settings
        </h1>
        <p className="text-xs text-[#806D76] dark:text-[#C3ADB8] mt-1">
          Customize UI aesthetics, notification alerts, and data connectivity.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sun className="h-4 w-4 text-[#E879A5]" /> Appearance & Theme
            </CardTitle>
            <CardDescription>
              Toggle between MITRA's signature soft pink light mode and high-contrast dark mode.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#30232A] dark:text-[#FFF3F7]">
              Current Theme Mode
            </span>
            <ThemeToggle />
          </CardContent>
        </Card>

        {/* Notification Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#E879A5]" /> Notifications & Alerts
            </CardTitle>
            <CardDescription>Manage interview calls and academic deadline reminders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span>Recruiter shortlisting updates</span>
              <input type="checkbox" defaultChecked className="rounded accent-[#E879A5]" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Skill Passport verification notices</span>
              <input type="checkbox" defaultChecked className="rounded accent-[#E879A5]" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Upcoming workshop calendar reminders</span>
              <input type="checkbox" defaultChecked className="rounded accent-[#E879A5]" />
            </div>
          </CardContent>
        </Card>

        {/* Backend & Connectivity Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#E879A5]" /> Backend Service Telemetry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-[#806D76] dark:text-[#C3ADB8]">
            <div className="flex justify-between">
              <span>API Gateway Target:</span>
              <code className="text-[#C94F7C] dark:text-[#F09ABB]">http://127.0.0.1:8000</code>
            </div>
            <div className="flex justify-between">
              <span>Auth Provider:</span>
              <span>Supabase Managed Identity (RLS Secured)</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Mode:</span>
              <span className="font-semibold text-emerald-600">LIVE Production Ready</span>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out Card */}
        <Card className="border-red-200 dark:border-red-950">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-red-600">Terminate Active Session</h4>
              <p className="text-xs text-[#806D76] dark:text-[#C3ADB8]">
                Signs out of the current device and invalidates local JWT tokens.
              </p>
            </div>
            <Button variant="destructive" size="sm" onClick={signOut} className="gap-2">
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
