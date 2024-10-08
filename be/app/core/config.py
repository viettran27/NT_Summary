from sqlalchemy.engine import URL
from dotenv import load_dotenv
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent
env_file = BASE_DIR / ".env"
load_dotenv(env_file)

class Settings():
    API_PREFIX = ''
    BACKEND_CORS_ORIGINS = ['*']
    DATABASE_URL = URL.create(
        "mssql+pyodbc",
        username=os.getenv("DB_USERNAME"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=1433,
        database=os.getenv("DATABASE1"),
        query={
           "driver": "ODBC Driver 17 for SQL Server",
           "TrustServerCertificate": "yes" 
        }
    )
    DATABASE_URL2 = URL.create(
        "mssql+pyodbc",
        username=os.getenv("DB_USERNAME"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=1433,
        database=os.getenv("DATABASE2"),
        query={
           "driver": "ODBC Driver 17 for SQL Server",
           "TrustServerCertificate": "yes" 
        }
    )

settings = Settings()