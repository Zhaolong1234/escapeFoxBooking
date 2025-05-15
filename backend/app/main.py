from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database import SessionLocal, engine, Base
from app.models import user
from app.schemas import user as user_schema
from app.crud import user as user_crud

from app.api.event_theme import router as event_theme_router
from app.api.user import router as user_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


# ✅ 注册 EventTheme 路由
app.include_router(event_theme_router, prefix="/api")

app.include_router(user_router, prefix="/api")

