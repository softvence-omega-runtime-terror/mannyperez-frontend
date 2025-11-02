import Footer from '@/components/layout/Footer'
import UserNavbar from '@/components/layout/UserNavbar'
import Wrapper from '@/components/layout/Wrapper'
import FeaturedProducts from '@/components/LiveComponent/FeaturedProducts'
import LiveChat from '@/components/LiveComponent/LiveChat'
import LiveHeader from '@/components/LiveComponent/LiveHeader'
import VideoPlayer from '@/components/LiveComponent/VideoPlayer'

function Live() {
  return (
    <div>
      <UserNavbar/>
      <LiveHeader/>
      <Wrapper>
      <div className="flex flex-col lg:flex-row justify-center gap-5 pt-6 pb-10">
        <div className="flex-3 ">
      <VideoPlayer/>
        </div>
        <div className="flex-1">
      <LiveChat/>
        </div>
      </div>
      </Wrapper>
      <FeaturedProducts/>

      <Footer/>
    </div>
  )
}

export default Live