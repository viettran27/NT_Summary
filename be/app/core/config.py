from sqlalchemy.engine import URL

class Settings():
    API_PREFIX = ''
    BACKEND_CORS_ORIGINS = ['*']
    DATABASE_URL = URL.create(
        "mssql+pyodbc",
        username="viettran",
        password="Namthuan@123#",
        host="172.16.60.100",
        port=1433,
        database="INCENTIVE",
        query={
           "driver": "ODBC Driver 17 for SQL Server",
           "TrustServerCertificate": "yes" 
        }
    )

settings = Settings()