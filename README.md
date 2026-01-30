# LLM-Powered FAQ Chatbot

A modern, full-stack web application that leverages Generative AI to provide intelligent FAQ responses. The chatbot uses session-based conversations to maintain context and deliver consistent, polite, and helpful answers to user questions.

## 📋 About

This project is a production-ready FAQ chatbot that combines a FastAPI backend with a React frontend to create an intuitive conversational interface. The application uses AI to understand user queries and provide accurate, context-aware responses while maintaining conversation history across multiple chat sessions.

### Key Features

- 🤖 **AI-Powered Responses**: Uses Routeway AI API for intelligent question answering
- 💬 **Session-Based Chat**: Maintains separate conversation histories for multiple chat sessions
- 🎨 **Modern UI**: Clean, responsive React interface with ChatGPT-like design
- 📊 **Persistent Storage**: SQLite database for storing chat history
- 🔄 **Real-time Interaction**: Fast API responses with CORS-enabled backend
- 🔐 **Environment Security**: Secure API key management with `.env` files

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern, high-performance Python web framework
- **SQLAlchemy**: SQL toolkit and ORM for database operations
- **SQLite**: Lightweight database for chat history persistence
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: Lightning-fast ASGI server
- **python-dotenv**: Environment variable management

### Frontend
- **React 18**: Modern UI library with hooks
- **Vite**: Next-generation frontend build tool
- **JavaScript (ES6+)**: Modern JavaScript features

## 📁 Project Structure

```
LLM-Powered-FAQ-Chatbot/
├── llm-backend/              # FastAPI backend
│   ├── app/
│   │   ├── config/          # Configuration and system prompts
│   │   ├── models/          # SQLAlchemy database models
│   │   ├── routes/          # API route handlers
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic layer
│   │   └── main.py          # FastAPI application entry point
│   ├── .env.example         # Environment variables template
│   ├── requirements.txt     # Python dependencies
│   └── chat_history.db      # SQLite database (auto-generated)
│
├── llm-frontend/            # React frontend
│   ├── src/                 # React components and logic
│   ├── package.json         # Node.js dependencies
│   └── vite.config.js       # Vite configuration
│
├── .gitignore              # Git ignore rules (includes .env)
└── README.md               # This file
```

## 🚀 Setup Instructions

### Prerequisites

- **Python 3.8+** installed on your system
- **Node.js 16+** and npm installed
- A **Routeway API key** (or OpenAI API key if you prefer)

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd llm-backend
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     # Windows
     copy .env.example .env

     # macOS/Linux
     cp .env.example .env
     ```
   - Edit `.env` and add your API key:
     ```
     ROUTEWAY_API_KEY=your_actual_api_key_here
     ```

5. **Initialize the database**:
   ```bash
   python -m app.models.init_db
   ```

6. **Run the backend server**:
   ```bash
   uvicorn app.main:app --reload
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd llm-frontend
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## 🎯 Usage

1. **Start both servers** (backend and frontend) as described above
2. **Open your browser** and navigate to `http://localhost:5173`
3. **Start chatting** by typing your question in the input field
4. **Create new sessions** using the "New Chat" button to start fresh conversations
5. **View chat history** - all conversations are automatically saved

## 🔒 Security Notes

- ✅ The `.env` file is already included in `.gitignore` to prevent accidental commits
- ✅ Never commit your API keys to version control
- ✅ Use `.env.example` as a template for required environment variables
- ✅ The database file (`chat_history.db`) is also gitignored for privacy

## 📡 API Endpoints

### Main Endpoints

- `GET /` - Health check endpoint
- `POST /ask` - Send a question to the AI and get a response
- `GET /chat/history/{session_id}` - Get chat history for a specific session
- `DELETE /chat/history/{session_id}` - Clear chat history for a session
- `GET /chat/sessions` - Get all chat sessions

### API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🧪 Testing

You can test the API using curl:

```bash
# Health check
curl http://localhost:8000/

# Ask a question
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is FastAPI?", "session_id": "test-session"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🐛 Troubleshooting

### Backend Issues

- **ModuleNotFoundError**: Make sure you've activated the virtual environment and installed all dependencies
- **Database errors**: Try deleting `chat_history.db` and running `python -m app.models.init_db` again
- **API key errors**: Verify your `.env` file exists and contains a valid API key

### Frontend Issues

- **Port already in use**: Change the port in `vite.config.js` or stop the process using port 5173
- **Connection refused**: Ensure the backend is running on `http://localhost:8000`

## 📧 Support

For issues and questions, please open an issue on the GitHub repository.
