from fastapi import APIRouter, Depends, Query
from datetime import datetime
from typing import Optional
from ..auth import CurrentUser, get_current_user, require_role
from ..schemas import RecruiterProfileResponse, StudentProfileResponse, MessageResponse
from ..database import db

router = APIRouter(prefix="/recruiters", tags=["Recruiter & Company Portal"])

@router.get("/profile", response_model=RecruiterProfileResponse)
async def get_recruiter_profile(
    current_user: CurrentUser = Depends(require_role(["recruiter", "admin"]))
):
    """Retrieve recruiter/company profile."""
    return RecruiterProfileResponse(
        id=current_user.id,
        user_id=current_user.id,
        company_name="Nexus AI Technologies",
        company_description="Pioneering enterprise AI workflows and developer intelligence tools.",
        company_website="https://nexusai.tech",
        company_logo="https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=128&q=80",
        industry="Artificial Intelligence & Cloud Software",
        company_size="50-200 Employees",
        location="Bengaluru, Karnataka",
        verification_status="verified",
        created_at=datetime.utcnow(),
    )

@router.get("/candidates", response_model=list[StudentProfileResponse])
async def search_candidates(
    skill: Optional[str] = Query(None, description="Filter by skill"),
    graduation_year: Optional[int] = Query(None, description="Filter by graduation year"),
    min_readiness: Optional[float] = Query(None, description="Minimum readiness score"),
    current_user: CurrentUser = Depends(require_role(["recruiter", "admin", "institution_admin"]))
):
    """Search student talent pool matching criteria."""
    candidates = [
        StudentProfileResponse(
            id="c-01",
            user_id="u-01",
            full_name="Aarav Sharma",
            email="aarav.sharma@iiit.ac.in",
            institution_name="IIIT Bangalore",
            department="Computer Science",
            degree="B.Tech CS",
            graduation_year=2026,
            current_year=4,
            career_goal="Full-Stack Engineer",
            github_url="https://github.com/aarav-dev",
            linkedin_url="https://linkedin.com/in/aarav",
            profile_completion=95,
            career_readiness_score=92.0,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        ),
        StudentProfileResponse(
            id="c-02",
            user_id="u-02",
            full_name="Priya Patel",
            email="priya.patel@nit.ac.in",
            institution_name="NIT Surathkal",
            department="Information Technology",
            degree="B.Tech IT",
            graduation_year=2026,
            current_year=3,
            career_goal="AI/ML Systems Engineer",
            github_url="https://github.com/priya-patel",
            linkedin_url="https://linkedin.com/in/priya",
            profile_completion=90,
            career_readiness_score=89.5,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        ),
        StudentProfileResponse(
            id="c-03",
            user_id="u-03",
            full_name="Rohan Verma",
            email="rohan.verma@bits.ac.in",
            institution_name="BITS Pilani",
            department="Electrical & Electronics",
            degree="B.E. EEE",
            graduation_year=2027,
            current_year=3,
            career_goal="Cloud Backend Developer",
            github_url="https://github.com/rohan-cloud",
            linkedin_url="https://linkedin.com/in/rohan",
            profile_completion=85,
            career_readiness_score=86.0,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        ),
    ]
    return candidates
