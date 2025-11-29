/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  OrderStatus,
  useGetSellerOrderQuery,
} from "@/store/services/buyer/orderApi";
import { ChevronDown, Search, ShoppingBag } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import Wrapper from "../layout/Wrapper";

type NormalizedStatus = OrderStatus | "completed" | "paid" | "unknown";

interface NormalizedOrder {
  id: string;
  buyerName: string;
  buyerEmail: string;
  buyerAvatar: string;
  productName: string;
  productDetails: string;
  productImage: string;
  price: string;
  status: NormalizedStatus;
  date: string;
}

// --- HELPERS ---
const formatDate = (value?: string) => {
  if (!value) return "N/A";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "N/A";
  return parsed.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatCurrency = (value?: number | string) => {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "-";
  return `$${amount.toFixed(2)}`;
};

const normalizeStatus = (status?: string): NormalizedStatus => {
  const normalized = status?.toLowerCase() as NormalizedStatus;
  switch (normalized) {
    case "pending":
    case "processing":
    case "shipped":
    case "delivered":
    case "cancelled":
      return normalized;
    case "completed":
      return "delivered";
    case "paid":
      return "processing";
    default:
      return "unknown";
  }
};

// --- STATUS BADGE ---
const getStatusBadge = (status: NormalizedStatus) => {
  const normalized = normalizeStatus(status);
  const styles: Record<
    NormalizedStatus,
    { label: string; classes: string; showCaret?: boolean }
  > = {
    pending: {
      label: "Pending",
      classes: "bg-yellow-100 text-yellow-700",
      showCaret: true,
    },
    processing: {
      label: "Processing",
      classes: "bg-blue-100 text-blue-700",
      showCaret: true,
    },
    shipped: {
      label: "Shipped",
      classes: "bg-indigo-100 text-indigo-700",
      showCaret: true,
    },
    delivered: {
      label: "Delivered",
      classes: "bg-purple-100 text-purple-700",
    },
    cancelled: {
      label: "Cancelled",
      classes: "bg-red-100 text-red-700",
    },
    completed: {
      label: "Delivered",
      classes: "bg-purple-100 text-purple-700",
    },
    paid: {
      label: "Processing",
      classes: "bg-blue-100 text-blue-700",
    },
    unknown: {
      label: "Pending",
      classes: "bg-gray-100 text-gray-700",
    },
  };

  const badge = styles[normalized] || styles.unknown;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${badge.classes}`}
    >
      {badge.label}
      {badge.showCaret && <ChevronDown className="w-4 h-4 ml-1" />}
    </span>
  );
};

const statusTabs: { label: string; value: OrderStatus | ""; color: string }[] =
  [
    { label: "All Orders", value: "", color: "text-gray-900" },
    { label: "Pending", value: "pending", color: "text-yellow-600" },
    { label: "Processing", value: "processing", color: "text-blue-600" },
    { label: "Shipped", value: "shipped", color: "text-blue-600" },
    { label: "Delivered", value: "delivered", color: "text-purple-600" },
    { label: "Cancelled", value: "cancelled", color: "text-red-600" },
  ];



// --- MAIN COMPONENT ---
export default function OrdersList() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const queryArgs = useMemo(
    () => ({
      page,
      limit,
      search: debouncedSearch || undefined,
      status: statusFilter || undefined,
    }),
    [page, limit, debouncedSearch, statusFilter]
  );

  const { data, isLoading, isFetching } = useGetSellerOrderQuery(queryArgs);

  const rawOrders = useMemo(() => (data as any)?.data ?? [], [data]);
  const meta = (data as any)?.meta ?? {};
  const totalOrders = meta.totalOrders ?? rawOrders.length ?? 0;
  const perPage = meta.perPage ?? limit;
  const totalPages =
    meta.totalPages ?? (perPage ? Math.max(1, Math.ceil(totalOrders / perPage)) : 1);

  const normalizedOrders = useMemo<NormalizedOrder[]>(() => {
    return rawOrders.map((order: any) => {
      const status = normalizeStatus(order?.orderStatus || order?.paymentStatus);
      const quantity = order?.quantity ?? 0;

      const buyerName = order?.buyer?.name || "Unknown Buyer";
      const buyerEmail = order?.buyer?.email || "No email provided";
      const buyerAvatar =
        order?.buyer?.avatar ||
        "https://placehold.co/48x48/F3F4F6/111111?text=User";

      const productName =
        order?.product?.productInformation?.title ||
        order?.product?.title ||
        "Product";

      const productDetails =
        [quantity ? `Qty: ${quantity}` : "", order?.shippingMethod]
          .filter(Boolean)
          .join(" | ") || "Details not available";

      const productImage =
        order?.product?.images?.[0] ||
        "https://placehold.co/64x64/F5F5F5/111111?text=IMG";

      const price = formatCurrency(order?.totalAmount);
      const date = formatDate(order?.createdAt);

      return {
        id: order?._id || "N/A",
        buyerName,
        buyerEmail,
        buyerAvatar,
        productName,
        productDetails,
        productImage,
        price,
        status,
        date,
      };
    });
  }, [rawOrders]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    normalizedOrders.forEach((order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
    });
    return counts;
  }, [normalizedOrders]);

  const paginationPages = useMemo<(number | string)[]>(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_value, index) => index + 1);
    }

    const pages: (number | string)[] = [1];
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    if (start > 2) pages.push("...");
    for (let current = start; current <= end; current++) {
      pages.push(current);
    }
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);
    return pages;
  }, [page, totalPages]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleStatusChange = (value: OrderStatus | "") => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleViewDetails = (orderId: string) => {
    if (!orderId) return;
    navigate(`/orders/${orderId}`);
  };

  return (
    <>
      <Wrapper>
        <div className="min-h-screen mt-10 p-4 md:p-0">
          <div className="max-w-full mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingBag className="w-8 h-8 text-gray-800" />
                <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
              </div>
              <p className="text-gray-600">
                Manage all your buyer claims and completed orders. Approve, track,
                and fulfill from here.
              </p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {statusTabs.map((tab) => (
                  <button
                    key={tab.label}
                    className={`py-2 px-3 sm:px-4 text-sm font-semibold border-b-2 transition-all duration-150 ${
                      tab.value === statusFilter
                        ? "border-pink-600 text-pink-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => handleStatusChange(tab.value)}
                  >
                    {tab.label}{" "}
                    <span className={`ml-1 ${tab.color} font-bold`}>
                      {tab.value === ""
                        ? totalOrders
                        : statusCounts[tab.value] ?? 0}
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-auto md:min-w-[300px]">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by Order ID / Buyer name / Title"
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-pink-500 text-sm shadow-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Responsive Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Buyer Info",
                      "Order ID",
                      "Product Details",
                      "Price",
                      "Order Status",
                      "Date",
                      "Action",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {(isLoading || isFetching) && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-6 text-center text-sm text-gray-500"
                      >
                        Loading orders...
                      </td>
                    </tr>
                  )}

                  {!isLoading && !isFetching && normalizedOrders.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-6 text-center text-sm text-gray-500"
                      >
                        No orders found.
                      </td>
                    </tr>
                  )}

                  {normalizedOrders.map((order, index) => (
                    <tr
                      key={`${order.id}-${index}`}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Buyer Info */}
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-12 w-12 rounded-xl object-cover mr-3 border border-gray-200"
                            src={order.buyerAvatar}
                            alt={order.buyerName}
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {order.buyerName}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {order.buyerEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Order ID */}
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                        {order.id}
                      </td>

                      {/* Product Details */}
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-12 w-12 object-cover rounded-xl border border-gray-200 mr-3"
                            src={order.productImage}
                            alt={order.productName}
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {order.productName}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {order.productDetails}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 text-sm font-bold text-gray-900 whitespace-nowrap">
                        {order.price}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {order.date}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                        <button
                          className="text-blue-600 hover:text-blue-800 font-semibold transition duration-150"
                          onClick={() => handleViewDetails(order.id)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-end">
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                {paginationPages.map((pageNumber, index) => (
                  <button
                    key={index}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      pageNumber === page
                        ? "z-10 bg-pink-600 text-white border-pink-600"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                    disabled={pageNumber === "..."}
                    onClick={() =>
                      typeof pageNumber === "number" && setPage(pageNumber)
                    }
                  >
                    {pageNumber}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
}
