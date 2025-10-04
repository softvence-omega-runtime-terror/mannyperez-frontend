import { Check, Crown, Shield, Star } from "lucide-react"
import Wrapper from "../layout/Wrapper"
import { Card, CardContent } from "../ui/card"

interface TierBenefit {
  text: string
}

interface TierData {
  name: string
  icon: React.ReactNode
  benefits: TierBenefit[]
  count: number
  countLabel: string
  bgColor: string
  iconBorderColor:string
  iconColor: string
  borderColor: string
}

const tiers: TierData[] = [
  {
    name: "Gold Sellers",
    icon: <Star className="w-6 h-6" />,
    benefits: [
      { text: "Verified identity & business registration" },
      { text: "4.0+ star average rating" },
      { text: "50+ completed orders" },
      { text: "Basic seller protection" },
    ],
    count: 1247,
    countLabel: "Silver Sellers",
    bgColor: "bg-[#FEFCE8]",
    iconBorderColor:"border-[#FFDF20]",
    iconColor: "text-[#B19700]",
    borderColor: "border-[#FEF08A]",
  },
  {
    name: "Platinum Sellers",
    icon: <Crown className="w-6 h-6" />,
    benefits: [
      { text: "All Silver benefits" },
      { text: "4.5+ star average rating" },
      { text: "200+ completed orders" },
      { text: "Priority search placement" },
      { text: "Enhanced seller tools" },
    ],
    count: 892,
    countLabel: "Gold sellers",
    bgColor: "bg-[#FAF5FF]",
    iconBorderColor:"border-[#DAB2FF]",
    iconColor: "text-[#8228E5]",
    borderColor: "border-[#E9D5FF]",
  },
  {
    name: "Diamond Sellers",
    icon: <Shield className="w-6 h-6" />,
    benefits: [
      { text: "All Gold benefits" },
      { text: "4.8+ star average rating" },
      { text: "500+ completed orders" },
      { text: "Featured placement opportunities" },
      { text: "Dedicated account manager" },
    ],
    count: 234,
    countLabel: "Platinum Sellers",
    bgColor: "bg-[#E9F5FA]",
    iconBorderColor:"border-[#145F7C]",
    iconColor: "text-[#145F7C]",
    borderColor: "border-[#85C9E4]",
  },
]

const SellerTiers = () => {
  return (
    <div className=" pb-20 pt-5">
        <Wrapper>         
        <div className="text-center pb-12">
            <h2>Understanding Seller Tiers</h2>
            <p>Our tier system ensures you can easily identify the most reliable and experienced sellers</p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`${tier.bgColor} ${tier.borderColor} border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
          >
            <CardContent className="p-6 sm:p-8 h-full flex flex-col">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div
                  className={`${tier.iconColor} border ${tier.iconBorderColor} w-14 h-14 rounded-full flex items-center justify-center`}
                >
                  {tier.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">{tier.name}</h3>

              {/* Benefits */}
              <ul className="space-y-3 mb-8 min-h-fit flex-grow">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-4 h-4 rounded-sm bg-green-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </div>
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">{benefit.text}</span>
                  </li>
                ))}
              </ul>

              {/* Count */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{tier.count}</span> {tier.countLabel}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
        </Wrapper>
    </div>
  )
}

export default SellerTiers
