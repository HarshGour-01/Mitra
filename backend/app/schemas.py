from datetime import date, datetime
from typing import Literal, Optional, Any
from pydantic import BaseModel, Field, EmailStr

UserRole = Literal[
    "student",
    "recruiter",
    "institution_admin",
    "faculty",
    "mentor",
    "researcher",
    "admin"
]

# Auth & User Profile
class UserProfileBase(BaseModel):
    email: EmailStr
    full_name: str
    role: UserRole
    avatar_url: Optional[str] = None
    phone_number: Optional[str] = None

class UserProfileResponse(UserProfileBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

class RoleProfileUpdate(BaseModel):
    display_name: Optional[str] = None
    phone_number: Optional[str] = None
    avatar_url: Optional[str] = None

# Student Profile
class StudentProfileCreate(BaseModel):
    institution_id: Optional[str] = None
    department: str
    degree: str
    graduation_year: int
    current_year: int = Field(ge=1, le=5)
    career_goal: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None

class StudentProfileUpdate(BaseModel):
    department: Optional[str] = None
    degree: Optional[str] = None
    graduation_year: Optional[int] = None
    current_year: Optional[int] = None
    career_goal: Optional[str] = None
    resume_url: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None

class StudentProfileResponse(BaseModel):
    id: str
    user_id: str
    full_name: str
    email: str
    institution_id: Optional[str] = None
    institution_name: Optional[str] = "MITRA Partner University"
    department: Optional[str] = None
    degree: Optional[str] = None
    graduation_year: Optional[int] = None
    current_year: Optional[int] = 1
    career_goal: Optional[str] = None
    resume_url: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    profile_completion: int = 75
    career_readiness_score: float = 82.5
    created_at: datetime
    updated_at: datetime

# Recruiter Profile
class RecruiterProfileCreate(BaseModel):
    company_name: str
    company_description: Optional[str] = None
    company_website: Optional[str] = None
    company_logo: Optional[str] = None
    industry: str
    company_size: Optional[str] = None
    location: Optional[str] = None

class RecruiterProfileResponse(BaseModel):
    id: str
    user_id: str
    company_name: str
    company_description: Optional[str] = None
    company_website: Optional[str] = None
    company_logo: Optional[str] = None
    industry: Optional[str] = None
    company_size: Optional[str] = None
    location: Optional[str] = None
    verification_status: str = "verified"
    created_at: datetime

# Institution Profile
class InstitutionProfileCreate(BaseModel):
    institution_name: str
    institution_type: Optional[str] = "University"
    website: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None

class InstitutionProfileResponse(BaseModel):
    id: str
    user_id: str
    institution_name: str
    institution_type: Optional[str] = None
    website: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    verification_status: str = "verified"
    student_count: int = 1420
    faculty_count: int = 94
    created_at: datetime

# Skills
class SkillItem(BaseModel):
    id: str
    name: str
    category: Optional[str] = "Technical"
    description: Optional[str] = None

class StudentSkillItem(BaseModel):
    id: str
    skill_id: str
    name: str
    category: str
    proficiency_level: int = Field(ge=1, le=5)
    source: str = "Self-reported"
    is_verified: bool = False
    verified_by: Optional[str] = None

class StudentSkillAdd(BaseModel):
    skill_name: str
    category: str = "Technical"
    proficiency_level: int = Field(default=3, ge=1, le=5)

# Opportunities
OpportunityType = Literal["internship", "job", "project", "research", "workshop"]
WorkMode = Literal["remote", "hybrid", "on_site"]

class OpportunityCreate(BaseModel):
    title: str = Field(min_length=3, max_length=200)
    description: str
    responsibilities: Optional[str] = None
    opportunity_type: OpportunityType = "internship"
    location: Optional[str] = "Bangalore, India"
    work_mode: WorkMode = "hybrid"
    duration: Optional[str] = "6 Months"
    stipend_min: Optional[float] = 15000
    stipend_max: Optional[float] = 25000
    eligibility: Optional[str] = "B.Tech/B.E in CS/IT/ECE with 60% aggregate"
    application_deadline: Optional[date] = None
    required_skills: list[str] = Field(default_factory=list)

class OpportunityResponse(BaseModel):
    id: str
    recruiter_id: str
    company_name: str
    company_logo: Optional[str] = None
    title: str
    description: Optional[str] = None
    responsibilities: Optional[str] = None
    opportunity_type: str
    location: Optional[str] = None
    work_mode: Optional[str] = None
    duration: Optional[str] = None
    stipend_min: Optional[float] = None
    stipend_max: Optional[float] = None
    eligibility: Optional[str] = None
    application_deadline: Optional[date] = None
    required_skills: list[str] = []
    status: str = "open"
    applicant_count: int = 0
    created_at: datetime
    updated_at: datetime

# Applications
ApplicationStatus = Literal["applied", "shortlisted", "interview_scheduled", "accepted", "rejected"]

class ApplicationCreate(BaseModel):
    opportunity_id: str
    resume_url: Optional[str] = None
    cover_letter: Optional[str] = None

class ApplicationStatusUpdate(BaseModel):
    status: ApplicationStatus
    recruiter_feedback: Optional[str] = None

class ApplicationResponse(BaseModel):
    id: str
    opportunity_id: str
    opportunity_title: str
    company_name: str
    student_id: str
    student_name: str
    student_email: str
    resume_url: Optional[str] = None
    cover_letter: Optional[str] = None
    match_score: Optional[float] = None
    match_explanation: Optional[dict[str, Any]] = None
    status: str
    recruiter_feedback: Optional[str] = None
    applied_at: datetime
    updated_at: datetime

# AI Career Intelligence
class SkillGapAnalysis(BaseModel):
    target_role: str
    overall_match_percentage: float
    matched_skills: list[str]
    missing_skills: list[str]
    critical_recommendations: list[str]
    personalized_roadmap: list[dict[str, Any]]

class ResumeAnalysisResponse(BaseModel):
    score: int
    strengths: list[str]
    improvements: list[str]
    extracted_skills: list[str]
    detected_gaps: list[str]
    processing_status: str = "completed"

# Generic Success
class MessageResponse(BaseModel):
    success: bool = True
    message: str
    data: Optional[Any] = None
