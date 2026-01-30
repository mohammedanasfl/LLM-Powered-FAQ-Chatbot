from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import llm, chat

app = FastAPI(
    title="LLM Backend API",
    description="A simple API that sends questions to an LLM and returns answers",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(llm.router)
app.include_router(chat.router)

@app.get("/")
def read_root():
    return {"message": "LLM Backend API is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)