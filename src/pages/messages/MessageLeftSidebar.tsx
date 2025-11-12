// src/components/Messages/MessageLeftSidebar.tsx
import React from "react";

interface Conversation {
  id: string;
  avatar: string;
  name: string;
  message: string;
  product?: string;
  time: string;
  unreadCount?: number;
}

interface MessageLeftSidebarProps {
  conversations?: Conversation[];
  onSelectConversation?: (id: string) => void;
}

const MessageLeftSidebar: React.FC<MessageLeftSidebarProps> = ({
  conversations = [],
  onSelectConversation,
}) => {
  return (
    <div className="bg-white p-4 shadow min-h-[calc(100vh-100px)] rounded-xl border border-gray-100">
      <h2 className="text-xl font-bold mb-4">Messages</h2>

      <input
        type="text"
        placeholder="Search listings, sellers..."
        className="w-full border border-gray-300 rounded-full px-3 py-2 mb-4 focus:outline-none focus:border-pink-500 text-sm"
      />

      {conversations.length > 0 ? (
        conversations.map((c) => (
          <div
            key={c.id}
            className="flex items-start justify-between p-2 rounded-lg cursor-pointer hover:bg-pink-50 mb-2"
            onClick={() => onSelectConversation?.(c.id)}
          >
            <div className="flex items-start space-x-3">
              <img
                src={c.avatar}
                alt={c.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                <p className="text-xs text-gray-500">{c.message}</p>
                {c.product && (
                  <p className="text-xs text-pink-600">{c.product}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400">{c.time}</span>
              {c.unreadCount && c.unreadCount > 0 && (
                <span className="bg-pink-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full mt-1">
                  {c.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No conversations yet...</p>
      )}
    </div>
  );
};

export default MessageLeftSidebar;
