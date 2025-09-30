import SellerCard from '@/reuseableComponents/SellerCard'
import Wrapper from '../layout/Wrapper'
import SellerData from "@/utils/Data/SellerData.json" 

const VerifiedTopSellers = () => {
  return (
      <div className="py-20 bg-accent-foreground">
      <Wrapper>
        <div className="space-y-12 ">
          <div className="border-b border-b-[#D9E5E9 ]">
            <div className="flex items-center gap-1">
              <img src="/public/StarSVG.svg" alt="" />
              <h2>
                <span className="text-accent">Verified</span>Top Sellers
              </h2>
            </div>
            <p className="py-4">
             Meet our trusted sellers with badges and top listings.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {
                SellerData.map((item)=>(
                    <SellerCard  item={{...item, tier:item.tier as "Gold" | "Platinum" | "Diamond"}}/>
                ))
            }
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default VerifiedTopSellers
