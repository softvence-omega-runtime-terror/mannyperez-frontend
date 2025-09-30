import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { TrendingProduct } from '@/types/TrendingCardProps'
import React from 'react'
import PrimaryButton from './PrimaryButton'

interface TrendingProductCardProps {
    item:TrendingProduct
}

const badgeConfig = {
  gold: {
    icon: "⭐",
    label: "Gold",
    color: "text-gold",
  },
  platinum: {
    icon: "💎",
    label: "Platinum",
    color: "text-platinum",
  },
  diamond: {
    icon: "💠",
    label: "Diamond",
    color: "text-diamond",
  },
}

const TrendingProductCard : React.FC<TrendingProductCardProps> = (props) => {
    const {imageUrl,title,price,unit,seller,badge} = props.item
const badgeInfo = badgeConfig[badge as "gold" | "platinum" | "diamond"]
  return (
    <div>
       <Card className="overflow-hidden border  shadow-sm hover:shadow-md transition-shadow py-0 pb-2 ">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <CardContent className=" space-y-2">
        <h5 className="font-semibold  leading-tight text-foreground line-clamp-2">{title}</h5>
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-foreground">{seller}</span>
          <span className={`text-base ${badgeInfo.color}`} title={badgeInfo.label}>
            {badgeInfo.icon}
          </span>
          <span className="text-xs text-muted-foreground">{badgeInfo.label}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 grid gap-4">
        <div className="flex items-baseline gap-0.5">
          <span className="text-3xl font-bold text-foreground">${price}</span>
          <span className="text-sm text-muted-foreground">/{unit}</span>
        </div>
       
        <PrimaryButton type='Outline' title='View Details' className='rounded-full py-4! bg-transparent hover:text-accent-foreground' />
      </CardFooter>
    </Card>
    </div>
  )
}

export default TrendingProductCard
