from __future__ import annotations
from pydantic import BaseModel
from typing import Optional
from datetime import date, time
from typing import List



class EventThemeCreate(BaseModel):
    title: str
    image_url: Optional[str] = None
    rating: Optional[float] = None
    description: Optional[str] = None
    slots: List[EventSlotCreate]

    class Config:
        orm_mode = True
class EventSlotCreate(BaseModel):
    date: date
    time: time
    max_people: int
    class Config:
        orm_mode = True
class EventSlotSchema(EventSlotCreate):
    id: int
class EventSlotBulkCreate(BaseModel):
    slots: List[EventSlotCreate]


class EventThemeSchema(BaseModel):
    id: int
    title: str
    image_url: str
    rating: float
    description: str
    slots: List[EventSlotSchema]

    class Config:
        orm_mode = True
class Participation(BaseModel):
    slot_id: int
    name: str
    email: str
   
    
    class Config:
        orm_mode = True


    
