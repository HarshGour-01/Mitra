import enum
import uuid
from datetime import datetime, timezone, date
from typing import Optional, List, Dict, Any
import sqlalchemy
from sqlalchemy import (
    Boolean, DateTime, Date, Enum, ForeignKey, Index, Integer, Float,
    String, Text, UniqueConstraint, JSON
)
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

UUIDType = PGUUID(as_uuid=True).with_variant(sqlalchemy.Uuid(as_uuid=True), 'sqlite')

def now_utc():
    return datetime.now(timezone.utc)

class UserRoleName(str, enum.Enum):
    STUDENT = "student"
    INSTITUTION_ADMIN = "institution_admin"
    FACULTY = "faculty"
    RECRUITER = "recruiter"
    COMPANY_ADMIN = "company_admin"
    MENTOR = "mentor"
    RESEARCHER = "researcher"
    PLATFORM_ADMIN = "admin"

class OpportunityStatus(str, enum.Enum):
    DRAFT = "draft"
    OPEN = "open"
    PUBLISHED = "published"
    PAUSED = "paused"
    CLOSED = "closed"
    ARCHIVED = "archived"

class ApplicationStatus(str, enum.Enum):
    APPLIED = "applied"
    UNDER_REVIEW = "under_review"
    SHORTLISTED = "shortlisted"
    INTERVIEW_SCHEDULED = "interview_scheduled"
    ACCEPTED = "accepted"
    SELECTED = "selected"
    REJECTED = "rejected"
    WITHDRAWN = "withdrawn"

class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc, onupdate=now_utc, nullable=False)

# ----------------- USERS & ROLES -----------------
class User(TimestampMixin, Base):
    __tablename__ = "users"
    id: Mapped[uuid.UUID] = mapped_column(UUIDType, primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True, nullable=False)
    display_name: Mapped[Optional[str]] = mapped_column(String(160), nullable=True)
    avatar_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    phone_number: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    roles: Mapped[List["UserRole"]] = relationship("UserRole", back_populates="user", cascade="all, delete-orphan")
    student_profile: Mapped[Optional["StudentProfile"]] = relationship("StudentProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")

class UserRole(Base):
    __tablename__ = "user_roles"
    __table_args__ = (UniqueConstraint("user_id", "role", name="uq_user_role"),)
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    role: Mapped[str] = mapped_column(String(40), index=True, nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="roles")

# ----------------- INSTITUTIONS & DEPARTMENTS -----------------
class Institution(TimestampMixin, Base):
    __tablename__ = "institutions"
    id: Mapped[uuid.UUID] = mapped_column(UUIDType, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(240), nullable=False, index=True)
    institution_type: Mapped[str] = mapped_column(String(80), default="University", nullable=False)
    website: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String(160), nullable=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    verified: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    student_count: Mapped[int] = mapped_column(Integer, default=1420, nullable=False)
    faculty_count: Mapped[int] = mapped_column(Integer, default=94, nullable=False)

    departments: Mapped[List["Department"]] = relationship("Department", back_populates="institution", cascade="all, delete-orphan")

class Department(Base):
    __tablename__ = "departments"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    institution_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("institutions.id", ondelete="CASCADE"), index=True)
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    student_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    placement_rate: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    avg_stipend: Mapped[str] = mapped_column(String(80), default="₹25,000/mo", nullable=False)

    institution: Mapped["Institution"] = relationship("Institution", back_populates="departments")

