from app.models.database import Base, engine
from app.models.chat_session import ChatSession
from app.models.chat_message import ChatMessage

def init_database():
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

if __name__ == "__main__":
    init_database()
