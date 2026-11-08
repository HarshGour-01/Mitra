import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "MITRA Academia-Industry Platform API"
    app_version: str = "1.0.0"
    app_env: str = "development"
    api_prefix: str = "/api/v1"
    host: str = "0.0.0.0"
    port: int = 8000

    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./mitra.db")
    
    supabase_url: str = os.getenv("SUPABASE_URL", "https://jyklwvsrvvwhrlzvmjag.supabase.co")
    supabase_anon_key: str = os.getenv(
        "SUPABASE_ANON_KEY",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5a2x3dnNydnZ3aHJsenZtamFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM1MzIzMzgsImV4cCI6MjEwOTEwODMzOH0.0G892rZrZcIsRXO-8Q91dKR0MISULAbMBH9feeS4IBk"
    )
    supabase_service_role_key: str | None = os.getenv("SUPABASE_SERVICE_ROLE_KEY", None)
    supabase_jwt_secret: str | None = os.getenv("SUPABASE_JWT_SECRET", None)
    jwt_audience: str = "authenticated"

    gemini_api_key: str | None = os.getenv("GEMINI_API_KEY", None)
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

    cors_origins: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "https://mitra-platform.vercel.app",
    ]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
