import { Star, Crown, Gem, Check } from "lucide-react"

interface TierBenefit {
  text: string
}

interface TierCardProps {
  icon: "star" | "crown" | "gem"
  title: string
  benefits: TierBenefit[]
  sellerCount: string
}

export function SellerTierCard(props: { item: TierCardProps }) {
  const { icon, title, benefits, sellerCount } = props.item

  const IconComponent = icon === "star" ? Star : icon === "crown" ? Crown : Gem
  const { bgColor, borderColor, iconBgColor, iconColor } = tierStyles[icon]

  return (
    <div className={`${bgColor} ${borderColor} border-2 rounded-2xl p-8 flex flex-col items-center text-center h-full`}>
      <div className={`${iconBgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
        <IconComponent className={`w-8 h-8 ${iconColor}`} />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-8">{title}</h3>

      <div className="space-y-4 mb-8 w-full">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-3 text-left">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">{benefit.text}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <p className="text-sm font-medium text-gray-600">{sellerCount}</p>
      </div>
    </div>
  )
}
