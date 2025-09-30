export type Seller = {
  name: string;
  avatar: string;
  tier: "gold" | "platinum" | "diamond" | string;
};

export type UserTier = "gold" | "platinum" | "diamond"

export type LiveSaleCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  status: "upcoming" | "live" | string;
  startsIn: number; // in hours
  duration: number; // in minutes
  expectedUsers: string; // e.g., "1.1k"
  productCount: number;
  seller: Seller;
};

