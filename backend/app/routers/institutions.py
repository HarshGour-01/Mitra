from fastapi import APIRouter, Depends
from datetime import datetime
from ..auth import CurrentUser, get_current_user, require_role
from ..schemas import InstitutionProfileResponse

router = APIRouter(prefix="/institutions", tags=["Institution Portal"])

@router.get("/profile", response_model=InstitutionProfileResponse)
async def get_institution_profile(
    current_user: CurrentUser = Depends(require_role(["institution_admin", "faculty", "admin"]))
):
    """Retrieve institution overview and verification status."""
    return InstitutionProfileResponse(
        id=current_user.id,
        user_id=current_user.id,
        institution_name="National Institute of Technology Karnataka",
        institution_type="National Autonomous University",
        website="https://www.nitk.ac.in",
        location="Surathkal, Karnataka, India",
        description="Premier engineering university fostering high-impact industry partnerships and student innovation.",
        verification_status="verified",
        student_count=4850,
        faculty_count=320,
        created_at=datetime.utcnow(),
    )

@router.get("/departments")
async def get_departments(
    current_user: CurrentUser = Depends(get_current_user)
):
    """List institution departments and placement rates."""
    return [
        {"department": "Computer Science & Engineering", "students": 450, "placed": 92.5, "average_skills": 8.4},
        {"department": "Information Technology", "students": 320, "placed": 89.0, "average_skills": 7.9},
        {"department": "Electronics & Communication", "students": 380, "placed": 85.2, "average_skills": 7.6},
        {"department": "Mechanical Engineering", "students": 290, "placed": 78.4, "average_skills": 6.8},
        {"department": "Data Science & AI", "students": 180, "placed": 96.0, "average_skills": 9.1},
    ]
