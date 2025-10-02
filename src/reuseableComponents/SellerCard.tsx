import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type TierBadge = "Gold" | "Platinum" | "Diamond"

interface SellerCard {
    id:string,
  username: string
  avatar: string
  tier: "Gold" | "Platinum" | "Diamond"
  listingCount: number
}
interface SellerCardProps{
    item:SellerCard
}

const tierColors: Record<TierBadge, string> = {
  Gold: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Platinum: "bg-purple-100 text-purple-700 border-purple-300",
  Diamond: "bg-cyan-100 text-cyan-700 border-cyan-300",
}

const tierIcons: Record<TierBadge, string> = {
  Gold: "⭐",
  Platinum: "💎",
  Diamond: "💠",
}

const SellerCard : React.FC<SellerCardProps> = (props) => {

   const { username, avatar, tier, listingCount } = props.item

  return (
    <Card className="flex items-center justify-between p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow ">
        <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3 flex-1">
        <Avatar className="h-12 w-12 rounded-2xl">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={username} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-sm">{username}</h3>
            <Badge variant="outline" className={`text-xs ${tierColors[tier]}`}>
              {tierIcons[tier]} {tier}
            </Badge>
          </div>
          <p className="text-sm text-blue-600 font-medium">{listingCount}+ Listings</p>
        </div>
      </div>
      <Button variant="outline" size="sm"    className="ml-2 bg-transparent">
        View
      </Button>
        </div>
    </Card>
  )
}

export default SellerCard
