import React, { useEffect, useState } from "react";
import { useGetFeedProductsQuery } from "@/store/services/productsApi";
import FeedProductCard from "./FeedProductCard";

// ---------------------
// User info type
// ---------------------
export interface UserInfo {
  _id: string;
  name: string;
  userName: string;
  img: string | null;
}

// ---------------------
// Seller type (flattened for frontend)
// ---------------------
export interface SellerInfo extends UserInfo {
  businessName: string;
  tiers: string;
}

// ---------------------
// Replay type
// ---------------------
export interface Replay {
  _id: string;
  userId: UserInfo;
  message: string;
  likes: string[]; // array of user IDs
}

// ---------------------
// Comment type
// ---------------------
export interface Comment {
  _id: string;
  userId: UserInfo;
  message: string;
  likes: string[]; // array of user IDs
  replays: Replay[];
  createdAt: string;
}

// ---------------------
// Social details type
// ---------------------
export interface SocialDetails {
  likes: number;
  views: number;
  viewers: string[]; // array of user IDs
  comments: Comment[];
}

// ---------------------
// Pricing and inventory type
// ---------------------
export interface PricingInventory {
  price: number;
  quantity: number;
  _id: string;
}

// ---------------------
// Product info type
// ---------------------
export interface ProductInfo {
  title: string;
  description: string;
  tags: string[];
  category: "DTF" | "UV" | "SUB" | "Screen" | "Finished";
}

// ---------------------
// Product type
// ---------------------
export interface FeedProduct {
  _id: string;
  sellerId: SellerInfo;
  type: "normal_post" | "featured_post" | "live_now";
  productInformation: ProductInfo;
  pricingAndInventory: PricingInventory[];
  extraOptions: {
    size?: string;
    color?: string;
  }[];
  images: string[];
  socialDetails: SocialDetails;
  status: "draft" | "pending_approval" | "live" | "rejected" | "archived";
  isAdminApproved: boolean;
  isSaved: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  rejectionReason: string;
  isTrending?: boolean; // optional from backend
  trendingScore?: number; // optional from backend
}

type FeaturedPostProps = {
  onBuyNow?: (product: FeedProduct) => void;
};

const FeaturedPost: React.FC<FeaturedPostProps> = ({ onBuyNow }) => {
  const [products, setProducts] = useState<FeedProduct[]>([]);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isFetching } = useGetFeedProductsQuery({ cursor }, {
    skip: !hasMore,
  });

  useEffect(() => {

    if (!data) return;

    const newProducts: FeedProduct[] = data?.data.products ?? [];
    setProducts((prev) => [...prev, ...newProducts]);
    setCursor(data.nextCursor ?? undefined);
    setHasMore(data.hasMore ?? false);
  }, [data]);



  return (
    <div className="max-w-7xl mx-auto p-6">
      {products.map((product: FeedProduct) => (
        <FeedProductCard
          key={product._id}
          product={product}
          onBuyNow={onBuyNow}
        />
      ))}

      {hasMore && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setCursor(cursor)} // triggers next page fetch
          disabled={isFetching}
        >
          {isFetching ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};


export default FeaturedPost;
