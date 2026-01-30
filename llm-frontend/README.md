# LLM Frontend

Modern React frontend for the AI chatbot application.

## Features

- 🎨 Modern dark theme with blue accents
- ⚡ Built with React + Vite for fast development
- 🧩 Reusable component architecture
- 📱 Responsive design
- ✨ Smooth animations and transitions
- 🔄 Loading states and error handling

## Project Structure

```
src/
 ├── components/
 │    ├── Header/          # App title and subtitle
 │    ├── PromptInput/     # User input with submit button
 │    └── ResponseBox/     # AI response display
 ├── pages/
 │    └── ChatPage.jsx     # Main chat interface
 ├── services/
 │    └── llmService.js    # API communication layer
 ├── styles/
 │    └── theme.css        # Global styles and CSS variables
 ├── App.jsx              # Root component
 └── main.jsx             # Application entry point
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Make sure the backend is running:**
   - Backend should be running on `http://127.0.0.1:8000`
   - Check that the `/llm/ask` endpoint is accessible

4. **Open the application:**
   - The app will automatically open at `http://localhost:3000`

## Usage

1. Type your question in the input box
2. Click "Ask" or press Enter
3. Wait for the AI response
4. The response will appear below the input

## API Integration

The frontend connects to the backend API at:
- **Endpoint:** `POST http://127.0.0.1:8000/llm/ask`
- **Request Body:** `{ "question": "your question here" }`
- **Response:** `{ "answer": "AI response" }`

## Development

- **Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Preview Build:** `npm run preview`

## Tech Stack

- React 18
- Vite (Fast build tool)
- Plain CSS with CSS Variables
- Fetch API for HTTP requests
