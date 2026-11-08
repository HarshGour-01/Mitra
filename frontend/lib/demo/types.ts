// Types for demo data and store
import {
  DemoStudent,
  DemoRecruiter,
  DemoInstitution,
  DemoOpportunity,
  DemoApplication,
  DemoResearchProject,
  DemoIndustryProblemStatement,
  DemoNotification,
  DemoMentor,
  DemoResearcher,
} from '@/lib/demoData';

// Personas that can be switched in demo mode
export type Persona =
  | 'student'
  | 'recruiter'
  | 'mentor'
  | 'researcher'
  | 'institution'
  | 'admin';

// Additional demo entity interfaces (extend as needed)
export interface DemoChallenge {
  id: string;
  title: string;
  sponsor: string;
  domain: string;
  description: string;
  reward: string;
  deadline: string;
  status: 'Open' | 'Closed' | 'In Review';
}

export interface DemoMentorshipRequest {
  id: string;
  requesterId: string; // student id
  mentorId: string; // recruiter/mentor id
  topic: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

export interface DemoActivity {
  id: string;
  timestamp: string;
  actorId: string;
  description: string;
}

// The shape of the in‑memory demo store. All entity maps are top‑level for easy access in hooks.
export interface DemoStore {
  version: number;
  students: Record<string, DemoStudent>;
  recruiters: Record<string, DemoRecruiter>;
  institutions: Record<string, DemoInstitution>;
  opportunities: Record<string, DemoOpportunity>;
  applications: Record<string, DemoApplication>;
  mentors: Record<string, DemoMentor>;
  researchers: Record<string, DemoResearcher>;
  researchProjects: Record<string, DemoResearchProject>;
  problemStatements: Record<string, DemoIndustryProblemStatement>;
  notifications: Record<string, DemoNotification>;
  challenges: Record<string, DemoChallenge>;
  mentorshipRequests: Record<string, DemoMentorshipRequest>;
  activityLog: Record<string, DemoActivity>;
}
