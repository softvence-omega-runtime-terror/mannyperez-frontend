import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGetFeedProductsQuery } from "@/store/services/productsApi";
import FeedProductCard from "./FeedProductCard";

// ---------------------
// User info type
// ---------------------
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
  businessName?: string; // optional
  tiers?: string;        // optional
}

// ---------------------
// Replay type
// ---------------------
export interface Replay {
  _id: string;
  userId: UserInfo;
  message: string;
  likes: string[]; // array of user IDs
  createdAt?: string; // optional because API may not send
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
  createdAt?: string;
}

// ---------------------
// Social details type
// ---------------------
export interface SocialDetails {
  likes: number;
  likers: string[]; // array of user IDs
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
// Extra options
// ---------------------
export interface ExtraOption {
  size?: string;
  color?: string;
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
  extraOptions?: ExtraOption[];
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
  likes: number;
  isLiked: boolean;
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

  // Local state to prevent duplicate fetches
  const isFetchingRef = useRef(false);

  const { data, isFetching } = useGetFeedProductsQuery(
    { cursor },
    { skip: !hasMore }
  );

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // -------------------- Merge fetched data --------------------
  useEffect(() => {
    if (!data) return;

    const newProducts: FeedProduct[] = data?.data.products ?? [];
    setProducts((prev) => [...prev, ...newProducts]);
    setCursor(data.nextCursor ?? undefined);
    setHasMore(data.hasMore ?? false);

    // reset fetching flag
    isFetchingRef.current = false;
  }, [data]);

  // -------------------- Intersection Observer --------------------
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        hasMore &&
        !isFetchingRef.current &&
        !isFetching
      ) {
        isFetchingRef.current = true; // prevent duplicate triggers
        setCursor(cursor); // triggers next fetch
      }
    },
    [cursor, hasMore, isFetching]
  );

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "200px", // preload a bit before reaching bottom
      threshold: 0,
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [handleObserver]);

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
        <div
          ref={loadMoreRef}
          className="h-10 flex justify-center items-center text-gray-500"
        >
          {isFetching && <span>Loading...</span>}
        </div>
      )}
    </div>
  );
};

export default FeaturedPost;
