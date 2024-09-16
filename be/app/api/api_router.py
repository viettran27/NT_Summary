from fastapi import APIRouter
from app.api import api_quantity

router = APIRouter()

router.include_router(api_quantity.router, tags=["Quantity"], prefix="/quantity")