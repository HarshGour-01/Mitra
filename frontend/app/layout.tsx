import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { DemoProvider } from "@/lib/demo/DemoProvider";
import { DemoBanner } from "@/components/layout/DemoBanner";

export const metadata: Metadata = {
  title: "MITRA — Where Academia Meets Industry | Enterprise Collaboration Platform",
  description:
    "AI-orchestrated Academia–Industry Collaboration Platform connecting ambitious students, accredited universities, leading recruiters, and research mentors across India.",
  keywords: ["MITRA", "Academia", "Industry", "Skill Passport", "Internships", "AI Career Matching", "SIH"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#F7F5F0] text-[#17152B] antialiased transition-colors dark:bg-[#12101F] dark:text-[#F7F5F0] selection:bg-[#EDE8FF] selection:text-[#29234B]">
        <DemoProvider>
          <DemoBanner />
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <QueryProvider>
              <AuthProvider>{children}</AuthProvider>
            </QueryProvider>
          </ThemeProvider>
        </DemoProvider>
      </body>
    </html>
  );
}
