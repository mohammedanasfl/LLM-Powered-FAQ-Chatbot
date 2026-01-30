import { useState, useRef, useEffect } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import PromptInput from '../components/PromptInput/PromptInput';
import ResponseBox from '../components/ResponseBox/ResponseBox';
import { askLLM, loadChatHistory, getAllSessions } from '../services/llmService';
import './ChatPage.css';

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    const [sessions, setSessions] = useState([]);
    const messagesEndRef = useRef(null);

    const generateSessionId = () => {
        return `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    };

    const loadSessions = async () => {
        const allSessions = await getAllSessions();
        setSessions(allSessions);
    };

    useEffect(() => {
        const newSessionId = generateSessionId();
        setSessionId(newSessionId);
        loadSessions();

        loadChatHistory(newSessionId).then(history => {
            if (history.length > 0) {
                setMessages(history.map(msg => ({
                    role: msg.role,
                    content: msg.content
                })));
            }
        });
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (question) => {
        setIsLoading(true);
        setError(null);

        const userMessage = { role: 'user', content: question };
        setMessages(prev => [...prev, userMessage]);

        try {
            const answer = await askLLM(question, sessionId);

            const assistantMessage = { role: 'assistant', content: answer };
            setMessages(prev => [...prev, assistantMessage]);

            loadSessions();
        } catch (err) {
            setError(err.message);
            setMessages(prev => prev.slice(0, -1));
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewChat = () => {
        const newSessionId = generateSessionId();
        setSessionId(newSessionId);
        setMessages([]);
        setError(null);
    };

    const handleSelectSession = async (selectedSessionId) => {
        setSessionId(selectedSessionId);
        setError(null);

        const history = await loadChatHistory(selectedSessionId);
        setMessages(history.map(msg => ({
            role: msg.role,
            content: msg.content
        })));
    };

    return (
        <div className="chat-page">
            <Sidebar
                sessions={sessions}
                currentSessionId={sessionId}
                onSelectSession={handleSelectSession}
                onNewChat={handleNewChat}
            />

            <div className="chat-page__main">
                <Header />

                <div className="chat-page__scroll-container">
                    <div className="chat-page__content">
                        {messages.length === 0 && !isLoading && (
                            <div className="chat-page__welcome">
                                <h2 className="chat-page__welcome-title">
                                    👋 Hi! I'm Onami
                                </h2>
                                <p className="chat-page__welcome-subtitle">
                                    Where should we start?
                                </p>
                            </div>
                        )}

                        <ResponseBox
                            messages={messages}
                            isLoading={isLoading}
                            error={error}
                        />

                        {error && (
                            <div className="chat-page__error">
                                <div className="chat-page__error-icon">⚠️</div>
                                <div className="chat-page__error-content">
                                    <div className="chat-page__error-title">Oops! Something went wrong</div>
                                    <div className="chat-page__error-message">{error}</div>
                                </div>
                            </div>
                        )}

                        <div className="chat-page__input-wrapper">
                            <PromptInput onSubmit={handleSubmit} isLoading={isLoading} />
                        </div>

                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
