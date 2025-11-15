import { useState } from "react";
import SellerMessageContacts, { SellerMessageProduct, SellerMessageUser } from "./SellerMessageContacts";
import SellerChatWindow from "./SellerChatWindow";
import { HiOutlineMenu } from "react-icons/hi";
import UserNavbar from "@/components/layout/UserNavbar";

const SellerMessagePage = () => {
  const [conversation, setConversation] = useState<{
    product: SellerMessageProduct | null;
    receiver: SellerMessageUser | null;
  }>({ product: null, receiver: null });

  const [showSidebar, setShowSidebar] = useState(true);

  return (
    // Main container: Use flex-col to stack navbar and content, min-h-screen for full height
    <div className="flex flex-col min-h-screen"> 
      <UserNavbar />

      {/* Main Content Area: flex-1 takes remaining height, max-w-7xl centers content */}
      <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full p-4"> 
        {/* Sidebar toggle for mobile */}
        <div className="lg:hidden absolute top-[64px] left-0 right-0 z-20 flex justify-between items-center p-4 border-b border-gray-200 bg-white"> 
          <h2 className="text-lg font-bold">Messages</h2>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-pink-600 text-2xl"
          >
            <HiOutlineMenu />
          </button>
        </div>

        {/* Sidebar: w-full or w-1/3 and h-full */}
        {showSidebar && (
          <div className="w-full lg:w-1/3 border-r border-gray-200 overflow-y-auto pr-4"> 
            <SellerMessageContacts 
              onSelectContact={(c) => {
                setConversation(c);
                if (window.innerWidth < 1024) setShowSidebar(false);
              }} 
            />
          </div>
        )}

        {/* Chat Window Container: flex-1 for width, h-full for height */}
        <div className="flex-1 h-full flex flex-col pl-4"> 
          {conversation.product && conversation.receiver ? (
            <SellerChatWindow
              product={conversation.product}
              receiver={conversation.receiver}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 bg-white rounded-xl shadow">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerMessagePage;
