from sqlalchemy import Column, Integer, String, Float, Date, Time, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.user import User

class EventTheme(Base):
    __tablename__ = "event_themes"
    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=True)
    title = Column(String, nullable=True)
    rating = Column(Float, nullable=True)
    description = Column(String, nullable=True)
    slots = relationship("EventSlot", back_populates="theme", cascade="all, delete")


class EventSlot(Base):
    __tablename__ = "event_slots"
    id = Column(Integer, primary_key=True, index=True)
    theme_id = Column(Integer, ForeignKey("event_themes.id"))
    date = Column(Date)
    time = Column(Time)
    max_people = Column(Integer)
    theme = relationship("EventTheme", back_populates="slots")


class EventParticipation(Base):
    __tablename__ = "event_participation"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    slot_id = Column(Integer, ForeignKey("event_slots.id"))
    name = Column(String, nullable=True)
    email = Column(String, nullable=True)
    user = relationship("User")
    slot = relationship("EventSlot")
