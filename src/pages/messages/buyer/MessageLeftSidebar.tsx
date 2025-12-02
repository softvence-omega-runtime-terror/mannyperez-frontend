// src/components/Messages/MessageLeftSidebar.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket, SocketEvent } from "@/lib/socket";

export type Conversation = {
  _id: string;
  members: {
    _id: string;
    name?: string;
    email?: string;
    avatar?: string;
  }[];
  product?: {
    _id: string;
    productInformation?: { title?: string };
  } | null;
  lastMessage?: {
    text?: string;
    createdAt?: string;
  };
  unreadCount?: number;
  updatedAt?: string;
};

const MessageLeftSidebar: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  console.log(conversations, "from buyer")
  const navigate = useNavigate();

  useEffect(() => {
    // Load initial contacts
    socket.emit(SocketEvent.LOAD_CONTACTS);

    const handleContactsLoaded = (data: { conversations: Conversation[] }) => {
      setConversations(data.conversations || []);
    };

    const handleContactsUpdated = () => {
      socket.emit(SocketEvent.LOAD_CONTACTS);
    };

    socket.on(SocketEvent.CONTACTS_LOADED, handleContactsLoaded);
    socket.on(SocketEvent.CONTACTS_UPDATED, handleContactsUpdated);

    return () => {
      socket.off(SocketEvent.CONTACTS_LOADED, handleContactsLoaded);
      socket.off(SocketEvent.CONTACTS_UPDATED, handleContactsUpdated);
    };
  }, []);

  const handleSelectConversation = (conversation: Conversation) => {
    const otherUser = conversation.members?.[0];
    navigate(
      `/feed/messages/${otherUser?._id}/${conversation.product?._id || "null"}`
    );
  };

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white p-4 shadow min-h-[calc(100vh-100px)] rounded-xl border border-gray-100">
      <h2 className="text-xl font-bold mb-4">Messages</h2>

      <input
        type="text"
        placeholder="Search listings, sellers..."
        className="w-full border border-gray-300 rounded-full px-3 py-2 mb-4 focus:outline-none focus:border-pink-500 text-sm"
      />

      {conversations.length > 0 ? (
        conversations.map((c) => {
          const otherUser = c.members?.[0];

          return (
            <div
              key={c._id}
              className="flex items-start justify-between p-2 rounded-lg cursor-pointer hover:bg-pink-50 mb-2"
              onClick={() => handleSelectConversation(c)}
            >
              <div className="flex items-start space-x-3">
                <img
                  src={otherUser?.avatar || "/logoDestash.png"}
                  alt={otherUser?.name || otherUser?.email || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {otherUser?.name || otherUser?.email}
                  </p>

                  {c.lastMessage?.text ? (
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {c.lastMessage.text || "Image"}
                    </p>
                  ) : null}

                  {c.product?.productInformation?.title && (
                    <p className="text-xs text-pink-600">
                      {c.product.productInformation.title}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400">
                  {formatTime(c.lastMessage?.createdAt)}
                </span>

                {c.unreadCount && c.unreadCount > 0 && (
                  <span className="bg-pink-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full mt-1">
                    {c.unreadCount}
                  </span>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500">No conversations yet...</p>
      )}
    </div>
  );
};

export default MessageLeftSidebar;
