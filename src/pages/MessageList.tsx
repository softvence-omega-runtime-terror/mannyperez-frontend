import { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "./MessagePage";
import { socket, SocketEvent } from "@/lib/socket";

interface Props {
  receiverId: string;
  productId: string;
}

const MessageList = ({ receiverId, productId }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  console.log("🚀 ~ MessageList ~ messages:", messages)

  useEffect(() => {
    // Request messages for this conversation
    socket.emit(SocketEvent.LOAD_MESSAGES, { receiverId, productId });

    const handleMessagesLoaded = (data: {
      roomId: string;
      messages: Message[];
    }) => {
      setMessages(data.messages);
    };

    const handleReceiveMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on(SocketEvent.MESSAGES_LOADED, handleMessagesLoaded);
    socket.on(SocketEvent.RECEIVE_MESSAGE, handleReceiveMessage);

    // Cleanup listeners when switching conversations
    return () => {
      socket.off(SocketEvent.MESSAGES_LOADED, handleMessagesLoaded);
      socket.off(SocketEvent.RECEIVE_MESSAGE, handleReceiveMessage);
    };
  }, [receiverId, productId]);

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <MessageBubble
          key={msg._id}
          message={msg}
        />
      ))}
    </div>
  );
};

export default MessageList;
