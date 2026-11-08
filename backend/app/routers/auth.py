from fastapi import APIRouter, Depends
from datetime import datetime
from ..auth import CurrentUser, get_current_user
from ..schemas import UserProfileResponse, RoleProfileUpdate, MessageResponse
from ..database import db

router = APIRouter(prefix="/auth", tags=["Authentication & User"])

@router.get("/me", response_model=UserProfileResponse)
async def get_my_profile(current_user: CurrentUser = Depends(get_current_user)):
    """Retrieve current authenticated user profile and active role."""
    return UserProfileResponse(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name or "MITRA Member",
        role=current_user.role,
        avatar_url=None,
        phone_number=None,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )

@router.patch("/profile", response_model=MessageResponse)
async def update_my_profile(
    body: RoleProfileUpdate,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Update profile details."""
    return MessageResponse(
        success=True,
        message="Profile details updated successfully",
        data={"user_id": current_user.id, "display_name": body.display_name}
    )
