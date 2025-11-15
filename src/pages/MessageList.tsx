import { useEffect, useState, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "./MessagePage";
import { socket, SocketEvent } from "@/lib/socket";

interface Props {
  receiverId: string;
  productId: string;
}

const MessageList = ({ receiverId, productId }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Load messages
    socket.emit(SocketEvent.LOAD_MESSAGES, { receiverId, productId });

    const handleMessagesLoaded = (data: {
      roomId: string;
      messages: Message[];
    }) => {
      setMessages(data.messages || []);
      scrollToBottom();
    };

    const handleReceiveMessage = (message: Message) => {
      setMessages((prev) => {
        // Prevent duplicates by _id
        if (prev.some((m) => m._id === message._id)) return prev;
        return [...prev, message];
      });
      scrollToBottom();
    };

    socket.on(SocketEvent.MESSAGES_LOADED, handleMessagesLoaded);
    socket.on(SocketEvent.RECEIVE_MESSAGE, handleReceiveMessage);

    return () => {
      socket.off(SocketEvent.MESSAGES_LOADED, handleMessagesLoaded);
      socket.off(SocketEvent.RECEIVE_MESSAGE, handleReceiveMessage);
    };
  }, [receiverId, productId]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-2 py-4 space-y-4 bg-gray-50 rounded-lg"
    >
      {messages.length === 0 ? (
        <p className="text-gray-400 text-center mt-4">No messages yet</p>
      ) : (
        messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
          />
        ))
      )}
    </div>
  );
};

export default MessageList;