# ----------------- COMPANIES & RECRUITERS -----------------
class Company(TimestampMixin, Base):
    __tablename__ = "companies"
    id: Mapped[uuid.UUID] = mapped_column(UUIDType, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(240), nullable=False, index=True)
    industry: Mapped[Optional[str]] = mapped_column(String(120), nullable=True)
    website: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    logo_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String(160), nullable=True)
    company_size: Mapped[Optional[str]] = mapped_column(String(60), nullable=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    verified: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    members: Mapped[List["CompanyUser"]] = relationship("CompanyUser", back_populates="company", cascade="all, delete-orphan")
    opportunities: Mapped[List["Opportunity"]] = relationship("Opportunity", back_populates="company", cascade="all, delete-orphan")

class CompanyUser(Base):
    __tablename__ = "company_users"
    __table_args__ = (UniqueConstraint("company_id", "user_id", name="uq_company_user"),)
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    company_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("companies.id", ondelete="CASCADE"), index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    membership_role: Mapped[str] = mapped_column(String(40), default="RECRUITER", nullable=False)

    company: Mapped["Company"] = relationship("Company", back_populates="members")

# ----------------- STUDENT PROFILES & SKILL PASSPORT -----------------
class StudentProfile(TimestampMixin, Base):
    __tablename__ = "student_profiles"
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    institution_id: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("institutions.id", ondelete="SET NULL"), nullable=True, index=True)
    institution_name: Mapped[Optional[str]] = mapped_column(String(240), default="Indian Institute of Information Technology", nullable=True)
    department: Mapped[Optional[str]] = mapped_column(String(160), default="Computer Science & Engineering", nullable=True)
    degree: Mapped[Optional[str]] = mapped_column(String(120), default="B.Tech Computer Science", nullable=True)
    graduation_year: Mapped[Optional[int]] = mapped_column(Integer, default=2026, nullable=True)
    current_year: Mapped[int] = mapped_column(Integer, default=3, nullable=False)
    career_goal: Mapped[Optional[str]] = mapped_column(String(240), default="Full-Stack AI Software Engineer", nullable=True)
    resume_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    github_url: Mapped[Optional[str]] = mapped_column(Text, default="https://github.com", nullable=True)
    linkedin_url: Mapped[Optional[str]] = mapped_column(Text, default="https://linkedin.com", nullable=True)
    profile_completion: Mapped[int] = mapped_column(Integer, default=85, nullable=False)
    career_readiness_score: Mapped[float] = mapped_column(Float, default=88.5, nullable=False)
    preferences: Mapped[Dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="student_profile")
    skills: Mapped[List["StudentSkill"]] = relationship("StudentSkill", back_populates="student", cascade="all, delete-orphan")

class Skill(TimestampMixin, Base):
    __tablename__ = "skills"
    id: Mapped[uuid.UUID] = mapped_column(UUIDType, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(120), unique=True, index=True, nullable=False)
    category: Mapped[str] = mapped_column(String(100), default="Technical", nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

class StudentSkill(Base):
    __tablename__ = "student_skills"
    __table_args__ = (UniqueConstraint("user_id", "skill_id", name="uq_student_skill"),)
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    skill_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("skills.id", ondelete="CASCADE"), index=True)
    proficiency_level: Mapped[int] = mapped_column(Integer, default=3, nullable=False)
    source: Mapped[str] = mapped_column(String(80), default="Self-reported", nullable=False)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    verified_by: Mapped[Optional[str]] = mapped_column(String(160), nullable=True)

    student: Mapped["StudentProfile"] = relationship("StudentProfile", back_populates="skills")
    skill: Mapped["Skill"] = relationship("Skill")

