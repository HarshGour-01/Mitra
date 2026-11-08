export type UserRole =
  | "student"
  | "recruiter"
  | "institution_admin"
  | "faculty"
  | "mentor"
  | "researcher"
  | "admin";

export interface UserProfileResponse {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string | null;
  phone_number?: string | null;
  created_at: string;
  updated_at?: string | null;
}

export interface StudentProfileResponse {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  institution_id?: string | null;
  institution_name?: string | null;
  department?: string | null;
  degree?: string | null;
  graduation_year?: number | null;
  current_year?: number | null;
  career_goal?: string | null;
  resume_url?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  profile_completion: number;
  career_readiness_score: number;
  created_at: string;
  updated_at: string;
}

export interface StudentProfileUpdate {
  department?: string;
  degree?: string;
  graduation_year?: number;
  current_year?: number;
  career_goal?: string;
  resume_url?: string;
  github_url?: string;
  linkedin_url?: string;
}

export interface StudentSkillItem {
  id: string;
  skill_id: string;
  name: string;
  category: string;
  proficiency_level: number;
  source: string;
  is_verified: boolean;
  verified_by?: string | null;
}

export interface StudentSkillAdd {
  skill_name: string;
  category?: string;
  proficiency_level?: number;
}

export interface ResumeAnalysisResponse {
  score: number;
  strengths: string[];
  improvements: string[];
  extracted_skills: string[];
  detected_gaps: string[];
  processing_status: string;
}

export type OpportunityType = "internship" | "job" | "project" | "research" | "workshop";
export type WorkMode = "remote" | "hybrid" | "on_site";

export interface OpportunityResponse {
  id: string;
  recruiter_id: string;
  company_name: string;
  company_logo?: string | null;
  title: string;
  description?: string | null;
  responsibilities?: string | null;
  opportunity_type: OpportunityType;
  location?: string | null;
  work_mode?: WorkMode | null;
  duration?: string | null;
  stipend_min?: number | null;
  stipend_max?: number | null;
  eligibility?: string | null;
  application_deadline?: string | null;
  required_skills: string[];
  status: string;
  applicant_count: number;
  created_at: string;
  updated_at: string;
}

export interface OpportunityCreate {
  title: string;
  description: string;
  responsibilities?: string;
  opportunity_type?: OpportunityType;
  location?: string;
  work_mode?: WorkMode;
  duration?: string;
  stipend_min?: number;
  stipend_max?: number;
  eligibility?: string;
  application_deadline?: string;
  required_skills?: string[];
}

export type ApplicationStatus = "applied" | "shortlisted" | "interview_scheduled" | "accepted" | "rejected";

export interface ApplicationResponse {
  id: string;
  opportunity_id: string;
  opportunity_title: string;
  company_name: string;
  student_id: string;
  student_name: string;
  student_email: string;
  resume_url?: string | null;
  cover_letter?: string | null;
  match_score?: number | null;
  match_explanation?: {
    matched_skills?: string[];
    missing_skills?: string[];
    summary?: string;
  } | null;
  status: ApplicationStatus;
  recruiter_feedback?: string | null;
  applied_at: string;
  updated_at: string;
}

export interface ApplicationCreate {
  opportunity_id: string;
  resume_url?: string;
  cover_letter?: string;
}

export interface ApplicationStatusUpdate {
  status: ApplicationStatus;
  recruiter_feedback?: string;
}

export interface RecruiterProfileResponse {
  id: string;
  user_id: string;
  company_name: string;
  company_description?: string | null;
  company_website?: string | null;
  company_logo?: string | null;
  industry?: string | null;
  company_size?: string | null;
  location?: string | null;
  verification_status: string;
  created_at: string;
}

export interface InstitutionProfileResponse {
  id: string;
  user_id: string;
  institution_name: string;
  institution_type?: string | null;
  website?: string | null;
  location?: string | null;
  description?: string | null;
  verification_status: string;
  student_count: number;
  faculty_count: number;
  created_at: string;
}

export interface SkillGapAnalysis {
  target_role: string;
  overall_match_percentage: number;
  matched_skills: string[];
  missing_skills: string[];
  critical_recommendations: string[];
  personalized_roadmap: Array<{
    phase: number;
    title: string;
    duration: string;
    modules: string[];
    status: "completed" | "in_progress" | "upcoming";
  }>;
}

export interface MessageResponse {
  success: boolean;
  message: string;
  data?: any;
}
