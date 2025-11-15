import { useEffect, useState, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "./MessagePage";
import { socket, SocketEvent } from "@/lib/socket";
import { useGetProductByIdQuery } from "@/store/services/productsApi";

interface Props {
  receiverId: string;
  productId: string;
}

const MessageList = ({ receiverId, productId }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: productData, isLoading: productLoading } =
    useGetProductByIdQuery(productId);

  const scrollToBottom = (smooth = true) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  const isUserNearBottom = () => {
    if (!scrollRef.current) return true;
    const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
    return scrollHeight - scrollTop - clientHeight < 100;
  };

  // Scroll when messages change
  useEffect(() => {
    if (messages.length === 0) return;

    if (isUserNearBottom()) {
      scrollToBottom();
      setShowNewMessageIndicator(false);
    } else {
      setShowNewMessageIndicator(true);
    }
  }, [messages]);

  // Detect scroll and hide new message indicator
  useEffect(() => {
    const handleScroll = () => {
      if (isUserNearBottom()) setShowNewMessageIndicator(false);
    };
    const currentRef = scrollRef.current;
    currentRef?.addEventListener("scroll", handleScroll);
    return () => currentRef?.removeEventListener("scroll", handleScroll);
  }, []);

  // Load messages and handle incoming messages
  useEffect(() => {
    const handleMessagesLoaded = (data: { roomId: string; messages: Message[] }) => {
      setMessages(data.messages || []);
      // Scroll after DOM renders
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

  const productInfo = productData?.data.productInformation;

  return (
    <div className="flex-1 flex flex-col relative overflow-y-auto max-h-screen">
      {/* Product Info */}
      <div className="sticky top-0 z-10 bg-white border-b flex items-center gap-4 px-4 py-2">
        {productInfo?.image && (
          <img
            src={productInfo.image}
            alt={productInfo.title}
            className="w-12 h-12 rounded object-cover"
          />
        )}
        <div className="flex-1">
          <h2 className="font-semibold">{productInfo?.title}</h2>
          {productInfo?.price && (
            <p className="text-sm text-gray-500">Price: ${productInfo.price}</p>
          )}
          {productInfo?.shortDescription && (
            <p className="text-sm text-gray-400 truncate">{productInfo.shortDescription}</p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 mt-4">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg) => <MessageBubble key={msg._id} message={msg} />)
        )}
      </div>

      {/* New Message Indicator */}
      {showNewMessageIndicator && (
        <button
          onClick={() => {
            scrollToBottom();
            setShowNewMessageIndicator(false);
          }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md z-20"
        >
          New message
        </button>
      )}
    </div>
  );
};

export default MessageList;
