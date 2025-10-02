import SellerCard from '@/reuseableComponents/SellerCard'
import Wrapper from '../layout/Wrapper'
import SellerData from "@/utils/Data/SellerData.json" 

const VerifiedTopSellers = () => {
  return (
    <div className="py-10 xl:py-20 bg-accent-foreground">
      <Wrapper>
        <div className="space-y-6 lg:space-y-12">
          {/* Header Section */}
          <div className="border-b border-b-[#D9E5E9]">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <img 
                src="/public/StarSVG.svg" 
                alt="Star icon" 
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
              />
              <h2 className="">
                <span className="text-accent">Verified </span>Top Sellers
              </h2>
            </div>
            <p className="py-4">
              Meet our trusted sellers with badges and top listings.
            </p>
          </div>

          {/* Sellers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {SellerData.map((item, index) => (
              <SellerCard 
                key={index}
                item={{...item, tier: item.tier as "Gold" | "Platinum" | "Diamond"}}
              />
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default VerifiedTopSellers