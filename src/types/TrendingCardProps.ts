export type TrendingProduct = {
  id: string;
  title: string;
  seller: string;
  badge: "gold" | "platinum" | "diamond" | string;
  price: number;
  unit: string;
  imageUrl: string;
};

