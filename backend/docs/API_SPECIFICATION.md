# MITRA — Complete REST API Specification

Base URL: `http://127.0.0.1:8000/api/v1`
Interactive Swagger Documentation: `http://127.0.0.1:8000/docs`
OpenAPI JSON Schema: `http://127.0.0.1:8000/openapi.json`

---

## 1. System Health
- `GET /health`
  - Auth: None (Public)
  - Response:
    ```json
    {
      "status": "healthy",
      "service": "MITRA FastAPI Backend",
      "version": "1.0.0"
    }
    ```

---

## 2. Authentication & Identity
- `GET /api/v1/auth/me`
  - Auth: Bearer JWT
  - Returns current user profile with role, email, and display details.
- `PATCH /api/v1/auth/profile`
  - Auth: Bearer JWT
  - Body: `{ "display_name": "...", "avatar_url": "...", "phone_number": "..." }`
  - Updates profile metadata.

---

## 3. Student Portal
- `GET /api/v1/students/profile`
  - Auth: Bearer JWT (Roles: `student`, `admin`)
  - Returns academic profile, readiness score, institution affiliation, and URLs.
- `PUT /api/v1/students/profile`
  - Auth: Bearer JWT (Roles: `student`, `admin`)
  - Body: `{ "department": "...", "degree": "...", "graduation_year": 2026, "career_goal": "...", "github_url": "...", "linkedin_url": "..." }`
- `GET /api/v1/students/skills`
  - Auth: Bearer JWT
  - Returns Skill Passport items with proficiency ratings, verification badges, and source attribution.
- `POST /api/v1/students/skills`
  - Auth: Bearer JWT (Roles: `student`, `admin`)
  - Body: `{ "skill_name": "Python", "category": "Backend", "proficiency_level": 4 }`
- `POST /api/v1/students/resume/analyze`
  - Auth: Bearer JWT (Roles: `student`, `admin`)
  - Body: `multipart/form-data` with `file` (PDF/DOCX)
  - Returns ATS evaluation score, strengths, areas for improvement, extracted skills, and gap diagnosis.

---

## 4. AI Career Intelligence
- `GET /api/v1/ai/skill-gap-analysis`
  - Auth: Bearer JWT
  - Query: `target_role` (e.g. `Senior Full-Stack AI Engineer`)
  - Returns match percentage, matched skills, missing competencies, actionable recommendations, and multi-phase roadmap.

---

## 5. Opportunities Marketplace
- `GET /api/v1/opportunities`
  - Auth: Public / Bearer JWT
  - Query: `type`, `work_mode`, `search`, `limit`, `offset`
  - Returns filtered array of verified opportunities with stipend, skills, and deadlines.
- `GET /api/v1/opportunities/{id}`
  - Auth: Public / Bearer JWT
  - Returns comprehensive opportunity details.
- `POST /api/v1/opportunities`
  - Auth: Bearer JWT (Roles: `recruiter`, `admin`)
  - Body: `{ "title": "...", "description": "...", "opportunity_type": "internship", "work_mode": "hybrid", "stipend_min": 25000, "stipend_max": 40000, "required_skills": [...] }`

---

## 6. Applications & Pipeline
- `POST /api/v1/applications`
  - Auth: Bearer JWT (Roles: `student`, `admin`)
  - Body: `{ "opportunity_id": "...", "cover_letter": "...", "resume_url": "..." }`
- `GET /api/v1/applications/my`
  - Auth: Bearer JWT (Roles: `student`, `admin`)
  - Returns all applications filed by the authenticated student.
- `GET /api/v1/applications/opportunity/{id}`
  - Auth: Bearer JWT (Roles: `recruiter`, `admin`)
  - Path: Opportunity UUID or `"all"`
  - Returns candidate pipeline with match scores and cover letters.
- `PATCH /api/v1/applications/{id}/status`
  - Auth: Bearer JWT (Roles: `recruiter`, `admin`)
  - Body: `{ "status": "shortlisted", "recruiter_feedback": "..." }`

---

## 7. Recruiters & Companies
- `GET /api/v1/recruiters/profile`
  - Auth: Bearer JWT (Roles: `recruiter`, `admin`)
  - Returns corporate profile, industry, size, and verification standing.
- `GET /api/v1/recruiters/candidates`
  - Auth: Bearer JWT (Roles: `recruiter`, `institution_admin`, `admin`)
  - Query: `skill`, `graduation_year`, `min_readiness`
  - Returns matching candidate student profiles.

---

## 8. Institutions & Academics
- `GET /api/v1/institutions/profile`
  - Auth: Bearer JWT (Roles: `institution_admin`, `faculty`, `admin`)
  - Returns institutional overview, verified status, and total student/faculty counts.
- `GET /api/v1/institutions/departments`
  - Auth: Bearer JWT
  - Returns departmental placement rates, active student totals, and average stipends.
