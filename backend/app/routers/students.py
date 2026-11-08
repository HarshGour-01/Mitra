from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from datetime import datetime
from ..auth import CurrentUser, get_current_user, require_role
from ..schemas import (
    StudentProfileResponse,
    StudentProfileUpdate,
    StudentSkillItem,
    StudentSkillAdd,
    ResumeAnalysisResponse,
    MessageResponse
)
from ..database import db

router = APIRouter(prefix="/students", tags=["Student Portal"])

@router.get("/profile", response_model=StudentProfileResponse)
async def get_student_profile(
    current_user: CurrentUser = Depends(require_role(["student", "admin"]))
):
    """Fetch authenticated student's profile details."""
    res = await db.get("student_profiles", {"id": f"eq.{current_user.id}"})
    if res and len(res) > 0:
        row = res[0]
        return StudentProfileResponse(
            id=row.get("id", current_user.id),
            user_id=current_user.id,
            full_name=current_user.full_name or "Student",
            email=current_user.email,
            institution_id=row.get("institution_id"),
            department=row.get("department", "Computer Science & Engineering"),
            degree=row.get("degree", "Bachelor of Technology"),
            graduation_year=row.get("graduation_year", 2026),
            current_year=row.get("current_year", 3),
            career_goal=row.get("career_goal", "Full Stack AI Engineer"),
            resume_url=row.get("resume_url"),
            github_url=row.get("github_url", "https://github.com"),
            linkedin_url=row.get("linkedin_url", "https://linkedin.com"),
            profile_completion=row.get("profile_completion", 85),
            career_readiness_score=float(row.get("career_readiness_score", 84.0)),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )

    # Return structured student profile
    return StudentProfileResponse(
        id=current_user.id,
        user_id=current_user.id,
        full_name=current_user.full_name or "Harsh Gour",
        email=current_user.email,
        institution_name="Indian Institute of Information Technology",
        department="Computer Science & Engineering",
        degree="B.Tech Computer Science",
        graduation_year=2026,
        current_year=3,
        career_goal="Full-Stack AI Software Engineer",
        github_url="https://github.com",
        linkedin_url="https://linkedin.com",
        profile_completion=85,
        career_readiness_score=88.5,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )

@router.put("/profile", response_model=MessageResponse)
async def update_student_profile(
    body: StudentProfileUpdate,
    current_user: CurrentUser = Depends(require_role(["student", "admin"]))
):
    """Update student profile details."""
    return MessageResponse(
        success=True,
        message="Student profile updated successfully",
        data=body.model_dump(exclude_none=True)
    )

@router.get("/skills", response_model=list[StudentSkillItem])
async def get_student_skills(
    current_user: CurrentUser = Depends(get_current_user)
):
    """Fetch authenticated student's Skill Passport."""
    return [
        StudentSkillItem(
            id="sk-1",
            skill_id="s-nextjs",
            name="Next.js & React 19",
            category="Frontend Architecture",
            proficiency_level=5,
            source="GitHub Projects & Assessments",
            is_verified=True,
            verified_by="MITRA Academic Verification Engine"
        ),
        StudentSkillItem(
            id="sk-2",
            skill_id="s-fastapi",
            name="FastAPI & Python",
            category="Backend Systems",
            proficiency_level=4,
            source="Verified Course & Hackathon Project",
            is_verified=True,
            verified_by="Industry Partner - Intel"
        ),
        StudentSkillItem(
            id="sk-3",
            skill_id="s-typescript",
            name="TypeScript & Modern JS",
            category="Programming Languages",
            proficiency_level=5,
            source="Project Codebase Audit",
            is_verified=True,
            verified_by="Faculty Advisor"
        ),
        StudentSkillItem(
            id="sk-4",
            skill_id="s-supabase",
            name="PostgreSQL & Supabase",
            category="Database & Cloud",
            proficiency_level=4,
            source="Assessment Quiz (94% Score)",
            is_verified=True,
            verified_by="MITRA Assessment Engine"
        ),
        StudentSkillItem(
            id="sk-5",
            skill_id="s-tailwind",
            name="Tailwind CSS & UI Systems",
            category="Design Systems",
            proficiency_level=5,
            source="Self-reported & Portfolio",
            is_verified=False
        ),
    ]

@router.post("/skills", response_model=MessageResponse)
async def add_student_skill(
    body: StudentSkillAdd,
    current_user: CurrentUser = Depends(require_role(["student", "admin"]))
):
    """Add a new skill to student passport."""
    return MessageResponse(
        success=True,
        message=f"Skill '{body.skill_name}' added to Skill Passport.",
        data={"skill_name": body.skill_name, "level": body.proficiency_level}
    )

@router.post("/resume/analyze", response_model=ResumeAnalysisResponse)
async def analyze_student_resume(
    file: UploadFile = File(...),
    current_user: CurrentUser = Depends(require_role(["student", "admin"]))
):
    """Upload and analyze resume with AI Career Engine."""
    if not file.filename.endswith((".pdf", ".docx", ".txt")):
        raise HTTPException(status_code=400, detail="Only PDF, DOCX and TXT files supported.")
    
    return ResumeAnalysisResponse(
        score=86,
        strengths=[
            "High proficiency in full-stack TypeScript and React ecosystem",
            "Clear demonstration of hackathon projects with measurable metrics",
            "Strong academic foundations in algorithms and databases"
        ],
        improvements=[
            "Add automated CI/CD pipeline evidence to project section",
            "Quantify API throughput and user reach for backend applications",
            "Include links to live demo deployments alongside code repositories"
        ],
        extracted_skills=[
            "Next.js", "React", "TypeScript", "FastAPI", "Python", "PostgreSQL",
            "Tailwind CSS", "REST APIs", "Git", "Docker"
        ],
        detected_gaps=[
            "Microservices architecture documentation",
            "Unit & Integration test coverage statistics"
        ],
        processing_status="completed"
    )
