import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SellerMessageContacts from "./SellerMessageContacts";
import SellerChatWindow from "./SellerChatWindow";
import SellerMessageRightSidebar from "./SellerMessageRightSidebar";
import UserNavbar from "@/components/layout/UserNavbar";
import { RootState } from "@/store";
import { HiOutlineMenu } from "react-icons/hi";

const SellerMessagePage = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const selectedConversation = useSelector(
    (state: RootState) => state.selectedConversation
  );

  useEffect(() => {
    if (window.innerWidth < 1024 && selectedConversation.receiver) {
      setShowSidebar(false);
    }
  }, [selectedConversation.receiver]);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">

      <UserNavbar />

      {/* Main container — FULL WIDTH, FULL HEIGHT */}
      <div className="flex flex-1 overflow-hidden relative bg-gray-50">

        {/* Mobile top header */}
        <div className="lg:hidden absolute top-0 left-0 right-0 bg-white z-20 px-4 py-3 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Messages</h2>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-pink-600 text-2xl"
          >
            <HiOutlineMenu />
          </button>
        </div>

        {/* LEFT SIDEBAR — Contacts */}
        <div
          className={`
            bg-white border-r border-gray-200 h-full overflow-y-auto transition-all
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
            absolute top-[56px] left-0 right-0 z-30
            lg:static lg:translate-x-0 
            w-full lg:w-[28%] xl:w-[25%]
          `}
        >
          <SellerMessageContacts />
        </div>

        {/* CHAT WINDOW — Center */}
        <div className="flex-1 flex flex-col h-full overflow-hidden px-0 lg:px-4">
          {selectedConversation.product && selectedConversation.receiver ? (
            <SellerChatWindow
              product={selectedConversation.product}
              receiver={selectedConversation.receiver}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a conversation to start chatting
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR — Profile/Order info (XL screens+) */}
        <div className="hidden xl:flex flex-col w-[300px] border-l bg-white overflow-y-auto">
          <SellerMessageRightSidebar />
        </div>
      </div>
    </div>
  );
};

export default SellerMessagePage;
