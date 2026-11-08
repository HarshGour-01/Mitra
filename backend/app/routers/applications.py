from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime, timedelta
from typing import Optional
from ..auth import CurrentUser, get_current_user, require_role
from ..schemas import ApplicationResponse, ApplicationCreate, ApplicationStatusUpdate, MessageResponse

router = APIRouter(prefix="/applications", tags=["Application Center"])

SEED_APPLICATIONS = [
    ApplicationResponse(
        id="app-1",
        opportunity_id="opp-102",
        opportunity_title="Full-Stack Web Architect (Frontend Focus)",
        company_name="Zerodha Tech",
        student_id="std-100",
        student_name="Harsh Gour",
        student_email="student@mitra.edu",
        resume_url="https://mitra.edu/resumes/harsh-gour.pdf",
        cover_letter="Passionate about building blazing-fast, accessible web dashboards with Next.js and TypeScript.",
        match_score=94.5,
        match_explanation={
            "matched_skills": ["Next.js", "React 19", "TypeScript", "Tailwind CSS"],
            "missing_skills": ["WebSockets"],
            "summary": "Exceptional frontend architecture alignment with strong project demonstration."
        },
        status="shortlisted",
        recruiter_feedback="Strong portfolio submission. Invited for technical architecture discussion.",
        applied_at=datetime.utcnow() - timedelta(days=4),
        updated_at=datetime.utcnow() - timedelta(days=1),
    ),
    ApplicationResponse(
        id="app-2",
        opportunity_id="opp-101",
        opportunity_title="AI Systems & LLM Research Intern",
        company_name="Microsoft Research India",
        student_id="std-100",
        student_name="Harsh Gour",
        student_email="student@mitra.edu",
        resume_url="https://mitra.edu/resumes/harsh-gour.pdf",
        cover_letter="Eager to contribute to high-performance inference kernels and multimodal evaluations.",
        match_score=87.0,
        match_explanation={
            "matched_skills": ["Python", "Distributed Systems"],
            "missing_skills": ["C++", "PyTorch"],
            "summary": "Good mathematical foundation; recommended to complete PyTorch kernel modules."
        },
        status="applied",
        recruiter_feedback="Under screening by Research Platform committee.",
        applied_at=datetime.utcnow() - timedelta(days=2),
        updated_at=datetime.utcnow() - timedelta(days=2),
    ),
]

@router.get("/my", response_model=list[ApplicationResponse])
async def get_my_applications(
    current_user: CurrentUser = Depends(require_role(["student", "admin"]))
):
    """Retrieve all applications submitted by the current authenticated student."""
    return SEED_APPLICATIONS

@router.post("", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
async def submit_application(
    body: ApplicationCreate,
    current_user: CurrentUser = Depends(require_role(["student", "admin"]))
):
    """Submit a student application for an active opportunity."""
    new_app = ApplicationResponse(
        id=f"app-{len(SEED_APPLICATIONS) + 1}",
        opportunity_id=body.opportunity_id,
        opportunity_title="Application for Opportunity",
        company_name="Partner Company",
        student_id=current_user.id,
        student_name=current_user.full_name or "Applicant",
        student_email=current_user.email,
        resume_url=body.resume_url,
        cover_letter=body.cover_letter,
        match_score=91.0,
        match_explanation={
            "matched_skills": ["Next.js", "TypeScript", "Python"],
            "summary": "Strong core profile match with high potential."
        },
        status="applied",
        recruiter_feedback="Application successfully received.",
        applied_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    SEED_APPLICATIONS.insert(0, new_app)
    return new_app

@router.get("/opportunity/{opportunity_id}", response_model=list[ApplicationResponse])
async def get_opportunity_applications(
    opportunity_id: str,
    current_user: CurrentUser = Depends(require_role(["recruiter", "admin"]))
):
    """Retrieve all candidate applications for a specific posted opportunity."""
    return [a for a in SEED_APPLICATIONS if a.opportunity_id == opportunity_id or opportunity_id == "all"]

@router.patch("/{application_id}/status", response_model=MessageResponse)
async def update_application_status(
    application_id: str,
    body: ApplicationStatusUpdate,
    current_user: CurrentUser = Depends(require_role(["recruiter", "admin"]))
):
    """Update candidate application status (shortlisted, interview_scheduled, etc.)."""
    for app in SEED_APPLICATIONS:
        if app.id == application_id:
            app.status = body.status
            app.recruiter_feedback = body.recruiter_feedback
            app.updated_at = datetime.utcnow()
            return MessageResponse(
                success=True,
                message=f"Application status updated to '{body.status}'",
                data={"id": application_id, "status": body.status}
            )
    raise HTTPException(status_code=404, detail="Application not found.")
