import React, { useEffect } from 'react';
import './ChatMessagePopup.css';

const ChatMessagePopup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="chat-message-popup">
      <strong>{message.user}:</strong> {message.text}
    </div>
  );
};

export default ChatMessagePopup; 