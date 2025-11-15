import { useState } from "react";
import { socket, SocketEvent } from "@/lib/socket";

interface Props {
  receiverId: string;
  productId: string;
}

const MessageInput = ({ receiverId, productId }: Props) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    const msg = text.trim();
    if (!msg) return;

    socket.emit(SocketEvent.SEND_MESSAGE, {
      payload: { message: { text: msg } },
      receiverId,
      productId,
    });

    setText("");
  };

  return (
    <div className="flex items-center mt-4 space-x-3">
      <input
        type="text"
        placeholder="Write a message..."
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-pink-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
