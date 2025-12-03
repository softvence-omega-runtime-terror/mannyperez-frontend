import { Button } from "../ui/button";
import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const MessageButton = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (user?.role === "seller") {
      navigate("/seller/messages");
    } else if (user?.role === "buyer") {
      navigate("/feed/messages");
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      className="rounded-full p-2 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 transition-colors"
      onClick={handleNavigate}
      aria-label="Open messages"
    >
      <MessageCircle className="w-5 h-5 text-gray-700" />
    </Button>
  );
};

export default MessageButton;
