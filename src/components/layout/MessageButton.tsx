import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { Button } from "../ui/button";
import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

const MessageButton = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (user?.role === "seller") {
      navigate("/seller/messages");
    } else if (user?.role === "buyer") {
      navigate(`/feed/messages`);
    }
  };

  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      className="rounded-full"
      onClick={handleNavigate}
    >
      <EnvelopeIcon className="w-5 h-5" />
    </Button>
  );
};

export default MessageButton;
