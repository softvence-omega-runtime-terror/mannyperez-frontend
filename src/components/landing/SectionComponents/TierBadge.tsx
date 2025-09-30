import { UserTier } from "@/types/LiveSaleCardProps"
import { Badge } from "../../ui/badge"



export default function TierBadge({ tier }: { tier: UserTier }) {
  const tierConfig = {
    gold: { label: "Gold", className: "bg-yellow-100 text-yellow-700 border-yellow-300" },
    platinum: { label: "Platinum", className: "bg-purple-100 text-purple-700 border-purple-300" },
    diamond: { label: "Diamond", className: "bg-cyan-100 text-cyan-700 border-cyan-300" },
  }

  const config = tierConfig[tier]

  return (
    <Badge variant="outline" className={`${config.className} text-xs font-medium`}>
      {config.label}
    </Badge>
  )
}