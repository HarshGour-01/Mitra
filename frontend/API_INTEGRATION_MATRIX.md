# MITRA — Frontend-to-Backend API Integration Matrix

This matrix establishes the definitive contract between the MITRA Next.js frontend and the FastAPI backend service (`http://127.0.0.1:8000`).

---

## 1. Implemented & Integrated Endpoints

| Feature / UI Module | Backend Endpoint | HTTP Method | Required Role | Request Schema | Response Schema | Live Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Service Health Check** | `/health` | `GET` | Public | None | `{"status": "healthy", ...}` | **VERIFIED LIVE** |
| **Current User Profile** | `/api/v1/auth/me` | `GET` | Authenticated | None (Bearer JWT) | `UserProfileResponse` | **VERIFIED LIVE** |
| **Profile Patch** | `/api/v1/auth/profile` | `PATCH` | Authenticated | `RoleProfileUpdate` | `MessageResponse` | **VERIFIED LIVE** |
| **Student Profile Fetch** | `/api/v1/students/profile` | `GET` | `student`, `admin` | None (Bearer JWT) | `StudentProfileResponse` | **VERIFIED LIVE** |
| **Student Profile Update** | `/api/v1/students/profile` | `PUT` | `student`, `admin` | `StudentProfileUpdate` | `MessageResponse` | **VERIFIED LIVE** |
| **Skill Passport Fetch** | `/api/v1/students/skills` | `GET` | Authenticated | None (Bearer JWT) | `StudentSkillItem[]` | **VERIFIED LIVE** |
| **Add Skill to Passport** | `/api/v1/students/skills` | `POST` | `student`, `admin` | `StudentSkillAdd` | `MessageResponse` | **VERIFIED LIVE** |
| **AI Resume Analysis** | `/api/v1/students/resume/analyze` | `POST` | `student`, `admin` | `multipart/form-data` (file) | `ResumeAnalysisResponse` | **VERIFIED LIVE** |
| **AI Skill-Gap & Roadmap** | `/api/v1/ai/skill-gap-analysis` | `GET` | Authenticated | Query: `target_role` | `SkillGapAnalysis` | **VERIFIED LIVE** |
| **List Opportunities** | `/api/v1/opportunities` | `GET` | Public / All | Query: `type`, `work_mode`, `search` | `OpportunityResponse[]` | **VERIFIED LIVE** |
| **Opportunity Detail** | `/api/v1/opportunities/{id}` | `GET` | Public / All | Path: `opportunity_id` | `OpportunityResponse` | **VERIFIED LIVE** |
| **Publish Opportunity** | `/api/v1/opportunities` | `POST` | `recruiter`, `admin` | `OpportunityCreate` | `OpportunityResponse` | **VERIFIED LIVE** |
| **Submit Application** | `/api/v1/applications` | `POST` | `student`, `admin` | `ApplicationCreate` | `ApplicationResponse` | **VERIFIED LIVE** |
| **My Applications List** | `/api/v1/applications/my` | `GET` | `student`, `admin` | None (Bearer JWT) | `ApplicationResponse[]` | **VERIFIED LIVE** |
| **Opportunity Candidates** | `/api/v1/applications/opportunity/{id}` | `GET` | `recruiter`, `admin` | Path: `opportunity_id` | `ApplicationResponse[]` | **VERIFIED LIVE** |
| **Update App Status** | `/api/v1/applications/{id}/status` | `PATCH` | `recruiter`, `admin` | `ApplicationStatusUpdate` | `MessageResponse` | **VERIFIED LIVE** |
| **Recruiter Company Info** | `/api/v1/recruiters/profile` | `GET` | `recruiter`, `admin` | None (Bearer JWT) | `RecruiterProfileResponse` | **VERIFIED LIVE** |
| **Candidate Search** | `/api/v1/recruiters/candidates` | `GET` | `recruiter`, `institution_admin`, `admin` | Query: `skill`, `graduation_year` | `StudentProfileResponse[]` | **VERIFIED LIVE** |
| **Institution Profile** | `/api/v1/institutions/profile` | `GET` | `institution_admin`, `faculty`, `admin` | None (Bearer JWT) | `InstitutionProfileResponse` | **VERIFIED LIVE** |
| **Department Statistics** | `/api/v1/institutions/departments` | `GET` | Authenticated | None (Bearer JWT) | `DepartmentStat[]` | **VERIFIED LIVE** |

---

## 2. Unsupported / Future Roadmap Endpoints (Handled via Coming Soon Interfaces)

| Module | Planned Endpoint | HTTP Method | UI State | Reason / Target Phase |
| :--- | :--- | :--- | :--- | :--- |
| **Accreditation Telemetry** | `/api/v1/institutions/accreditation/export` | `POST` | `ComingSoonCard` | AICTE / NBA export format awaiting government standard specs (Phase 2). |
| **Grant Clearinghouse** | `/api/v1/faculty/grants/apply` | `POST` | `ComingSoonCard` | Corporate co-funding clearance workflows in design (Phase 2). |
| **Interactive Code Sandbox** | `/api/v1/mentorship/sandbox/create` | `POST` | `ComingSoonCard` | WebRTC pair-programming server deployment required (Phase 2). |
| **Patent Filing Flow** | `/api/v1/research/patents/file` | `POST` | `ComingSoonCard` | Institutional IPR clearinghouse legal review integration pending (Phase 2). |
| **SIEM Audit Stream** | `/api/v1/admin/audit/stream` | `GET` | `ComingSoonCard` | Kafka/Elasticsearch cluster setup required for continuous streaming (Phase 2). |
