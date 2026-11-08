import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata: Metadata = {
  title: "MITRA — Your Future, Your Mitra | Academia–Industry Collaboration",
  description:
    "AI-powered Academia–Industry Collaboration Platform connecting students, universities, recruiters, faculty, and research mentors across India.",
  keywords: ["MITRA", "Academia", "Industry", "Skill Passport", "Internships", "AI Career Matching", "SIH"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#FFF8FA] text-[#30232A] antialiased transition-colors dark:bg-[#171217] dark:text-[#FFF3F7]">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <QueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
