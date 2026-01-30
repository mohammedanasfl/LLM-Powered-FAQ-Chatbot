import './ResponseBox.css';

function ResponseBox({ messages, isLoading, error }) {
    if (messages.length === 0 && !isLoading && !error) {
        return (
            <div className="response-box__empty">
                <p className="response-box__empty-text">
                    👋 Start a conversation by asking a question below
                </p>
            </div>
        );
    }

    return (
        <div className="response-box">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`message message--${message.role}`}
                >
                    <div className="message__avatar">
                        {message.role === 'user' ? '👤' : '🤖'}
                    </div>
                    <div className="message__content">
                        <div className="message__role">
                            {message.role === 'user' ? 'You' : 'Onami'}
                        </div>
                        <div className="message__text">
                            {message.content}
                        </div>
                    </div>
                </div>
            ))}

            {isLoading && (
                <div className="message message--assistant">
                    <div className="message__avatar">🤖</div>
                    <div className="message__content">
                        <div className="message__role">Onami</div>
                        <div className="message__loading">
                            <div className="spinner-small"></div>
                            <span>Thinking...</span>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="response-box__error">
                    <p>❌ {error}</p>
                </div>
            )}
        </div>
    );
}

export default ResponseBox;
