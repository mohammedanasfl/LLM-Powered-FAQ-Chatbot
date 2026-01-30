from app.models.database import SessionLocal
from app.models.chat_session import ChatSession
from app.models.chat_message import ChatMessage
import sys

sys.stdout.reconfigure(encoding='utf-8')

db = SessionLocal()

print("=" * 50)
print("CHAT SESSIONS")
print("=" * 50)
sessions = db.query(ChatSession).all()
for session in sessions:
    print(f"ID: {session.id}")
    print(f"Created: {session.created_at}")
    print("-" * 50)

print("\n" + "=" * 50)
print("CHAT MESSAGES")
print("=" * 50)
messages = db.query(ChatMessage).order_by(ChatMessage.created_at).all()
for msg in messages:
    print(f"ID: {msg.id}")
    print(f"Session: {msg.session_id}")
    print(f"Role: {msg.role}")
    content_preview = msg.content[:100] if len(msg.content) > 100 else msg.content
    print(f"Content: {content_preview}")
    print(f"Time: {msg.created_at}")
    print("-" * 50)

print(f"\nTotal Sessions: {len(sessions)}")
print(f"Total Messages: {len(messages)}")

db.close()
