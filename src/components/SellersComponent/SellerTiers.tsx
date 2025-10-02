import SellerTierData from "@/utils/Data/SellersTierData.json"
import Wrapper from "../layout/Wrapper"
import { SellerTierCard } from "./SellerTierCard"


const SellerTiers = () => {
  return (
    <div className=" py-20">
        <Wrapper>         
        <div className="text-center">
            <h2>Understanding Seller Tiers</h2>
            <p>Our tier system ensures you can easily identify the most reliable and experienced sellers</p>
        </div>

        <div className="grid grid-cols-3 gap-4 ">
      {
        SellerTierData.map((item)=>(
            <SellerTierCard item={item}/>
        ))
      }
        </div>
        </Wrapper>
    </div>
  )
}

export default SellerTiers
