from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models import user as user_model
from app.schemas import user as user_schema
from app.models.user import User
from app.schemas.user import UserCreate

def create_user(db: Session, user: user_schema.UserCreate):
    # 检查用户名是否存在
    existing_user = db.query(user_model.User).filter(user_model.User.name == user.name).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="用户名已存在")

    # 如果不存在，就创建*********–––---–
    db_user = User(
    name=user.name,
    email=user.email,
    password=user.password  # 明确每个字段都传入
)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()
