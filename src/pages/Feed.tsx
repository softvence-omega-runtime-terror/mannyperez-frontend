// src/pages/Feed.tsx
import React, { useState } from "react";
import DestashAdmin from "@/components/FeedComponents/DestashAdmin";
import DiamondPost from "@/components/FeedComponents/DiamondPost";
import FeaturedPost from "@/components/FeedComponents/FeaturedPost";
import FeedSidbar from "@/components/FeedComponents/FeedSidebar";
import FeedSpotlight from "@/components/FeedComponents/FeedSpotlight";
import GoldPost from "@/components/FeedComponents/GoldPost";
import LiveStream from "@/components/FeedComponents/LiveStream";

// Type for product info
interface ProductType {
  title: string;
  price: string;
  imageUrls: string[];
  description: string;
}

function Feed() {
  const [checkoutProduct, setCheckoutProduct] = useState<ProductType | null>(null);

  // Handler for Buy Now
  const handleBuyNow = (product: ProductType) => {
    setCheckoutProduct(product);
  };

  // Close checkout
  const handleBackToFeed = () => {
    setCheckoutProduct(null);
  };

  // If user clicked Buy Now → show Payment Layout
  if (checkoutProduct) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left - main checkout content */}
          <div className="lg:col-span-9 bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">{checkoutProduct.title}</h2>
            <p className="mb-4">{checkoutProduct.description}</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {checkoutProduct.imageUrls.map((img, idx) => (
                <img key={idx} src={img} alt={`product-${idx}`} className="w-full rounded-lg" />
              ))}
            </div>
            <p className="text-xl font-bold mb-4">{checkoutProduct.price}</p>
            <button
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Complete Payment
            </button>
            <button
              onClick={handleBackToFeed}
              className="ml-4 px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
            >
              Back
            </button>
          </div>

          {/* Right - sidebar */}
          <div className="lg:col-span-3">
            <FeedSidbar />
          </div>
        </div>
      </div>
    );
  }

  // Default feed view
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (Main Content, 75%) */}
        <div className="lg:col-span-9">
          <DestashAdmin />
          <FeedSpotlight />
          <LiveStream />
          <FeaturedPost onBuyNow={handleBuyNow} />
          <DiamondPost onBuyNow={handleBuyNow} />
          <GoldPost onBuyNow={handleBuyNow} />
        </div>

        {/* Right (Sidebar, 25%) */}
        <div className="lg:col-span-3">
          <FeedSidbar />
        </div>
      </div>
    </div>
  );
}

export default Feed;
