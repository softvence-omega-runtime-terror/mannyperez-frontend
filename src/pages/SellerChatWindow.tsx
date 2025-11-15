// src/components/Messages/SellerChatWindow.tsx
import { useEffect } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { socket, SocketEvent } from "@/lib/socket";
import { SellerMessageProduct, SellerMessageUser } from "./SellerMessageContacts";

type Props = {
  product: SellerMessageProduct;
  receiver: SellerMessageUser;
};

const SellerChatWindow: React.FC<Props> = ({ product, receiver }) => {
  useEffect(() => {
    if (!product || !receiver) return;

    // Join socket room
    socket.emit(SocketEvent.JOIN_ROOM, {
      productId: product._id,
      receiverId: receiver._id,
    });

    return () => {
      // Leave socket room
      socket.emit(SocketEvent.LEAVE_ROOM, {
        productId: product._id,
        receiverId: receiver._id,
      });
    };
  }, [product, receiver]);

  if (!product || !receiver)
    return <h2 className="text-xl font-bold mb-4">No Conversation Selected</h2>;

  return (
    <div className="flex-1 bg-white rounded-xl shadow p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-2 lg:hidden">
        Messaging for Post: {product?.productInformation?.title}
      </h2>
      <h3 className="text-sm text-gray-600 mb-2">Chat with {receiver.email}</h3>

      <div className="flex-1 overflow-y-auto mb-4">
        <MessageList productId={product._id} receiverId={receiver._id} />
      </div>

      <div className="mt-auto">
        <MessageInput productId={product._id} receiverId={receiver._id} />
      </div>
    </div>
  );
};

export default SellerChatWindow;
