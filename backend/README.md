# MITRA FastAPI Backend

Production-ready Python FastAPI service powering the MITRA Academia–Industry Collaboration Platform.

## Features
- **Supabase JWT Authentication**: Secure user verification and role enforcement (`student`, `recruiter`, `institution_admin`, `faculty`, `mentor`, `researcher`, `admin`).
- **Student Portal API**: Profile management, Skill Passport, Resume uploads and AI analysis.
- **Recruiter & Company API**: Candidate talent discovery, profile inspection, application pipeline management.
- **Opportunities API**: Full lifecycle management of internships, jobs, research collaborations, and projects with granular filtering.
- **Application Center**: Multi-stage application tracking with AI match scores and recruiter feedback.
- **AI Career Intelligence**: Personalized career roadmaps, skill gap analyses, and readiness scores.

## Quickstart
```bash
cd backend
python -m venv .venv
source .venv/bin/activate # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Interactive API documentation will be available at:
- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`
- OpenAPI JSON: `http://127.0.0.1:8000/openapi.json`
