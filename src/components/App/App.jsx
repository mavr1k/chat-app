import { useState, useEffect, useRef, use } from "react";
import Head from 'next/head';
import ChatsList from "../ChatsList";

import styles from "./App.module.css";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef(null);

  const getMessages = async () => {
    const response = await fetch("/api/messages");
    const newMessages = await response.json();
    setMessages(newMessages.map((message) => ({ user: message.from, text: message.message })));
  }

  useEffect(() => {
    getMessages();
    const interval = setInterval(getMessages, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!user) {
      setUser(prompt("What is your name?"));
    }
  }, [user]);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from: user, message: newMessage }),
      });
      setNewMessage("");
    }
  };

  return (
    <>
      <Head>
        <title>chat.app</title>
      </Head>
      <div className="vh-100 d-flex flex-column justify-content-between overflow-hidden">
        <div className="d-flex">
          <ChatsList />
          <div className={`d-flex flex-column flex-grow-1 p-2 ${styles.messages}`}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{ minWidth: "80px" }}
                className={`m-1 p-2 rounded ${message.user === user ? "bg-primary text-light align-self-end" : "bg-light text-dark align-self-start"}`}
              >
                <div>{message.text}</div>
                <div className={`text-${message.user === user ? "end" : "start"}`}>
                  <small className="fst-italic">{message.user}</small></div>
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
    </>
  );
};

export default ChatApp;
