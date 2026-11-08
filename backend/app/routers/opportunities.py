from fastapi import APIRouter, Depends, Query, HTTPException, status
from datetime import datetime, date, timedelta
from typing import Optional
from ..auth import CurrentUser, get_current_user, require_role
from ..schemas import OpportunityResponse, OpportunityCreate, MessageResponse
from ..database import db

router = APIRouter(prefix="/opportunities", tags=["Opportunities & Jobs"])

# Seed opportunities for demo and real querying
SEED_OPPORTUNITIES = [
    OpportunityResponse(
        id="opp-101",
        recruiter_id="rec-01",
        company_name="Microsoft Research India",
        company_logo="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=128&q=80",
        title="AI Systems & LLM Research Intern",
        description="Collaborate with senior researchers and engineers developing next-generation multimodal agent runtimes and low-latency inference pipelines.",
        responsibilities="Design benchmark evaluations, implement Python/C++ kernels, analyze latency bottlenecks, and publish findings.",
        opportunity_type="research",
        location="Bengaluru (Hybrid)",
        work_mode="hybrid",
        duration="6 Months",
        stipend_min=65000,
        stipend_max=85000,
        eligibility="Pre-final or final year B.Tech/M.Tech in CS/AI with strong PyTorch/C++ fundamentals.",
        application_deadline=date.today() + timedelta(days=25),
        required_skills=["Python", "PyTorch", "LLM Fine-tuning", "C++", "Distributed Systems"],
        status="open",
        applicant_count=34,
        created_at=datetime.utcnow() - timedelta(days=5),
        updated_at=datetime.utcnow() - timedelta(days=5),
    ),
    OpportunityResponse(
        id="opp-102",
        recruiter_id="rec-02",
        company_name="Zerodha Tech",
        company_logo="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&q=80",
        title="Full-Stack Web Architect (Frontend Focus)",
        description="Build ultra-responsive, highly accessible financial dashboards and collaborative workspaces using Next.js, TypeScript, and WebSockets.",
        responsibilities="Build accessible components, optimize Core Web Vitals, maintain state machines, and ensure sub-50ms render latency.",
        opportunity_type="internship",
        location="Remote (India)",
        work_mode="remote",
        duration="6 Months (PPO Potential)",
        stipend_min=45000,
        stipend_max=60000,
        eligibility="Undergraduate students with production-grade React/Next.js and TypeScript portfolio.",
        application_deadline=date.today() + timedelta(days=18),
        required_skills=["Next.js", "React 19", "TypeScript", "Tailwind CSS", "WebSockets"],
        status="open",
        applicant_count=82,
        created_at=datetime.utcnow() - timedelta(days=8),
        updated_at=datetime.utcnow() - timedelta(days=8),
    ),
    OpportunityResponse(
        id="opp-103",
        recruiter_id="rec-03",
        company_name="Razorpay Labs",
        company_logo="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&q=80",
        title="Backend Infrastructure & Platform Intern",
        description="Scale payment event processing clusters, configure FastAPI microservices, and improve distributed trace telemetry.",
        responsibilities="Construct robust REST APIs, design database migrations, build Kafka consumer pipelines, and write integration tests.",
        opportunity_type="internship",
        location="Bengaluru (On-Site)",
        work_mode="on_site",
        duration="6 Months",
        stipend_min=50000,
        stipend_max=70000,
        eligibility="Students graduating in 2026 or 2027 with demonstrated backend server skills.",
        application_deadline=date.today() + timedelta(days=14),
        required_skills=["FastAPI", "Python", "PostgreSQL", "Kafka", "Docker"],
        status="open",
        applicant_count=61,
        created_at=datetime.utcnow() - timedelta(days=10),
        updated_at=datetime.utcnow() - timedelta(days=10),
    ),
    OpportunityResponse(
        id="opp-104",
        recruiter_id="rec-04",
        company_name="Tata Consultancy Services",
        company_logo="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&q=80",
        title="Academia-Industry Collaborative Project: Smart Campus IoT",
        description="Joint university project sponsored by TCS Research to develop sensor telemetry collectors and energy efficiency algorithms.",
        responsibilities="Deploy edge microcontrollers, aggregate real-time metrics, and write project technical milestone reports.",
        opportunity_type="project",
        location="Campus + Virtual",
        work_mode="hybrid",
        duration="4 Months",
        stipend_min=25000,
        stipend_max=35000,
        eligibility="Open to student teams from partner academic institutions.",
        application_deadline=date.today() + timedelta(days=30),
        required_skills=["IoT", "Python", "MQTT", "Data Visualization", "Embedded C"],
        status="open",
        applicant_count=19,
        created_at=datetime.utcnow() - timedelta(days=3),
        updated_at=datetime.utcnow() - timedelta(days=3),
    ),
]

@router.get("", response_model=list[OpportunityResponse])
async def list_opportunities(
    type: Optional[str] = Query(None, description="Filter by type (internship, job, project, research)"),
    work_mode: Optional[str] = Query(None, description="Filter by work mode (remote, hybrid, on_site)"),
    search: Optional[str] = Query(None, description="Search keyword"),
):
    """List opportunities with multi-parameter filtering."""
    results = SEED_OPPORTUNITIES
    if type:
        results = [o for o in results if o.opportunity_type.lower() == type.lower()]
    if work_mode:
        results = [o for o in results if o.work_mode and o.work_mode.lower() == work_mode.lower()]
    if search:
        s = search.lower()
        results = [
            o for o in results 
            if s in o.title.lower() or s in (o.description or "").lower() or s in o.company_name.lower()
        ]
    return results

@router.get("/{opportunity_id}", response_model=OpportunityResponse)
async def get_opportunity_detail(opportunity_id: str):
    """Retrieve full details for an individual opportunity."""
    for opp in SEED_OPPORTUNITIES:
        if opp.id == opportunity_id:
            return opp
    raise HTTPException(status_code=404, detail="Opportunity not found.")

@router.post("", response_model=OpportunityResponse, status_code=status.HTTP_201_CREATED)
async def create_opportunity(
    body: OpportunityCreate,
    current_user: CurrentUser = Depends(require_role(["recruiter", "admin"]))
):
    """Create a new job, internship, or collaborative project."""
    new_opp = OpportunityResponse(
        id=f"opp-{len(SEED_OPPORTUNITIES) + 101}",
        recruiter_id=current_user.id,
        company_name=current_user.full_name or "Partner Organization",
        company_logo=None,
        title=body.title,
        description=body.description,
        responsibilities=body.responsibilities,
        opportunity_type=body.opportunity_type,
        location=body.location,
        work_mode=body.work_mode,
        duration=body.duration,
        stipend_min=body.stipend_min,
        stipend_max=body.stipend_max,
        eligibility=body.eligibility,
        application_deadline=body.application_deadline,
        required_skills=body.required_skills,
        status="open",
        applicant_count=0,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    SEED_OPPORTUNITIES.insert(0, new_opp)
    return new_opp
