import { useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { socket, SocketEvent } from "@/lib/socket";
import { useGetProductByIdQuery } from "@/store/services/productsApi";
import { useGetSingleUserQuery } from "@/store/services/userApi";
import MessageInput from "../MessageInput";
import MessageList from "./MessageList";

type MessageUser = {
  _id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
};

export type Message = {
  _id: string; // MongoDB _id
  conversationId: string; // conversation _id
  sender: MessageUser; // populated sender info
  receiver: MessageUser; // populated receiver info
  text?: string; // optional text
  mediaUrl?: string; // optional media URL
  mediaType?: "image" | "video" | "pdf" | "document"; // optional media type
  status: "sent" | "delivered" | "read"; // status
  fileName?: string; // optional file name
};

export type MessageProduct = {
  _id: string; // corresponds to _id
  productInformation: {
    title: string;
    description: string;
    tags: string[];
  };
  extraOptions: {
    productVariants: boolean;
  };

  sellerId: {
    id: string;
    name: string;
    email: string;
  };

  pricingAndInventory: {
    price: number;
    quantity: number;
    id: string;
  }[];
  images: string[];
};

const MessagingPage = () => {
  const { receiverId, productId } = useParams();

  const { data: productData, isLoading: productLoading } =
    useGetProductByIdQuery(productId);
  const { data: receiverData, isLoading: receiverLoading } =
    useGetSingleUserQuery(receiverId!, { skip: !receiverId });
  const user = useAppSelector((state) => state.auth.user);

  const product = productData?.data as MessageProduct;

  const receiver = receiverData?.data as MessageUser;

  useEffect(() => {
    if (!product || !receiver || !user) return;

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
  }, [product, receiver, user]);

  if (productLoading || receiverLoading) return <div>Loading...</div>;

  if (!product || !receiver || !user) return <div>Select a Conversation</div>;

  return (
    <div className="flex flex-col max-h-screen bg-white">
      <MessageList
        productId={product._id}
        receiverId={receiver._id}
      />
      <div className="sticky bottom-0 bg-white z-10">
        <MessageInput
          productId={product._id}
          receiverId={receiver._id}
        />
      </div>
    </div>
  );
};

export default MessagingPage;