# ----------------- OPPORTUNITIES -----------------
class Opportunity(TimestampMixin, Base):
    __tablename__ = "opportunities"
    __table_args__ = (Index("ix_opp_status_deadline", "status", "application_deadline"),)
    id: Mapped[uuid.UUID] = mapped_column(UUIDType, primary_key=True, default=uuid.uuid4)
    company_id: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("companies.id", ondelete="SET NULL"), nullable=True, index=True)
    created_by: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="RESTRICT"), index=True)
    company_name: Mapped[str] = mapped_column(String(240), nullable=False)
    company_logo: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    title: Mapped[str] = mapped_column(String(240), nullable=False, index=True)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    responsibilities: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    opportunity_type: Mapped[str] = mapped_column(String(40), default="internship", nullable=False, index=True)
    work_mode: Mapped[str] = mapped_column(String(30), default="hybrid", nullable=False)
    location: Mapped[Optional[str]] = mapped_column(String(160), default="Bengaluru, India", nullable=True)
    duration: Mapped[Optional[str]] = mapped_column(String(80), default="6 Months", nullable=True)
    stipend_min: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    stipend_max: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    eligibility: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    application_deadline: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    required_skills: Mapped[List[str]] = mapped_column(JSON, default=list, nullable=False)
    status: Mapped[str] = mapped_column(String(30), default="open", nullable=False, index=True)
    applicant_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    company: Mapped[Optional["Company"]] = relationship("Company", back_populates="opportunities")
    applications: Mapped[List["Application"]] = relationship("Application", back_populates="opportunity", cascade="all, delete-orphan")

# ----------------- APPLICATIONS -----------------
class Application(TimestampMixin, Base):
    __tablename__ = "applications"
    __table_args__ = (UniqueConstraint("student_id", "opportunity_id", name="uq_app_student_opportunity"),)
    id: Mapped[uuid.UUID] = mapped_column(UUIDType, primary_key=True, default=uuid.uuid4)
    student_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    opportunity_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("opportunities.id", ondelete="CASCADE"), index=True)
    resume_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    cover_letter: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    match_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    match_explanation: Mapped[Dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)
    status: Mapped[str] = mapped_column(String(40), default="applied", nullable=False, index=True)
    recruiter_feedback: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    opportunity: Mapped["Opportunity"] = relationship("Opportunity", back_populates="applications")
    student_user: Mapped["User"] = relationship("User", foreign_keys=[student_id])
    events: Mapped[List["ApplicationEvent"]] = relationship("ApplicationEvent", back_populates="application", cascade="all, delete-orphan")

class ApplicationEvent(Base):
    __tablename__ = "application_events"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    application_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("applications.id", ondelete="CASCADE"), index=True)
    actor_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="RESTRICT"))
    old_status: Mapped[Optional[str]] = mapped_column(String(40), nullable=True)
    new_status: Mapped[str] = mapped_column(String(40), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc, nullable=False)

    application: Mapped["Application"] = relationship("Application", back_populates="events")

# ----------------- FACULTY, MENTOR & RESEARCH -----------------
class FacultyProfile(TimestampMixin, Base):
    __tablename__ = "faculty_profiles"
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    institution_id: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("institutions.id", ondelete="SET NULL"), nullable=True)
    department: Mapped[str] = mapped_column(String(160), default="Computer Science & Engineering", nullable=False)
    designation: Mapped[str] = mapped_column(String(120), default="Associate Professor", nullable=False)
    supervised_projects: Mapped[List[Dict[str, Any]]] = mapped_column(JSON, default=list, nullable=False)

class MentorProfile(TimestampMixin, Base):
    __tablename__ = "mentor_profiles"
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    company: Mapped[str] = mapped_column(String(160), default="HyperScale Labs", nullable=False)
    title: Mapped[str] = mapped_column(String(120), default="Principal Cloud Architect", nullable=False)
    years_experience: Mapped[int] = mapped_column(Integer, default=12, nullable=False)
    expertise: Mapped[List[str]] = mapped_column(JSON, default=list, nullable=False)

class MentorshipSession(TimestampMixin, Base):
    __tablename__ = "mentorship_sessions"
    id: Mapped[uuid.UUID] = mapped_column(UUIDType, primary_key=True, default=uuid.uuid4)
    mentor_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    student_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    topic: Mapped[str] = mapped_column(String(240), nullable=False)
    scheduled_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    duration_minutes: Mapped[int] = mapped_column(Integer, default=45, nullable=False)
    status: Mapped[str] = mapped_column(String(40), default="Confirmed", nullable=False)
    meeting_link: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

