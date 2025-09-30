import PrimaryButton from '@/reuseableComponents/PrimaryButton'
import React from 'react'
import Wrapper from '../layout/Wrapper'

const StayUpdated = () => {
  return (
    <div className="py-20">
    <Wrapper>
    <div>
        <h2>Stay Updated with DTF Destash</h2>
        <p>Get notified about new live events, trending products, and exclusive deal</p>
        <div className="">
            <input type="text" placeholder='Enter your email here' />
            <PrimaryButton type='Primary' title='Subscribe' className='py-6'/>
        </div>
    </div>
    </Wrapper>
    </div>
  )
}

export default StayUpdated
