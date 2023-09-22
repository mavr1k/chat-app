import React, { useState, useEffect, useRef } from "react";
import ChatsList from "../ChatsList";

import "./App.css";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, user: "You" }]);
      setNewMessage("");
    }
  };

  useEffect(() => {
    // Simulate receiving messages from another user
    const receiveMessage = setTimeout(() => {
      setMessages([...messages, { text: "Hello!", user: "Friend" }]);
    }, 2000);

    return () => {
      clearTimeout(receiveMessage);
    };
  }, [messages]);

  return (
    <div className="vh-100 d-flex flex-column justify-content-between">
      <div className="d-flex">
        <ChatsList />
        <div className="d-flex flex-column flex-grow-1 p-2 messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`m-1 p-2 rounded mw-75 ${message.user === "You" ? "bg-primary text-light align-self-end" : "bg-light text-dark align-self-start"}`}
            >
              {message.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="message-input d-flex align-items-center p-3 bg-light">
        <input
          className="flex-grow-1 me-2 rounded p-2 border-0"
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button 
        className="btn btn-primary rounded p-2"
        type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;
