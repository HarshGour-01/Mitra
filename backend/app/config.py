import os
from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = "MITRA Academia-Industry Platform API"
    app_version: str = "1.0.0"
    api_prefix: str = "/api/v1"
    supabase_url: str = os.getenv("SUPABASE_URL", "https://jyklwvsrvvwhrlzvmjag.supabase.co")
    supabase_anon_key: str = os.getenv("SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5a2x3dnNydnZ3aHJsenZtamFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM1MzIzMzgsImV4cCI6MjEwOTEwODMzOH0.0G892rZrZcIsRXO-8Q91dKR0MISULAbMBH9feeS4IBk")
    supabase_service_role_key: str | None = os.getenv("SUPABASE_SERVICE_ROLE_KEY", None)
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ]

settings = Settings()
