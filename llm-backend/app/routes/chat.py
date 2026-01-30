from fastapi import APIRouter
from app.services.chat_service import get_chat_history, clear_chat_history, get_all_sessions
from app.schemas.chat_schema import ChatMessageSchema
from typing import List

router = APIRouter(prefix="/chat", tags=["Chat History"])

@router.get("/history/{session_id}", response_model=List[ChatMessageSchema])
def get_history(session_id: str):
    messages = get_chat_history(session_id)
    return messages

@router.delete("/history/{session_id}")
def clear_history(session_id: str):
    clear_chat_history(session_id)
    return {"message": "Chat history cleared successfully"}

@router.get("/sessions")
def list_sessions():
    sessions = get_all_sessions()
    return [{"id": s.id, "created_at": s.created_at} for s in sessions]
