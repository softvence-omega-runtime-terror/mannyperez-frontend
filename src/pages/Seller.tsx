import Footer from '@/components/layout/Footer'
import UserNavbar from '@/components/layout/UserNavbar'
import SellerOfTheMonth from '@/components/SellersComponent/SellerOfTheMonth'
import SellerTiers from '@/components/SellersComponent/SellerTiers'
import { VerifiedSellers } from '@/components/SellersComponent/VerifiedSellers'

function Seller() {
  return (
    <div>
      <UserNavbar/>
      <VerifiedSellers/>
      <SellerOfTheMonth/>
      <SellerTiers/>
      <Footer/>
    </div>
  )
}

export default Seller