import { useEffect } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { socket, SocketEvent } from "@/lib/socket";
import {
  SellerMessageProduct,
  SellerMessageUser,
} from "./SellerMessageContacts";

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
    <div className="flex-1 flex flex-col h-full max-h-screen bg-white rounded-xl shadow">
      {/* Mobile header */}
      <div className="lg:hidden px-4 py-2 border-b flex items-center font-bold text-lg">
        Messaging for Post: {product?.productInformation?.title}
      </div>

      {/* Chat area: messages + input */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <MessageList
          productId={product._id}
          receiverId={receiver._id}
        />

        <div className="px-4 py-2 border-t flex-shrink-0">
          <MessageInput
            productId={product._id}
            receiverId={receiver._id}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerChatWindow;
