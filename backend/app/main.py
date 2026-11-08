import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routers import auth, students, recruiters, institutions, opportunities, applications, ai_intelligence

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Production-grade FastAPI backend for MITRA - Academia-Industry Collaboration Platform.",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": "MITRA FastAPI Backend",
        "version": settings.app_version,
    }

# Include routers under /api/v1
app.include_router(auth.router, prefix=settings.api_prefix)
app.include_router(students.router, prefix=settings.api_prefix)
app.include_router(recruiters.router, prefix=settings.api_prefix)
app.include_router(institutions.router, prefix=settings.api_prefix)
app.include_router(opportunities.router, prefix=settings.api_prefix)
app.include_router(applications.router, prefix=settings.api_prefix)
app.include_router(ai_intelligence.router, prefix=settings.api_prefix)

def export_openapi():
    with open("openapi.json", "w") as f:
        json.dump(app.openapi(), f, indent=2)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
