from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    class Config:
        from_attributes = True

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    password: str
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
