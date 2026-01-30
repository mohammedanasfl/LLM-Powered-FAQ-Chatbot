from sqlalchemy import Column, String, DateTime
from sqlalchemy.sql import func
from app.models.database import Base
import uuid

class ChatSession(Base):
    __tablename__ = "chat_sessions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime, default=func.now())
