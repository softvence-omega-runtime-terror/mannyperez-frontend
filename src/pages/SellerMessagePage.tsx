import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SellerMessageContacts from "./SellerMessageContacts";
import SellerChatWindow from "./SellerChatWindow";
import { HiOutlineMenu } from "react-icons/hi";
import UserNavbar from "@/components/layout/UserNavbar";
import { RootState } from "@/store";


const SellerMessagePage = () => {
  // Mobile sidebar toggle
  const [showSidebar, setShowSidebar] = useState(true);

  // Selected conversation from Redux
  const selectedConversation = useSelector(
    (state: RootState) => state.selectedConversation
  );

  // Close sidebar automatically on mobile when a conversation is selected
  useEffect(() => {
    if (window.innerWidth < 1024 && selectedConversation.receiver) {
      setShowSidebar(false);
    }
  }, [selectedConversation.receiver]);

  return (
    <div className="flex flex-col min-h-screen">
      <UserNavbar />

      <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full p-4 relative">
        {/* Mobile toggle button */}
        <div className="lg:hidden absolute top-[64px] left-0 right-0 z-20 flex justify-between items-center p-4 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-bold">Messages</h2>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-pink-600 text-2xl"
          >
            <HiOutlineMenu />
          </button>
        </div>

        {/* Sidebar / Contacts */}
        {showSidebar && (
          <div className="w-full lg:w-1/3 border-r border-gray-200 overflow-y-auto pr-4 z-10 bg-white">
            <SellerMessageContacts />
          </div>
        )}

        {/* Chat window */}
        <div className="flex-1 h-full flex flex-col pl-0 lg:pl-4">
          {selectedConversation.product && selectedConversation.receiver ? (
            <SellerChatWindow
              product={selectedConversation.product}
              receiver={selectedConversation.receiver}
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
