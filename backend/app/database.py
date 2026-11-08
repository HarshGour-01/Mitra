import httpx
from typing import Any, Optional
from .config import settings

class SupabaseDb:
    def __init__(self):
        self.base_url = f"{settings.supabase_url}/rest/v1"
        self.anon_key = settings.supabase_anon_key

    def _headers(self, token: Optional[str] = None):
        headers = {
            "apikey": self.anon_key,
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        }
        if token:
            headers["Authorization"] = f"Bearer {token}"
        else:
            headers["Authorization"] = f"Bearer {self.anon_key}"
        return headers

    async def get(self, table: str, params: Optional[dict[str, Any]] = None, token: Optional[str] = None) -> list[dict[str, Any]]:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(
                f"{self.base_url}/{table}",
                headers=self._headers(token),
                params=params or {},
            )
            if resp.status_code >= 400:
                return []
            return resp.json()

    async def post(self, table: str, data: dict[str, Any], token: Optional[str] = None) -> Optional[dict[str, Any]]:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(
                f"{self.base_url}/{table}",
                headers=self._headers(token),
                json=data,
            )
            if resp.status_code >= 400:
                return None
            res = resp.json()
            return res[0] if isinstance(res, list) and len(res) > 0 else res

    async def patch(self, table: str, params: dict[str, Any], data: dict[str, Any], token: Optional[str] = None) -> Optional[dict[str, Any]]:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.patch(
                f"{self.base_url}/{table}",
                headers=self._headers(token),
                params=params,
                json=data,
            )
            if resp.status_code >= 400:
                return None
            res = resp.json()
            return res[0] if isinstance(res, list) and len(res) > 0 else res

db = SupabaseDb()
