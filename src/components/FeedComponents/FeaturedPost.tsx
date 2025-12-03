import React from "react";
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
  const { data, isLoading } = useGetFeedProductsQuery(undefined);

  if (isLoading) return <div>Loading...</div>;

  const products = Array.isArray(data)
    ? data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : (data as any)?.data ?? (data as any)?.products ?? [];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {products.map((product: FeedProduct) => (
        <FeedProductCard
          key={product._id}
          product={product}
          onBuyNow={onBuyNow}
        />
      ))}
    </div>
  );
};

export default FeaturedPost;
