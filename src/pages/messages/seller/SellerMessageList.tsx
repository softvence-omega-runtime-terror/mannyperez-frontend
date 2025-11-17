import { socket, SocketEvent } from "@/lib/socket";
import { Message } from "@/pages/MessagePage";
import { useGetProductByIdQuery } from "@/store/services/productsApi";
import { useEffect, useRef, useState } from "react";
import MessageBubble from "../MessageBubble";

interface Props {
  receiverId: string;
  productId: string;
}

const SellerMessageList = ({ receiverId, productId }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: productData, isLoading: productLoading } =
    useGetProductByIdQuery(productId);

  const scrollToBottom = (smooth = false) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  const isUserNearBottom = () => {
    if (!scrollRef.current) return true;
    const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
    return scrollHeight - scrollTop - clientHeight < 120;
  };

  // Scroll on initial list load
  useEffect(() => {
    if (messages.length === 0) return;
    scrollToBottom(false);
  }, [messages.length]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (messages.length === 0) return;

    if (isUserNearBottom()) {
      scrollToBottom(true);
      setShowNewMessageIndicator(false);
    } else {
      setShowNewMessageIndicator(true);
    }
  }, [messages]);

  // Scroll detection for indicator
  useEffect(() => {
    const handleScroll = () => {
      if (isUserNearBottom()) {
        setShowNewMessageIndicator(false);
      }
    };

    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  // Load messages
  useEffect(() => {
    const handleMessagesLoaded = (data: {
      roomId: string;
      messages: Message[];
    }) => {
      setMessages(data.messages || []);

      requestAnimationFrame(() => {
        scrollToBottom(false);
      });
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
  }, [receiverId, productId]);

  if (productLoading) {
    return (
      <div className="flex-1 flex flex-col p-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="flex-1 space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }



  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">

      {/* Sticky product header */}
     

      {/* Messages list */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50 space-y-4"
      >
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 mt-4">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg._id} message={msg} />
          ))
        )}
      </div>

      {/* Bottom floating button */}
      {showNewMessageIndicator && (
        <button
          onClick={() => {
            scrollToBottom(true);
            setShowNewMessageIndicator(false);
          }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md"
        >
          New message
        </button>
      )}
    </div>
  );
};

export default SellerMessageList;
