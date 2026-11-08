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
    <div className="space-y-10 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#17152B] dark:text-[#F7F5F0]">
          Platform Preferences & Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#555366] dark:text-[#9290A0] mt-1">
          Customize UI aesthetics, notification alerts, and data connectivity.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sun className="h-5 w-5 text-[#7655E8]" /> Appearance & Theme
            </CardTitle>
            <CardDescription>
              Toggle between MITRA&apos;s signature soft ivory light workspace and midnight dark mode.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#17152B] dark:text-[#F7F5F0]">
              Active Theme Palette
            </span>
            <ThemeToggle />
          </CardContent>
        </Card>

        {/* Notification Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#7655E8]" /> Notifications & Alerts
            </CardTitle>
            <CardDescription>Manage corporate interview calls, verification status, and deadline alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#17152B] dark:text-[#F7F5F0]">
              <span>Corporate recruiter shortlisting updates</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-[#7655E8]" />
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#17152B] dark:text-[#F7F5F0]">
              <span>Skill Passport cryptographic verification notices</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-[#7655E8]" />
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#17152B] dark:text-[#F7F5F0]">
              <span>Upcoming national hackathon & workshop calendar reminders</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-[#7655E8]" />
            </div>
          </CardContent>
        </Card>

        {/* Backend & Connectivity Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#7655E8]" /> Backend Service Telemetry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-[#555366] dark:text-[#9290A0]">
            <div className="flex justify-between items-center py-1 border-b border-[#E8E4DD] dark:border-[#2E274D]">
              <span className="font-medium">API Gateway Target:</span>
              <code className="text-[#7655E8] dark:text-[#EDE8FF] font-bold">FastAPI Production Corridor</code>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[#E8E4DD] dark:border-[#2E274D]">
              <span className="font-medium">Auth Provider:</span>
              <span className="font-semibold text-[#17152B] dark:text-[#F7F5F0]">Supabase Managed Identity (RLS Secured)</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="font-medium">Platform Mode:</span>
              <span className="font-bold text-[#329B75]">LIVE Production Ready</span>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out Card */}
        <Card className="border-rose-200 dark:border-rose-950/60">
          <CardContent className="p-6 sm:p-7 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-rose-600">Terminate Active Session</h4>
              <p className="text-xs text-[#555366] dark:text-[#9290A0] mt-0.5">
                Signs out of the current device and invalidates local authentication tokens.
              </p>
            </div>
            <Button variant="destructive" size="sm" onClick={signOut} className="gap-2 font-bold">
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
