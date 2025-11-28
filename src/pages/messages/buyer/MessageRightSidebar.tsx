/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/store/services/productsApi";
import { FaStar } from "react-icons/fa";
import { useAppSelector } from "@/store/hooks";
import { useGetSingleSellerQuery } from "@/store/services/seller";

const MessageRightSidebar = () => {
  const { productId } = useParams<{
    productId: string;
    receiverId: string;
  }>();

  const user = useAppSelector((state) => state.auth.user);

  // Fetch product details
  const { data: productData, isLoading: productLoading } =
    useGetProductByIdQuery(productId!);

  // Once we have the product, fetch seller info
  // @ts-ignore
  const sellerId = productData?.data?.sellerId?._id;
  const { data: sellerData, isLoading: sellerLoading } =
    useGetSingleSellerQuery(sellerId!, {
      skip: !sellerId,
    });

  if (productLoading || sellerLoading) {
    return (
      <div className="flex flex-col bg-white min-h-full rounded-xl border border-gray-100">
        <p className="text-gray-400 text-center mt-10 p-4">Loading...</p>
      </div>
    );
  }

  if (!productData?.data || !sellerData?.data) {
    return (
      <div className="flex flex-col bg-white min-h-full rounded-xl border border-gray-100">
        <p className="text-gray-400 text-center mt-10 p-4">
          Data not available
        </p>
      </div>
    );
  }

  const product = productData.data;
  const seller = sellerData.data;

  const badgeColors: Record<string, string> = {
    gold: "bg-yellow-100 text-yellow-800",
    silver: "bg-gray-200 text-gray-800",
    platinum: "bg-purple-100 text-purple-800",
  };

  const productTitle = product.productInformation?.title || "No title";
  const description =
    product.productInformation?.description ||
    "Specialized product with unique features";
  const price = product.pricingAndInventory?.[0]?.price;

  const orderCompletion = seller.successRate;
  const totalOrders = seller.totalOrders;
  const responseTime = "Within 1 hour"; //TODO: Replace with actual stats
  const badge = seller.tiers;

  return (
    <div className="flex flex-col bg-white min-h-full rounded-xl space-y-6 p-6 shadow border border-gray-100">
      {/* Profile Image */}
      <div className="flex justify-center">
        <img
          src={product.images?.[0] || "/default-profile.png"}
          alt={productTitle}
          className="w-24 h-24 rounded-full border-2 border-pink-500 object-cover shadow-lg"
        />
      </div>

      {/* Product Title and Badge */}
      <div className="text-center space-y-2">
        <h2 className="text-lg font-bold">{productTitle}</h2>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            badgeColors[badge?.toLowerCase()]
          }`}
        >
          <FaStar className="mr-1 text-yellow-500 capitalize" />
          {badge} Seller
        </span>
      </div>

      {/* Description */}
      <p className="text-center text-gray-500 text-sm italic border-b border-gray-100 pb-4">
        {description}
      </p>

      {/* Product & Seller Info */}
      <div className="space-y-3">
        <div className="flex justify-between text-gray-700">
          <span className="font-medium">Seller:</span>
          <span className="font-semibold">{seller.name}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span className="font-medium">Buyer:</span>
          <span className="font-semibold">{user?.name}</span>
        </div>
        {price && (
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Base Price:</span>
            <span className="font-bold text-pink-600">${price.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Seller Stats */}
      <div className="space-y-3 border-t border-gray-200 pt-4">
        <h3 className="text-md font-semibold text-gray-800">
          Seller Statistics
        </h3>
        <div className="flex justify-between text-gray-700">
          <span>Response time</span>
          <span className="text-green-600 font-medium">{responseTime}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Order completion</span>
          <span className="text-blue-600 font-medium">{orderCompletion}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Total orders</span>
          <span className="font-bold">{totalOrders.toLocaleString()}</span>
        </div>
      </div>

      {/* Button */}
      <div className="text-center pt-4">
        <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-lg w-full transition">
          View Full Profile
        </button>
      </div>
    </div>
  );
};

export default MessageRightSidebar;
