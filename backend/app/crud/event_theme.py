from sqlalchemy.orm import Session
from app.schemas.event_theme import EventThemeCreate
from app.models.event_theme import EventTheme
from app.models.event_theme import EventSlot
from app.models.event_theme import EventParticipation
from fastapi import HTTPException
from app.schemas.event_theme import Participation
from app.schemas.event_theme import EventSlotCreate



def get_all_themes(db: Session):
    return db.query(EventTheme).all()

def create_theme(db: Session, theme: EventThemeCreate):
    db_theme = EventTheme(**theme.dict())
    db.add(db_theme)
    db.commit()
    db.refresh(db_theme)
    return db_theme

def get_theme(db: Session, theme_id: int):
    theme = db.query(EventTheme).filter(EventTheme.id == theme_id).first()
    if not theme:
        raise HTTPException(status_code=404, detail="Theme not found")
    return theme
def create_slot(db: Session, slot: EventSlotCreate):
    existing_slot = db.query(EventSlot).filter(
        EventSlot.theme_id == slot.theme_id,
        EventSlot.date == slot.date,
        EventSlot.time == slot.time
    ).first()
    if existing_slot:
        raise HTTPException(status_code=400, detail="Time slot already exists")
    
    db_slot = EventSlot(**slot.dict())  # 这里要创建的是 EventSlot
    db.add(db_slot)
    db.commit()
    db.refresh(db_slot)
    return db_slot

def get_slot(db: Session, slot_id: int):
    slot = db.query(EventSlot).filter(EventSlot.id ==slot_id).first()
    if not slot:
        raise HTTPException(status_code=404, detail="Theme not found")
    return slot

def create_participation(db: Session, data: Participation, user_id: int):
    slot = db.query(EventSlot).filter(EventSlot.id == data.slot_id).first()
    if not slot:
        raise HTTPException(status_code=404, detail="时间段不存在")

    db_data = EventParticipation(
        slot_id=data.slot_id,
        user_id=user_id,
        name=data.name,
        email=data.email
    )
    db.add(db_data)
    db.commit()
    db.refresh(db_data)
    return db_data

