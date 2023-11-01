import { useState, useEffect, useRef } from "react";
import Head from 'next/head';
import useSWR from 'swr'
import useLocalStorage from "../../hooks/useLocalStorage";

import styles from "./App.module.css";

const fetcher = (...args) => fetch(...args).then(res => res.json())

const ChatApp = () => {
  const { data, isLoading, error } = useSWR('/api/messages', fetcher, { refreshInterval: 1000 })
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useLocalStorage('user', '');
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef(null);
  
  useEffect(() => {
    if (data) {
      setMessages(data.map((message) => ({ user: message.from, text: message.message })));
    }
  }, [data]);

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
      <div className="d-flex flex-column justify-content-between overflow-hidden">
        <div className={`d-flex fixed-top ${styles.vaporwave}`}>
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
        <form onSubmit={handleSubmit} className="message-input d-flex align-items-center p-3 bg-dark fixed-bottom w-100">
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
