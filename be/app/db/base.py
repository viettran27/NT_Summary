from typing import Generator
from app.core.config import settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
engine2 = create_engine(settings.DATABASE_URL2, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
SessionLocal2 = sessionmaker(autocommit=False, autoflush=False, bind=engine2)
Base = declarative_base()

def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

def get_db2() -> Generator:
    try:
        db = SessionLocal2()
        yield db
    finally:
        db.close()
        