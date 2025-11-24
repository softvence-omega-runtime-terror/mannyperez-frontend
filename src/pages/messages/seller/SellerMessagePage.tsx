import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SellerMessageContacts from "./SellerMessageContacts";
import SellerChatWindow from "./SellerChatWindow";
import SellerMessageRightSidebar from "./SellerMessageRightSidebar";
import { RootState } from "@/store";
import { HiOutlineMenu } from "react-icons/hi";

const SellerMessagePage = () => {
  const [showContactsSidebar, setShowContactsSidebar] = useState(false);

  const selectedConversation = useSelector(
    (state: RootState) => state.selectedConversation
  );

  // Auto-hide contacts sidebar on mobile/tablet when a conversation is selected
  useEffect(() => {
    // Only applies if a conversation is selected AND screen is smaller than large (lg: 1024px)
    if (window.innerWidth < 1024 && selectedConversation.receiver) {
      setShowContactsSidebar(false);
    }
  }, [selectedConversation.receiver]);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">

      {/* Main Container: Full height, flexible content area */}
      <div className="flex flex-1 overflow-hidden relative bg-gray-50">
        {/* Mobile top header (for toggling contacts) */}
        <div className="lg:hidden absolute top-0 left-0 right-0 bg-white z-30 px-4 py-3 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Messages</h2>
          <button
            onClick={() => setShowContactsSidebar(!showContactsSidebar)}
            className="text-pink-600 text-2xl"
            aria-label="Toggle contacts"
          >
            <HiOutlineMenu />
          </button>
        </div>

        {/* LEFT SIDEBAR — Contacts List */}
        <div
          className={`
            bg-white border-r border-gray-200 h-full overflow-y-auto transition-all duration-300 ease-in-out
            ${showContactsSidebar ? "translate-x-0" : "-translate-x-full"}
            absolute top-[56px] left-0 right-0 z-20 
            lg:static lg:translate-x-0 
            w-full lg:w-[320px] xl:w-[25%] 
          `}
        >
          <div className="p-4">
            <SellerMessageContacts />
          </div>
        </div>

        {/* CHAT WINDOW — Center Panel */}
        <div className="flex-1 flex flex-col h-full overflow-hidden p-0 lg:p-4 mt-[56px] lg:mt-0">
          {selectedConversation.product && selectedConversation.receiver ? (
            <SellerChatWindow
              product={selectedConversation.product}
              receiver={selectedConversation.receiver}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 bg-white rounded-xl m-4 lg:m-0">
              Select a conversation to start chatting
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR — Product/User Info (Large screens+) */}
        <div className="hidden lg:flex flex-col w-[300px] bg-white border-l border-gray-200 overflow-y-auto p-4">
          <SellerMessageRightSidebar />
        </div>
      </div>
    </div>
  );
};

export default SellerMessagePage;
