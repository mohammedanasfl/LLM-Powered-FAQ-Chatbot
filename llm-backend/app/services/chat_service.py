from app.models.database import SessionLocal
from app.models.chat_session import ChatSession
from app.models.chat_message import ChatMessage
import uuid

def get_or_create_session(session_id: str):
    db = SessionLocal()
    try:
        session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
        if not session:
            session = ChatSession(id=session_id)
            db.add(session)
            db.commit()
            db.refresh(session)
        return session
    finally:
        db.close()

def save_chat_message(session_id: str, role: str, content: str):
    db = SessionLocal()
    try:
        get_or_create_session(session_id)
        
        message = ChatMessage(
            id=str(uuid.uuid4()),
            session_id=session_id,
            role=role,
            content=content
        )
        db.add(message)
        db.commit()
        db.refresh(message)
        return message
    finally:
        db.close()

def get_chat_history(session_id: str, limit: int = 10):
    db = SessionLocal()
    try:
        messages = db.query(ChatMessage).filter(
            ChatMessage.session_id == session_id
        ).order_by(ChatMessage.created_at).limit(limit).all()
        return messages
    finally:
        db.close()

def clear_chat_history(session_id: str):
    db = SessionLocal()
    try:
        db.query(ChatMessage).filter(
            ChatMessage.session_id == session_id
        ).delete()
        db.commit()
    finally:
        db.close()

def get_all_sessions():
    db = SessionLocal()
    try:
        sessions = db.query(ChatSession).order_by(ChatSession.created_at.desc()).all()
        return sessions
    finally:
        db.close()
