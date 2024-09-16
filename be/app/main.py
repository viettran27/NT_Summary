from fastapi import FastAPI, HTTPException, Request
from starlette.middleware.cors import CORSMiddleware
from app.api.api_router import router
from app.core.config import settings
from app.db.base import Base, engine

Base.metadata.create_all(bind=engine)

def get_application() -> FastAPI:
    application = FastAPI()
    application.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    application.include_router(router, prefix=settings.API_PREFIX)

    return application

app = get_application()
