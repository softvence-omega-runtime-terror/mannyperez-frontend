import SellerOfTheMonth from '@/components/SellersComponent/SellerOfTheMonth'
import SellerTiers from '@/components/SellersComponent/SellerTiers'
import { VerifiedSellers } from '@/components/SellersComponent/VerifiedSellers'
import React from 'react'

function Seller() {
  return (
    <div>
      <VerifiedSellers/>
      <SellerOfTheMonth/>
      <SellerTiers/>
    </div>
  )
}

export default Seller