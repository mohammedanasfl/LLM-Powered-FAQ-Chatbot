from pydantic import BaseModel, Field

class UserQuery(BaseModel):
    question: str = Field(
        ..., 
        min_length=1, 
        max_length=2000,
        description="User's question to the AI"
    )
    session_id: str = Field(
        ...,
        description="Session ID to maintain conversation context"
    )
