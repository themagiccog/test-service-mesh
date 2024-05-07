
from sqlalchemy import create_engine, MetaData, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

from dotenv import load_dotenv
load_dotenv()

POSTGRES_HOST=os.getenv('POSTGRES_HOST', 'localhost')
POSTGRES_USER=os.getenv('POSTGRES_USER', 'user')
POSTGRES_PASSWORD=os.getenv('POSTGRES_PASSWORD', 'password')
POSTGRES_DB=os.getenv('POSTGRES_DB', 'todos')


# Set this flag to switch between SQLite and PostgreSQL
use_sqlite = os.getenv('USE_SQLITE', 'False').lower() in ['true', '1', 't']

print(f'Using Sqlite: {use_sqlite}')

if use_sqlite:
    SQLALCHEMY_DATABASE_URL = "sqlite:///./todos.db"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    SQLALCHEMY_DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}/{POSTGRES_DB}"
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


metadata = MetaData() #needed for alembic autogenerate
Base = declarative_base(metadata=metadata)
