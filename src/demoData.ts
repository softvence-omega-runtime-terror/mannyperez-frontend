// demoData.ts

// --- INTERFACES ---

export interface FilterTab {
  label: string;
  count: number;
  color: string;
}

export interface BuyerInfo {
  name: string;
  email: string;
  avatar: string;
}

export interface ProductInfo {
  name: string;
  details: string;
  image: string;
}

export interface Order {
  id: string;
  buyer: BuyerInfo;
  product: ProductInfo;
  price: string | null;
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
  date: string;
}

// --- MOCK DATA ---

export const filterTabs: FilterTab[] = [
  { label: "All Orders", count: 50, color: "text-gray-900" },
  { label: "Pending Payment", count: 2, color: "text-yellow-600" },
  { label: "Paid", count: 2, color: "text-green-600" },
  { label: "Shipped", count: 2, color: "text-blue-600" },
  { label: "Completed", count: 2, color: "text-purple-600" },
  { label: "Cancelled", count: 2, color: "text-red-600" },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-2541",
    buyer: {
      name: "CraftyBuyer",
      email: "crafty@email.com",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    product: {
      name: "Holographic DTF Sheets",
      details: "A4 Size • Qty: 10 pcs",
      image: "https://placehold.co/80x80/94B3FF/ffffff?text=DTF",
    },
    price: null,
    status: "Pending",
    date: "Sep 30, 2025",
  },
  {
    id: "ORD-2541",
    buyer: {
      name: "CreativeJen",
      email: "jen@email.com",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    product: {
      name: "Holographic DTF Sheets",
      details: "A4 Size • Qty: 10 pcs",
      image: "https://placehold.co/80x80/5D2E8C/ffffff?text=DTF",
    },
    price: "$160.00",
    status: "Paid",
    date: "Sep 29, 2025",
  },
  {
    id: "ORD-2539",
    buyer: {
      name: "DesignPro",
      email: "design@email.com",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    product: {
      name: "Holographic DTF Sheets",
      details: "A4 Size • Qty: 10 pcs",
      image: "https://placehold.co/80x80/FF5757/ffffff?text=DTF",
    },
    price: "$120.00",
    status: "Shipped",
    date: "Sep 28, 2025",
  },
  {
    id: "ORD-2538",
    buyer: {
      name: "ArtisticSoul",
      email: "artistic@email.com",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    product: {
      name: "Holographic DTF Sheets",
      details: "A4 Size • Qty: 10 pcs",
      image: "https://placehold.co/80x80/4C4C6D/ffffff?text=DTF",
    },
    price: "$64.00",
    status: "Completed",
    date: "Sep 27, 2025",
  },
];
