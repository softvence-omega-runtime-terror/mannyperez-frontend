import { Search, ChevronDown, ShoppingBag } from "lucide-react";
import { filterTabs, mockOrders } from "@/demoData";
import Wrapper from "../layout/Wrapper";
import Footer from "../layout/Footer";
// --- STATUS BADGE ---
const getStatusBadge = (status: string) => {
  let classes = "";
  switch (status) {
    case "Pending":
      classes = "bg-yellow-100 text-yellow-700";
      break;
    case "Paid":
      classes = "bg-green-100 text-green-700";
      break;
    case "Shipped":
      classes = "bg-blue-100 text-blue-700";
      break;
    case "Completed":
      classes = "bg-purple-100 text-purple-700";
      break;
    case "Cancelled":
      classes = "bg-red-100 text-red-700";
      break;
    default:
      classes = "bg-gray-100 text-gray-700";
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${classes}`}
    >
      {status}
      {(status === "Pending" || status === "Shipped") && (
        <ChevronDown className="w-4 h-4 ml-1" />
      )}
    </span>
  );
};

// --- MAIN COMPONENT ---
export default function OrdersList() {
  const activeTab = "All Orders";

  return (
    <>
    <Wrapper>
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
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
            {filterTabs.map((tab) => (
              <button
                key={tab.label}
                className={`py-2 px-3 sm:px-4 text-sm font-semibold border-b-2 transition-all duration-150 ${
                  tab.label === activeTab
                    ? "border-pink-600 text-pink-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}{" "}
                <span className={`ml-1 ${tab.color} font-bold`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <input
              type="text"
              placeholder="Search by Order ID / Buyer name /"
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
              {mockOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  {/* Buyer Info */}
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-12 w-12 rounded-xl object-cover mr-3 border border-gray-200"
                        src={order.buyer.avatar}
                        alt={order.buyer.name}
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {order.buyer.name}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {order.buyer.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Order ID */}
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                    #{order.id}
                  </td>

                  {/* Product Details */}
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-12 w-12 object-cover rounded-xl border border-gray-200 mr-3"
                        src={order.product.image}
                        alt={order.product.name}
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {order.product.name}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {order.product.details}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 whitespace-nowrap">
                    {order.price || "-"}
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
                    {order.status === "Paid" ? (
                      <button className="text-pink-600 hover:text-pink-800 font-semibold transition duration-150">
                        Mark as Shipped
                      </button>
                    ) : (
                      <button className="text-blue-600 hover:text-blue-800 font-semibold transition duration-150">
                        View Details
                      </button>
                    )}
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
            {["1", "2", "3", "...", "9"].map((page, index) => (
              <button
                key={index}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === "1"
                    ? "z-10 bg-pink-600 text-white border-pink-600"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
    </Wrapper>
    <Footer/>
    </>
  );
}
