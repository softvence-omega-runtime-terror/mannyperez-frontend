import { useEffect, useState, useRef, useCallback } from "react";
import MessageBubble from "../MessageBubble";
import { socket, SocketEvent } from "@/lib/socket";
import { Message } from "./MessagePage";

interface Props {
  receiverId: string;
  productId: string;
}

const MessageList = ({ receiverId, productId }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback((smooth = true) => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  const isUserNearBottom = useCallback(() => {
    if (!scrollRef.current) return true;
    const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
    return scrollHeight - scrollTop - clientHeight < clientHeight * 0.1; 
  }, []);

  // Scroll when messages change
  useEffect(() => {
    if (messages.length === 0) return;

    const timeout = setTimeout(() => {
      if (isUserNearBottom()) {
        scrollToBottom();
        setShowNewMessageIndicator(false);
      } else {
        setShowNewMessageIndicator(true);
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [messages, isUserNearBottom, scrollToBottom]);

  // Hide new message indicator when user scrolls near bottom
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (isUserNearBottom()) setShowNewMessageIndicator(false);
      });
    };

    scrollEl.addEventListener("scroll", handleScroll);
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, [isUserNearBottom]);

  // Load messages and listen for real-time updates
  useEffect(() => {
    const handleMessagesLoaded = (data: {
      roomId: string;
      messages: Message[];
    }) => {
      setMessages(data.messages || []);
      requestAnimationFrame(() => scrollToBottom(false));
    };

    const handleReceiveMessage = (message: Message) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id === message._id)) return prev;
        return [...prev, message];
      });
    };

    socket.emit(SocketEvent.LOAD_MESSAGES, { receiverId, productId });
    socket.on(SocketEvent.MESSAGES_LOADED, handleMessagesLoaded);
    socket.on(SocketEvent.RECEIVE_MESSAGE, handleReceiveMessage);

    return () => {
      socket.off(SocketEvent.MESSAGES_LOADED, handleMessagesLoaded);
      socket.off(SocketEvent.RECEIVE_MESSAGE, handleReceiveMessage);
    };
  }, [receiverId, productId, scrollToBottom]);

  // Scroll on mobile keyboard resize
  useEffect(() => {
    const handleResize = () => setTimeout(() => scrollToBottom(false), 100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollToBottom]);

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-2 space-y-4 bg-gray-50 pb-24"
      >
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 mt-4">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg}
            />
          ))
        )}
      </div>

      {/* Animated new message indicator */}
      <div
        className={`absolute bottom-24 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-300 ${
          showNewMessageIndicator
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => {
            scrollToBottom();
            setShowNewMessageIndicator(false);
          }}
          className="bg-blue-500 text-white px-3 py-1.5 rounded-full shadow-md sm:px-4 sm:py-2"
        >
          New message
        </button>
      </div>
    </div>
  );
};

export default MessageList;
