import Hero from '@/components/landing/Hero'
import SalesEvent from '@/components/landing/SalesEvent'
import ShopByCategory from '@/components/landing/ShopByCategory'
import StayUpdated from '@/components/landing/StayUpdated'
import TrendingListing from '@/components/landing/TrendingListing'
import Navbar from '@/components/layout/Navbar'

import React from 'react'

function Landing() {
  return (

     <div className=''>
        <Navbar/>
        <Hero/>
        <SalesEvent/>
        <TrendingListing/>
        <ShopByCategory/> 
        <StayUpdated/>
    </div>

  )
}

export default Landing