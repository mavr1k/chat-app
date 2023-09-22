import React from "react";
import "./ChatList.css";

const ChatList = () => {
  // Mock data for the chat list
  const chats = ["Chat 1", "Chat 2", "Chat 3"];

  return (
    <div className="chat-list">
      {chats.map((chat, index) => (
        <div key={index} className="chat-item">
          {chat}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
