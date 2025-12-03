import { socket, SocketEvent } from "@/lib/socket";

import { useEffect, useRef, useState } from "react";
import MessageBubble from "../MessageBubble";
import { Message } from "../buyer/MessagePage";

interface Props {
  receiverId: string;
  productId: string;
}

const SellerMessageList = ({ receiverId, productId }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  console.log("🚀 ~ SellerMessageList ~ messages:", messages)
  const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper to scroll to the bottom of the message list
  const scrollToBottom = (smooth = false) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  // Helper to check if the user is near the bottom of the list
  const isUserNearBottom = () => {
    if (!scrollRef.current) return true;
    const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
    // Considered "near bottom" if scroll position is within 200px of the bottom
    return scrollHeight - scrollTop - clientHeight < 200;
  };

  // 1. Initial scroll on messages load
  useEffect(() => {
    if (messages.length === 0) return;
    // Use rAF for a stable scroll after DOM update, only scroll once.
    if ((scrollRef.current?.scrollTop || 0) === 0) {
      requestAnimationFrame(() => scrollToBottom(false));
    }
  }, [messages.length]);

  // 2. Auto-scroll on new message received
  useEffect(() => {
    if (messages.length === 0) return;

    if (isUserNearBottom()) {
      // Auto-scroll smoothly if user is near the bottom
      scrollToBottom(true);
      setShowNewMessageIndicator(false);
    } else {
      // Show indicator if user is scrolled up
      setShowNewMessageIndicator(true);
    }
    // Dependency only on messages array, not messages.length
  }, [messages]);

  // 3. Scroll detection for indicator dismissal
  useEffect(() => {
    const handleScroll = () => {
      if (isUserNearBottom()) {
        setShowNewMessageIndicator(false);
      }
    };

    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []); // Only runs once on mount

  // 4. Socket listeners for loading and receiving messages
  useEffect(() => {
    const handleMessagesLoaded = (data: {
      roomId: string;
      messages: Message[];
    }) => {
      setMessages(data.messages || []);
      // Initial scroll after loading, use rAF to ensure DOM is updated
      requestAnimationFrame(() => scrollToBottom(false));
    };

    const handleReceiveMessage = (message: Message) => {
      setMessages((prev) => {
        // Prevent duplicates
        if (prev.some((m) => m._id === message._id)) return prev;
        return [...prev, message];
      });
    };

    // Emit to load messages when product/receiver changes
    socket.emit(SocketEvent.LOAD_MESSAGES, { receiverId, productId });

    socket.on(SocketEvent.MESSAGES_LOADED, handleMessagesLoaded);
    socket.on(SocketEvent.RECEIVE_MESSAGE, handleReceiveMessage);

    return () => {
      socket.off(SocketEvent.MESSAGES_LOADED, handleMessagesLoaded);
      socket.off(SocketEvent.RECEIVE_MESSAGE, handleReceiveMessage);
    };
  }, [receiverId, productId]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {/* Messages list container - takes up all available space */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 bg-white space-y-4"
      >
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 mt-4">
            No messages yet. Start the conversation!
          </p>
        ) : (
          <div className="flex flex-col-reverse">
            {messages.map((msg) => (
              <MessageBubble
                key={msg._id}
                message={msg}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom floating button - New message indicator */}
      {showNewMessageIndicator && (
        <button
          onClick={() => {
            scrollToBottom(true); // Smooth scroll on click
            setShowNewMessageIndicator(false);
          }}
          className="absolute bottom-4 right-4 bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold hover:bg-pink-700 transition"
        >
          New message ↓
        </button>
      )}
    </div>
  );
};

export default SellerMessageList;
