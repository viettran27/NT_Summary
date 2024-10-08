from fastapi import APIRouter
from app.api import api_quantity, api_summary

router = APIRouter()

router.include_router(api_quantity.router, tags=["Quantity"], prefix="/quantity")
router.include_router(api_summary.router, tags=["Summary"], prefix="/summary")