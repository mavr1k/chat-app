import React from "react";

const ChatsList = () => {
  // Mock data for the chat list
  const chats = ["Chat 1", "Chat 2", "Chat 3"];

  return (
    <div className="bg-light h-100">
      {chats.map((chat, index) => (
        <div key={index} className="border-bottom p-2">
          {chat}
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
