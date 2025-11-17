import { useEffect } from "react";
import {
  SellerMessageProduct,
  SellerMessageUser,
} from "./SellerMessageContacts";
import { socket, SocketEvent } from "@/lib/socket";
import SellerMessageList from "./SellerMessageList";
import MessageInput from "../MessageInput";
import { useNavigate } from "react-router-dom";

type Props = {
  product: SellerMessageProduct;
  receiver: SellerMessageUser;
};

const SellerChatWindow: React.FC<Props> = ({ product, receiver }) => {
  const navigate = useNavigate();

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
    <div className="flex-1 flex flex-col h-screen bg-white rounded-xl shadow overflow-hidden">
      {/* Header */}
    {/* Header */}
<div className="flex justify-between items-start px-4 py-3 border-b bg-gray-50">
  <div className="flex space-x-4">
    {/* Product Image */}
    <img
      src={product.images[0]}
      alt={product.productInformation?.title}
      className="w-12 h-12 object-cover rounded"
    />

    {/* Product Info */}
    <div className="flex flex-col">
      <p className="text-lg font-semibold">
        {product.productInformation?.title}
      </p>
      <p className="text-sm text-gray-500 truncate max-w-xs">
        {product.productInformation?.description}
      </p>
      <div className="mt-1">
        {product.extraOptions?.productVariants ? (
          (() => {
            const prices = product.pricingAndInventory.map(p => p.price);
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            return (
              <p className="text-xl font-bold text-pink-600">
                ${min.toFixed(2)}{min !== max && ` - $${max.toFixed(2)}`}
              </p>
            );
          })()
        ) : (
          <p className="text-xl font-bold text-pink-600">
            ${product.pricingAndInventory[0]?.price.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  </div>

  {/* Buy Now Button */}
  <button
    className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition self-start"
    onClick={() => navigate(`/checkout/${product._id}`)}
  >
    Buy Now
  </button>
</div>


      {/* Messages */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <SellerMessageList
            productId={product._id}
            receiverId={receiver._id}
          />
        </div>

        {/* Message Input */}
        <div className="px-4 py-2 border-t bg-white">
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
