/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetMyselfOrdersQuery } from "@/store/services/buyer/orderApi";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import Wrapper from "../layout/Wrapper";
// --- Types from API ---
interface ApiOrder {
  _id: string;
  createdAt?: string;
  orderStatus?: string;
  paymentStatus?: string;
  shippingAddress?: string;
  shippingMethod?: string;
  totalAmount?: number;
  productId?: any;
  buyerId?: any;
  quantity?: number;
}

interface NormalizedOrder {
  id: string;
  date: string;
  status: string;
  productName: string;
  // seller: string;
  // sellerTier: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
  image: string;
}

// --- Helpers ---
const getStatusClasses = (status: string) => {
  switch (status) {
    case "Pending":
      return {
        text: "Pending",
        bg: "bg-yellow-100 text-yellow-700 border-yellow-200",
      };
    case "Delivered":
    case "Completed":
      return {
        text: status === "Completed" ? "Completed" : "Delivered",
        bg: "bg-green-100 text-green-700 border-green-200",
      };
    case "Processing":
      return {
        text: "Processing",
        bg: "bg-blue-100 text-blue-700 border-blue-200",
      };
    case "Shipped":
      return {
        text: "Shipped",
        bg: "bg-indigo-100 text-indigo-700 border-indigo-200",
      };
    case "Cancelled":
      return {
        text: "Cancelled",
        bg: "bg-red-100 text-red-700 border-red-200",
      };
    default:
      return {
        text: status || "Pending",
        bg: "bg-gray-100 text-gray-700 border-gray-200",
      };
  }
};

const formatDate = (value?: string) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toLowerCase(); // e.g., 12 nov 2025
};

// --- Order Card ---
interface OrderCardProps {
  order: NormalizedOrder;
  onViewDetails: (id: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {
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
{/* 
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span>{order.seller}</span>
            <span className="inline-flex items-center ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
              <Star size={12} className="mr-1 fill-yellow-500 text-yellow-500" />
              {order.sellerTier}
            </span>
          </div> */}

          <p className="text-sm text-gray-600 flex justify-between gap-2">
            Qty: x {order.quantity}{" "}
            <span className="font-semibold" style={{ color: primaryPink }}>
              ${order.pricePerUnit.toFixed(2)} per sheet
            </span>{" "}
            <span className="ml-2 font-bold text-gray-900">
              Total: ${order.total.toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-4 pt-3 border-t cursor-pointer border-gray-100 flex justify-end">
        <Button variant="outline" size="sm" onClick={() => onViewDetails(order.id)}>
          View Details
        </Button>
      </div>
    </div>
  );
};

// --- Main Orders Component ---
const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  console.log("🚀 ~ Orders ~ searchTerm:", searchTerm)
  const [statusFilter, setStatusFilter] = useState<
    "pending" | "processing" | "shipped" | "delivered" | "cancelled" | ""
  >("");

  const { data, isLoading, isFetching } = useGetMyselfOrdersQuery({
    page,
    limit,
    search: searchTerm.trim() || undefined,
    status: statusFilter || undefined,
  });

const totalOrders = (data as any)?.data?.meta?.totalOrders ?? 0;

const normalizedOrders: NormalizedOrder[] = useMemo(() => {
  const backend = (data as any)?.data ?? {};

  const apiOrders: ApiOrder[] = backend.data ?? [];
  console.log("🚀 ~ Orders ~ apiOrders:", apiOrders)

  return apiOrders.map((order: any) => {
    const quantity = order.quantity ?? 1;
    const total = order.totalAmount ?? 0;
    const pricePerUnit = quantity ? total / quantity : total;

    const product = order.product;

    const productTitle =
      product?.productInformation?.title ||
      product?.title ||
      "Product";

    // const sellerName =
    //   product?.seller?.name ||
    //   product?.seller?.userName ||
    //   "Seller";

    const productImage =
      product?.images?.[0] ||
      "https://placehold.co/80x80/F1E6FF/EE2A7B?text=IMG";

    const statusRaw = order.orderStatus || order.paymentStatus || "Pending";
    const status =
      statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1).toLowerCase();

    return {
      id: order._id,
      date: formatDate(order.createdAt),
      status,
      productName: productTitle,
      // sell5er: sellerName,
      // sellerTier: "Gold",
      quantity,
      pricePerUnit,
      total,
      image: productImage,
    };
  });
}, [data]);

  const handleViewDetails = (id: string) => {
    navigate(`/orders/${id}`);
  };

  const resetToFirstPage = () => setPage(1);

  return (
    <>
      <Wrapper>
        <div className="min-h-screen  p-4 sm:p-8">
          {/* Header */}
          <div className="w-full mb-8">
            <div className="flex items-center gap-3 mb-1">
              {/* <ChevronLeftCircle size={32} className="text-gray-800" /> */}
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            </div>
            <p className="text-gray-600">
              Track and manage all your purchases in one place
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-3 md:items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                resetToFirstPage();
              }}
              placeholder="Search orders..."
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
 <Select
  value={statusFilter || "all"}
  onValueChange={(value) => {
    setStatusFilter(value === "all" ? "" : (value as any));
    resetToFirstPage();
  }}
>
  <SelectTrigger className="w-fit rounded-lg px-3 py-2 border border-gray-200 bg-white focus:ring-2 focus:ring-primary focus:border-primary">
    <SelectValue placeholder="All Statuses" />
  </SelectTrigger>

  <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-md">
    <SelectItem className="cursor-pointer" value="all">All Statuses</SelectItem>
    <SelectItem className="cursor-pointer" value="pending">Pending</SelectItem>
    <SelectItem className="cursor-pointer" value="processing">Processing</SelectItem>
    <SelectItem className="cursor-pointer" value="shipped">Shipped</SelectItem>
    <SelectItem className="cursor-pointer" value="delivered">Delivered</SelectItem>
    <SelectItem className="cursor-pointer" value="cancelled">Cancelled</SelectItem>
  </SelectContent>
</Select>

            <div className="text-sm text-gray-500">
              Page {page}
              {totalOrders ? ` - ${totalOrders} total` : ""}
            </div>
          </div>

          {/* Orders Grid */}
          <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-6">
            {(isLoading || isFetching) && (
              <div className="col-span-full text-center text-gray-500">
                Loading orders...
              </div>
            )}
            {!isLoading && !isFetching && normalizedOrders.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No orders found.
              </div>
            )}
            {normalizedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          <div className="flex items-center justify-center mt-8  mx-auto">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="border border-black"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                className="border border-black"
                disabled={
                  isFetching ||
                  (normalizedOrders.length < limit && !totalOrders) ||
                  (totalOrders ? page * limit >= totalOrders : false)
                }
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Orders;
