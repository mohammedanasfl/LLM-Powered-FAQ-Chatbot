from pydantic import BaseModel
from typing import List
from datetime import datetime

class ChatMessageSchema(BaseModel):
    id: str
    session_id: str
    role: str
    content: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class ChatHistoryResponse(BaseModel):
    session_id: str
    messages: List[ChatMessageSchema]
