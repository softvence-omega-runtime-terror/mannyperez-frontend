import ProductCard from '@/reuseableComponents/ProductCard'

import ProductData from "@/utils/Data/ProductData.json"
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Wrapper from '../layout/Wrapper';

const SalesEvent = () => {
  return (
    <div className=" py-10">
    <Wrapper>
        <div className="space-y-12">
        <div className="border-b border-b-[#D9E5E9] flex items-center justify-between">
            <div className="">
      <h2><span className='text-accent'>Live</span> Sales Event</h2>
      <p className='py-4'>Join live shopping events with exclusive deals</p>
            </div>
            <div className="flex items-center justify-center gap-2">
                <p>View All</p>
                <IoIosArrowDroprightCircle className='size-6'/>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-10">
            {
                ProductData.map((item)=>(
                    <ProductCard item={item}/>
                ))
            }
        </div>
        </div>
    </Wrapper>
    </div>

  )
}

export default SalesEvent
