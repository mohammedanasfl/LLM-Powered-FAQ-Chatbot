from fastapi import APIRouter, HTTPException
from app.schemas.llm_schema import UserQuery
from app.services.llm_service import ask_llm_service

router = APIRouter(prefix="/llm", tags=["LLM"])

@router.post("/ask")
def ask_llm(payload: UserQuery):
    try:
        answer = ask_llm_service(payload.question, payload.session_id)
        return {"answer": answer}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
