from app.config.config import SYSTEM_PROMPT, ROUTEWAY_API_KEY
from app.services.chat_service import save_chat_message, get_chat_history
import requests

ROUTEWAY_URL = "https://api.routeway.ai/v1/chat/completions"

HEADERS = {
    "Authorization": f"Bearer {ROUTEWAY_API_KEY}",
    "Content-Type": "application/json"
}

def ask_llm_service(question: str, session_id: str) -> str:
    save_chat_message(session_id=session_id, role="user", content=question)
    
    chat_history = get_chat_history(session_id=session_id)
    conversation_history = [
        {"role": msg.role, "content": msg.content} 
        for msg in chat_history
    ]

    payload = {
        "model": "deepseek-r1:free",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            *conversation_history
        ]
    }

    response = requests.post(
        ROUTEWAY_URL,
        headers=HEADERS,
        json=payload,
        timeout=30
    )

    if response.status_code != 200:
        raise Exception(f"Routeway error: {response.status_code}")

    data = response.json()
    assistant_reply = data["choices"][0]["message"]["content"]

    save_chat_message(session_id=session_id, role="assistant", content=assistant_reply)

    return assistant_reply
