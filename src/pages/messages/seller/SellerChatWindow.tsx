import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket, SocketEvent } from "@/lib/socket";
import SellerMessageList from "./SellerMessageList";
import MessageInput from "../MessageInput";
import { SellerMessageProduct, SellerMessageUser } from "./SellerMessageContacts";

type Props = {
  product: SellerMessageProduct;
  receiver: SellerMessageUser;
};

const SellerChatWindow: React.FC<Props> = ({ product, receiver }) => {
  const navigate = useNavigate();

  // Join socket room
  useEffect(() => {
    if (!product || !receiver) return;

    socket.emit(SocketEvent.JOIN_ROOM, {
      productId: product._id,
      receiverId: receiver._id,
    });

    return () => {
      socket.emit(SocketEvent.LEAVE_ROOM, {
        productId: product._id,
        receiverId: receiver._id,
      });
    };
  }, [product, receiver]);

  if (!product || !receiver)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 bg-white rounded-xl shadow">
        <h2 className="text-xl font-bold">No Conversation Selected</h2>
      </div>
    );

  const renderPrice = () => {
    const prices = product.pricingAndInventory?.map((p) => p.price);
    if (!prices || prices.length === 0) return null;

    if (product.extraOptions?.productVariants && prices.length > 1) {
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return (
        <p className="text-xl font-bold text-pink-600">
          ${min.toFixed(2)}
          {min !== max && ` - $${max.toFixed(2)}`}
        </p>
      );
    }
    return <p className="text-xl font-bold text-pink-600">${prices[0]?.toFixed(2)}</p>;
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white rounded-xl shadow overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start p-4 border-b bg-gray-50 flex-shrink-0">
        <div className="flex space-x-4 min-w-0">
          <img
            src={product.images?.[0] || "/default-product.png"}
            alt={product.productInformation?.title}
            className="w-14 h-14 object-cover rounded-md flex-shrink-0 border border-gray-200"
          />
          <div className="flex flex-col min-w-0 pr-2">
            <p className="text-lg font-semibold truncate">
              {product.productInformation?.title || "Product Title"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {product.productInformation?.description || "Product description..."}
            </p>
            <div className="mt-1 flex-shrink-0">{renderPrice()}</div>
          </div>
        </div>

        <button
          className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold text-sm md:text-base hover:bg-pink-700 transition self-start flex-shrink-0"
          onClick={() => navigate(`/checkout/${product._id}`)}
        >
          Buy Now
        </button>
      </div>

      {/* Messages + Input */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Message List */}
        <SellerMessageList productId={product._id} receiverId={receiver._id} />

        {/* Input */}
        <div className="px-4 py-3 border-t bg-white flex-shrink-0">
          <MessageInput productId={product._id} receiverId={receiver._id} />
        </div>
      </div>
    </div>
  );
};

export default SellerChatWindow;
