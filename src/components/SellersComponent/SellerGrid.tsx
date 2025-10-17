
import { Button } from "@/components/ui/button"
import { SellerCard } from "./SellerCard"

export function SellersGrid() {
 const sellers = [
  {
    sellerName: "VinylMaster",
    sellerTier: "platinum" as const,
    description: "Premium vinyl decals and custom stickers. Fast turnaround, worldwide shipping.",
    productCount: 89,
    timeAgo: "2h ago",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    isHighlighted: true,
  },
  {
    sellerName: "FabricFantasy",
    sellerTier: "diamond" as const,
    description: "High-quality fabrics for all your crafting needs. Cotton, polyester, blends and more.",
    productCount: 156,
    timeAgo: "2h ago",
    profileImage: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    sellerName: "UVUniverse",
    sellerTier: "gold" as const,
    description: "Professional UV printing services and materials. Industrial grade quality guaranteed.",
    productCount: 267,
    timeAgo: "2h ago",
    profileImage: "https://randomuser.me/api/portraits/men/12.jpg",
    discountBadge: "137%",
  },
  {
    sellerName: "SubliStation",
    sellerTier: "platinum" as const,
    description: "Complete sublimation solutions. Papers, inks, blanks, and equipment all in one place.",
    productCount: 445,
    timeAgo: "2h ago",
    profileImage: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    sellerName: "HeatPressHub",
    sellerTier: "gold" as const,
    description: "Heat transfer vinyl, heat press machines, and accessories. Beginner friendly support.",
    productCount: 78,
    timeAgo: "2h ago",
    profileImage: "https://randomuser.me/api/portraits/men/19.jpg",
  },
  {
    sellerName: "DesignDepo",
    sellerTier: "platinum" as const,
    description: "Custom digital designs. DTF ready files, and print-on-demand artwork. Creative solutions.",
    productCount: 1200,
    timeAgo: "2h ago",
    profileImage: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    sellerName: "CraftSupplyCo",
    sellerTier: "diamond" as const,
    description: "One-stop shop for all crafting supplies. Tools, materials, and accessories for every project.",
    productCount: 892,
    timeAgo: "2h ago",
    profileImage: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    sellerName: "FriendlyCrafts",
    sellerTier: "platinum" as const,
    description: "Sustainable and eco-friendly crafting materials. Organic fabrics and biodegradable supplies.",
    productCount: 84,
    timeAgo: "2h ago",
    profileImage: "https://randomuser.me/api/portraits/women/62.jpg",
  },
];

  return (
    <section className="pt-15 px-4 sm:px-6 lg:px-8">
      <div className="">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
          {sellers.map((seller, index) => (
            <SellerCard key={index} {...seller} />
          ))}
        </div>

        {/* Load More Section */}
        <div className="flex flex-col items-center gap-3">
          <Button
            variant="outline"
            size="lg"
            className="border-[#E91E8C] text-[#E91E8C] hover:bg-[#E91E8C] hover:text-white font-medium px-8 bg-transparent"
          >
            Load More Sellers
          </Button>
          <p className="text-sm text-gray-500">Showing 8 of 2800</p>
        </div>
      </div>
    </section>
  )
}
