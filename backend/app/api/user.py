from fastapi import APIRouter, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.database import SessionLocal
from app.models import user
from app.schemas import user as user_schema
from app.crud import user as user_crud
from app.auth import create_access_token, get_current_user
from app.api.event_theme import router as event_theme_router


router = APIRouter() 

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/users/", response_model=user_schema.UserOut)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    return user_crud.create_user(db=db, user=user)

@router.get("/users/", response_model=list[user_schema.UserOut])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return user_crud.get_users(db, skip=skip, limit=limit)
@router.get("/users/me")
def get_current_user_info(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user),
):      
        user = user_crud.get_user_by_id(db, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="用户不存在")
        return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }
SECRET_KEY = "your-secret"
ALGORITHM = "HS256"

@router.post("/login", response_model=user_schema.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = user_crud.get_user_by_email(db, form_data.username)
    print("请求到了 login 接口")
    print("用户名:", form_data.username)
    print("密码:", form_data.password)

    if not user or user.password != form_data.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token(data={"user_id": user.id})
    return {"access_token": token, "token_type": "bearer"}