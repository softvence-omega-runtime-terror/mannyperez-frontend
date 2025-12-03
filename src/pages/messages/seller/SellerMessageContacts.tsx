import { socket, SocketEvent } from "@/lib/socket";
import { useAppDispatch } from "@/store/hooks";
import { setConversation } from "@/store/slices/chatSlice";
import { useEffect, useState } from "react";

export type SellerMessageUser = {
  _id: string;
  name?: string;
  email?: string;
  img?: string;
};

export type SellerMessageProduct = {
  _id: string;
  productInformation?: {
    title?: string;
    description?: string;
    tags?: string[];
  };
  extraOptions?: {
    productVariants?: boolean;
  };
  images?: string[];
  sellerId?: string;
  pricingAndInventory?: [
    {
      price: number;
      quantity: number;
      id: string;
    }
  ];
};

type ConversationItem = {
  _id: string;
  otherUser: SellerMessageUser;
  product: SellerMessageProduct;
  lastMessage?: never;
  unreadCount?: number;
};

const SellerMessageContacts: React.FC = () => {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initial load
    socket.emit(SocketEvent.LOAD_CONTACTS);

    const handleContactsLoaded = (data: {
      conversations: ConversationItem[];
    }) => {
      setConversations(data.conversations || []);
    };

    const handleContactsUpdated = () => {
      socket.emit(SocketEvent.LOAD_CONTACTS);
    };

    socket.on(SocketEvent.CONTACTS_LOADED, handleContactsLoaded);
    socket.on(SocketEvent.CONTACTS_UPDATED, handleContactsUpdated);

    return () => {
      socket.off(SocketEvent.CONTACTS_LOADED, handleContactsLoaded);
      socket.off(SocketEvent.CONTACTS_UPDATED, handleContactsUpdated);
    };
  }, []);

  const handleSelectConversation = (
    receiver: SellerMessageUser,
    product: SellerMessageProduct
  ) => {
    dispatch(setConversation({ receiver, product }));
  };

  return (
    <div className="bg-white p-4 shadow min-h-[calc(100vh-100px)] rounded-xl border border-gray-100">
      <h2 className="text-xl font-bold mb-4">Contacts</h2>
      {conversations.length > 0 ? (
        conversations.map((c) => (
          <div
            key={c._id}
            className="flex items-start justify-between p-2 rounded-lg cursor-pointer hover:bg-pink-50 mb-2"
            onClick={() => handleSelectConversation(c.otherUser, c.product)}
          >
            <div className="flex items-start space-x-3">
              <img
                src={c.otherUser.img || "/default-avatar.png"}
                alt={c.otherUser.name || c.otherUser.email || "User"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {c.otherUser.name || c.otherUser.email}
                </p>
                {c.product?.productInformation?.title && (
                  <p className="text-xs text-pink-600">
                    {c.product.productInformation.title}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No contacts yet...</p>
      )}
    </div>
  );
};

export default SellerMessageContacts;
