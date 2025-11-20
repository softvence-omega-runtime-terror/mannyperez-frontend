import Hero from '@/components/landing/Hero'
import ProcessOfWork from '@/components/landing/ProcessOfWork'
import SalesEvent from '@/components/landing/SalesEvent'
import ShopByCategory from '@/components/landing/ShopByCategory'
import StayUpdated from '@/components/landing/StayUpdated'
import { TestimonialsSlider } from '@/components/landing/TestimonialsSlider'
import TrendingListing from '@/components/landing/TrendingListing'
import VerifiedTopSellers from '@/components/landing/VerifiedTopSellers'
import Footer from '@/components/layout/Footer'



function Landing() {
  return (

     <div className=''>
    <div className="sticky top-0 z-99">
      </div>
        <Hero/>
        <SalesEvent/>
        <TrendingListing/>
        <ShopByCategory/> 
        <VerifiedTopSellers/>
        <ProcessOfWork/>
        <TestimonialsSlider/>
        <StayUpdated/>
        <Footer/>
    </div>

  )
}

export default Landing