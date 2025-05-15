from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base

from app.schemas.event_theme import EventThemeSchema, EventThemeCreate,EventSlotBulkCreate,Participation,EventSlotCreate

from app.crud import event_theme as crud
from app.database import get_db
from typing import List
from app.auth import get_current_user




router = APIRouter()

@router.get("/themes", response_model=List[EventThemeSchema])
def read_themes(db: Session = Depends(get_db)):
    return crud.get_all_themes(db)
@router.post("/themes", response_model=EventThemeSchema)
def create_theme(theme: EventThemeCreate, db: Session = Depends(get_db)):
    return crud.create_theme(db, theme)
@router.get("/themes/{theme_id}", response_model=EventThemeSchema)
def read_theme(theme_id: int, db: Session = Depends(get_db)):
    return crud.get_theme(db, theme_id)

@router.post("/slots")
def create_slots_bulk(data: EventSlotCreate, db: Session = Depends(get_db)):
    created = []
    
    created= crud.create_slot(db, data)
        
    return created

@router.post("/slots/bulk")
def create_slots_bulk(data: EventSlotBulkCreate, db: Session = Depends(get_db)):
    created = []
    for slot in data.slots:
        created_slot = crud.create_slot(db, slot)
        created.append(created_slot)
    return created

# @router.post("/participation")
# def create_participation(data:Participation,db:Session = Depends(get_db)):
#     if data.name == str and data.email== str:
#         return crud.create_participation(db,data)
@router.post("/participation")
def create_participation_route(
    data: Participation,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):
    print("接收到请求体：", data.dict())

    return crud.create_participation(db=db, data=data, user_id=current_user)
