import { useState } from 'react';
import './PromptInput.css';

function PromptInput({ onSubmit, isLoading }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() && !isLoading) {
            onSubmit(inputValue);
            setInputValue('');
        }
    };

    const handleKeyDown = (e) => {
        // Submit on Enter (without Shift)
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form className="prompt-input" onSubmit={handleSubmit}>
            <div className="prompt-input__wrapper">
                <textarea
                    id="message-input"
                    name="message"
                    className="prompt-input__textarea"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    rows="1"
                />
            </div>
            <button
                type="submit"
                className="prompt-input__button"
                disabled={isLoading || !inputValue.trim()}
            >
                {isLoading ? '...' : 'Send'}
            </button>
        </form>
    );
}

export default PromptInput;
