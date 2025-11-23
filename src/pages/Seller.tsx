import Footer from '@/components/layout/Footer'
import SellerOfTheMonth from '@/components/SellersComponent/SellerOfTheMonth'
import SellerTiers from '@/components/SellersComponent/SellerTiers'
import { VerifiedSellers } from '@/components/SellersComponent/VerifiedSellers'

function Seller() {
  return (
    <div>
      <VerifiedSellers/>
      <SellerOfTheMonth/>
      <SellerTiers/>
      <Footer/>
    </div>
  )
}

export default Seller