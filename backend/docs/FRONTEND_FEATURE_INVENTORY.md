# MITRA — Frontend Feature Inventory & Contract Specification

This document presents the complete functional inventory and data contracts derived directly from the MITRA Next.js frontend codebase.

---

## 1. Platform Overview & Role Matrix

MITRA connects six primary stakeholders and a platform administrator:
1. **Student** (`student`): Accesses Skill Passport, AI Career Intelligence, Resume ATS Analysis, Opportunity Discovery, and Application Tracking.
2. **Faculty** (`faculty`): Academic supervisor who monitors capstone/hackathon projects, endorses student skills, and tracks student career readiness.
3. **Institution Admin** (`institution_admin`): University management overlooking departmental placement analytics, corporate MoUs, student enrollment, and accreditation telemetry.
4. **Recruiter** (`recruiter` / `company_admin`): Corporate partner who posts internships/jobs/projects, searches verified student candidates, and manages candidate evaluation pipelines.
5. **Mentor** (`mentor`): Industry expert conducting 1:1 mentorship sessions, code reviews, and career guidance.
6. **Researcher** (`researcher`): Academic scientist managing funded research projects, industry grants, and student research fellows.
7. **Platform Admin** (`admin` / `platform_admin`): Superadmin overseeing corporate/institutional verification queues, system health, and national ecosystem moderation.

---

## 2. Route & Screen Inventory

### A. Authentication & Public Gateway
- `/`: Public landing page showcasing platform metrics, pillars, and opportunities.
- `/(auth)/login`: Email/password login and one-click role demo simulation.
- `/(auth)/register`: Multi-role registration (Student, Faculty, Institution Admin, Recruiter, Mentor, Researcher).
- `/(auth)/forgot-password`: Password reset request.
- `/(public)/about`: Mission, vision, and governance details.
- `/(public)/companies`: Corporate partner recruitment and R&D collaboration.
- `/(public)/institutions`: University integration and NIRF/NAAC/AICTE compliance.
- `/(public)/students`: Skill Passport overview and internship gateway.
- `/(public)/mentors`: Industry mentorship network.
- `/(public)/how-it-works`: Step-by-step role guides.
- `/(public)/privacy`: Student data protection policy.
- `/(public)/terms`: Terms of platform usage.

### B. Opportunities Marketplace
- `/opportunities`: Public/authenticated catalog with keyword search, opportunity type filter (`internship`, `job`, `project`, `research`, `workshop`), and work mode filter (`remote`, `hybrid`, `on_site`).
- `/opportunities/[id]`: Opportunity detail page featuring organization background, responsibilities, eligibility requirements, stipend/salary range, required skills, and interactive application modal.

### C. Role Dashboards
- `/dashboard/student`:
  - **Overview**: Career readiness score, verified skills badge count, recent opportunities.
  - **Skill Passport**: Categorized skills with proficiency levels (1–5), verification status, verification source, and "Add Skill" dialog.
  - **Resume Center**: Drag-and-drop resume upload (PDF/DOCX), automated ATS scoring, strengths, gaps, extracted skills, and improvement recommendations.
  - **AI Career Intelligence**: Target role selector, real-time skill-gap calculation, matched vs missing skills, prioritized actions, and phased learning roadmap.
  - **My Applications**: Active applications table with status badges (`applied`, `shortlisted`, `interview_scheduled`, `accepted`, `rejected`), match scores, and recruiter feedback.
- `/dashboard/recruiter`:
  - **Overview**: Active postings, applicant volume, candidate search shortcut.
  - **Opportunities**: Post opportunity dialog with type, work mode, stipend range, and skills tags.
  - **Candidate Search**: Filter candidates by technical skill, graduation year, and minimum readiness score.
  - **Candidate Pipeline**: Applications sorted by opportunity, match scores, resume links, status switcher, and recruiter feedback notes.
