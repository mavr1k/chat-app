// ChatApp.js (main component)
import React, { useState, useEffect } from 'react';
import './App.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, user: 'You' }]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    // Simulate receiving messages from another user
    const receiveMessage = setTimeout(() => {
      setMessages([...messages, { text: 'Hello!', user: 'Friend' }]);
    }, 2000);

    return () => {
      clearTimeout(receiveMessage);
    };
  }, [messages]);

  return (
    <div className="chat-app">
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user === 'You' ? 'user' : 'friend'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="message-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;
