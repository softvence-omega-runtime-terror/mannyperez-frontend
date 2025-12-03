import { useEffect, useRef, useState } from "react";
import { socket, SocketEvent } from "@/lib/socket";
import MessageBubble from "../MessageBubble";
import { Message } from "../buyer/MessagePage";
import { format, isToday, isYesterday } from "date-fns";

interface Props {
  receiverId: string;
  productId: string;
}

interface SenderGroup {
  senderId: string;
  msgs: Message[];
}

interface MessageGroup {
  date: Date; // store as Date object for Today/Yesterday check
  messages: SenderGroup[];
}

const SellerMessageList = ({ receiverId, productId }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
    return scrollHeight - scrollTop - clientHeight < 200;
  };

  // Auto scroll when new messages arrive
  useEffect(() => {
    if (messages.length === 0) return;
    if (isUserNearBottom()) {
      scrollToBottom(true);
      setShowNewMessageIndicator(false);
    } else {
      setShowNewMessageIndicator(true);
    }
  }, [messages]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (isUserNearBottom()) setShowNewMessageIndicator(false);
    };
    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  // Socket listeners
  useEffect(() => {
    const handleMessagesLoaded = (data: { roomId: string; messages: Message[] }) => {
      setMessages(data.messages || []);
      requestAnimationFrame(() => scrollToBottom(false));
    };

    const handleReceiveMessage = (message: Message) => {
      setMessages((prev) =>
        prev.some((m) => m._id === message._id) ? prev : [...prev, message]
      );
    };

    socket.emit(SocketEvent.LOAD_MESSAGES, { receiverId, productId });
    socket.on(SocketEvent.MESSAGES_LOADED, handleMessagesLoaded);
    socket.on(SocketEvent.RECEIVE_MESSAGE, handleReceiveMessage);

    return () => {
      socket.off(SocketEvent.MESSAGES_LOADED, handleMessagesLoaded);
      socket.off(SocketEvent.RECEIVE_MESSAGE, handleReceiveMessage);
    };
  }, [receiverId, productId]);

  // Group messages by date and sender
const groupMessages = (messages: Message[]): MessageGroup[] => {
  const grouped: MessageGroup[] = [];
  let lastDate: string | null = null;

  messages.forEach((msg) => {
    const msgDateObj = new Date(msg.createdAt); // <-- convert to Date
    const msgDateStr = msgDateObj.toDateString(); // grouping string

    let dateGroup = grouped[grouped.length - 1];

    // New date group
    if (!dateGroup || lastDate !== msgDateStr) {
      dateGroup = { date: msgDateObj, messages: [] };
      grouped.push(dateGroup);
      lastDate = msgDateStr;
    }

    // Sender grouping
    const lastSenderGroup = dateGroup.messages[dateGroup.messages.length - 1];
    if (lastSenderGroup && lastSenderGroup.senderId === msg.sender._id) {
      lastSenderGroup.msgs.push(msg);
    } else {
      dateGroup.messages.push({ senderId: msg.sender._id, msgs: [msg] });
    }
  });

  return grouped;
};


  const groupedMessages = groupMessages(messages);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col relative">
      <div className="flex-1"></div>

      {messages.length === 0 ? (
        <p className="text-center text-gray-400 mb-4">No messages yet. Start the conversation!</p>
      ) : (
        groupedMessages.map((group) => (
          <div key={group.date.toISOString()}>
            {/* Today / Yesterday / Date */}
            <p className="text-center text-gray-400 my-2 font-semibold">
              {isToday(group.date)
                ? "Today"
                : isYesterday(group.date)
                ? "Yesterday"
                : format(group.date, "MMM dd, yyyy")}
            </p>

            {group.messages.map((senderGroup, idx) => (
              <div key={idx} className="mb-2">
                {senderGroup.msgs.map((msg) => (
                  <MessageBubble
                    key={msg._id}
                    message={msg}
           
                  />
                ))}
              </div>
            ))}
          </div>
        ))
      )}

      {showNewMessageIndicator && (
        <button
          onClick={() => {
            scrollToBottom(true);
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
