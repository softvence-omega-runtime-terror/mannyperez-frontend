import { socket, SocketEvent } from "@/lib/socket";
import { useEffect, useState } from "react";

export type SellerMessageUser = {
  _id: string;
  name?: string;
  email?: string;
  avatar?: string;
};

export type SellerMessageProduct = {
  _id: string;
  productInformation?: { title?: string };
};

type ConversationItem = {
  _id: string;
  otherUser: SellerMessageUser;
  product: SellerMessageProduct;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lastMessage?: any;
  unreadCount?: number;
};

type Props = {
  onSelectContact: (conversation: {
    receiver: SellerMessageUser;
    product: SellerMessageProduct;
  }) => void;
};

const SellerMessageContacts: React.FC<Props> = ({ onSelectContact }) => {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);

  useEffect(() => {
    socket.emit(SocketEvent.LOAD_CONTACTS);

    const handleContactsLoaded = (data: { conversations: ConversationItem[] }) => {
      setConversations(data.conversations || []);
    };

    socket.on(SocketEvent.CONTACTS_LOADED, handleContactsLoaded);

    return () => {
      socket.off(SocketEvent.CONTACTS_LOADED, handleContactsLoaded);
    };
  }, []);

  return (
    <div className="bg-white p-4 shadow min-h-[calc(100vh-100px)] rounded-xl border border-gray-100">
      <h2 className="text-xl font-bold mb-4">Contacts</h2>
      {conversations.length > 0 ? (
        conversations.map((c) => (
          <div
            key={c._id}
            className="flex items-start justify-between p-2 rounded-lg cursor-pointer hover:bg-pink-50 mb-2"
            onClick={() => onSelectContact({ receiver: c.otherUser, product: c.product })}
          >
            <div className="flex items-start space-x-3">
              <img
                src={c.otherUser.avatar || "/default-avatar.png"}
                alt={c.otherUser.name || c.otherUser.email || "User"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {c.otherUser.name || c.otherUser.email}
                </p>
                {c.product?.productInformation?.title && (
                  <p className="text-xs text-pink-600">{c.product.productInformation.title}</p>
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
