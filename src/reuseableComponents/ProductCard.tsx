import CountdownTimer from '@/components/landing/SectionComponents/CountdownTimer'
import TierBadge from '@/components/landing/SectionComponents/TierBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LiveSaleCardProps, UserTier } from '@/types/LiveSaleCardProps'
import { Clock, Users } from 'lucide-react'
import React from 'react'

interface ProductCardProps {
    item:LiveSaleCardProps
}

const ProductCard : React.FC<ProductCardProps> = (props) => {
    const {imageUrl, title, status, startsIn, duration,expectedUsers, productCount, seller} = props.item
  return (
    <div>
        <Card className="overflow-hidden bg-white border-gray-200 shadow-sm hover:shadow-md py-0 transition-transform hover:-translate-y-3 duration-300">
      {/* Image Section */}
      <div className="relative w-full overflow-hidden h-56">
        <img src={imageUrl || "/placeholder.svg"} alt={title} className="object-cover" />
        {/* Status Badge */}
        <Badge
          className={`absolute top-3 left-3 ${
            status === "live" ? "bg-red-500 hover:bg-red-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          {status === "live" ? "Live" : "Upcoming"}
        </Badge>
      </div>

      <CardContent className="p-4 pt-0 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{title}</h3>

        {/* Seller Info */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
            <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700">{seller.name}</span>
          <TierBadge tier={seller.tier as UserTier} />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Starts in {startsIn} hours</span>
          </div>
          <span>{duration} min</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{expectedUsers} expected</span>
          </div>
          <span>{productCount} products</span>
        </div>

        {/* Action Button */}
        {status === "live" ? (
          <Button className="w-full bg-accent hover:bg-accent text-white font-medium rounded-full">Join Live Sale Stream</Button>
        ) : (
          <Button variant="outline" className="w-full text-accent border-gray-300 hover:bg-accent bg-transparent rounded-full">
            Wait More <CountdownTimer targetHours={startsIn} />
          </Button>
        )}
      </CardContent>
    </Card>
    </div>
  )
}

export default ProductCard