class ResearcherProfile(TimestampMixin, Base):
    __tablename__ = "researcher_profiles"
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    institution_id: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("institutions.id", ondelete="SET NULL"), nullable=True)
    lab_name: Mapped[str] = mapped_column(String(240), default="Quantum & Edge AI Laboratory", nullable=False)
    specialization: Mapped[str] = mapped_column(String(240), default="Multimodal Agents & Inference", nullable=False)

class ResearchProject(TimestampMixin, Base):
    __tablename__ = "research_projects"
    id: Mapped[uuid.UUID] = mapped_column(UUIDType, primary_key=True, default=uuid.uuid4)
    lead_researcher_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    title: Mapped[str] = mapped_column(String(240), nullable=False)
    funding_source: Mapped[str] = mapped_column(String(160), default="DST Grant", nullable=False)
    funding_amount: Mapped[str] = mapped_column(String(80), default="₹24 Lakhs", nullable=False)
    industry_partner: Mapped[str] = mapped_column(String(160), default="Microsoft Research India", nullable=False)
    status: Mapped[str] = mapped_column(String(40), default="Active", nullable=False)

# ----------------- EVENTS & WORKSHOPS -----------------
class Event(TimestampMixin, Base):
    __tablename__ = "events"
    id: Mapped[uuid.UUID] = mapped_column(UUIDType, primary_key=True, default=uuid.uuid4)
    organizer_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    title: Mapped[str] = mapped_column(String(240), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    event_type: Mapped[str] = mapped_column(String(60), default="Workshop", nullable=False)
    start_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    end_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    location: Mapped[str] = mapped_column(String(160), default="Virtual", nullable=False)
    capacity: Mapped[int] = mapped_column(Integer, default=100, nullable=False)
    registered_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

class EventRegistration(Base):
    __tablename__ = "event_registrations"
    __table_args__ = (UniqueConstraint("event_id", "user_id", name="uq_event_user"),)
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    event_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("events.id", ondelete="CASCADE"), index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    registered_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc, nullable=False)

# ----------------- MESSAGING & NOTIFICATIONS -----------------
class Conversation(TimestampMixin, Base):
    __tablename__ = "conversations"
    id: Mapped[uuid.UUID] = mapped_column(UUIDType, primary_key=True, default=uuid.uuid4)
    participant_one_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    participant_two_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)

class Message(Base):
    __tablename__ = "messages"
    id: Mapped[uuid.UUID] = mapped_column(UUIDType, primary_key=True, default=uuid.uuid4)
    conversation_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("conversations.id", ondelete="CASCADE"), index=True)
    sender_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc, nullable=False)

class Notification(Base):
    __tablename__ = "notifications"
    id: Mapped[uuid.UUID] = mapped_column(UUIDType, primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    title: Mapped[str] = mapped_column(String(240), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    notification_type: Mapped[str] = mapped_column(String(60), default="application_update", nullable=False)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    action_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc, nullable=False)

# ----------------- AUDIT & DATASYNC -----------------
class AuditLog(Base):
    __tablename__ = "audit_logs"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    actor_id: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    action: Mapped[str] = mapped_column(String(120), nullable=False, index=True)
    resource_type: Mapped[str] = mapped_column(String(80), nullable=False)
    resource_id: Mapped[Optional[str]] = mapped_column(String(80), nullable=True)
    details: Mapped[Dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc, nullable=False)

class DataSyncJob(Base):
    __tablename__ = "datasync_jobs"
    id: Mapped[uuid.UUID] = mapped_column(UUIDType, primary_key=True, default=uuid.uuid4)
    source_name: Mapped[str] = mapped_column(String(120), nullable=False)
    sync_type: Mapped[str] = mapped_column(String(80), default="api_pull", nullable=False)
    status: Mapped[str] = mapped_column(String(40), default="completed", nullable=False)
    records_synced: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    error_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc, nullable=False)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
