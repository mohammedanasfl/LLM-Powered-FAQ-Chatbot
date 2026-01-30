import './Sidebar.css';

function Sidebar({ sessions, currentSessionId, onSelectSession, onNewChat }) {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <button className="sidebar__new-chat-btn" onClick={onNewChat}>
                    ✨ New Chat
                </button>
            </div>

            <div className="sidebar__sessions">
                {sessions.length === 0 ? (
                    <div className="sidebar__empty">No conversations yet</div>
                ) : (
                    sessions.map(session => (
                        <div
                            key={session.id}
                            className={`sidebar__session ${currentSessionId === session.id ? 'sidebar__session--active' : ''}`}
                            onClick={() => onSelectSession(session.id)}
                        >
                            <div className="sidebar__session-info">
                                <div className="sidebar__session-title">
                                    {session.id.substring(0, 20)}...
                                </div>
                                <div className="sidebar__session-date">
                                    {new Date(session.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Sidebar;
