import { useState } from "react";
import SellerMessageContacts, {
  SellerMessageProduct,
  SellerMessageUser,
} from "./SellerMessageContacts";
import SellerChatWindow from "./SellerChatWindow";
import { HiOutlineMenu } from "react-icons/hi";
import UserNavbar from "@/components/layout/UserNavbar";
import Wrapper from "@/components/layout/Wrapper";

const SellerMessagePage = () => {
  const [conversation, setConversation] = useState<{
    product: SellerMessageProduct | null;
    receiver: SellerMessageUser | null;
  }>({ product: null, receiver: null });

  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="">
      <UserNavbar />
      <Wrapper>
        {" "}
        <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-50px)]">
          {/* Toggle button for mobile */}
          <div className="lg:hidden flex justify-between items-center p-4 border-b border-gray-200 bg-white">
            <h2 className="text-lg font-bold">Messages</h2>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="text-pink-600 text-2xl"
            >
              <HiOutlineMenu />
            </button>
          </div>

          {/* Sidebar */}
          {showSidebar && (
            <div className="w-full lg:w-1/3 border-r border-gray-200 lg:block">
              <SellerMessageContacts
                onSelectContact={(c) => setConversation(c)}
              />
            </div>
          )}

          {/* Chat Window */}
          {conversation.product && conversation.receiver && (
            <SellerChatWindow
              product={conversation.product}
              receiver={conversation.receiver}
            />
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default SellerMessagePage;
