from fastapi import HTTPException, status

class MitraException(HTTPException):
    def __init__(self, status_code: int, detail: str):
        super().__init__(status_code=status_code, detail=detail)

class EntityNotFoundException(MitraException):
    def __init__(self, entity_name: str, identifier: str | None = None):
        detail = f"{entity_name} with identifier '{identifier}' not found" if identifier else f"{entity_name} not found"
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail)

class PermissionDeniedException(MitraException):
    def __init__(self, detail: str = "Access denied: insufficient permissions"):
        super().__init__(status_code=status.HTTP_403_FORBIDDEN, detail=detail)

class ConflictException(MitraException):
    def __init__(self, detail: str = "Resource conflict occurred"):
        super().__init__(status_code=status.HTTP_409_CONFLICT, detail=detail)

class ValidationException(MitraException):
    def __init__(self, detail: str = "Validation failed"):
        super().__init__(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=detail)
