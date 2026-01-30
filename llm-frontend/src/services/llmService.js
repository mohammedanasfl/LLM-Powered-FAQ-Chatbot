const API_BASE_URL = 'http://127.0.0.1:8000';

export async function askLLM(question, sessionId) {
    try {
        const response = await fetch(`${API_BASE_URL}/llm/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question,
                session_id: sessionId
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);

            if (response.status === 500 && errorData?.detail) {
                throw new Error(errorData.detail);
            } else if (response.status === 422) {
                throw new Error('Your message is invalid. Please check the length and try again.');
            } else if (response.status === 404) {
                throw new Error('Cannot connect to the server. Please check if the backend is running.');
            } else {
                throw new Error(`Server error (${response.status}). Please try again later.`);
            }
        }

        const data = await response.json();
        return data.answer;

    } catch (error) {
        console.error('Error calling LLM API:', error);

        if (error.message.includes('fetch')) {
            throw new Error('Cannot connect to the server. Please make sure the backend is running.');
        }

        throw error;
    }
}

export async function loadChatHistory(sessionId) {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/history/${sessionId}`);
        if (response.ok) {
            return await response.json();
        }
        return [];
    } catch (error) {
        console.error('Error loading chat history:', error);
        return [];
    }
}

export async function getAllSessions() {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/sessions`);
        if (response.ok) {
            return await response.json();
        }
        return [];
    } catch (error) {
        console.error('Error loading sessions:', error);
        return [];
    }
}
