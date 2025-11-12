// src/pages/MessagingPage.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";

// --- Message Type ---
interface Message {
  id: string;
  sender: "buyer" | "seller";
  content: string;
  timestamp: string;
}

interface MessagingPageProps {
  messages?: Message[]; // future API data
  onSendMessage?: (message: string) => void; // future send callback
}

const MessagingPage: React.FC<MessagingPageProps> = ({
  messages = [
    {
      id: "1",
      sender: "buyer",
      content: "Hi! Is this item still available?",
      timestamp: "2h ago",
    },
    {
      id: "2",
      sender: "seller",
      content: "Yes! It's available. 😊",
      timestamp: "1h ago",
    },
  ],
  onSendMessage,
}) => {
  const { postId } = useParams<{ postId: string }>();
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    if (onSendMessage) {
      onSendMessage(newMessage.trim());
    }
    setNewMessage(""); // clear input
  };

  return (
    <div className="w-full bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Messaging for Post: {postId}
      </h2>

      {/* Conversation */}
      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === "seller" ? "justify-end" : ""
            }`}
          >
            {msg.sender === "buyer" && <div className="w-10 h-10 rounded-full bg-gray-200" />}
            <div
              className={`rounded-lg p-3 text-sm text-gray-800 ${
                msg.sender === "seller"
                  ? "bg-pink-100 text-right"
                  : "bg-gray-100"
              }`}
            >
              <p>{msg.content}</p>
              <span className="text-xs text-gray-500">{msg.timestamp}</span>
            </div>
            {msg.sender === "seller" && <div className="w-10 h-10 rounded-full bg-gray-200" />}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center mt-6 space-x-3">
        <input
          type="text"
          placeholder="Write a message"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-pink-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagingPage;
