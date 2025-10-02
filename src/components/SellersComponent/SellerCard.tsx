import { Clock, Package, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SellerCardProps {
  sellerName: string
  sellerTier: "platinum" | "gold" | "diamond"
  description: string
  productCount: number
  timeAgo: string
  profileImage: string

  discountBadge?: string
}

export function SellerCard({
  sellerName,
  sellerTier,
  description,
  productCount,
  timeAgo,
  profileImage,
  
  discountBadge,
}: SellerCardProps) {
  const tierColors = {
    platinum: "bg-purple-100 text-purple-700 border-purple-200",
    gold: "bg-yellow-100 text-yellow-700 border-yellow-200",
    diamond: "bg-blue-100 text-blue-700 border-blue-200",
  }

  const tierLabels = {
    platinum: "Platinum",
    gold: "Gold",
    diamond: "Diamond",
  }

  return (
    <div
      className={`bg-white rounded-lg p-6 space-y-6 shadow-sm hover:shadow-md transition-all `}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <img src={profileImage || "/placeholder.svg"} alt={sellerName} className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 text-sm">{sellerName}</h3>
            {discountBadge && (
              <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">{discountBadge}</span>
            )}
          </div>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-medium ${tierColors[sellerTier]}`}
          >
            <BadgeCheck className="w-3 h-3" />
            {tierLabels[sellerTier]}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#E91E8C] hover:text-[#E91E8C] hover:bg-pink-50 font-medium text-sm h-auto py-1 px-2 flex-shrink-0"
        >
          + Follow
        </Button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{description}</p>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-gray-500 ">
        <div className="flex items-center gap-1">
          <Package className="w-3.5 h-3.5" />
          <span className="font-medium">{productCount.toLocaleString()} Products</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{timeAgo}</span>
        </div>
      </div>

      {/* View Profile Button */}
      <Button
        variant="outline"
        className="w-full border-[#E91E8C] text-[#E91E8C] hover:bg-[#E91E8C] hover:text-white font-medium transition-colors bg-transparent"
      >
        View Profile
      </Button>
    </div>
  )
}
