from typing import Annotated, Optional
import httpx
from fastapi import Depends, HTTPException, Security, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel

from .config import settings

security = HTTPBearer(auto_error=False)

class CurrentUser(BaseModel):
    id: str
    email: str
    role: str = "student"
    full_name: Optional[str] = "User"

async def get_current_user(
    credentials: Annotated[Optional[HTTPAuthorizationCredentials], Security(security)]
) -> CurrentUser:
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authentication token. Please sign in.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = credentials.credentials

    # Verify against Supabase Auth user endpoint
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(
                f"{settings.supabase_url}/auth/v1/user",
                headers={
                    "Authorization": f"Bearer {token}",
                    "apikey": settings.supabase_anon_key,
                },
            )
            if resp.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Expired or invalid authentication session.",
                )
            user_data = resp.json()
            user_id = user_data.get("id")
            email = user_data.get("email", "")
            user_metadata = user_data.get("user_metadata", {})
            role = user_metadata.get("role", "student")
            full_name = user_metadata.get("full_name", user_metadata.get("display_name", email.split("@")[0]))
            
            return CurrentUser(
                id=user_id,
                email=email,
                role=role,
                full_name=full_name,
            )
    except httpx.RequestError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service temporarily unreachable.",
        )

def require_role(allowed_roles: list[str]):
    def role_checker(current_user: Annotated[CurrentUser, Depends(get_current_user)]):
        if current_user.role not in allowed_roles and current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Requires one of roles: {', '.join(allowed_roles)}",
            )
        return current_user
    return role_checker