- `/dashboard/institution`:
  - Enrolled student count, verified skill passport adoption rate, active corporate MoUs, placement conversion rate.
  - Departmental analytics table (CS, IT, ECE, AI/DS) with placement percentages and average stipends.
  - Placement audit export capability.
- `/dashboard/faculty`:
  - Supervised student projects table with milestone verification, readiness scores, and skill endorsement actions.
- `/dashboard/mentor`:
  - Upcoming 1:1 mentorship bookings with topic, time, confirmed status, and video room launcher.
- `/dashboard/researcher`:
  - Active research projects, funding grants, corporate sponsors, and research fellow management.
- `/dashboard/admin`:
  - Institutional & corporate verification queue with CIN/AISHE registration numbers, KYC actions, and verification approval.

### D. User Settings & Account
- `/profile`: Full legal name, email, department, career goal, GitHub URL, LinkedIn URL, and dynamic role badge.
- `/settings`: Notification preferences, security settings, and UI themes.

---

## 3. Data Contracts & Frontend-Backend Interface Matrix

| Feature / UI Action | HTTP Method | Endpoint | Frontend Payload | Expected Backend Response |
| :--- | :--- | :--- | :--- | :--- |
| Health Check | `GET` | `/health` | None | `{"status": "healthy", "service": "MITRA FastAPI Backend", "version": "1.0.0"}` |
| Current User Info | `GET` | `/api/v1/auth/me` | Bearer JWT | `UserProfileResponse` |
| Update Profile | `PATCH` | `/api/v1/auth/profile` | `RoleProfileUpdate` | `MessageResponse` |
| Student Profile Fetch | `GET` | `/api/v1/students/profile` | Bearer JWT | `StudentProfileResponse` |
| Student Profile Update | `PUT` | `/api/v1/students/profile` | `StudentProfileUpdate` | `MessageResponse` |
| Skill Passport Fetch | `GET` | `/api/v1/students/skills` | Bearer JWT | `StudentSkillItem[]` |
| Add Skill to Passport | `POST` | `/api/v1/students/skills` | `StudentSkillAdd` | `MessageResponse` |
| AI Resume Analysis | `POST` | `/api/v1/students/resume/analyze` | `multipart/form-data (file)` | `ResumeAnalysisResponse` |
| AI Skill-Gap & Roadmap | `GET` | `/api/v1/ai/skill-gap-analysis` | `?target_role=...` | `SkillGapAnalysis` |
| List Opportunities | `GET` | `/api/v1/opportunities` | `?type=...&work_mode=...&search=...` | `OpportunityResponse[]` |
| Opportunity Detail | `GET` | `/api/v1/opportunities/{id}` | Path param | `OpportunityResponse` |
| Publish Opportunity | `POST` | `/api/v1/opportunities` | `OpportunityCreate` | `OpportunityResponse` |
| Submit Application | `POST` | `/api/v1/applications` | `ApplicationCreate` | `ApplicationResponse` |
| My Applications List | `GET` | `/api/v1/applications/my` | Bearer JWT | `ApplicationResponse[]` |
| Opportunity Pipeline | `GET` | `/api/v1/applications/opportunity/{id}` | Path param (`{id}` or `"all"`) | `ApplicationResponse[]` |
| Update Application Status | `PATCH` | `/api/v1/applications/{id}/status` | `ApplicationStatusUpdate` | `MessageResponse` |
| Recruiter Profile | `GET` | `/api/v1/recruiters/profile` | Bearer JWT | `RecruiterProfileResponse` |
| Candidate Search | `GET` | `/api/v1/recruiters/candidates` | `?skill=...&graduation_year=...` | `StudentProfileResponse[]` |
| Institution Profile | `GET` | `/api/v1/institutions/profile` | Bearer JWT | `InstitutionProfileResponse` |
| Department Statistics | `GET` | `/api/v1/institutions/departments` | Bearer JWT | `DepartmentStat[]` |
