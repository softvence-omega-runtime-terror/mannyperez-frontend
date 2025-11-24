import React from "react";
import { ChevronLeftCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button"; // Shadcn Button import
import Wrapper from "../layout/Wrapper";
import Footer from "../layout/Footer";

// --- Types ---
interface Order {
  id: string;
  date: string;
  status: "Pending" | "Delivered" | string;
  productName: string;
  seller: string;
  sellerTier: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
  image: string;
}

// --- MOCK DATA ---
const mockOrders: Order[] = [
  {
    id: "ORD-23984",
    date: "Aug 12, 2025",
    status: "Pending",
    productName: "Glitter DTF Transfers — A4 Sheets",
    seller: "VinylMaster",
    sellerTier: "Gold",
    quantity: 3,
    pricePerUnit: 15,
    total: 45,
    image: "https://placehold.co/80x80/F1E6FF/EE2A7B?text=DTF",
  },
  {
    id: "ORD-23985",
    date: "Aug 12, 2025",
    status: "Delivered",
    productName: "Glitter DTF Transfers — A4 Sheets",
    seller: "VinylMaster",
    sellerTier: "Gold",
    quantity: 3,
    pricePerUnit: 15,
    total: 45,
    image: "https://placehold.co/80x80/F1E6FF/EE2A7B?text=DTF",
  },
  {
    id: "ORD-23986",
    date: "Aug 13, 2025",
    status: "Pending",
    productName: "Custom Holographic Stickers (Pack of 50)",
    seller: "StickerKing",
    sellerTier: "Silver",
    quantity: 1,
    pricePerUnit: 25,
    total: 25,
    image: "https://placehold.co/80x80/DCEFFF/3B82F6?text=STICKER",
  },
  {
    id: "ORD-23987",
    date: "Aug 13, 2025",
    status: "Delivered",
    productName: "UV DTF Wraps - Floral Design",
    seller: "WrapItUp",
    sellerTier: "Gold",
    quantity: 2,
    pricePerUnit: 20,
    total: 40,
    image: "https://placehold.co/80x80/FFF3F0/E91E63?text=WRAP",
  },
];

// --- Helper ---
const getStatusClasses = (status: Order["status"]) => {
  switch (status) {
    case "Pending":
      return {
        text: "Pending",
        bg: "bg-yellow-100 text-yellow-700 border-yellow-200",
      };
    case "Delivered":
      return {
        text: "Delivered",
        bg: "bg-green-100 text-green-700 border-green-200",
      };
    default:
      return {
        text: status,
        bg: "bg-gray-100 text-gray-700 border-gray-200",
      };
  }
};

// --- Order Card ---
interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const statusInfo = getStatusClasses(order.status);
  const primaryPink = "#EE2A7B"; // price/total color

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 h-full flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">Order #{order.id}</h3>
          <p className="text-xs text-gray-500">Placed on: {order.date}</p>
        </div>

        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusInfo.bg}`}
        >
          {statusInfo.text}
        </span>
      </div>

      {/* Product Details */}
      <div className="flex items-center gap-4 border-t pt-4 border-gray-100">
        <img
          src={order.image}
          alt={order.productName}
          className="w-20 h-20 object-cover rounded-lg"
        />

        <div className="flex-grow">
          <p className="font-medium text-gray-900 mb-1">{order.productName}</p>

          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span>{order.seller}</span>
            <span className="inline-flex items-center ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
              <Star size={12} className="mr-1 fill-yellow-500 text-yellow-500" />
              {order.sellerTier}
            </span>
          </div>

          <p className="text-sm text-gray-600">
            Qty: x {order.quantity}{" "}
            <span className="font-semibold" style={{ color: primaryPink }}>
              ${order.pricePerUnit} per sheet
            </span>{" "}
            <span className="ml-2 font-bold text-gray-900">
              Total: ${order.total}
            </span>
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </div>
    </div>
  );
};

// --- Main Orders Component ---
const SavedItems: React.FC = () => {
  return (
    <>
    <Wrapper>
        <div className="min-h-screen  p-4 sm:p-8">
      {/* Header */}
      <div className="w-full mb-8">
        <div className="flex items-center gap-3 mb-1">
          <ChevronLeftCircle size={32} className="text-gray-800" />
          <h1 className="text-3xl font-bold text-gray-900">Saved Items</h1>
        </div>
        <p className="text-gray-600">
          Track and manage all your purchases in one place
        </p>
      </div>

      {/* Orders Grid */}
      <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {/* <div className="flex items-center justify-center mt-8  mx-auto">
        <Button variant="outline" className="w-48 border border-black">Load More</Button>
      </div> */}
    </div>
    </Wrapper>
    <Footer/>
    </>
  );
};

export default SavedItems;
