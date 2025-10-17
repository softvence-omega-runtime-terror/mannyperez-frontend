// src/pages/MessagingPage.tsx
import React from "react";
import { useParams } from "react-router-dom";

const MessagePage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  return (
    <div className="w-full bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Messaging for Post: {postId}
      </h2>

      {/* Example conversation layout */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-sm text-gray-800">
              Hi! Is this item still available?
            </p>
            <span className="text-xs text-gray-500">2h ago</span>
          </div>
        </div>

        <div className="flex items-start space-x-3 justify-end">
          <div className="bg-pink-100 rounded-lg p-3 text-right">
            <p className="text-sm text-gray-800">
              Yes! It's available. 😊
            </p>
            <span className="text-xs text-gray-500">1h ago</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Input box */}
      <div className="flex items-center mt-6 space-x-3">
        <input
          type="text"
          placeholder="Write a message"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-pink-500"
        />
        <button className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagePage;
